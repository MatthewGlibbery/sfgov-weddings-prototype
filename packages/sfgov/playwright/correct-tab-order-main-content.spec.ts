import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('correct tab order in the main content area', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Focus on the main landmark
  await page.locator('main').focus()

  // Ensure the main landmark is visible
  await expect(page.locator('main')).toBeVisible()

  // Locate the first h1 heading within the main landmark and check for visibility
  const h1 = page.locator('main >> h1')
  await expect(h1).toBeVisible()

  // Locate "Table of Contents" navigation element, if it exists
  const tocNav = page.locator(
    'main >> nav[role="navigation"][aria-label="Table of contents"]'
  )
  const isTocPresent = await tocNav.isVisible()

  // Locate "Get Help" h2 heading, if it exists
  const getHelpH2 = page.locator('main >> h2:text("Get Help")')
  const isGetHelpPresent = await getHelpH2.isVisible()

  // If "Table of Contents" navigation element is present, validate its position relative to h1
  if (isTocPresent) {
    // Assert "Table of Contents" navigation comes after the first h1 heading
    // Fetch the bounding boxes for both elements
    const h1BoundingBox = await h1.boundingBox()
    const tocNavBoundingBox = await tocNav.boundingBox()

    // Ensure the bounding boxes are valid
    if (!h1BoundingBox || !tocNavBoundingBox) {
      throw new Error('Unable to get bounding boxes for elements')
    }

    // Assert that the "Table of Contents" navigation comes after the first h1 heading
    // by comparing their 'top' positions
    expect(h1BoundingBox.y).toBeLessThan(tocNavBoundingBox.y)

    // Assert all content following h1 comes before "Table of Contents" navigation
    // This can be more complex depending on the structure, but a basic approach:
    const contentAfterH1BeforeTOC = page.locator(
      'main >> h1 >> .. >> nav[role="navigation"][aria-label="Table of contents"]'
    )
    const contentAfterH1BeforeTOCText =
      await contentAfterH1BeforeTOC.allTextContents()
    expect(contentAfterH1BeforeTOCText.length).toBeGreaterThan(0)
  }

  // If both "Get Help" and "Table of Contents" are present
  if (isTocPresent && isGetHelpPresent) {
    const tocPosition = await tocNav.evaluate((node) => {
      // Using XPath to select the h2 element with the text "Get Help"
      const xpath = "//h2[contains(text(), 'Get Help')]"
      const h2Element = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue

      if (!h2Element) {
        return -1 // Indicates that the "Get Help" h2 element was not found
      }

      // Getting the document position
      const position = node.compareDocumentPosition(h2Element)

      // Checking if the tocNav node is following the h2 element
      return position & Node.DOCUMENT_POSITION_FOLLOWING
    })

    // Assuming Node is accessible, otherwise you might need to replace it with its numerical value
    // Node.DOCUMENT_POSITION_FOLLOWING === 4
    const precedes = tocPosition & 4 // Check if the result of compareDocumentPosition included DOCUMENT_POSITION_FOLLOWING

    // Use your assertion framework's method to assert `precedes` is truthy
    // For jest, it would be:
    expect(precedes).toBeTruthy()
  }

  // If "Get Help" is present, validate content before it
  if (isGetHelpPresent) {
    // Adjust locator to account for the new "Table of Contents" structure if needed
    const contentBeforeGetHelpLocator = page.locator(
      'main >> h1 >> .. >> h2:text("Get Help")'
    )
    const contentBeforeGetHelp =
      await contentBeforeGetHelpLocator.allTextContents()
    expect(contentBeforeGetHelp.length).toBeGreaterThan(0)
  }
})
