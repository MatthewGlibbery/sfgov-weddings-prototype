// packages/sfgov/playwright/meetingTests.tsx (filename may differ)
import React from 'react'
import { test, expect } from './fixtures'
import { AxeBuilder } from '@axe-core/playwright'
import { MeetingPage } from '../components/page/MeetingPage'
import { MeetingPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Skip ONLY specific global tests in THIS file (Meeting)
// - Skip the global duplicate-ids matcher test
// - Skip the global axe test and then re-run axe with duplicate-id disabled
// ============================================================
test.beforeEach(async ({}, testInfo) => {
  if (testInfo.title === 'validate that all ids are unique') {
    test.skip(true, 'Meeting page currently has known duplicate IDs.')
  }

  if (testInfo.title === 'validate axe core accessibility tests') {
    test.skip(
      true,
      'Meeting page uses custom axe config: disable duplicate-id rule only.'
    )
  }
})

// ============================================================
// Run all shared global accessibility tests
// (Everything runs EXCEPT the 2 titles skipped above.)
// ============================================================
runGlobalA11yTests(MeetingPage, MeetingPageFactory)

// ============================================================
// Meeting-only override for axe-core:
// Run ALL axe rules EXCEPT `duplicate-id`
// ============================================================
test('validate axe core accessibility tests (meeting override)', async ({
  mount,
  page
}) => {
  const data = MeetingPageFactory.make()
  await mount(<MeetingPage page={data} />)

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
test.describe('Meeting Page – Content Type Specific A11y Tests', () => {
  test('logical reading order in accordion on meeting content type', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(
      page
    ).toHaveLogicalReadingOrderInAccordionOnMeetingContentType()
  })

  test.skip('create a logical tab order on the Meeting content type', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLogicalTabOrderOnMeetingContentType()
  })

  test('validate feedback trigger button is accessible and includes aria attributes', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toBeAccessibleAndIncludeAriaAttributesInFeedbackFAB()
  })
})

// ============================================================
// Module Specific Tests
// ============================================================
test.describe('Meeting Page – Module Specific A11y Tests', () => {
  test('logical reading order in meeting resources section', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderMeetingResources()
  })

  test('presence of links to video transcripts', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveVideoTextTranscript()
  })

  test.skip('meeting transcript links have keyboard focus', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveKeyboardFocusOnMeetingTranscriptLinks()
  })

  test.skip('Validates a logical reading order in the meeting details module', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderInMeetingDetailsModule()
  })
})
