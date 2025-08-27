import { motion } from 'framer-motion'
import { AppRoot, Button } from '@telegram-apps/telegram-ui'
import WebApp from '@twa-dev/sdk'

export default function Onboarding() {
  const handleStart = () => {
    WebApp.HapticFeedback.impactOccurred('medium')
    WebApp.showAlert('Welcome!')
  }

  return (
    <AppRoot>
    <div className="min-h-screen flex flex-col items-center justify-between bg-white text-[#0F172A] dark:bg-[#0F172A] dark:text-white">
      <header className="w-full px-4 py-3 flex justify-end">
        <button className="opacity-70 text-sm">Skip</button>
      </header>

      <main className="flex-1 w-full max-w-md px-6 flex flex-col items-center text-center gap-6">
        <div className="mt-2 inline-flex gap-2 rounded-full bg-black/5 dark:bg-white/10 px-2 py-1 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-white dark:bg-white/20">Argentina</span>
          <span className="px-2 py-0.5 rounded-full bg-white dark:bg-white/20">Thailand</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="mx-auto w-64 h-64">
            <div className="w-full h-full rounded-full bg-blue-500/10 flex items-center justify-center">
              <div className="w-44 h-44 rounded-full bg-blue-500" />
            </div>
          </motion.div>

          <h1 className="mt-6 text-3xl font-extrabold leading-tight">Payment of QR codes only <span className="text-blue-600">in Russia</span></h1>
          <p className="mt-3 text-sm opacity-70">
            The support of Turkish lira, Vietnamese dong, tenge, Argentine peso, and others is coming soon. Follow the updates.
          </p>
        </motion.div>
      </main>

      <footer className="w-full max-w-md px-6 pb-6">
        <Button size="l" style={{ width: '100%' }} onClick={handleStart}>Go to wallet</Button>
      </footer>
    </div>
    </AppRoot>
  )
}


