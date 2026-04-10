import React from 'react'
import ServicesPage from '../pages/services'
import { test, expect } from './fixtures'
import { TopicPageFactory } from '../lib/factories'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
// Temporarily disabled for ServicesPage due to mounting mismatch
// runGlobalA11yTests(ServicesPageAdapter, TopicPageFactory)
// FIXME: CMS-1557

const props = {
  topics: TopicPageFactory.make(3)
}

test.describe('A11y tests', () => {
  test('ServicesPage renders without crashing', async ({ mount, page }) => {
    await mount(<ServicesPage {...props} />)

    await page.waitForLoadState('domcontentloaded')

    await expect(page.locator('body')).toBeVisible()
  })

  // Required Global Tests (currently skipped for this page)

  // Content Type Specific Tests
  test.skip('validate a logical reading order on the services list view', async ({
    mount,
    page
  }) => {
    await mount(<ServicesPage {...props} />)

    await expect(page).toHaveLogicalReadingOrderServicesListView()
  })
})
