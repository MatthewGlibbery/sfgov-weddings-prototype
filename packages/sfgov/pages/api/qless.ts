import { NextApiRequest, NextApiResponse } from 'next'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(
    'https://qless-microservice.herokuapp.com/api/v1/queues'
  )
  // error handling here
  const data = await response.json().catch(() => ({}))
  // any transformations here, e.g. filter by queue ID
  res.status(200).json(data)
}
