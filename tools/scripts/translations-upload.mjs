#!/usr/bin/env node
/**
 * This script will take the strings in locales/en/tranlsation.json and
 * upload them into wagtail for translation
 */
import { readFile } from 'fs/promises'
import chalk from 'chalk'

const FAILED_MESSAGE = 'Failed to upload'
const SUCCESS_MESSAGE = 'Uploaded'

main()

async function main() {
  const model = 'cms.InlineDisplay'
  const apiURL = requireNonEmptyEnv('NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL') + `/${model}`
  const apiToken = requireNonEmptyEnv('TRANSLATIONS_API_TOKEN')

  const filePath = 'locales/en/translation.json'
  const translationsJson = await readFile(filePath, 'utf8')
    .then(data => JSON.parse(data))

  const entries = Object.entries(translationsJson)
  let succeeded = 0
  let failed = 0

  console.log('Uploading %d translations to %s ...', entries.length, apiURL)
  for (const [key, val] of entries) {
    const description = `${JSON.stringify(key)} = ${JSON.stringify(val)}`
    const res = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify({
        slug: key,
        text: val,
        site_id: 'sfgov'
      }),
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${apiToken}`
      }
    })

    if (res.ok) {
      console.log('%s %s', chalk.greenBright(SUCCESS_MESSAGE), description)
      succeeded++
    } else {
      let error = await res.text()
      try {
        // reformat JSON error so they're easier to read
        const data = JSON.parse(error)
        error = JSON.stringify(data, null, 2)
      } catch {
      }
      console.log(
        '%s %s error (%d %s): %s',
        chalk.redBright(FAILED_MESSAGE),
        description,
        res.status, res.statusText,
        chalk.gray(error)
      )
      // break on certain statuses that indicate a token or permissions issue:
      switch (res.status) {
        case 401:
          console.error(
            '%s: the API token is invalid',
            chalk.bold.redBright(`${res.status} ${res.statusText}`)
          )
          process.exit(1)
          break
        case 403:
          console.error(
            '%s: API permissions are misconfigured (token user needs write permissions on "%s" model)',
            chalk.bold.redBright(`${res.status} ${res.statusText}`),
            model
          )
          process.exit(1)
          break
      }
      failed++
    }
    await sleep(200)
  }

  // print a summary of successes and failures
  console.log('')
  if (succeeded) {
    console.log('%s %d strings', chalk.bold.greenBright(SUCCESS_MESSAGE), succeeded)
  }
  if (failed) {
    console.log('%s %d strings', chalk.bold.redBright(FAILED_MESSAGE), failed)
  }
  process.exitCode = 0
}

function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

function requireNonEmptyEnv(name) {
  const val = process.env[name]
  if (!val) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return val
}