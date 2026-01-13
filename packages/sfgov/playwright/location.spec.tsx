// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { LocationPage } from '../components/page/LocationPage'
import { LocationPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(LocationPage, LocationPageFactory)

// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Location Page – Content Type Specific A11y Tests', () => {
  test('create a logical reading order in the accordion on the Location content type', async ({
    mount,
    page
  }) => {
    const data = LocationPageFactory.make()
    await mount(<LocationPage page={data} />)

    await expect(
      page
    ).toHaveALogicalReadingOrderInAccordionOnLocationContentType()
  })

  test('create a logical reading order in the Getting Here section on the Location content type', async ({
    mount,
    page
  }) => {
    const data = LocationPageFactory.make()
    await mount(<LocationPage page={data} />)

    await expect(
      page
    ).toHaveALogicalReadingOrderInGettingHereSectionOnLocationContentType()
  })
})
// ============================================================
// Module Specific Tests
// ============================================================
test.describe('Location Page – Module Specific A11y Tests', () => {
  test('logical reading order in the contact us section', async ({
    mount,
    page
  }) => {
    const data = LocationPageFactory.make()
    await mount(<LocationPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderContactUs()
  })
})
