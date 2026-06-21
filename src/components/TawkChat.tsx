'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Tawk_API: object
    Tawk_LoadStart: Date
  }
}

export function TawkChat() {
  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://embed.tawk.to/6a307a684b3ff81d49204c20/1jr6lsa0n'
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    document.head.appendChild(script)
  }, [])

  return null
}
