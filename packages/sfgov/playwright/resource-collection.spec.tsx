import { ResourceCollectionPage } from '../components/page/ResourceCollectionPage'
import { ResourceCollectionPageFactory } from '@/lib/factories'
import { test, expect } from './fixtures'
import React from 'react'

test.describe('A11y tests', () => {
 
   // Required Global Tests
  
   test('has accessible landmarks', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toHaveLandmarks()
  })

  test('has accessible landmark roles', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toHaveLandmarkRoles()
  })

  test.skip('has search landmark', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toHaveSearchLandmark()
  })  

  test('has language interaction', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toHaveLanguageInteraction()
  })

  test('has language access in dropdown menu', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toHaveLanguageAccessInDropdownmenu()
  })

  test('is keyboard accessible', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toBeKeyboardFocusIndicatorAccessible()
  })

  test.skip('does keyboard focus indicator have sufficient color contrast', async ({
    mount,
    page
  }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).keyboardFocusIndicatorToHaveColorContrast()
  })

  test('do links have descriptive aria label text', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toHaveDescriptiveLinkText()
  })

  test('create accessible data tables for screen reader users', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toHaveScopeAttributesInDataTables()
  }) 

  test.skip('all links have keyboard focus', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toHaveKeyboardFocusInLinks()
  }) 

  test.skip('validate presence of aria labels in the primary and secondary navigation landmarks in the footer', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toHaveAriaLabelsInFooterNavigationLandmarks()
  })

  test.skip('validate search autocomplete features', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)
  
    await expect(page).toHaveSearchAutoComplete()
  })

  test('validate axe core accessibility tests', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toPassAxeCoreTests()
  })

// Content Type Specific Tests  

  test('logical reading order in the Documents section on the Resource Collection page', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderInDocumentsSectionOnResourceCollectionContentType()
  })

  test('logical reading order in the Resources section on the Resource Collection page', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderInResourcesSectionOnResourceCollectionContentType()
  })


  // Module Specific Tests

  test('Power BI Dashboard is accessible', async ({ mount, page }) => {
    const data = ResourceCollectionPageFactory.make()
    await mount(<ResourceCollectionPage page={data} />)

    await expect(page).toMakePowerBiDashboardAccessible()
  })
})
