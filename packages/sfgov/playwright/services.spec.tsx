import ServicesPage from '../pages/services'
import { test, expect } from './fixtures'
import { TopicPageFactory } from '../lib/factories'

const props = {
  topics: TopicPageFactory.make(3)
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

  test('create accessible data tables for screen reader users', async ({
    mount,
    page
  }) => {
    await mount(<ServicesPage {...props} />)

    await expect(page).toHaveScopeAttributesInDataTables()
  })

  test('all links have keyboard focus', async ({ mount, page }) => {
    await mount(<ServicesPage {...props} />)
    await expect(page).toHaveKeyboardFocusInLinks()
  })

  test.skip('validate presence of aria labels in the primary and secondary navigation landmarks in the footer', async ({
    mount,
    page
  }) => {
    await mount(<ServicesPage {...props} />)

    await expect(page).toHaveAriaLabelsInFooterNavigationLandmarks()
  })

  test.skip('validate search autocomplete features', async ({
    mount,
    page
  }) => {
    await mount(<ServicesPage {...props} />)

    await expect(page).toHaveSearchAutoComplete()
  })

  test('validate that all ids are unique', async ({ mount, page }) => {
    await mount(<ServicesPage {...props} />)

    await expect(page).toNotHaveDuplicateIds()
  })

  test('validate that lang attributes are present in header', async ({
    mount,
    page
  }) => {
    await mount(<ServicesPage {...props} />)

    await expect(page).toHaveLangAttributes()
  })

  test('validate axe core accessibility tests', async ({ mount, page }) => {
    await mount(<ServicesPage {...props} />)

    await expect(page).toPassAxeCoreTests()
  })

  // Content Type Specific Tests

  test.skip('validate a logical reading order on the services list view', async ({
    mount,
    page
  }) => {
    await mount(<ServicesPage {...props} />)

    await expect(page).toHaveLogicalReadingOrderServicesListView()
  })
})
