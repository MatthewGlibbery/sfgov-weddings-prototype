import { ProfilePage } from '../components/page/ProfilePage'
import { ProfilePageFactory } from '@/lib/factories'
import { test, expect } from './fixtures'
import React from 'react'

test.describe('A11y tests', () => {
  test.skip('headings are rendered in a logical reading order', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLogicalReadingOrder()
  })

  test('has accessible landmarks', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLandmarks()
  })

  test('has accessible landmark roles', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLandmarkRoles()
  })

  test('has search landmarks plus aria', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveSearchLandmarksPlusAria()
  })

  test('has prefers reduced motion', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHavePrefersReducedMotion()
  })

  test('has language access', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLanguageAccess()
  })

  test('has language interaction', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLanguageInteraction()
  })

  test('has language access in dropdown menu', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLanguageAccessInDropdownmenu()
  })

  test('is keyboard accessible', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toBeKeyboardAccessible()
  })

  test('does keyboard focus indicator have sufficient color contrast', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveColorContrast()
  })

  test('do links have descriptive aria label text', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveDescriptiveLinkText()
  })

  test('do form elements include required attributes', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveRequiredAttributes()
  })

  test('do form elements include required form attributes', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveRequiredFormAttributes()
  })

  test('has inline error messaage', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveErrorMessage()
  })

  test('do not have dashes and parentheses in the input placeholder tag', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toNotHaveDashesAndParentheses()
  })
  test('keyboard access to date picker', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toAccessDatePicker()
  })

  test('keyboard access to date picker input', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toAccessDatePickerInput()
  })

  test('form instructions are explicitly associated with their form control', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toAssociateFormInstructionsWithFormControl()
  })

  test('Specific form instructions are explicitly associated with their form control', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toAssociateSpecificFormInstructionsWithFormControl()
  })

  test('Power BI Dashboard is accessible', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toMakePowerBiDashboardAccessible()
  })

  test('delete items in multiselect combobox', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toDeleteItemsInMultiselectCombobox()
  })

  test('include fieldset and legend in groups of form controls', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toIncludeFieldsetandLegend()
  })

  test('create logical reading order on step by step page', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveStepbyStepLogicalReadingOrder()
  })

  test('correct tab order in main landmark', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).CorrectTabOrderInMainContentArea()
  })

  test('logical reading order on transaction content type', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLogicalReadingOrderonTransactionCT()
  })

  test('logical reading order on meeting content type', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLogicalReadingOrderonMeetingCT()
  })

  test('logical reading order in contact information section', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLogicalReadingOrderContactInfo()
  })

  test('logical reading order in meeting resources section', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLogicalReadingOrderMeetingResources()
  })

  test('and or aria labels are present on step by step page', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveAndOrAriaLabels()
  })

  test('logical reading order within the main landmark on the info page', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveInformationLogicalReadingOrder()
  })

  test('logical reading order in the contact us section', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLogicalReadingOrderContactUs()
  })

  test('logical reading order in event details section', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLogicalReadingOrderEventDetails()
  })

  test('logical reading order in Resources section on the About page', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLogicalReadingOrderAboutUs()
  })

  test('no URL in link text', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveURLInLinkText()
  })

  test('accessible PowerBI dashboards on Resource Collection page', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toMakePowerBiDashboardAccessibleResourceCollection()
  })

  test('all links have keyboard focus', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).allLinksHaveKeyboardFocus()
  })

  test('logical reading order in the accordion module on the Campaign page', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLogicalReadingOrderonCampaignCT()
  })

  test('logical reading order on the homepage', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveLogicalReadingOrderonHomePage()
  })

  test('presence of links to video transcripts', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveVideoTextTranscript()
  })

  test('has no accessibility violations', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toPassA11yScan()
  })
})
