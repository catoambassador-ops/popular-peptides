/**
 * Mobopay Payment Integration
 * 
 * This file is pre-structured for Mobopay integration.
 * When you receive your Mobopay merchant credentials, add them to .env.local:
 *   NEXT_PUBLIC_MOBOPAY_MERCHANT_ID=your_merchant_id
 *   MOBOPAY_API_KEY=your_api_key
 *   NEXT_PUBLIC_MOBOPAY_ENDPOINT=https://api.mobopay.com
 * 
 * Then update the MobopayEnabled flag below to true.
 */

export const MobopayEnabled = !!(
  process.env.NEXT_PUBLIC_MOBOPAY_MERCHANT_ID &&
  process.env.MOBOPAY_API_KEY
)

export interface MobopaySessionParams {
  orderNumber: string
  amount: number        // CAD cents
  email: string
  firstName: string
  lastName: string
  description: string
  returnUrl: string
  cancelUrl: string
}

export interface MobopaySession {
  sessionId: string
  checkoutUrl: string
  expiresAt: string
}

/**
 * Create a Mobopay checkout session
 * Call this from your API route — never expose MOBOPAY_API_KEY to the client
 */
export async function createMobopaySession(params: MobopaySessionParams): Promise<MobopaySession> {
  const endpoint = process.env.NEXT_PUBLIC_MOBOPAY_ENDPOINT || 'https://api.mobopay.com'
  const apiKey = process.env.MOBOPAY_API_KEY
  const merchantId = process.env.NEXT_PUBLIC_MOBOPAY_MERCHANT_ID

  if (!apiKey || !merchantId) {
    throw new Error('Mobopay credentials not configured. Add MOBOPAY_API_KEY and NEXT_PUBLIC_MOBOPAY_MERCHANT_ID to .env.local')
  }

  const response = await fetch(`${endpoint}/v1/checkout/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'X-Merchant-ID': merchantId,
    },
    body: JSON.stringify({
      merchant_reference: params.orderNumber,
      amount: params.amount,
      currency: 'CAD',
      customer: {
        email: params.email,
        first_name: params.firstName,
        last_name: params.lastName,
      },
      description: params.description,
      success_url: params.returnUrl,
      cancel_url: params.cancelUrl,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Mobopay session creation failed: ${err}`)
  }

  const data = await response.json()
  
  // Map Mobopay response fields — update these to match actual API response structure
  return {
    sessionId: data.session_id || data.id,
    checkoutUrl: data.checkout_url || data.redirect_url,
    expiresAt: data.expires_at,
  }
}

/**
 * Verify a Mobopay webhook signature
 * Call this in your webhook handler to validate incoming events
 */
export function verifyMobopayWebhook(
  payload: string, 
  signature: string,
  secret: string
): boolean {
  // TODO: Implement signature verification per Mobopay docs
  // Typically HMAC-SHA256 of the payload using your webhook secret
  // const crypto = require('crypto')
  // const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  // return expected === signature
  
  console.warn('Mobopay webhook verification not yet implemented')
  return true
}
