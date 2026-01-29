import { ContentAPI } from '@/lib/api'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const api = new ContentAPI()
  const data = await api.getAlerts().catch(() => ({}))

  res.setHeader('cache-control', 'public, max-age=60')
  res.status(200).json(data)
}
