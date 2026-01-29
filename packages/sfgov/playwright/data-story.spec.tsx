// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { DataStoryPage } from '../components/page/DataStoryPage'
import { DataStoryPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(DataStoryPage, DataStoryPageFactory)

// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Data Story Page – Content Type Specific A11y Tests', () => {
  test('suppress the In-Page Search Function for screen reader users on the Data Story content type', async ({
    mount,
    page
  }) => {
    const data = DataStoryPageFactory.make()
    await mount(<DataStoryPage page={data} />)

    await expect(page).toSuppressInPageSearchModuleOnDataStoryContentType()
  })
})
// ============================================================
// Module Specific Tests
// ============================================================
test.describe('Data Story Page – Module Specific A11y Tests', () => {
  test('Power BI Dashboard is accessible', async ({ mount, page }) => {
    const data = DataStoryPageFactory.make()
    await mount(<DataStoryPage page={data} />)

    await expect(page).toMakePowerBiDashboardAccessible()
  })

  test('Table of contents has nav landmark attributes', async ({
    mount,
    page
  }) => {
    const data = DataStoryPageFactory.make()
    await mount(<DataStoryPage page={data} />)

    await expect(page).toHaveNavLandmarkAttributesInTOC()
  })
})
