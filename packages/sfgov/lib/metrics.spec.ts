import { putEvents } from './metrics'
import mockConsole from 'jest-mock-console'

describe('putEvents()', () => {
  let oldDataLayer: Array<object> | undefined
  let restoreConsole: ReturnType<typeof mockConsole>
  beforeEach(() => {
    restoreConsole = mockConsole()
    oldDataLayer = window.dataLayer
    window.dataLayer = []
  })

  afterEach(() => {
    restoreConsole?.()
    window.dataLayer = oldDataLayer
  })

  it('sets the timestamp of the events if unset', () => {
    putEvents({
      type: 'foo'
    })

    expect(window.dataLayer).toEqual([
      {
        event: 'foo',
        timestamp: expect.any(Number)
      }
    ])
  })

  it('returns false when window.dataLayer throws', () => {
    const throwOnPush = jest.fn(() => {
      throw new Error('derp')
    })
    jest.spyOn(window.dataLayer!, 'push').mockImplementationOnce(throwOnPush)
    expect(
      putEvents({
        type: 'error'
      })
    ).toEqual(false)
    expect(throwOnPush).toHaveBeenCalled()
    expect(console.warn).toHaveBeenCalledWith(
      'unable to put events:',
      expect.any(Error)
    )
  })
})
