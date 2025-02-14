/* eslint-disable no-process-env */
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  CloudWatchClient,
  PutMetricDataCommand
} from '@aws-sdk/client-cloudwatch'
import { parseMetricData } from '@/lib/metrics'

// TODO: remove this once we set AWS_REGION in the ansible playbooks
const { AWS_REGION = 'us-west-1' } = process.env

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // sendBeacon() sends a POST
  if (req.method === 'POST') {
    const input = parseMetricData(req.body)

    // just log the metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log('PutMetricData:', input)
      res.status(200)
      return
    }

    const client = new CloudWatchClient({
      region: AWS_REGION
    })
    if (input) {
      const command = new PutMetricDataCommand(input)
      try {
        await client.send(command)
        res.status(200)
      } catch (error) {
        console.error('PutMetricData failed:', error)
        res.status(500)
      }
      return
    }
  }
  res.status(400)
}
