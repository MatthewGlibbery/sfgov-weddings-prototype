// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { InformationPage } from '../components/page/InformationPage'
import { InfoPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(InformationPage, InfoPageFactory)

// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Information Page – Content Type Specific A11y Tests', () => {
  test('logical reading order within the main landmark on the info page', async ({
    mount,
    page
  }) => {
    const data = InfoPageFactory.make()
    await mount(<InformationPage page={data} />)
    await expect(page).toHaveLogicalReadingOrderOnInformationContentType()
  })
})
