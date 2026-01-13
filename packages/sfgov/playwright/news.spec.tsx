// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { NewsPage } from '../components/page/NewsPage'
import { NewsPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(NewsPage, NewsPageFactory)

// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('News Page – Content Type Specific A11y Tests', () => {
  test('suppress block quotes on News content type', async ({
    mount,
    page
  }) => {
    const data = NewsPageFactory.make()
    await mount(<NewsPage page={data} />)

    await expect(page).toSuppressBlockQuoteOnNewsContentType()
  })

  test('suppress block quotes on Press Release content type', async ({
    mount,
    page
  }) => {
    const data = NewsPageFactory.make()
    await mount(<NewsPage page={data} />)

    await expect(page).toSuppressBlockQuoteOnPressReleaseContentType()
  })
})
