import { AgencyPage } from '@/components'
import { AgencyPageFactory } from '@/lib/factories'
import { test, expect } from './fixtures'

test.describe('A11y tests', () => {
  test('headings are rendered in a logical reading order', async ({
    mount,
    page
  }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLogicalReadingOrder()
  })

  test('has skip to main content', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveSkiptoMainContent()
  })

  test('has accessible landmarks', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLandmarks()
  })

  test('has accessible landmark roles', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLandmarkRoles()
  })

  test('has search landmarks plus aria', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveSearchLandmarksPlusAria()
  })

  test('has prefers reduced motion', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHavePrefersReducedMotion()
  })

  test('has language access', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLanguageAccess()
  })

  test('has language interaction', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLanguageInteraction()
  })

  test('has language access in dropdown menu', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLanguageAccessInDropdownmenu()
  })

  test('is keyboard accessible', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toBeKeyboardAccessible()
  })

  test('does keyboard focus indicator have sufficient color contrast', async ({
    mount,
    page
  }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveColorContrast()
  })

  test('do links have descriptive aria label text', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveDescriptiveLinkText()
  })

  test('do form elements include required attributes', async ({
    mount,
    page
  }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveRequiredAttributes()
  })

  test('do form elements include required form attributes', async ({
    mount,
    page
  }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveRequiredFormAttributes()
  })

  test('has inline error messaage', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveErrorMessage()
  })

  test('do not have dashes and parentheses in the input placeholder tag', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toNotHaveDashesAndParentheses()
  })
  
  test('keyboard access to date picker', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toAccessDatePicker()
  })

  test('keyboard access to date picker input', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toAccessDatePickerInput()
  })

  test('form instructions are explicitly associated with their form control', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toAssociateFormInstructionsWithFormControl()
  })

  test('Specific form instructions are explicitly associated with their form control', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toAssociateSpecificFormInstructionsWithFormControl()
  })

  test('Power BI Dashboard is accessible', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toMakePowerBiDashboardAccessible()
  }) 

  test('delete items in multiselect combobox', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toDeleteItemsInMultiselectCombobox()
  })

  test('include fieldset and legend in groups of form controls', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toIncludeFieldsetandLegend()
  }) 

  test('create logical reading order on step by step page', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveStepbyStepLogicalReadingOrder()
  })

  test('all links have keyboard focus', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).LinksHaveKeyboardFocus()
  })

  test('correct tab order in main landmark', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).CorrectTabOrderInMainContentArea()
  })

  test('logical reading order on transaction content type', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderonTransactionCT()
  })

  test('logical reading order on meeting content type', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderonMeetingCT()
  })

  test('logical reading order in get help section', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderGetHelp()
  })

   test('has no accessibility violations', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toPassA11yScan()
  })
})
