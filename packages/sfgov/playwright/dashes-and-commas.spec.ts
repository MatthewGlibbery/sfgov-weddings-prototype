import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('dashes and parentheses are not present in the input placeholder tag', async ({
  page
}) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Get all input elements
  const inputElements = await page.$$('input')

  // Iterate through input elements
  for (const input of inputElements) {
    // Get the placeholder attribute value
    const placeholder = await input.getAttribute('placeholder')

    // Check if the placeholder contains dashes or parentheses
    if (placeholder && /[-()]/.test(placeholder)) {
      console.error(
        `Placeholder contains dashes or parentheses: ${placeholder}`
      )
    } else {
      console.log(`Placeholder is valid: ${placeholder}`)
    }
  }
})
