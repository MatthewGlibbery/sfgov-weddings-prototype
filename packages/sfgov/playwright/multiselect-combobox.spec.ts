import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('multiselect combobox', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Access the combobox and the options within it
  const combobox = page.locator('.multiselect-combobox')
  const options = combobox.locator('.option') // Adjust '.option' based on your actual option selector

  // Assert the combobox is present and initially not expanded
  await expect(combobox).toBeVisible()
  await expect(combobox).toHaveAttribute('aria-expanded', 'false')

  // Use the tab key to access the multiselect form control and then expand it
  await page.keyboard.press('Tab')
  await page.keyboard.press('Space') // or 'Enter'

  // Assert the combobox has expanded
  await expect(combobox).toHaveAttribute('aria-expanded', 'true')

  // Navigate to an option and select it
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')

  // Assert the option is selected
  // This could be checking if the option now has a specific class, attribute, or is reflected in some selected-items area
  await expect(options.nth(0)).toHaveClass('selected') // Assuming selected items get a 'selected' class

  // Make another selection for validation later
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')

  // Assert multiple selections have been made, if your UI reflects this
  // For example, a counter or list that shows selected items could be checked
  // await expect(selectedItemsLocator).toHaveText('2 items selected');

  // Delete a selected item
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Space') // or 'Enter'

  // Assert the item has been deleted
  // This could be asserting the item no longer has a 'selected' class, or checking the text/content of the selected area
  await expect(options.nth(0)).not.toHaveClass('selected')

  // Further assertions to validate the state of the combobox after deletions
  // For instance, if you have a way to list or visualize selected items outside the dropdown, assert its updated state
  // await expect(selectedItemsLocator).toHaveText('1 item selected');

  // Additional assertions could involve checking for focus states, ensuring that the dropdown closes as expected after selections,
  // or verifying that specific keyboard interactions lead to the intended navigation or selection outcomes.
})
