import { NextRequest, NextResponse } from 'next/server'
import { generateOrderNumber } from '@/lib/utils'
import { sendToSheets } from '@/lib/sheets-webhook'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, shippingAddress, paymentMethod, subtotal, shipping, total, notes } = body

    if (!items || !shippingAddress || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const orderNumber = generateOrderNumber()
    const orderId = `${Date.now()}`

    // Build order object
    const order = {
      id: orderId,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'pending_payment',
      paymentMethod,
      items,
      shippingAddress,
      subtotal,
      shipping,
      total,
      notes: notes || '',
    }

    // Send email notifications
    await sendOrderEmails(order)

    // Log to Google Sheets
    await sendToSheets({
      type: 'order',
      timestamp: new Date().toISOString(),
      email: shippingAddress.email,
      name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
      phone: shippingAddress.phone || '',
      city: shippingAddress.city,
      province: shippingAddress.province,
      orderNumber,
      total: total / 100,
      items: items.map((i: any) => `${i.productName} (${i.variantName}) ×${i.quantity}`).join(', '),
      paymentMethod,
      status: 'Order Placed',
    })

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId,
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

async function sendOrderEmails(order: any) {
  // Only attempt if SMTP credentials are configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('SMTP not configured — skipping email. Order:', order.orderNumber)
    return
  }

  try {
    const nodemailer = await import('nodemailer')
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const itemsHtml = order.items.map((item: any) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #1E2A3A;">${item.productName} — ${item.variantName}</td>
        <td style="padding:8px;border-bottom:1px solid #1E2A3A;text-align:center;">${item.quantity}</td>
        <td style="padding:8px;border-bottom:1px solid #1E2A3A;text-align:right;">$${(item.total / 100).toFixed(2)} CAD</td>
      </tr>
    `).join('')

    const etransferInstructions = order.paymentMethod === 'etransfer' ? `
      <div style="background:#0D1117;border:1px solid #00D4FF40;border-radius:8px;padding:20px;margin:20px 0;">
        <h3 style="color:#00D4FF;margin:0 0 12px;">E-Transfer Instructions</h3>
        <p style="margin:4px 0;">Send e-transfer to: <strong style="color:#00D4FF;">sales@popularpeptides.ca</strong></p>
        <p style="margin:4px 0;">Amount: <strong>$${(order.total / 100).toFixed(2)} CAD</strong></p>
        <p style="margin:4px 0;">Message/Note: <strong>${order.orderNumber}</strong></p>
        <p style="margin:16px 0 4px;color:#8892A4;font-size:13px;">Your order will be processed once payment is confirmed. You'll receive a confirmation email within 1 business day.</p>
      </div>
    ` : `<p style="color:#8892A4;">Payment details will be provided via email.</p>`

    // Email to customer
    await transporter.sendMail({
      from: `"Popular Peptides" <${process.env.SMTP_USER}>`,
      to: order.shippingAddress.email,
      subject: `Order Received — ${order.orderNumber} | Popular Peptides`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#080A0F;font-family:'Helvetica Neue',Arial,sans-serif;color:#F0F4FF;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            <div style="text-align:center;margin-bottom:32px;">
              <h1 style="color:#00D4FF;font-size:24px;letter-spacing:0.1em;margin:0;">POPULAR PEPTIDES</h1>
              <p style="color:#8892A4;margin:4px 0 0;font-size:12px;letter-spacing:0.2em;">RESEARCH COMPOUNDS — CANADA</p>
            </div>
            
            <h2 style="color:#F0F4FF;font-size:20px;">Order Confirmed</h2>
            <p style="color:#8892A4;">Thank you, ${order.shippingAddress.firstName}. We've received your order.</p>
            
            <div style="background:#0D1117;border:1px solid #1E2A3A;border-radius:8px;padding:16px;margin:24px 0;">
              <p style="margin:0;color:#8892A4;font-size:12px;letter-spacing:0.1em;">ORDER NUMBER</p>
              <p style="margin:4px 0 0;color:#00D4FF;font-size:20px;font-weight:700;letter-spacing:0.05em;">${order.orderNumber}</p>
            </div>

            ${etransferInstructions}

            <table style="width:100%;border-collapse:collapse;margin:24px 0;">
              <thead>
                <tr style="background:#13181F;">
                  <th style="padding:10px 8px;text-align:left;color:#8892A4;font-size:12px;letter-spacing:0.08em;font-weight:500;">ITEM</th>
                  <th style="padding:10px 8px;text-align:center;color:#8892A4;font-size:12px;letter-spacing:0.08em;font-weight:500;">QTY</th>
                  <th style="padding:10px 8px;text-align:right;color:#8892A4;font-size:12px;letter-spacing:0.08em;font-weight:500;">PRICE</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding:8px;text-align:right;color:#8892A4;">Subtotal</td>
                  <td style="padding:8px;text-align:right;">$${(order.subtotal / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:8px;text-align:right;color:#8892A4;">Shipping</td>
                  <td style="padding:8px;text-align:right;">${order.shipping === 0 ? 'FREE' : '$' + (order.shipping / 100).toFixed(2)}</td>
                </tr>
                <tr style="background:#13181F;">
                  <td colspan="2" style="padding:10px 8px;text-align:right;font-weight:700;color:#00D4FF;">TOTAL</td>
                  <td style="padding:10px 8px;text-align:right;font-weight:700;color:#00D4FF;">$${(order.total / 100).toFixed(2)} CAD</td>
                </tr>
              </tfoot>
            </table>

            <p style="color:#8892A4;font-size:13px;border-top:1px solid #1E2A3A;padding-top:20px;">
              Questions? Contact us at <a href="mailto:sales@popularpeptides.ca" style="color:#00D4FF;">sales@popularpeptides.ca</a>
            </p>
            <p style="color:#4A5568;font-size:11px;">
              All products are sold for research purposes only. Not for human consumption.
            </p>
          </div>
        </body>
        </html>
      `,
    })

    // Email to store owner
    await transporter.sendMail({
      from: `"Popular Peptides Orders" <${process.env.SMTP_USER}>`,
      to: process.env.ORDER_EMAIL || 'sales@popularpeptides.ca',
      subject: `🔔 New Order — ${order.orderNumber} — $${(order.total / 100).toFixed(2)} CAD`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;">
          <h2>New Order: ${order.orderNumber}</h2>
          <p><strong>Payment:</strong> E-Transfer</p>
          <p><strong>Total:</strong> $${(order.total / 100).toFixed(2)} CAD</p>
          <h3>Customer</h3>
          <p>${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br>
          ${order.shippingAddress.email}<br>
          ${order.shippingAddress.phone || ''}</p>
          <h3>Ship To</h3>
          <p>${order.shippingAddress.address1}${order.shippingAddress.address2 ? ', ' + order.shippingAddress.address2 : ''}<br>
          ${order.shippingAddress.city}, ${order.shippingAddress.province} ${order.shippingAddress.postalCode}</p>
          <h3>Items</h3>
          <ul>
            ${order.items.map((i: any) => `<li>${i.productName} (${i.variantName}) × ${i.quantity} — $${(i.total/100).toFixed(2)}</li>`).join('')}
          </ul>
          ${order.notes ? `<h3>Notes</h3><p>${order.notes}</p>` : ''}
        </div>
      `,
    })

  } catch (emailErr) {
    console.error('Email sending failed (non-critical):', emailErr)
    // Don't fail the order if email fails
  }
}
