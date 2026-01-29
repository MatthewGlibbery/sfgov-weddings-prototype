// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { StepByStepPage } from '../components/page/StepByStepPage'
import { StepByStepPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(StepByStepPage, StepByStepPageFactory)

// ============================================================
// Module Specific Tests
// ============================================================
test.describe('Step By Step Page – Module Specific A11y Tests', () => {
  test('validate that the heading in the step by step module is an h2 heading', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toOnlyHaveH2HeadingsInStepbyStepModule()
  })
})
// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Step By Step Page – Content Type Specific A11y Tests', () => {
  test('create logical reading order on step by step page', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderOnStepByStepContentType()
  })

  test('and or aria labels are present on step by step page', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveAndOrAriaLabelsOnStepbyStepContentType()
  })
})
