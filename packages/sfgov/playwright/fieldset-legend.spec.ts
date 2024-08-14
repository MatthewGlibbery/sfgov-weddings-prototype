import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('fieldset and legend', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Select the fieldset that should contain the billing address form
  const fieldset = await page.$('fieldset#billing-address')
  expect(fieldset).not.toBeNull()

  // Ensure the fieldset has a legend that describes the group
  const legend = await page.$('fieldset#billing-address > legend')
  expect(legend).not.toBeNull()

  // Check the text content of the legend
  if (legend) {
    const legendText: string | null = await legend.textContent()
    expect(legendText?.trim()).toBe('Billing Address')
  } else {
    // If legend is not found, fail the test explicitly
    throw new Error('Legend element not found')
  }
})
