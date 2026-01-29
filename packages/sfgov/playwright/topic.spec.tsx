// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
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
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(TopicPage, TopicPageFactory)
