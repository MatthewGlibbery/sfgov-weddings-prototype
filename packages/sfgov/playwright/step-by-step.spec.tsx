import { StepByStepPage } from '../components/page/StepByStepPage'
import { StepByStepPageFactory } from '@/lib/factories'
import { test, expect } from './fixtures'
import React from 'react'

test.describe('A11y tests', () => {
  test('headings are rendered in a logical reading order', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrder()
  })

  test('has accessible landmarks', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLandmarks()
  })

  test('has accessible landmark roles', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLandmarkRoles()
  })

  test('has search landmarks plus aria', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveSearchLandmarksPlusAria()
  })

  test('has prefers reduced motion', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHavePrefersReducedMotion()
  })

  test('has language access', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLanguageAccess()
  })

  test('has language interaction', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLanguageInteraction()
  })

  test('has language access in dropdown menu', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLanguageAccessInDropdownmenu()
  })

  test('is keyboard accessible', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toBeKeyboardAccessible()
  })

  test('does keyboard focus indicator have sufficient color contrast', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveColorContrast()
  })

  test('do links have descriptive aria label text', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveDescriptiveLinkText()
  })

  test('do form elements include required attributes', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveRequiredAttributes()
  })

  test('do form elements include required form attributes', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveRequiredFormAttributes()
  })

  test('has inline error messaage', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveErrorMessage()
  })

  test('do not have dashes and parentheses in the input placeholder tag', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toNotHaveDashesAndParentheses()
  })
  test('keyboard access to date picker', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toAccessDatePicker()
  })

  test('keyboard access to date picker input', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toAccessDatePickerInput()
  })

  test('form instructions are explicitly associated with their form control', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toAssociateFormInstructionsWithFormControl()
  })

  test('Specific form instructions are explicitly associated with their form control', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toAssociateSpecificFormInstructionsWithFormControl()
  })

  test('Power BI Dashboard is accessible', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toMakePowerBiDashboardAccessible()
  })

  test('delete items in multiselect combobox', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toDeleteItemsInMultiselectCombobox()
  })

  test('include fieldset and legend in groups of form controls', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toIncludeFieldsetandLegend()
  })

  test('create logical reading order on step by step page', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveStepbyStepLogicalReadingOrder()
  })
 
  test('correct tab order in main landmark', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).CorrectTabOrderInMainContentArea()
  })

  test('logical reading order on transaction content type', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderonTransactionCT()
  })

  test('logical reading order on meeting content type', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderonMeetingCT()
  })

  test('logical reading order in get help section', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderGetHelp()
  })

  test('logical reading order in accordion menu on transaction content type', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderonTransactionCT()
  })

  test('logical reading order in accordion menu on meeting content type', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderonMeetingCT()
  })

  test('logical reading order in contact information section', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderContactInfo()
  })

  test('logical reading order in meeting resources section', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderMeetingResources()
  })

  test('and or aria labels are present on step by step page', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveAndOrAriaLabels()
  })

  test('logical reading order within the main landmark on the info page', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveInformationLogicalReadingOrder()
  })

  test('logical reading order in the what to know section', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderWhatToKnow()
  })

  test('logical reading order in the contact us section', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderContactUs()
  })

  test('logical reading order in event details section', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderEventDetails()
  })

  test('logical reading order in Resources section on the About page', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderAboutUs()
  })

  test('no URL in link text', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveURLInLinkText()
  })

  test('accessible PowerBI dashboards on Resource Collection page', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toMakePowerBiDashboardAccessibleResourceCollection()
  })

  test('all links have keyboard focus', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).allLinksHaveKeyboardFocus()
  })

  test('logical reading order in the accordion module on the Campaign page', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderonCampaignCT()
  })

  test('logical reading order on the homepage', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderonHomePage()
  })

  test('presence of links to video transcripts', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveVideoTextTranscript()
  })

  test('logical reading order in the Data section on the Resource Collection page', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderDataResourceCollection()
  })

  test('logical reading order in the Documents section on the Resource Collection page', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderDocumentsResourceCollection()
  })

  test('suppress block quotes on News content type', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toSuppressBlockQuoteOnNewsContentType()
  })

  test('article landmarks are present in the news section on the Homepage', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveArticleLandmarkInNewsSectionOnHomepage()
  })

  test('suppress block quotes on Press Release content type', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toSuppressBlockQuoteOnPressReleaseContentType()
  })

  test('create a logical reading order in the accordion on the Location content type', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveALogicalReadingOrderInAccordionOnLocationContentType()
  })

  test('create a logical reading order in the Getting Here section on the Location content type', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveALogicalReadingOrderInGettingHereSectionOnLocationContentType()
  })

  test('create a logical reading order in the Glossary section on the Data Story content type', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveALogicalReadingOrderInGlossarySectionOnDataStoryContentType()
  })

  test('suppress the In-Page Search Function for screen reader users on the Data Story content type', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toSuppressInPageSearchModuleForScreenReadersOnDataStoryContentType()
  })

  test('create a logical tab order on the Transaction content type', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toCreateLogicalTabOrderOnTransactionContentType()
  })

  test('create a logical tab order on the Data Story content type', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toCreateLogicalTabOrderOnDataStoryContentType()
  })

  test('create a logical tab order on the Form content type', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toCreateLogicalTabOrderOnFormContentType()
  })

  test('has no accessibility violations', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toPassA11yScan()
  })
})
