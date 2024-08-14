import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('form instructions are explicitly associated with their form control', async ({
  page
}) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
  // Select all form controls that should have an aria-describedby attribute
  const formControls = await page.$$('[aria-describedby]')

  for (const control of formControls) {
    // Get the value of the aria-describedby attribute
    const describedById = await control.getAttribute('aria-describedby')

    // Ensure the aria-describedby attribute is not empty
    expect(describedById, 'aria-describedby is empty').toBeTruthy()

    // Query for the element described by the ID
    const descriptionElement = await page.$(`#${describedById}`)

    // Ensure the element referenced by aria-describedby exists
    expect(
      descriptionElement,
      `Element described by #${describedById} not found`
    ).toBeTruthy()
  }
})
