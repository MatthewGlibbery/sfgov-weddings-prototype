// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { HomePage } from '../components/page/HomePage'
import { HomePageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(HomePage, HomePageFactory)

// ============================================================
// Module Specific Tests
// ============================================================
test.describe('Home Page – Module Specific A11y Tests', () => {
  test.skip('validate correct link target in Profile module', async ({
    mount,
    page
  }) => {
    const data = HomePageFactory.make()
    await mount(<HomePage page={data} />)

    await expect(page).toHaveCorrectLinkTargetInProfileModule()
  })
})
// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Home Page – Content Type Specific A11y Tests', () => {
  test('logical reading order on the homepage', async ({ mount, page }) => {
    const data = HomePageFactory.make()
    await mount(<HomePage page={data} />)

    await expect(page).toHaveLogicalReadingOrderonHomePage()
  })

  test('article landmarks are present in the news section on the Homepage', async ({
    mount,
    page
  }) => {
    const data = HomePageFactory.make()
    await mount(<HomePage page={data} />)

    await expect(page).toHaveArticleLandmarkInNewsSectionOnHomepage()
  })
})
