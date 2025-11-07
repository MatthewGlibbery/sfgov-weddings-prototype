import { MeetingPage } from '../components/page/MeetingPage'
import { MeetingPageFactory } from '@/lib/factories'
import { test, expect } from './fixtures'
import React from 'react'

test.describe('A11y tests', () => {
  // Required Global Tests

  test('has accessible landmarks', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLandmarks()
  })

  test('has accessible landmark roles', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLandmarkRoles()
  })

  test.skip('has search landmark', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveSearchLandmark()
  })

  test('has language interaction', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLanguageInteraction()
  })

  test('has language access in dropdown menu', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLanguageAccessInDropdownmenu()
  })

  test('is keyboard accessible', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toBeKeyboardFocusIndicatorAccessible()
  })

  test.skip('does keyboard focus indicator have sufficient color contrast', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).keyboardFocusIndicatorToHaveColorContrast()
  })

  test('do links have descriptive aria label text', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveDescriptiveLinkText()
  })

  test('create accessible data tables for screen reader users', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveScopeAttributesInDataTables()
  })

  test('all links have keyboard focus', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveKeyboardFocusInLinks()
  })

  test.skip('validate presence of aria labels in the primary and secondary navigation landmarks in the footer', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveAriaLabelsInFooterNavigationLandmarks()
  })

  test.skip('Validates a logical reading order in the global footer', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderInFooter()
  })

  test.skip('Validates the correct aria label attribute for search button', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveAriaLabelInSearchSubmitButton()
  })

  test.skip('Validates the correct aria label attributes for social media links', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveAriaLabelsInSocialMediaLinks()
  })

  test.skip('Validates that the Chinese option in the language dropdown includes a “Chinese” aria-label', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveAriaLabelForChineseInLanguageDropDownMenu()
  })

  test.skip('Validates the correct alt text for the logo in the global header', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveAltTextInGlobalHeader()
  })

  test.skip('Validates the correct alt text for the logo in the global footer', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveAltTextInGlobalFooter()
  })

  test('Validates that invalid ARIA attributes are not present', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toNotHaveInvalidAriaAttribute()
  })

  test.skip('Validates that no <span> tags are present within list elements', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toNotHaveSpanTagsInListElements()
  })

  test('Validates that all iframe elements include a title attribute', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveTitleAttributeIniFrameElements()
  })

  test.skip('Validates that all link tags include an href attribute and link text', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveNoEmptyLinkTags()
  })

  test('Validates that all button elements include descriptive link text', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveDescriptiveLinkTextforButtons()
  })

  test.skip('validate search autocomplete features', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveSearchAutoComplete()
  })

  test.skip('validate that all ids are unique', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toNotHaveDuplicateIds()
  })

  test('validate that lang attributes are present in header and footer', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLangAttributes()
  })

  test.skip('validate axe core accessibility tests', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toPassAxeCoreTests()
  })

  // Content Type Specific Tests

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

  // Module Specific Tests

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
