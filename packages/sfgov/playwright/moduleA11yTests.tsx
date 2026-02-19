// packages/sfgov/playwright/moduleA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'

/**
 * --------------------------------------------------------------------
 * MODULE-SPECIFIC ACCESSIBILITY TESTS
 * --------------------------------------------------------------------
 *
 * These tests are intended for content types that include
 * specific reusable modules/components.
 *
 * --------------------------------------------------------------------
 */

export function runModuleA11yTests<PageData>(
  Component: React.ComponentType<{ page: PageData }>,
  factory: { make: () => PageData }
) {
  test.describe('Module Accessibility Tests', () => {
    // ----------------------------------------------------------------
    // Profile Group module (tiles)
    // ----------------------------------------------------------------
    test('validate profile-group tiles use a single accessible link with image and text', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await page.waitForLoadState('domcontentloaded')

      // ------------------------------------------------------------
      // Find the main page OR CT iframe frame that contains
      // profile group module(s)
      // ------------------------------------------------------------
      const groupSelector = '[data-gtm-id="profile-group"]'
      let groups = page.locator(groupSelector)

      if ((await groups.count()) === 0) {
        for (const f of page.frames()) {
          const candidate = f.locator(groupSelector)
          if ((await candidate.count()) > 0) {
            groups = candidate
            break
          }
        }
      }

      // ------------------------------------------------------------
      // Self-skip if module isn't present on this content type
      // ------------------------------------------------------------
      const groupCount = await groups.count()
      if (groupCount === 0) {
        test.skip(true, 'Profile group module not present on this content type')
      }

      // 1) Locate profile group module(s)
      expect(groupCount, 'No profile-group modules found').toBeGreaterThan(0)

      for (let g = 0; g < groupCount; g++) {
        const group = groups.nth(g)

        // 2) Each tile is an <a> with aria-label starting with "profile page of"
        const tiles = group.locator('a[aria-label^="profile page of"]')
        const tileCount = await tiles.count()
        expect(
          tileCount,
          `No profile tiles found in profile-group #${g}`
        ).toBeGreaterThan(0)

        for (let i = 0; i < tileCount; i++) {
          const tileLink = tiles.nth(i)

          // The tileLink itself is one anchor and it's not empty or broken
          await expect(tileLink).toHaveAttribute('href', /.+/)

          // Ensure there isn't a second link nested inside this link
          await expect(tileLink.locator('a')).toHaveCount(0)

          // The one link wraps the photo
          await expect(tileLink.locator('img')).toHaveCount(1)

          // The one link also wraps the "text block" (name/role/etc.) – ensure it has non-empty text content
          // Avoids hardcoding names and still ensures there is text inside the same <a>.
          const text = (await tileLink.innerText()).replace(/\s+/g, ' ').trim()
          expect(
            text,
            `Profile tile link has no readable text in group #${g}, tile #${i}`
          ).not.toBe('')
        }
      }
    })
  })
}
