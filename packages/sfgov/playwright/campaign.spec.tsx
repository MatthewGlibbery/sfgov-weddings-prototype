// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { CampaignPage } from '../components/page/CampaignPage'
import { CampaignPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(CampaignPage, CampaignPageFactory)

// ============================================================
// Module Specific Tests
// ============================================================
test.describe('Campaign Page – Module Specific A11y Tests', () => {
  test('has logical reading order in Contact information module', async ({
    mount,
    page
  }) => {
    const data = CampaignPageFactory.make()
    await mount(<CampaignPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderContactInfo()
  })
})

// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Campaign Page – Content Type Specific A11y Tests', () => {
  test('logical reading order in the accordion module on the Campaign page', async ({
    mount,
    page
  }) => {
    const data = CampaignPageFactory.make()
    await mount(<CampaignPage page={data} />)

    await expect(
      page
    ).toHaveLogicalReadingOrderInAccordionOnCampaignContentType()
  })
})
