// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { ResourceCollectionPage } from '../components/page/ResourceCollectionPage'
import { ResourceCollectionPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(ResourceCollectionPage, ResourceCollectionPageFactory)

// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Resource Collection Page – Content Type Specific A11y Tests', () => {
  test('logical reading order in the Documents section on the Resource Collection page', async ({
    mount,
    page
  }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(
      page
    ).toHaveLogicalReadingOrderInDocumentsSectionOnResourceCollectionContentType()
  })

  test('logical reading order in the Resources section on the Resource Collection page', async ({
    mount,
    page
  }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(
      page
    ).toHaveLogicalReadingOrderInResourcesSectionOnResourceCollectionContentType()
  })
})
// ============================================================
// Module Specific Tests
// ============================================================
test.describe('Resource Collection Page – Module Specific A11y Tests', () => {
  test('Power BI Dashboard is accessible', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toMakePowerBiDashboardAccessible()
  })
})
