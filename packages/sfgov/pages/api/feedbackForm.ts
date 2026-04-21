import { requireEnv } from '@/lib/env'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.setHeader('Cache-Control', 'no-store')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
  const rawAnswer = req.body?.answer
  const rawReferrer = req.body?.referrer
  const answer =
    typeof rawAnswer === 'string'
      ? rawAnswer.trim()
      : typeof rawAnswer === 'number' || typeof rawAnswer === 'boolean'
      ? String(rawAnswer)
      : ''
  const referrer =
    typeof rawReferrer === 'string'
      ? rawReferrer.trim()
      : typeof rawReferrer === 'number' || typeof rawReferrer === 'boolean'
      ? String(rawReferrer)
      : ''
  if (!answer || !referrer) {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(400).json({
      error: 'Invalid request body: answer and referrer are required strings'
    })
  }
  const baseId = requireEnv('AIRTABLE_BASE_ID')
  const tableId = requireEnv('AIRTABLE_TABLE_ID')
  const auth = `Bearer ${requireEnv('AIRTABLE_API_TOKEN')}`
  let response
  try {
    response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          submission_id: crypto.randomUUID(),
          submission_created: new Date().toLocaleString('en-US'),
          referrer,
          wasTheLastPageYouViewedHelpful: answer
        }
      })
    })
  } catch {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(502).json({
      error: 'Failed to submit feedback to Airtable'
    })
  }
  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const data = isJson
    ? await response.json().catch(() => ({}))
    : await response.text().catch(() => '')
  res.setHeader('Cache-Control', 'no-store')
  if (!response.ok) {
    return res.status(response.status).json(
      isJson
        ? data
        : {
            error: data || 'Airtable request failed'
          }
    )
  }
  return res.status(200).json(data)
}
