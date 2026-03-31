import React from 'react'
import AxeBuilder from '@axe-core/playwright'
import { test, expect } from './fixtures'
import { TopicPage } from '../components/page/TopicPage'
import { TopicPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// Primer: ensures Playwright CT registers TopicPage as mountable.
test('CT registers TopicPage (primer)', async ({ mount }) => {
  const data = TopicPageFactory.make()
  await mount(<TopicPage page={data} />)
})

// ============================================================
// Skip ONLY the shared global axe test in THIS file (Topic)
// ============================================================
test.beforeEach(async ({}, testInfo) => {
  if (testInfo.title === 'validate axe core accessibility tests') {
    test.skip(
      true,
      'Topic page uses custom axe config: disable empty-heading rule only.'
    )
  }
})

// ============================================================
// Run all shared global accessibility tests
// (Everything runs EXCEPT the shared axe test skipped above.)
// ============================================================
runGlobalA11yTests(TopicPage, TopicPageFactory)

// ============================================================
// Topic-only override for axe-core:
// Run ALL axe rules EXCEPT `empty-heading`
// ============================================================
test('validate axe core accessibility tests (topic override)', async ({
  mount,
  page
}) => {
  const data = TopicPageFactory.make()
  await mount(<TopicPage page={data} />)

  const results = await new AxeBuilder({ page })
    .disableRules(['empty-heading'])
    .analyze()

  expect(
    results.violations,
    JSON.stringify(results.violations, null, 2)
  ).toEqual([])
})
