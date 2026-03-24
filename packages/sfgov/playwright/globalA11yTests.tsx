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

    test('validate that lang attributes are present in header', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toHaveLangAttributes()
    })

    test('validate that aria labels are present in the expandable header navigation menus', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      // ------------------------------------------------------------
      // Find the main page OR CT iframe frame that contains
      // the Primary Header Navigation
      // ------------------------------------------------------------
      const navSelector = 'nav[aria-label="Primary Header Navigation"]'
      let ctx: any = page
      let nav = page.locator(navSelector)

      if ((await nav.count()) === 0) {
        for (const f of page.frames()) {
          const candidate = f.locator(navSelector)
          if ((await candidate.count()) > 0) {
            ctx = f
            nav = candidate
            break
          }
        }
      }

      await expect(nav).toHaveCount(1)

      // ------------------------------------------------------------
      // Open ALL duplicates of each top nav menu (<details>) so submenu links render
      // ------------------------------------------------------------
      const openAllMenus = async (
        label: 'Services' | 'Departments' | 'Contact'
      ) => {
        const details = ctx.locator(`details[aria-label="${label}"]`)
        const n = await details.count()
        expect(n).toBeGreaterThan(0)

        await details.evaluateAll((els: HTMLDetailsElement[]) => {
          els.forEach((el: HTMLDetailsElement) => {
            el.setAttribute('open', '')
          })
        })
      }

      await openAllMenus('Services')
      await openAllMenus('Departments')
      await openAllMenus('Contact')

      // ------------------------------------------------------------
      // Validate aria-labels WITHOUT hard-coding:
      // For each menu, ensure there exists at least one link whose aria-label
      // follows the pattern: "List with <number> items. <some text>"
      // ------------------------------------------------------------
      const expectMenuHasListWithAriaLabel = async (
        menuLabel: 'Services' | 'Departments' | 'Contact'
      ) => {
        const menus = nav.locator(`details[aria-label="${menuLabel}"]`)
        const menuCount = await menus.count()
        expect(menuCount).toBeGreaterThan(0)

        // Because CT can render duplicates, check all instances and require at least one match.
        let found = false

        for (let i = 0; i < menuCount; i++) {
          const menu = menus.nth(i)

          // Any link in this menu whose aria-label starts with "List with "
          // and matches "List with <digits> items. ..."
          const candidateLinks = menu.locator('a[aria-label^="List with "]')
          const cCount = await candidateLinks.count()

          for (let j = 0; j < cCount; j++) {
            const link = candidateLinks.nth(j)
            const aria = await link.getAttribute('aria-label')
            if (!aria) continue

            if (/^List with \d+ items\.\s*\S/.test(aria)) {
              found = true
              break
            }
          }

          if (found) break
        }

        expect(found).toBe(true)
      }

      await expectMenuHasListWithAriaLabel('Services')
      await expectMenuHasListWithAriaLabel('Departments')
      await expectMenuHasListWithAriaLabel('Contact')
    })

    test('validate accessible markup in the feedback modal dialog', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const buttonName = /did you find what you needed\?/i
      let ctx: any = page

      // Find CT frame that contains the FAB button
      if (
        (await page.getByRole('button', { name: buttonName }).count()) === 0
      ) {
        for (const f of page.frames()) {
          if ((await f.getByRole('button', { name: buttonName }).count()) > 0) {
            ctx = f
            break
          }
        }
      }

      const openModalButton = ctx.getByRole('button', { name: buttonName })

      await expect(openModalButton).toHaveCount(1)
      await expect(openModalButton).toBeVisible()
      await expect(openModalButton).toBeEnabled()

      await openModalButton.click()

      const modal = ctx
        .locator('[role="dialog"]:visible, [role="alertdialog"]:visible')
        .first()

      await expect(modal).toHaveCount(1)
      await expect(modal).toBeVisible()

      // Validate visible H1 with expected text
      const h1 = modal.locator('h1:visible', {
        hasText: /did you find what you needed\?/i
      })

      await expect(h1).toHaveCount(1)
      await expect(h1).toBeVisible()

      // aria-labelledby must exist
      const ariaLabelledby = await modal.getAttribute('aria-labelledby')
      expect(ariaLabelledby).toBeTruthy()

      // aria-labelledby must reference exactly one element inside modal
      const labelledEl = modal.locator(`#${ariaLabelledby}`)
      await expect(labelledEl).toHaveCount(1)

      // Validate close button
      const closeBtn = ctx.locator('button[aria-label="Close modal"]:visible')
      await expect(closeBtn).toHaveCount(1)

      // Yes button validation
      const yesBtn = modal.locator(
        'button[aria-label="Yes this page was helpful"]:visible'
      )
      await expect(yesBtn).toHaveCount(1)

      // No button validation
      const noBtn = modal.locator(
        'button[aria-label="No this page was not helpful"]:visible'
      )
      await expect(noBtn).toHaveCount(1)

      // Close modal
      await closeBtn.click()
      await modal.waitFor({ state: 'detached' })
    })

    test('validate axe core accessibility tests', async ({ mount, page }) => {
      const data = factory.make()
      await mount(<Component page={data} />)
      await expect(page).toPassAxeCoreTests()
    })
  })
}
