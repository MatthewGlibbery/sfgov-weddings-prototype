import { NextApiRequest, NextApiResponse } from 'next'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(
    'https://qless-microservice.herokuapp.com/api/v1/queues'
  )
  // error handling here
  const data = await response.json().catch(() => ({}))
  res.setHeader('cache-control', 'public, max-age=60')
  res.status(200).json(data)
}
