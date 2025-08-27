import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { verifyTelegramInitData } from './verifyInitData'
import { maybeLaunchBot } from './bot'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/auth/verify', (req, res) => {
  const initData = req.body?.initData as string | undefined
  if (!initData) {
    return res.status(400).json({ ok: false, error: 'Missing initData' })
  }
  try {
    const result = verifyTelegramInitData(initData)
    return res.json({ ok: true, user: result.user, authDate: result.authDate })
  } catch (e: any) {
    return res.status(401).json({ ok: false, error: e?.message ?? 'Invalid initData' })
  }
})

const PORT = Number(process.env.PORT || 4000)
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on :${PORT}`)
})

maybeLaunchBot().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to launch bot', err)
})


