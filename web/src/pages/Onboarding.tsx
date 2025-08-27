import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AppRoot, Button } from '@telegram-apps/telegram-ui'
import WebApp from '@twa-dev/sdk'
import { useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const navigate = useNavigate()
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
    navigate('/app')
  }

  return (
    <AppRoot>
    <div className="relative min-h-[100svh] bg-gray-100 text-[#0F172A] overflow-hidden select-none">
      <div className="absolute inset-0">
        <div className="w-full max-w-sm mx-auto bg-slate-50 shadow-lg rounded-3xl overflow-hidden h-[100svh]">
          <div className="bg-blue-500/10 relative h-full">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
              <div className="flex items-center gap-1 text-gray-700">
                <span className="text-sm font-medium">En</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="m6 9 6 6 6-6"/></svg>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-1.5 bg-gray-800 rounded-full"/>
                <div className="w-2 h-1.5 bg-gray-300 rounded-full"/>
                <div className="w-2 h-1.5 bg-gray-300 rounded-full"/>
              </div>
              <button className="text-sm font-medium text-gray-700 flex items-center gap-1">
                Skip
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </header>

            {/* Country Selector */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1 flex items-center gap-4 shadow-md">
              <div className="flex items-center gap-2 px-3 py-1">
                <img src="https://placehold.co/24x24/FFFFFF/000000?text=%F0%9F%87%A6%F0%9F%87%B7" alt="Argentina Flag" className="w-6 h-6 rounded-full object-cover" />
                <span className="font-semibold text-gray-800">Argentina</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1">
                <img src="https://placehold.co/24x24/FFFFFF/000000?text=%F0%9F%87%B9%F0%9F%87%AD" alt="Thailand Flag" className="w-6 h-6 rounded-full object-cover" />
                <span className="font-semibold text-gray-800">Thailand</span>
              </div>
            </div>

            {/* Main Image */}
            <div className="pt-28 pb-8 px-4">
              <img src="https://placehold.co/300x250/E0F2FE/3B82F6?text=Image" alt="Penguin with a flag and phone" className="mx-auto" onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/300x250/E0F2FE/3B82F6?text=Image+Not+Found' }} />
            </div>

            {/* Bottom Sheet */}
            <motion.div initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ type: 'spring', damping: 20, stiffness: 160 }} className="absolute bottom-0 left-0 right-0">
              <div className="bg-white p-6 rounded-t-3xl -mt-6 relative" style={{ height: '50vh' }}>
                <h1 className="text-3xl font-bold text-center text-gray-900 leading-tight">
                  Оплата по QR-кодам<br/>
                  только в <span className="text-blue-600">России</span>
                </h1>
                <p className="text-center text-gray-500 mt-4 text-base">
                  Поддержка турецкой лиры, вьетнамского донга, тенге, аргентинского песо и других валют скоро появится. Следите за обновлениями.
                </p>
                <div className="absolute left-0 right-0 bottom-0 p-6">
                  <Button size="l" style={{ width: '100%' }} onClick={handleStart}>Перейти в кошелек</Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </AppRoot>
  )
}


