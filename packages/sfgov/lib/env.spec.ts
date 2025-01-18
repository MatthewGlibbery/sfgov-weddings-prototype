import mockedEnv from 'mocked-env'
import { requireEnv, getenv, getPublicEnv } from './env'

let restoreEnv: ReturnType<typeof mockedEnv>

describe('@/lib/env', () => {
  afterEach(() => restoreEnv?.())

  describe('getenv()', () => {
    it('gets the env var', () => {
      restoreEnv = mockedEnv({ FOO: 'bar' })
      expect(getenv('FOO')).toEqual('bar')
      expect(getenv('BAR')).toEqual(undefined)
    })
  })

  describe('requireEnv()', () => {
    it('throws if the env var is not set', () => {
      restoreEnv = mockedEnv({ FOO: 'bar' })
      expect(() => requireEnv('BAR')).toThrow(/BAR is not set/)
      expect(() => requireEnv('FOO')).not.toThrow()
      expect(requireEnv('FOO')).toEqual('bar')
    })
  })

  describe('getPublicEnv()', () => {
    it('only gets process.env values with NEXT_PUBLIC_ key prefixes', () => {
      restoreEnv = mockedEnv(
        {
          SECRET: 'supersecret',
          NEXT_PUBLIC_NOT_SO_SECRET: 'notsosecret'
        },
        { clear: true }
      )
      expect(getPublicEnv()).toEqual({
        NEXT_PUBLIC_NOT_SO_SECRET: 'notsosecret'
      })
    })
  })
})
