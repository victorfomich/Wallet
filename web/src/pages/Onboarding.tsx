import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AppRoot, Button } from '@telegram-apps/telegram-ui'
import WebApp from '@twa-dev/sdk'

export default function Onboarding() {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    const prev = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: (html.style as any).overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyTouchAction: (body.style as any).touchAction,
    }

    html.style.overflow = 'hidden'
    ;(html.style as any).overscrollBehavior = 'none'
    body.style.overflow = 'hidden'
    ;(body.style as any).touchAction = 'none'

    const prevent = (e: Event) => {
      e.preventDefault()
    }
    const preventWheel = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault()
    }
    document.addEventListener('gesturestart', prevent, { passive: false })
    document.addEventListener('gesturechange', prevent, { passive: false })
    document.addEventListener('gestureend', prevent, { passive: false })
    document.addEventListener('wheel', preventWheel, { passive: false })
    document.addEventListener('contextmenu', prevent)
    document.addEventListener('copy', prevent)
    document.addEventListener('cut', prevent)
    document.addEventListener('paste', prevent)

    return () => {
      html.style.overflow = prev.htmlOverflow
      ;(html.style as any).overscrollBehavior = prev.htmlOverscroll
      body.style.overflow = prev.bodyOverflow
      ;(body.style as any).touchAction = prev.bodyTouchAction
      document.removeEventListener('gesturestart', prevent)
      document.removeEventListener('gesturechange', prevent)
      document.removeEventListener('gestureend', prevent)
      document.removeEventListener('wheel', preventWheel)
      document.removeEventListener('contextmenu', prevent)
      document.removeEventListener('copy', prevent)
      document.removeEventListener('cut', prevent)
      document.removeEventListener('paste', prevent)
    }
  }, [])

  const handleStart = () => {
    WebApp.HapticFeedback.impactOccurred('medium')
    WebApp.showAlert('Welcome!')
  }

  return (
    <AppRoot>
    <div className="relative min-h-[100svh] bg-white text-[#0F172A] dark:bg-[#0F172A] dark:text-white overflow-hidden select-none">
      <main className="absolute inset-0">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="h-full w-full flex items-center justify-center">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="w-64 h-64">
            <div className="w-full h-full rounded-full bg-blue-500/10 flex items-center justify-center">
              <div className="w-44 h-44 rounded-full bg-blue-500" />
            </div>
          </motion.div>
        </motion.div>
      </main>

      <motion.div initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ type: 'spring', damping: 18, stiffness: 160 }} className="absolute bottom-0 left-0 right-0">
        <div className="mx-auto w-full max-w-md">
          <div className="mx-4 mb-4 rounded-t-3xl shadow-lg bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur p-5" style={{ height: '50vh' }}>
            <div className="flex items-center gap-2 text-xs opacity-70">
              <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10">Argentina</span>
              <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10">Thailand</span>
            </div>
            <h1 className="mt-4 text-2xl font-extrabold leading-tight">Payment of QR codes only <span className="text-blue-600">in Russia</span></h1>
            <p className="mt-2 text-sm opacity-70">
              The support of Turkish lira, Vietnamese dong, tenge, Argentine peso, and others is coming soon. Follow the updates.
            </p>
            <div className="absolute left-0 right-0 bottom-0 p-5">
              <Button size="l" style={{ width: '100%' }} onClick={handleStart}>Go to wallet</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </AppRoot>
  )
}


