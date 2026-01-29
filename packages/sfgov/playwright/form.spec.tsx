// packages/sfgov/playwright/formTests.tsx  (name may differ in your repo)
import React from 'react'
import { test, expect } from './fixtures'
import { AxeBuilder } from '@axe-core/playwright'
import { FormPage } from '../components/page/FormPage'
import { FormPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Skip ONLY the global axe test in THIS file
// Replace it with a custom axe run that disables one rule.)
// ============================================================
test.beforeEach(async ({}, testInfo) => {
  if (testInfo.title === 'validate axe core accessibility tests') {
    test.skip(
      true,
      'Form page uses custom axe config: disable page-has-heading-one only'
    )
  }
})

// ============================================================
// Run all shared global accessibility tests
// (All other global tests will still run)
// ============================================================
runGlobalA11yTests(FormPage, FormPageFactory)

// ============================================================
// Form-only override for axe-core (disable one rule)
// ============================================================
test('validate axe core accessibility tests (form override)', async ({
  mount,
  page
}) => {
  const data = FormPageFactory.make()
  await mount(<FormPage page={data} />)

  const results = await new AxeBuilder({ page })
    .disableRules(['page-has-heading-one'])
    .analyze()

  expect(
    results.violations,
    JSON.stringify(results.violations, null, 2)
  ).toEqual([])
})

// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Form Page – Content Type Specific A11y Tests', () => {
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
})

// ============================================================
// Form Specific Tests
// ============================================================
test.describe('Form Page – Form Specific A11y Tests', () => {
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
