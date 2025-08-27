import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AppRoot, Button } from '@telegram-apps/telegram-ui'
import WebApp from '@twa-dev/sdk'
import { useNavigate } from 'react-router-dom'

export default function WelcomeScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    WebApp.ready()
    WebApp.expand()
    const applyVH = () => {
      const vh = Math.round((WebApp as any)?.viewportHeight || window.innerHeight)
      document.documentElement.style.setProperty('--app-vh', `${vh}px`)
    }
    applyVH()
    const onChange = () => applyVH()
    try { (WebApp as any).onEvent?.('viewportChanged', onChange) } catch {}
    window.addEventListener('resize', onChange)
    // Lock scroll/overscroll/selection
    const html = document.documentElement
    const body = document.body
    const prev = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: (html.style as any).overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyTouchAction: (body.style as any).touchAction,
      bodyUserSelect: (body.style as any).userSelect,
    }
    html.style.overflow = 'hidden'
    ;(html.style as any).overscrollBehavior = 'none'
    body.style.overflow = 'hidden'
    ;(body.style as any).touchAction = 'none'
    ;(body.style as any).userSelect = 'none'
    return () => {
      try { (WebApp as any).offEvent?.('viewportChanged', onChange) } catch {}
      window.removeEventListener('resize', onChange)
      html.style.overflow = prev.htmlOverflow
      ;(html.style as any).overscrollBehavior = prev.htmlOverscroll
      body.style.overflow = prev.bodyOverflow
      ;(body.style as any).touchAction = prev.bodyTouchAction
      ;(body.style as any).userSelect = prev.bodyUserSelect
    }
  }, [])

  const handleNext = () => {
    navigate('/home') // переход после приветствия
  }

  return (
    <AppRoot>
      <div className="fixed inset-0 flex flex-col items-center justify-between px-[6vw] pt-6 bg-gradient-to-b from-indigo-500 to-blue-600 text-white" style={{ minHeight: 'var(--app-vh, 100svh)' }}>
        {/* Текст приветствия */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center text-center gap-3 mt-24 max-w-[88vw]"
        >
          <h1 className="text-3xl font-bold">Добро пожаловать!</h1>
          <p className="text-base text-white/80 max-w-md">
            Это ваш новый Mini App в Telegram. Всё просто и удобно — начнём!
          </p>
        </motion.div>

        {/* Кнопка "Далее" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full mt-auto pb-[calc(env(safe-area-inset-bottom,0)+16px)]"
        >
          <Button size="l" onClick={handleNext} className="w-full rounded-2xl text-base">
            Далее →
          </Button>
        </motion.div>
      </div>
    </AppRoot>
  )
}