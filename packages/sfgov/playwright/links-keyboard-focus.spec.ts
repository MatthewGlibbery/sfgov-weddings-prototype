import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/experimental-ct-react'

test('links receive keyboard focus', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()

  // Identify all links on the page and get their absolute URLs
  const links = await page.$$eval(
    'a',
    (allLinks, baseURL) =>
      allLinks.map((link) => {
        const href = link.getAttribute('href')
        return href ? new URL(href, baseURL).toString() : ''
      }),
    page.url()
  )

  // Focus the first link to start the process
  await page.keyboard.press('Tab')

  for (let i = 0; i < links.length; i++) {
    const focusedHref = await page.evaluate(() => {
      const active = document.activeElement
      if (active && active.tagName === 'A') {
        const href = active.getAttribute('href')
        return href ? new URL(href, document.baseURI).href : ''
      }
      return ''
    })

    // Attempt the assertion
    try {
      await expect(focusedHref).toBe(links[i])
    } catch (error) {
      // If the assertion fails, throw a new error with the custom message
      throw new Error(
        `Focused link does not match at index ${i}. Expected: ${links[i]}, Got: ${focusedHref}`
      )
    }

    // Move focus to the next link
    await page.keyboard.press('Tab')
  }
})
