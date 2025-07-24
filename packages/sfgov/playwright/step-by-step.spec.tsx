import { StepByStepPage } from '../components/page/StepByStepPage'
import { StepByStepPageFactory } from '@/lib/factories'
import { test, expect } from './fixtures'
import React from 'react'

test.describe('A11y tests', () => {

   // Required Global Tests
  
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

  test.skip('has search landmark', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveSearchLandmark()
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

    await expect(page).toBeKeyboardFocusIndicatorAccessible()
  })

  test.skip('does keyboard focus indicator have sufficient color contrast', async ({
    mount,
    page
  }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).keyboardFocusIndicatorToHaveColorContrast()
  })

  test('do links have descriptive aria label text', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveDescriptiveLinkText()
  })

  test('create accessible data tables for screen reader users', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveScopeAttributesInDataTables()
  })

  test('all links have keyboard focus', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveKeyboardFocusInLinks()
  }) 

  test.skip('validate presence of aria labels in the primary and secondary navigation landmarks in the footer', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveAriaLabelsInFooterNavigationLandmarks()
  })

  test.skip('validate search autocomplete features', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)
  
    await expect(page).toHaveSearchAutoComplete()
  })

  test('validate that all ids are unique', async ({ mount, page }) => {
      const data = StepByStepPageFactory.make()
      await mount(<StepByStepPage page={data} />)
  
      await expect(page).toNotHaveDuplicateIds()
    }) 

  test('validate axe core accessibility tests', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toPassAxeCoreTests()
  })

// Module Specific Tests

  test('validate that the heading in the step by step module is an h2 heading', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toOnlyHaveH2HeadingsInStepbyStepModule()
  })

// Content Type Specific Tests

  test('create logical reading order on step by step page', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderOnStepByStepContentType()
  })

  test('and or aria labels are present on step by step page', async ({ mount, page }) => {
    const data = StepByStepPageFactory.make()
    await mount(<StepByStepPage page={data} />)

    await expect(page).toHaveAndOrAriaLabelsOnStepbyStepContentType()
  })
})
