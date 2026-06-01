// Google Sheets Webhook Integration
// Sends order and abandonment data to a Google Apps Script Web App

const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL || ''

interface SheetRow {
  type: 'order' | 'abandoned'
  timestamp: string
  email: string
  name?: string
  phone?: string
  city?: string
  province?: string
  orderNumber?: string
  total?: number
  items?: string
  paymentMethod?: string
  status: string
}

export async function sendToSheets(row: SheetRow) {
  if (!SHEETS_WEBHOOK_URL) return
  try {
    await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
    })
  } catch (err) {
    console.error('Sheets webhook error:', err)
  }
}
