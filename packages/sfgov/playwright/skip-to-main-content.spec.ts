import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('landmarks are present', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  try {
    // Wait for the skip link to be present on the page
    await page.waitForSelector('a[href="#main-content"]')
    console.log('Skip to main content link is present.')

    // Click the skip link
    await page.click('a[href="#main-content"]')

    // Check if the element with role="main" is now focused
    const isMainFocused = await page.evaluate(() => {
      const main = document.querySelector('[role="main"]')
      return document.activeElement === main
    })

    if (isMainFocused) {
      console.log('Focus has moved to the main content.')
    } else {
      console.error('Focus did not move to the main content.')
    }
  } catch (error) {
    console.error('Error testing skip to main content link:', error)
  }
})
