import { parseMetricData, putMetricData } from './metrics'

describe('parseMetricData()', () => {
  it('parses a JSON object', () => {
    expect(parseMetricData('{"foo":"bar"}')).toEqual({ foo: 'bar' })
  })

  it.each([undefined, 'wut', {}])(
    'returns undefined if it fails to parse %s',
    (value) => {
      expect(parseMetricData(value)).toEqual(undefined)
    }
  )
})

describe('putMetricData()', () => {
  const sendBeacon = jest.fn()
  let actualSendBeacon: Navigator['sendBeacon']
  beforeEach(() => {
    actualSendBeacon = navigator.sendBeacon
    navigator.sendBeacon = sendBeacon
  })

  afterEach(() => {
    navigator.sendBeacon = actualSendBeacon
  })

  it('calls sendBeacon() with stringified metric data', () => {
    putMetricData({
      Namespace: 'foo',
      MetricData: []
    })
    expect(sendBeacon).toHaveBeenCalledWith(
      '/api/metrics',
      '{"Namespace":"foo","MetricData":[]}'
    )
  })

  it('catches serialization errors', () => {
    const jsonStringify = jest.spyOn(JSON, 'stringify')
    jsonStringify.mockImplementationOnce(() => {
      throw new Error('Circular reference')
    })
    expect(() =>
      putMetricData({
        Namespace: 'test'
      })
    ).not.toThrow()
    jsonStringify.mockRestore()
  })
})
