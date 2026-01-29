// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { EventPage } from '../components/page/EventPage'
import { EventPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(EventPage, EventPageFactory)

// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Event Page – Content Type Specific A11y Tests', () => {
  test('logical reading order in event details section', async ({
    mount,
    page
  }) => {
    const data = EventPageFactory.make()
    await mount(<EventPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderEventDetails()
  })
})
// ============================================================
// Module Specific Tests
// ============================================================
test.describe('Event Page – Module Specific A11y Tests', () => {
  test('logical reading order in the contact us section', async ({
    mount,
    page
  }) => {
    const data = EventPageFactory.make()
    await mount(<EventPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderContactUs()
  })
})
