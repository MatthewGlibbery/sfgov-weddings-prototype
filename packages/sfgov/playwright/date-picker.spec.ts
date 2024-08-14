import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('date picker is accessible', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Find the date picker button form control
  const datePickerButton = await page.$('button.date-picker')

  if (datePickerButton) {
    // Focus on the date picker button using the Tab key
    await datePickerButton.focus()
  } else {
    console.error('Date picker button not found.')
  }

  // Press Enter key to activate the date picker
  await page.keyboard.press('Enter')

  // Wait for the date picker to be visible or activated

  // Use tab key to navigate through months and years
  await page.keyboard.press('Tab')

  // Use arrow keys to navigate to a different month and date
  // You can customize the arrow key presses as needed to select a different date
  await page.keyboard.press('ArrowRight') // Navigate to a different date
  await page.keyboard.press('ArrowLeft') // Navigate to a different date
  await page.keyboard.press('ArrowDown') // Navigate to a different date
  await page.keyboard.press('ArrowUp') // Navigate to a different date

  // Press Enter key to select a date
  await page.keyboard.press('Enter')

  // Wait for the selection to be updated

  // Get the current month and date
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
  const currentDateOfMonth = currentDate.getDate()

  // Validate that a different month and date have been selected
  const selectedDate = await page.$eval(
    '.date-picker-selected-date',
    (el) => el.textContent
  )
  expect(selectedDate).not.toBe(`${currentMonth} ${currentDateOfMonth}`)
})
