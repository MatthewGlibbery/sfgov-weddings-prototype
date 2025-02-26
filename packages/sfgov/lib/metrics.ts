/**
 * Metric event objects represent a thing that happened at the time they were
 * sent.
 */
export type MetricEvent = {
  type: string
  timestamp?: number
  dimensions?: Record<string, string>
}

/**
 * Send metric events to GA
 */
export function putEvents(...events: MetricEvent[] | MetricEvent[][]) {
  try {
    const now = Date.now()
    events = events.flat(1)
    for (const event of events) {
      // set the timestamp if it's not set
      event.timestamp = event.timestamp || now
    }
    window.dataLayer?.push(
      ...events.map(({ type, timestamp, dimensions }) => ({
        event: type,
        timestamp,
        ...dimensions
      }))
    )
    return true
  } catch (error) {
    console.warn('unable to put events:', error)
    return false
  }
}
