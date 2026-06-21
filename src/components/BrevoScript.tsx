'use client'

import { useEffect } from 'react'

// Brevo Marketing Automation tracker (Web SDK v2.0).
// Key from: Brevo → Settings → Automations → Brevo tracker → JS Tracker.
const BREVO_CLIENT_KEY = 'c09ekgti9ac8p27k0q2sl79v'

declare global {
  interface Window {
    Brevo?: unknown[]
  }
}

export function BrevoScript() {
  useEffect(() => {
    if (!BREVO_CLIENT_KEY) return
    if (document.getElementById('brevo-sdk-loader')) return

    window.Brevo = window.Brevo || []
    window.Brevo.push(['init', { client_key: BREVO_CLIENT_KEY }])

    const s = document.createElement('script')
    s.id = 'brevo-sdk-loader'
    s.src = 'https://cdn.brevo.com/js/sdk-loader.js'
    s.async = true
    document.head.appendChild(s)
  }, [])

  return null
}

// Associate the current visitor's Brevo cookie with an email so automations
// (e.g. abandoned cart) can reach them.
export function brevoIdentify(email: string, attributes: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.Brevo) return
  window.Brevo.push([
    'identify',
    { identifiers: { email_id: email }, attributes },
  ])
}

// Track a custom event. `email` is passed as a property so Brevo can tie the
// event to a contact; `eventData` follows Brevo's { id, data } shape.
export function brevoTrack(
  eventName: string,
  email: string | undefined,
  eventData: Record<string, unknown> = {}
) {
  if (typeof window === 'undefined' || !window.Brevo) return
  window.Brevo.push([
    'track',
    eventName,
    email ? { email } : {},
    eventData,
  ])
}
