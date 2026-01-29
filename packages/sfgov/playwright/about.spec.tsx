// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { AboutPage } from '../components/page/AboutPage'
import { AboutPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(AboutPage, AboutPageFactory)

// ============================================================
// Content Type Specific Tests
// ============================================================

test.describe('About Page – Content Type Specific A11y Tests', () => {
  test('logical reading order in Resources section on the About page', async ({
    mount,
    page
  }) => {
    const data = AboutPageFactory.make()
    await mount(<AboutPage page={data} />)
    await expect(
      page
    ).toHaveLogicalReadingOrderInResourcesSectionOnAboutContentType()
  })
})
