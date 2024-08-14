import { test, expect } from '@playwright/experimental-ct-react'

test('step by step logical reading order', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Step 2: Check for the specific paragraph
  const stepByStepParagraph = await page.$(
    'p.font-body.text-heading-md.lg\\:text-desktop-heading-md.text-accent500 >> text="STEP-BY-STEP"'
  )

  if (stepByStepParagraph) {
    // Locate the first h1
    const h1Element = await page.$('h1')
    if (h1Element) {
      // Find all headings on the page
      const headingsCountAfterH1 = await page.evaluate(() => {
        const allHeadings = Array.from(
          document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        )
        let h1Index = allHeadings.findIndex(
          (element) => element === document.querySelector('h1')
        )
        return allHeadings.slice(h1Index + 1).length // Count of all headings after the first h1
      })

      // Count of h2 elements after the first h1
      const h2CountAfterH1 = await page.evaluate(() => {
        const allHeadings = Array.from(document.querySelectorAll('h2'))
        let h1Index = Array.from(
          document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        ).findIndex((element) => element === document.querySelector('h1'))
        return allHeadings.slice(0, h1Index).length // Assuming h2 elements are correctly ordered in the DOM
      })

      // Assert that the number of headings after h1 matches the number of h2 elements found
      expect(headingsCountAfterH1).toEqual(h2CountAfterH1)
    } else {
      console.log('No <h1> heading found on the page.')
    }
  }
})
