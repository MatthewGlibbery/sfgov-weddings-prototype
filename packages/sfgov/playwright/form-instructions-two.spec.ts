import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('specific form instructions are explicitly associated with their form control', async ({
  page
}) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Define an array of objects mapping form control selectors to their describedby ID
  // Update this part to match your specific IDs
  const controlsToTest = [
    { selector: '#phoneNumber', describedById: 'phoneinstructions' },
    { selector: '#input1', describedById: 'input1-instructions' },
    { selector: '#checkbox1', describedById: 'checkbox1-instructions' }
    // You can add more controls as needed
  ]

  for (const control of controlsToTest) {
    // Fetch the aria-describedby attribute from the form control
    const describedByAttr = await page.getAttribute(
      control.selector,
      'aria-describedby'
    )

    // Assert that aria-describedby points to the correct ID
    expect(describedByAttr).toBe(control.describedById)

    // Validate that the element described by the ID actually exists in the DOM
    const descriptionExists = await page.isVisible(`#${control.describedById}`)
    expect(descriptionExists).toBeTruthy()
  }
})
