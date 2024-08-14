import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('power bi charts are accessible', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Assuming your PowerBI dashboard is embedded in an iframe
  // Step 2: Switch to the iframe context
  const frameLocator = page.frameLocator('iframe[class="powerbi-iframe"]') // Adjust the selector as needed

  // Step 3: Tab into the dashboard
  await page.keyboard.press('Tab')

  // Wait for the navigation module to potentially appear
  await page.waitForTimeout(1000) // Adjust based on the expected responsiveness of your dashboard

  // Step 4: Validate the dashboard navigation module visibility
  // This assumes you have a specific selector for the navigation module that becomes visible
  const isNavModuleVisible = await frameLocator
    .locator('selector-for-navigation-module')
    .isVisible()
  expect(isNavModuleVisible).toBeTruthy()

  // Step 5: Check for the title attribute in the iframe

  // Select all iframes
  const iframes = page.locator('iframe')

  // Count the number of iframes
  const iframeCount = await iframes.count()

  // Iterate through each iframe and check the title attribute
  for (let i = 0; i < iframeCount; i++) {
    const titleAttribute = await iframes.nth(i).getAttribute('title')

    // Assert that the title attribute is present and not empty for each iframe
    expect(
      titleAttribute,
      `iframe at index ${i} is missing a title attribute or it is empty`
    ).toBeTruthy()
  }

  // Step 6: Find the “Show data notes and sources” link
  // Adjust the selector as needed, assuming it's outside the iframe in the main page context
  const isLinkVisible = await page
    .locator('text="Show data notes and sources"')
    .isVisible()
  expect(isLinkVisible).toBeTruthy()
})
