import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// "Request More Info" general inquiry form.
// 1) Creates/updates a contact in Brevo (the CRM) on the inquiries list.
// 2) Emails the team a notification so they can follow up.
//
// Required env:
//   BREVO_API_KEY            – Brevo v3 API key (Settings → SMTP & API → API Keys)
//   BREVO_INQUIRY_LIST_ID    – numeric ID of the inquiries contact list
//                              (falls back to BREVO_BULK_LIST_ID / BREVO_HOUSE_CALL_LIST_ID)
// Optional (reuses existing contact-form SMTP setup):
//   SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / ORDER_EMAIL

interface InquiryPayload {
  name?: string
  email?: string
  phone?: string
  topic?: string
  message?: string
  heardFrom?: string
}

export async function POST(req: NextRequest) {
  let body: InquiryPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { name, email, phone, topic, message, heardFrom } = body

  // Required: a name plus at least one way to reach them.
  if (!name || !name.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  if (!email?.trim() && !phone?.trim()) {
    return NextResponse.json({ error: 'An email or phone number is required' }, { status: 400 })
  }

  const [firstName, ...rest] = name.trim().split(/\s+/)
  const lastName = rest.join(' ')

  // --- 1. Upsert contact into Brevo CRM ---
  const apiKey = process.env.BREVO_API_KEY
  const listId = Number(
    process.env.BREVO_INQUIRY_LIST_ID ||
    process.env.BREVO_BULK_LIST_ID ||
    process.env.BREVO_HOUSE_CALL_LIST_ID
  )

  if (apiKey && listId) {
    try {
      // Brevo keys contacts on email. If only a phone was given, dedupe on ext_id.
      const identifier: Record<string, string> = email?.trim()
        ? { email: email.trim() }
        : { ext_id: `phone:${(phone || '').replace(/\s+/g, '')}` }

      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          ...identifier,
          updateEnabled: true, // upsert: don't fail if the contact already exists
          listIds: [listId],
          attributes: {
            FIRSTNAME: firstName || '',
            LASTNAME: lastName || '',
            PHONE: phone || '',
            TOPIC: topic || '',
            MESSAGE: message || '',
            HEARD_FROM: heardFrom || '',
            SOURCE: 'info_request',
          },
        }),
      })

      if (!res.ok && res.status !== 204) {
        const detail = await res.text()
        console.error('Brevo contact upsert failed:', res.status, detail)
        // Don't hard-fail the user — still send the email notification below.
      }
    } catch (err) {
      console.error('Brevo request error:', err)
    }
  } else {
    console.warn('BREVO_API_KEY or BREVO_INQUIRY_LIST_ID not set — skipping CRM upsert')
  }

  // --- 2. Notify the team by email ---
  try {
    const port = Number(process.env.SMTP_PORT) || 465
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.privateemail.com',
      port,
      secure: port === 465,
      tls: { rejectUnauthorized: false },
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    const row = (label: string, value?: string) =>
      value
        ? `<tr><td style="padding:8px;font-weight:bold;color:#555;vertical-align:top;">${label}:</td><td style="padding:8px;">${value}</td></tr>`
        : ''

    await transporter.sendMail({
      from: `"Popular Peptides Inquiry" <${process.env.SMTP_USER}>`,
      to: process.env.ORDER_EMAIL || process.env.SMTP_USER || 'sales@popularpeptides.ca',
      ...(email?.trim() ? { replyTo: email.trim() } : {}),
      subject: `[Info Request] ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">New Info Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${row('Name', name)}
            ${row('Email', email ? `<a href="mailto:${email}">${email}</a>` : '')}
            ${row('Phone', phone)}
            ${row('Topic', topic)}
            ${row('Message', message)}
            ${row('Heard from', heardFrom)}
          </table>
          <p style="margin-top:16px;color:#888;font-size:12px;">
            Added to the Brevo inquiries list. ${email ? `Reply to this email to reach ${name} directly.` : ''}
          </p>
        </div>
      `,
    })
  } catch (err) {
    console.error('Inquiry notification email error:', err)
    // Email failure alone shouldn't block a successful CRM entry.
  }

  return NextResponse.json({ success: true })
}
