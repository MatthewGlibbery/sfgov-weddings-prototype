import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('multiselect combobox', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Focus the multiselect combobox
  await page.focus('.your-combobox-selector')
  // Open the dropdown
  await page.keyboard.press('Enter') // or Space

  // Select items. Adjust the number of presses based on items' positions
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')

  // Assume you now want to delete one of the selected items
  // Move focus back to a selected item
  await page.keyboard.press('Shift+Tab')

  // Delete the item with focus
  await page.keyboard.press('Enter') // or Space, depending on how deletion is triggered

  // Validation - this depends on how your application reflects deletions
  // Here's a generic example checking if an item still exists in the selection
  const selectedItemExists = await page.isVisible(
    '.your-selected-item-selector'
  )
  expect(selectedItemExists).toBeFalsy() // Verify the item has been deleted
})
