import { ProfilePage } from '../components/page/ProfilePage'
import { ProfilePageFactory } from '@/lib/factories'
import { test, expect } from './fixtures'
import React from 'react'

test.describe('A11y tests', () => {
  
  // Required Global Tests
  
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

  test.skip('has search landmark', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveSearchLandmark()
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

    await expect(page).toBeKeyboardFocusIndicatorAccessible()
  })

  test.skip('does keyboard focus indicator have sufficient color contrast', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).keyboardFocusIndicatorToHaveColorContrast()
  })

  test('do links have descriptive aria label text', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveDescriptiveLinkText()
  })

  test('create accessible data tables for screen reader users', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveScopeAttributesInDataTables()
  }) 

  test.skip('all links have keyboard focus', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveKeyboardFocusInLinks()
  }) 

  test.skip('validate presence of aria labels in the primary and secondary navigation landmarks in the footer', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toHaveAriaLabelsInFooterNavigationLandmarks()
  })

  test.skip('validate search autocomplete features', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)
  
    await expect(page).toHaveSearchAutoComplete()
  })

  test('validate axe core accessibility tests', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toPassAxeCoreTests()
  })

// Content Type Specific Tests

  test('create a logical tab order on the Profile content type', async ({ mount, page }) => {
  const data = ProfilePageFactory.make()
  await mount(<ProfilePage page={data} />)

  await expect(page).toCreateLogicalTabOrderProfileContentType()
  })

  test('create a logical reading order in the Contact sections on the Profile content type', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)
  
    await expect(page).toCreateLogicalReadingOrderInContactSectionsOnProfileContentType()
  })

  // Module Specific Tests

  test('the aside landmark should have a complementary landmark role', async ({ mount, page }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)
  
    await expect(page).toHaveAsideLandmarkRole()
    })

})