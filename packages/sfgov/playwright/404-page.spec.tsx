import React from 'react'
import { test, expect } from './fixtures'
import Custom404 from '../pages/404'

test.describe('404 Page – Accessibility Tests', () => {
  test('validate correct heading on 404 page', async ({ mount, page }) => {
    await mount(<Custom404 />)

    await page.waitForLoadState('domcontentloaded')

    // Find all headings in the main page or CT iframe
    let ctx: any = page
    let headings = page.locator('h1, h2, h3, h4, h5, h6')

    if ((await headings.count()) === 0) {
      for (const f of page.frames()) {
        const candidate = f.locator('h1, h2, h3, h4, h5, h6')
        if ((await candidate.count()) > 0) {
          ctx = f
          headings = candidate
          break
        }
      }
    }

    // Validate that only one heading exists
    await expect(headings).toHaveCount(1)

    // Validate that the heading is an h1
    const h1 = ctx.locator('h1')
    await expect(h1).toHaveCount(1)
    await expect(h1).toBeVisible()
  })
})
