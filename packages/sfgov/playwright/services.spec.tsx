import ServicesPage from '../pages/services'
import { test, expect } from './fixtures'
import React from 'react'
const props = { topics: [
    {
        "url": "/topics--building/",
        "parent": 2,
        "html_path": "http://api.sf.gov/topics--building/",
        "detail_url": "http://api.sf.gov/api/cms/sf.Topic/1680",
        "translation_key": "ea50e607-f1ab-44f6-9319-ec48c396a089",
        "live": true,
        "title": "Building",
        "description": "Construction resources and property information.",
        "top_level_topic": true,
        "partner_agencies": [],
        "locale": "http://api.sf.gov/api/cms/locales/1",
        "alias_of": null
    },
]
}

test.describe('A11y tests', () => {
  
  // Required Global Tests
  
 test('has accessible landmarks', async ({ mount, page }) => {  
  await mount(<ServicesPage {...props} />)

  await expect(page).toHaveLandmarks()
})

test('has accessible landmark roles', async ({ mount, page }) => {
   await mount(<ServicesPage {...props} />)

  await expect(page).toHaveLandmarkRoles()
})

test.skip('has search landmark', async ({ mount, page }) => {
   await mount(<ServicesPage {...props} />)

  await expect(page).toHaveSearchLandmark()
})

test('has language interaction', async ({ mount, page }) => {
  await mount(<ServicesPage {...props} />)

  await expect(page).toHaveLanguageInteraction()
})

test('has language access in dropdown menu', async ({ mount, page }) => {
   await mount(<ServicesPage {...props} />)

  await expect(page).toHaveLanguageAccessInDropdownmenu()
})

test('is keyboard accessible', async ({ mount, page }) => {
 await mount(<ServicesPage {...props} />)

  await expect(page).toBeKeyboardFocusIndicatorAccessible()
})

test.skip('does keyboard focus indicator have sufficient color contrast', async ({
  mount,
  page
}) => {
   await mount(<ServicesPage {...props} />)

  await expect(page).keyboardFocusIndicatorToHaveColorContrast()
})

test('do links have descriptive aria label text', async ({ mount, page }) => {
  await mount(<ServicesPage {...props} />)

  await expect(page).toHaveDescriptiveLinkText()
})

test('create accessible data tables for screen reader users', async ({ mount, page }) => {
   await mount(<ServicesPage {...props} />)

  await expect(page).toHaveScopeAttributesInDataTables()
})

test('all links have keyboard focus', async ({ mount, page }) => {
  await mount(<ServicesPage {...props} />)
  await expect(page).toHaveKeyboardFocusInLinks()
}) 

test.skip('validate presence of aria labels in the primary and secondary navigation landmarks in the footer', async ({ mount, page }) => {
   await mount(<ServicesPage {...props} />)

  await expect(page).toHaveAriaLabelsInFooterNavigationLandmarks()
})

test.skip('validate search autocomplete features', async ({ mount, page }) => {
  await mount(<ServicesPage {...props} />)

  await expect(page).toHaveSearchAutoComplete()
})

test('validate axe core accessibility tests', async ({ mount, page }) => {
   await mount(<ServicesPage {...props} />)

  await expect(page).toPassAxeCoreTests()
})

// Content Type Specific Tests

  test.skip('validate a logical reading order on the services list view', async ({ mount, page }) => {
     await mount(<ServicesPage {...props} />)

    await expect(page).toHaveLogicalReadingOrderServicesListView()
})

})