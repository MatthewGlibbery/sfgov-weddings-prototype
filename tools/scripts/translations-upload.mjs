/**
 * This script will take the strings in locales/en/tranlsation.json and
 * upload them into wagtail for translation
 */
import { readFileSync } from 'fs'
import chalk from 'chalk'

const delay = 200

try {
  const translationsJson = JSON.parse(
    readFileSync(`locales/en/translation.json`).toString()
  )
  Object.keys(translationsJson).forEach((key, idx) => {
    console.log(`key: ${key}`)
    setTimeout(
      (key, val) => {
        // global.fetch requires node 18
        global
          .fetch(`${process.env.NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL}/cms.InlineDisplay`, {
            method: 'POST',
            body: JSON.stringify({
              slug: key,
              text: val,
              site_id: 'sfgov'
            }),
            headers: {
              'content-type': 'application/json',
              Authorization: `Token ${process.env.TRANSLATIONS_API_TOKEN}`
            }
          })
          .then((response) => response.text())
          .then((result) => console.log(`result for ${key}: ${result}`))
          .catch((e) => {
            console.error(chalk.bold.red(`Error in translation post: ${e}`))
            console.log(`key: ${key}`)
            console.log(`val: ${val}`)
          })
      },
      delay * idx,
      key,
      translationsJson[key]
    )
  })
} catch (e) {
  console.error(chalk.bold.red(`Error processing translation.json: ${e}`))
}
