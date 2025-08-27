import crypto from 'crypto'

type Verified = {
  user: any
  authDate: number
}

export function verifyTelegramInitData(initData: string): Verified {
  const urlParams = new URLSearchParams(initData)
  const data: Record<string, string> = {}
  for (const [key, value] of urlParams.entries()) {
    data[key] = value
  }

  const hash = data.hash
  if (!hash) throw new Error('Missing hash')

  const botToken = process.env.BOT_TOKEN
  if (!botToken) throw new Error('BOT_TOKEN is not set')

  const authData = Object.keys(data)
    .filter((k) => k !== 'hash')
    .sort()
    .map((k) => `${k}=${data[k]}`)
    .join('\n')

  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest()

  const computedHash = crypto
    .createHmac('sha256', secretKey)
    .update(authData)
    .digest('hex')

  if (computedHash !== hash) throw new Error('Invalid hash')

  const user = data.user ? JSON.parse(data.user) : undefined
  const authDate = data.auth_date ? Number(data.auth_date) : undefined
  return { user, authDate: authDate ?? 0 }
}


