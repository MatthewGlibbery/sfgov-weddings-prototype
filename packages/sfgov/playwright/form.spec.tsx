import { FormPage } from '../components/page/FormPage'
import { FormPageFactory } from '@/lib/factories'
import { test, expect } from './fixtures'
import React from 'react'

test.describe('A11y tests', () => {
  // Required Global Tests

  test('has accessible landmarks', async ({ mount, page }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveLandmarks()
  })

  test('has accessible landmark roles', async ({ mount, page }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveLandmarkRoles()
  })

  test.skip('has search landmark', async ({ mount, page }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveSearchLandmark()
  })

  test('has language interaction', async ({ mount, page }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveLanguageInteraction()
  })

  test('has language access in dropdown menu', async ({ mount, page }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveLanguageAccessInDropdownmenu()
  })

  test('is keyboard accessible', async ({ mount, page }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toBeKeyboardFocusIndicatorAccessible()
  })

  test.skip('does keyboard focus indicator have sufficient color contrast', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).keyboardFocusIndicatorToHaveColorContrast()
  })

  test('do links have descriptive aria label text', async ({ mount, page }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveDescriptiveLinkText()
  })

  test('create accessible data tables for screen reader users', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveScopeAttributesInDataTables()
  })

  test('all links have keyboard focus', async ({ mount, page }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveKeyboardFocusInLinks()
  })

  test.skip('validate presence of aria labels in the primary and secondary navigation landmarks in the footer', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveAriaLabelsInFooterNavigationLandmarks()
  })

  test.skip('validate search autocomplete features', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveSearchAutoComplete()
  })

  test('validate that all ids are unique', async ({ mount, page }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toNotHaveDuplicateIds()
  })

  test('validate that lang attributes are present in header and footer', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveLangAttributes()
  })

  test.skip('validate axe core accessibility tests', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toPassAxeCoreTests()
  })

  // Content Type Specific Tests

  test.skip('create a logical tab order on the Form content type', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toCreateLogicalTabOrderOnFormContentType()
  })

  test.skip('the progress indicator nav landmark on the forms content type should have an aria label', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(
      page
    ).toHaveAriaLabelInProgressBarNavLandmarkOnFormsContentType()
  })

  // Forms Related Tests

  test('do form elements include required attributes', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveRequiredAttributes()
  })

  test('do form elements include required form attributes', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveRequiredAttributesInSpecificFormElements()
  })

  test('has inline error messaage', async ({ mount, page }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toHaveInlineErrorMessage()
  })

  test('do not have dashes and parentheses in the input placeholder tag', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toNotHaveDashesAndParenthesesInPlaceholder()
  })
  test('keyboard access to date picker', async ({ mount, page }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toAccessDatePicker()
  })

  test('keyboard access to date picker input', async ({ mount, page }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toAccessDatePickerInput()
  })

  test('form instructions are explicitly associated with their form control', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toAssociateFormInstructionsWithFormControl()
  })

  test('Specific form instructions are explicitly associated with their form control', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toAssociateSpecificFormInstructionsWithFormControl()
  })

  test('delete items in multiselect combobox', async ({ mount, page }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toDeleteItemsInMultiselectCombobox()
  })

  test('include fieldset and legend in groups of form controls', async ({
    mount,
    page
  }) => {
    const data = FormPageFactory.make()
    await mount(<FormPage page={data} />)

    await expect(page).toIncludeFieldsetandLegend()
  })
})
