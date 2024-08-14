import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('Logical Reading Order on Meeting Content Type', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Check if the page contains a <p> element with the text "SERVICE"
  const serviceParagraphExists =
    (await page.locator('p').filter({ hasText: 'MEETING' }).count()) > 0

  if (serviceParagraphExists) {
    // If the paragraph exists, select all <details> elements
    const detailsElements = page.locator('details')

    // Check the count of <details> elements
    const detailsCount = await detailsElements.count()

    for (let i = 0; i < detailsCount; i++) {
      // For each <details> element, select all heading elements
      const headingElements = detailsElements
        .nth(i)
        .locator('h1, h2, h3, h4, h5, h6')

      // Check that all these heading elements are <h4>
      await headingElements
        .evaluateAll((headings) => {
          // Check if every heading is an <h4>
          return headings.every((heading) => heading.tagName === 'H3')
        })
        .then((result) => {
          // Assert that the condition holds true
          expect(result).toBeTruthy()
        })
    }
  }
})
