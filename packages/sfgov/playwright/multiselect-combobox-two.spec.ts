import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('multiselect combobox is accessible', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Access the combobox and the options within it
  const combobox = page.locator('.multiselect-combobox')
  const options = combobox.locator('.option') // Adjust based on your option selector

  // Assert the combobox is in the initial state (not expanded)
  await expect(combobox).toHaveAttribute('aria-expanded', 'false')

  // Interact with the combobox
  await page.keyboard.press('Tab')
  await page.keyboard.press('Space') // or 'Enter'

  // Assert the combobox has expanded
  await expect(combobox).toHaveAttribute('aria-expanded', 'true')

  // Make a selection
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')

  // Assert the first option is selected, assuming a class or attribute changes
  await expect(options.nth(0)).toHaveClass('selected')

  // Select another option
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')

  // Delete a selected option
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Space') // or 'Enter'

  // Assert the item has been deleted, by checking for the absence of a class
  await expect(options.nth(0)).not.toHaveClass('selected')

  // Further assertions based on your application's behavior
  // For example, checking the `aria-selected` attribute if your items use it when selected
  // await expect(options.nth(0)).toHaveAttribute('aria-selected', 'false');

  // Validate other changes that reflect the deletion or state change without relying on visibility
  // For instance, if your combobox displays selected items in a separate container, you could check the text or count
  // await expect(selectedItemsContainer).toHaveText('1 item selected');
})
