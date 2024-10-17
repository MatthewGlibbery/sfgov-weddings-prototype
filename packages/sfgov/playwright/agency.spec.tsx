import { AgencyPage } from '@/components'
import { AgencyPageFactory } from '@/lib/factories'
import React from 'react'
import { test, expect } from './fixtures'

test.describe('A11y tests', () => {
  test.skip('headings are rendered in a logical reading order', async ({
    mount,
    page
  }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLogicalReadingOrder()
  })

  test.skip('has link to main content', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page.locator('a[href="#main-content"]')).toContainText(
      'Skip to main content'
    )
  })

  test('has accessible landmark roles', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLandmarks()
  })

  test('is keyboard accessible', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toBeKeyboardAccessible()
  })

  test('has no accessibility violations', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toPassA11yScan()
  })
})
