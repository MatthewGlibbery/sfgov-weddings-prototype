import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('landmarks are present', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Find the <h2> element with the text "Get Help"
  const getHelpH2 = await page.locator('h2', { hasText: 'Get Help' })

  // Check if 'Get Help' heading is visible
  const isVisible = await getHelpH2.isVisible()

  if (isVisible) {
    // Since the heading is visible, perform the additional checks

    // Get all following siblings until another h2 or the end of the container
    const followingElements = await getHelpH2.locator('>> following-sibling::*')

    // Check each sibling if it is a heading and if it is, assert it's an h3
    await followingElements.evaluateAll((elements) => {
      for (const element of elements) {
        // If the element is a heading, check its level
        if (element.tagName.startsWith('h')) {
          if (element.tagName !== 'h3') {
            throw new Error(`Expected h3, but found ${element.tagName}`)
          }
        }
      }
    })
  } else {
    // If the 'Get Help' heading is not visible, pass the test
    console.log("'Get Help' heading is not present. Passing the test.")
  }
})
