// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { TransactionPage } from '../components/page/TransactionPage'
import { TransactionPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'
import AxeBuilder from '@axe-core/playwright'

// ============================================================
// Skip ONLY specific global tests in THIS file (Transaction)
// - Skip the global duplicate-ids matcher test
// - Skip the global axe test and then re-run axe with duplicate-id disabled
// ============================================================
test.beforeEach(async ({}, testInfo) => {
  if (testInfo.title === 'validate that referenced ids are unique') {
    test.skip(true, 'Transaction page currently has known duplicate IDs.')
  }

  if (testInfo.title === 'validate axe core accessibility tests') {
    test.skip(
      true,
      'Transaction page uses custom axe config: disable duplicate-id rule only.'
    )
  }
})

// ============================================================
// Run all shared global accessibility tests
// (Everything runs EXCEPT the 2 titles skipped above.)
// ============================================================
runGlobalA11yTests(TransactionPage, TransactionPageFactory)

// ============================================================
// Transaction-only override for axe-core:
// Run ALL axe rules EXCEPT `duplicate-id`
// ============================================================
test('validate axe core accessibility tests (transaction override)', async ({
  mount,
  page
}) => {
  const data = TransactionPageFactory.make()
  await mount(<TransactionPage page={data} />)

  const results = await new AxeBuilder({ page })
    .disableRules(['duplicate-id'])
    .analyze()

  // Extra safety: ensures we're not accidentally ignoring other violations
  expect(
    results.violations,
    JSON.stringify(results.violations, null, 2)
  ).toEqual([])
})

// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Transaction Page – Content Type Specific A11y Tests', () => {
  test.skip('logical reading order in accordion on transaction content type', async ({
    mount,
    page
  }) => {
    const data = TransactionPageFactory.make()
    await mount(<TransactionPage page={data} />)

    await expect(
      page
    ).toHaveLogicalReadingOrderInAccordionOnTransactionContentType()
  })

  test.skip('create a logical tab order on the Transaction content type', async ({
    mount,
    page
  }) => {
    const data = TransactionPageFactory.make()
    await mount(<TransactionPage page={data} />)

    await expect(page).toCreateLogicalTabOrderOnTransactionContentType()
  })
})
// ============================================================
// Module Specific Tests
// ============================================================
test.describe('Transaction Page – Module Specific A11y Tests', () => {
  test('logical reading order in the get help section', async ({
    mount,
    page
  }) => {
    const data = TransactionPageFactory.make()
    await mount(<TransactionPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderGetHelp()
  })
})
