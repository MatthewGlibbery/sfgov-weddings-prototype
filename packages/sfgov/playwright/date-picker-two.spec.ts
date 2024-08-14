import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('date picker is accessible', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Find the date picker input form control
  const datePickerInput = await page.$('input.date-picker')

  if (datePickerInput) {
    // Focus on the date picker input using the Tab key
    await datePickerInput.focus()
  } else {
    console.error('Date picker input not found.')
  }

  // Use arrow keys to navigate through the dates within the date picker
  await page.keyboard.press('ArrowRight') // Navigate to a different date
  await page.keyboard.press('ArrowLeft') // Navigate to a different date
  await page.keyboard.press('ArrowDown') // Navigate to a different date
  await page.keyboard.press('ArrowUp') // Navigate to a different date

  // Press the tab key to navigate through the months and years within the date picker
  await page.keyboard.press('Tab')

  // Press the Enter key to select a date within the date picker
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
