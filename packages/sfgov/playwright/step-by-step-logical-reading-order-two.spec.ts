import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('landmarks are present', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Check for the specific paragraph
  const specificParagraph = await page.$('p:text("STEP-BY-STEP")')

  if (specificParagraph) {
    // Find the first h1 heading and get its text content
    const h1TextContent = await page.$eval('h1', (el) => el.textContent)

    // Collect all headings after the h1
    const headingsAfterH1 = await page.evaluate((h1Text) => {
      const allHeadings = Array.from(
        document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      )
      const h1Element = allHeadings.find((h) => h.textContent === h1Text)
      const h1Index = h1Element ? allHeadings.indexOf(h1Element) : -1
      return allHeadings.slice(h1Index + 1).map((heading) => heading.tagName)
    }, h1TextContent)

    // Assert all headings after the h1 are h2s
    headingsAfterH1.forEach((tagName) => {
      expect(tagName).toBe('H2')
    })
  } else {
    console.log(
      'The specific paragraph "STEP-BY-STEP" does not exist on the page.'
    )
  }
})
