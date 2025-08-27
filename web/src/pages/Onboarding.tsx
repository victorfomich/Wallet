import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AppRoot, Button } from '@telegram-apps/telegram-ui'
import WebApp from '@twa-dev/sdk'
import { useNavigate } from 'react-router-dom'

// Компонент экрана приветствия
export default function Onboarding() {
    const navigate = useNavigate()

    // useEffect для инициализации Telegram Web App SDK
    useEffect(() => {
        WebApp.ready()
    }, [])

    // Обработчик для перехода в кошелек
    const handleGoToWallet = () => {
        navigate('/app')
    }

    return (
        <AppRoot>
            <motion.div
                className="flex flex-col h-screen bg-slate-50 font-sans"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Верхняя часть с изображением */}
                <div className="bg-blue-500/10 relative flex-grow">
                    {/* Навигация в шапке */}
                    <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
                        <div className="flex items-center gap-1 cursor-pointer">
                            <span className="text-sm font-medium text-gray-700">En</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-1.5 bg-gray-800 rounded-full"></div>
                            <div className="w-2 h-1.5 bg-gray-300 rounded-full"></div>
                            <div className="w-2 h-1.5 bg-gray-300 rounded-full"></div>
                        </div>
                        <a href="#" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            Skip
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="m9 18 6-6-6-6"/></svg>
                        </a>
                    </header>

                    {/* Переключатель стран */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1 flex items-center gap-4 shadow-md">
                        <div className="flex items-center gap-2 px-3 py-1">
                            <img src="https://placehold.co/24x24/FFFFFF/000000?text=🇦🇷" alt="Argentina Flag" className="w-6 h-6 rounded-full object-cover" />
                            <span className="font-semibold text-gray-800">Argentina</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1">
                            <img src="https://placehold.co/24x24/FFFFFF/000000?text=🇹🇭" alt="Thailand Flag" className="w-6 h-6 rounded-full object-cover" />
                            <span className="font-semibold text-gray-800">Thailand</span>
                        </div>
                    </div>

                    {/* Основное изображение */}
                    <div className="flex items-center justify-center h-full pt-20">
                        <img src="https://placehold.co/300x250/E0F2FE/3B82F6?text=Image" alt="Penguin with a flag and phone" className="mx-auto" onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src='https://placehold.co/300x250/E0F2FE/3B82F6?text=Image+Not+Found';
                        }} />
                    </div>
                </div>

                {/* Секция с контентом */}
                <div className="bg-white p-6 pb-8 rounded-t-3xl relative z-10 shadow-2xl">
                    <h1 className="text-3xl font-bold text-center text-gray-900 leading-tight">
                        Оплата по QR-кодам
                        только в <span className="text-blue-600">России</span>
                    </h1>
                    <p className="text-center text-gray-500 mt-4 text-base">
                        Поддержка турецкой лиры, вьетнамского донга, тенге, аргентинского песо и других валют скоро появится. Следите за обновлениями.
                    </p>
                    <Button size="l" className="mt-8 w-full" onClick={handleGoToWallet}>
                        Перейти в кошелек
                    </Button>
                </div>
            </motion.div>
        </AppRoot>
    )
}
