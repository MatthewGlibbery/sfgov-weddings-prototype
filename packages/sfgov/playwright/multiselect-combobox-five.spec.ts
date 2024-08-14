import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('landmarks are present', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()

  // Focus the multiselect combobox
  await page.focus('.your-combobox-selector')
  // Open the dropdown
  await page.keyboard.press('Enter') // or Space

  // Navigate and select items with Arrow keys and Enter
  for (let i = 0; i < 3; i++) {
    // Select 3 items
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
  }
  // Validate 3 items are selected
  const countSelectedItems = await page
    .locator('.your-selected-item-selector')
    .count()
  expect(countSelectedItems).toBe(3)

  // Assume you now want to delete one of the selected items
  // Move focus back to a selected item
  await page.keyboard.press('Shift+Tab')

  // Check if the active element matches the selector for the last selected item
  const isFocused = await page.evaluate((selector) => {
    const focusedElement = document.activeElement
    const targetElement = document.querySelector(selector)
    return focusedElement === targetElement
  }, '.your-specific-focused-item-selector')

  expect(isFocused).toBeTruthy() // Verify the element is focused

  // Delete the focused selected item with Space or Enter
  await page.keyboard.press('Enter') // or Space

  // Validate that one of the selected items was deleted
  const newCountSelectedItems = await page
    .locator('.your-selected-item-selector')
    .count()
  expect(newCountSelectedItems).toBe(2) // 1 less than previously selected
})
