/* eslint-disable no-process-env */

export function getenv(name: string) {
  return process.env[name]
}

export function requireEnv(name: string) {
  const value = process.env[name]
  if (value === undefined) {
    throw new Error(`Required env var ${name} is not set`)
  }
  return value
}
