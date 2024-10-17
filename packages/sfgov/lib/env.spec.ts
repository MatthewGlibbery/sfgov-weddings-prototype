import mockedEnv from 'mocked-env'
import { requireEnv, getenv } from './env'

let restoreEnv: ReturnType<typeof mockedEnv>

describe('getenv()', () => {
  afterEach(() => restoreEnv?.())

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
