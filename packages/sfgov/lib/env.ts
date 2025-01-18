/* eslint-disable no-process-env */

export function getenv(name: string) {
  return process.env[name]
}

/**
 * Get a key of process.env and throw an error if the value is undefined.
 */
export function requireEnv(name: string) {
  const value = process.env[name]
  if (value === undefined) {
    throw new Error(`Required env var ${name} is not set`)
  }
  return value
}

export function getPublicEnv() {
  return Object.fromEntries(
    Object.entries(process.env).filter(([key]) =>
      key.startsWith('NEXT_PUBLIC_')
    )
  )
}
