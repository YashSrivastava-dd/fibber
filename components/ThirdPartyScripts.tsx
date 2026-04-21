'use client'

import { useEffect, useRef } from 'react'

const GTM_ID = 'GTM-W8MBF3JG'
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1494405295572983'

/**
 * Injects ALL third-party analytics scripts (GTM, Google Ads, Meta Pixel)
 * only after the user's first interaction (scroll, click, touch).
 *
 * This removes ~1.8s of main-thread blocking from the initial page load.
 */
export default function ThirdPartyScripts() {
  const loaded = useRef(false)

  useEffect(() => {
    function loadAllScripts() {
      if (loaded.current) return
      loaded.current = true

      // 1. Google Tag Manager
      const w = window as any
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
      const gtmScript = document.createElement('script')
      gtmScript.async = true
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
      document.head.appendChild(gtmScript)

      // 2. Google Ads (gtag.js)
      const gtagScript = document.createElement('script')
      gtagScript.async = true
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17953867063'
      document.head.appendChild(gtagScript)
      gtagScript.onload = () => {
        w.dataLayer = w.dataLayer || []
        function gtag(...args: any[]) { w.dataLayer.push(args) }
        gtag('js', new Date())
        gtag('config', 'AW-17953867063')
      }

      // 3. Meta Pixel
      const f = window as any
      if (!f.fbq) {
        const n: any = (f.fbq = function (...args: any[]) {
          n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args)
        })
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = true
        n.version = '2.0'
        n.queue = []
        const fbScript = document.createElement('script')
        fbScript.async = true
        fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js'
        document.head.appendChild(fbScript)
        f.fbq('init', META_PIXEL_ID)
        f.fbq('track', 'PageView')
      }

      // Cleanup listeners
      window.removeEventListener('scroll', loadAllScripts)
      window.removeEventListener('click', loadAllScripts)
      window.removeEventListener('touchstart', loadAllScripts)
    }

    // Load scripts on first user interaction OR after 5s idle (whichever first)
    window.addEventListener('scroll', loadAllScripts, { once: true, passive: true })
    window.addEventListener('click', loadAllScripts, { once: true })
    window.addEventListener('touchstart', loadAllScripts, { once: true, passive: true })

    // Fallback: load after 5 seconds if user hasn't interacted
    const timer = setTimeout(loadAllScripts, 5000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', loadAllScripts)
      window.removeEventListener('click', loadAllScripts)
      window.removeEventListener('touchstart', loadAllScripts)
    }
  }, [])

  return null
}
