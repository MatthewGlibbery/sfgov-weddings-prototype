// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'

export function runGlobalA11yTests<PageData>(
  Component: React.ComponentType<{ page: PageData }>,
  factory: { make: () => PageData }
) {
  test.describe('🌐 Global Accessibility Tests', () => {
    test('has accessible landmarks', async ({ mount, page }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toHaveLandmarks()
    })

    test('has accessible landmark roles', async ({ mount, page }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toHaveLandmarkRoles()
    })

    test.skip('has search landmark', async ({ mount, page }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toHaveSearchLandmark()
    })

    test('has language interaction', async ({ mount, page }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toHaveLanguageInteraction()
    })

    test('has language access in dropdown menu', async ({ mount, page }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toHaveLanguageAccessInDropdownmenu()
    })

    test('is keyboard accessible', async ({ mount, page }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toBeKeyboardFocusIndicatorAccessible()
    })

    test.skip('keyboard focus indicator has sufficient color contrast', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).keyboardFocusIndicatorToHaveColorContrast()
    })

    test('do links have descriptive aria label text', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toHaveDescriptiveLinkText()
    })

    test('create accessible data tables for screen reader users', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toHaveScopeAttributesInDataTables()
    })

    test('all links have keyboard focus', async ({ mount, page }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toHaveKeyboardFocusInLinks()
    })

    test.skip('validate presence of aria labels in footer navigation', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toHaveAriaLabelsInFooterNavigationLandmarks()
    })

    test('validate that all ids are unique', async ({ mount, page }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toNotHaveDuplicateIds()
    })

    test('validate that lang attributes are present in header and footer', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toHaveLangAttributes()
    })

    test('validate axe core accessibility tests', async ({ mount, page }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toPassAxeCoreTests()
    })
  })
}
