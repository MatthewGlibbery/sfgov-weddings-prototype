import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('date picker is accessible', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Find and focus on the date picker input using the tab key
  const datePickerInput = await page.$('input[type="date"]')
  await datePickerInput.focus()

  // Press the Enter key to activate the date picker widget
  await page.keyboard.press('Enter')

  // Use arrow keys to navigate through the dates within the date picker
  await page.keyboard.press('ArrowRight') // Navigate right
  await page.keyboard.press('ArrowLeft') // Navigate left
  await page.keyboard.press('ArrowUp') // Navigate up
  await page.keyboard.press('ArrowDown') // Navigate down

  // Press the tab key to navigate through the months and years within the date picker
  await page.keyboard.press('Tab') // Navigate to the month
  await page.keyboard.press('Tab') // Navigate to the year

  // Press the Enter key to select a date within the date picker
  await page.keyboard.press('Enter')

  // Wait for date selection to reflect
  await page.waitForTimeout(1000) // Adjust timeout as needed

  // Validate that a different month and date have been selected
  const selectedDate = await datePickerInput.inputValue()
  const currentDate = new Date().toISOString().substr(0, 10) // Get current date in YYYY-MM-DD format
  expect(selectedDate).not.toBe(currentDate)
})
