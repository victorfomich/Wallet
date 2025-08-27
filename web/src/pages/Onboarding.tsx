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
  }, [])

  const handleNext = () => {
    navigate('/home') // куда перейдём после приветствия
  }

  return (
    <AppRoot>
      <div className="flex flex-col items-center justify-between h-screen p-6 bg-gradient-to-b from-blue-500/90 to-indigo-600/90 text-white">
        {/* Анимация появления блока */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center text-center gap-4 mt-20"
        >
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            alt="logo"
            className="w-24 h-24 rounded-2xl shadow-lg"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <h1 className="text-2xl font-bold">Добро пожаловать!</h1>
          <p className="text-base text-white/80 max-w-sm">
            Это ваш новый Mini App в Telegram.  
            Нас ждёт удобный интерфейс и быстрый доступ к функциям прямо в чате.
          </p>
        </motion.div>

        {/* Кнопка "Далее" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full mb-10"
        >
          <Button
            size="l"
            stretched
            mode="filled"
            onClick={handleNext}
            style={{ borderRadius: '1rem', fontSize: '16px' }}
          >
            Далее →
          </Button>
        </motion.div>
      </div>
    </AppRoot>
  )
}