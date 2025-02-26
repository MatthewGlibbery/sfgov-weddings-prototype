import type { PutMetricDataInput } from '@aws-sdk/client-cloudwatch'

/**
 * Send metric data via navigator.sendBeacon
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
 */
export function putMetricData(metrics: PutMetricDataInput) {
  try {
    return navigator.sendBeacon('/api/metrics', JSON.stringify(metrics))
  } catch (error) {
    return false
  }
}

/**
 * Parse a request body as JSON and cast it as PutMetricDataInput if it parses
 * into an object.
 */
export function parseMetricData(body: unknown): PutMetricDataInput | undefined {
  if (typeof body !== 'string') {
    console.error('parseMetricData() got non-string body:', typeof body)
    return undefined
  }
  try {
    const data = JSON.parse(body)
    if (data && typeof data === 'object') {
      return data as PutMetricDataInput
    }
  } catch (error) {
    console.error('parseMetricData() failed to parse metric data:', body)
  }
}
