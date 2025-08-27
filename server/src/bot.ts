import 'dotenv/config'
import { Bot, InlineKeyboard } from 'grammy'

export async function maybeLaunchBot(): Promise<void> {
  const botToken = process.env.BOT_TOKEN
  if (!botToken) {
    // eslint-disable-next-line no-console
    console.warn('BOT_TOKEN not set. Bot will not start.')
    return
  }
  const bot = new Bot(botToken)
  bot.command('start', async (ctx) => {
    const webAppUrl = process.env.WEB_APP_URL || 'http://localhost:5173'
    const keyboard = new InlineKeyboard().webApp('Open App', webAppUrl)
    await ctx.reply('Welcome to Dream Wallet!', {
      reply_markup: keyboard,
    })
  })
  await bot.start()
}


