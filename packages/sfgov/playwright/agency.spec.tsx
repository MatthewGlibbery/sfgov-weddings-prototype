// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { AgencyPage } from '../components/page/AgencyPage'
import { AgencyPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(AgencyPage, AgencyPageFactory)

// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Agency Page – Content Type Specific A11y Tests', () => {
  test('create a logical reading order in the Services section on the Agency content type', async ({
    mount,
    page
  }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(
      page
    ).toCreateLogicalReadingOrderInServicesSectionOnAgencyContentType()
  })

  test('create a logical reading order in the Resources section on the Agency content type', async ({
    mount,
    page
  }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(
      page
    ).toCreateLogicalReadingOrderInResourcesSectionOnAgencyContentType()
  })

  test('create a logical reading order in the About section on the Agency content type', async ({
    mount,
    page
  }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(
      page
    ).toCreateLogicalReadingOrderInAboutSectionOnAgencyContentType()
  })
})

// ============================================================
// Module Specific Tests
// ============================================================
test.describe('Agency Page – Module Specific A11y Tests', () => {
  test('logical reading order in contact information section', async ({
    mount,
    page
  }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderContactInfo()
  })

  test('logical reading order in spotlight module', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderInSpotlightModule()
  })
})
