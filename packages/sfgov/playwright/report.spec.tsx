// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { ReportPage } from '../components/page/ReportPage'
import { ReportPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(ReportPage, ReportPageFactory)

// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Report Page – Content Type Specific A11y Tests', () => {
  test('suppress the In-Page Search Function for screen reader users on the Report content type', async ({
    mount,
    page
  }) => {
    const data = ReportPageFactory.make()
    await mount(<ReportPage page={data} />)

    await expect(page).toSuppressInPageSearchModuleOnReportContentType()
  })

  test('Table of contents has nav landmark attributes', async ({
    mount,
    page
  }) => {
    const data = ReportPageFactory.make()
    await mount(<ReportPage page={data} />)

    await expect(page).toHaveNavLandmarkAttributesInTOC()
  })
})
