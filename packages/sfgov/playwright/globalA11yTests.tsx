// packages/sfgov/playwright/globalA11yTests.ts
import { AxeBuilder } from '@axe-core/playwright'
import React from 'react'
import { test, expect } from './fixtures'
import tinycolor from 'tinycolor2'

// ------------------------------------------------------------
// Helper: find the main page OR CT iframe frame that contains
// rendered content matching the provided condition
// ------------------------------------------------------------
async function findContext(
  page: any,
  hasContent: (ctx: any) => Promise<boolean>
) {
  if (await hasContent(page)) {
    return page
  }

  for (const frame of page.frames()) {
    if (await hasContent(frame)) {
      return frame
    }
  }

  return page
}

// ------------------------------------------------------------
// Helper: find the main page OR CT iframe frame that contains
// the provided selector
// ------------------------------------------------------------
async function findContextBySelector(page: any, selector: string) {
  return findContext(
    page,
    async (ctx: any) => (await ctx.locator(selector).count()) > 0
  )
}

export function runGlobalA11yTests<PageData>(
  Component: React.ComponentType<{ page: PageData }>,
  factory: { make: () => PageData }
) {
  test.describe('🌐 Global Accessibility Tests', () => {
    test('validate the presence of required landmarks', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const root = await findContextBySelector(
        page,
        'header, main, footer, nav'
      )

      // ------------------------------------------------------------
      // Validate presence of required landmarks
      // ------------------------------------------------------------
      await expect(root.locator('header')).toBeVisible()
      await expect(root.locator('main')).toBeVisible()
      await expect(root.locator('footer')).toBeVisible()

      await expect(
        root.locator(
          'nav[role="navigation"][aria-label="Primary Header Navigation"]'
        )
      ).toBeVisible()
    })

    test('validate the presence of landmark roles', async ({ mount, page }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const root = await findContextBySelector(page, '[role]')

      // ------------------------------------------------------------
      // Validate presence of key landmark roles
      // ------------------------------------------------------------
      await expect(root.locator('[role="banner"]')).toBeVisible()
      await expect(root.locator('[role="main"]')).toBeVisible()
      await expect(root.locator('[role="contentinfo"]')).toBeVisible()
    })

    test.skip('validate presence of a search landmark role', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const selector = 'header form[role="search"]'
      const root = await findContextBySelector(page, selector)

      // ------------------------------------------------------------
      // Validate that a search landmark is present and visible
      // ------------------------------------------------------------
      await expect(root.locator(selector)).toBeVisible()
    })

    test('validate keyboard interactions with the language selector', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const dropdownSelector = '[aria-label="language selector"]'
      const root = await findContextBySelector(page, dropdownSelector)

      // ------------------------------------------------------------
      // Locate the language selector dropdown and its interactive
      // summary control
      // ------------------------------------------------------------
      const dropdown = root.locator(dropdownSelector)
      const dropdownSummary = root.locator(`${dropdownSelector} summary`)

      // ------------------------------------------------------------
      // Focus the summary and open the details using keyboard
      // ------------------------------------------------------------
      await dropdownSummary.focus()
      await expect(dropdownSummary).toBeFocused()

      await dropdownSummary.press('Enter')
      await expect(dropdown).toHaveAttribute('open', '')

      // ------------------------------------------------------------
      // Validate that the language options are now available
      // ------------------------------------------------------------
      await expect(dropdown.locator('ul a')).toHaveCount(4)
    })

    test('validate expected languages are present in header language selector', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const dropdownSelector = '[aria-label="language selector"]'
      const root = await findContextBySelector(page, dropdownSelector)

      // ------------------------------------------------------------
      // Open the language dropdown
      // ------------------------------------------------------------
      const dropdown = root.locator(dropdownSelector)
      await dropdown.locator('summary').click()

      // ------------------------------------------------------------
      // Define the list of expected languages
      // ------------------------------------------------------------
      const expectedLanguages = [
        'Español',
        '繁體中文',
        'Filipino',
        'Tiếng Việt'
      ]

      // ------------------------------------------------------------
      // Collect all language link texts within the dropdown
      // ------------------------------------------------------------
      const languageItems = await dropdown.locator('ul a').allTextContents()

      // ------------------------------------------------------------
      // Validate each expected language is present
      // ------------------------------------------------------------
      for (const language of expectedLanguages) {
        expect(languageItems).toContain(language)
      }
    })

    test('validate that focus-related CSS rules exist in stylesheets', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const hasStyles = async (ctx: any) =>
        await ctx.evaluate(() => document.styleSheets.length > 0)

      const root = await findContext(page, hasStyles)

      // ------------------------------------------------------------
      // Validate that focus-related selectors exist in stylesheets
      // ------------------------------------------------------------
      const focusIndicatorStylesExist = await root.evaluate(() => {
        const styleSheets = Array.from(document.styleSheets)

        return styleSheets.some((sheet) => {
          try {
            const rules = Array.from(sheet.cssRules || [])
            return rules.some((rule) => {
              const cssText = rule.cssText
              return (
                cssText.includes(':focus') ||
                cssText.includes(':focus-visible') ||
                cssText.includes('outline:') ||
                cssText.includes('border:') ||
                cssText.includes('box-shadow:')
              )
            })
          } catch {
            // Ignore cross-origin stylesheets
            return false
          }
        })
      })

      expect(focusIndicatorStylesExist).toBe(true)
    })

    test.skip('validate that focused links have a visible focus indicator with sufficient contrast', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const root = await findContextBySelector(page, 'a[href]')

      // ------------------------------------------------------------
      // Minimum WCAG contrast ratio for non-text UI indicators
      // ------------------------------------------------------------
      const minContrastRatio = 3

      // ------------------------------------------------------------
      // Collect all visible links with href attributes
      // ------------------------------------------------------------
      const links = root.locator('a[href]')
      const linkCount = await links.count()

      // ------------------------------------------------------------
      // Focus each link and validate focus indicator styles
      // ------------------------------------------------------------
      for (let i = 0; i < linkCount; i++) {
        const link = links.nth(i)

        if (!(await link.isVisible())) continue
        if ((await link.getAttribute('tabindex')) === '-1') continue

        await link.focus()

        const styles = await link.evaluate((el: HTMLElement) => {
          const computed = window.getComputedStyle(el)

          return {
            outlineStyle: computed.outlineStyle,
            outlineWidth: computed.outlineWidth,
            outlineColor: computed.outlineColor,
            borderTopColor: computed.borderTopColor,
            borderRightColor: computed.borderRightColor,
            borderBottomColor: computed.borderBottomColor,
            borderLeftColor: computed.borderLeftColor,
            boxShadow: computed.boxShadow,
            backgroundColor: computed.backgroundColor
          }
        })

        // ----------------------------------------------------------
        // Test outline-color when a visible outline is present
        // ----------------------------------------------------------
        let indicatorColor: string | null = null

        const hasVisibleOutline =
          styles.outlineStyle !== 'none' &&
          styles.outlineWidth !== '0px' &&
          styles.outlineColor &&
          styles.outlineColor !== 'transparent'

        if (hasVisibleOutline) {
          indicatorColor = styles.outlineColor
        }

        // ----------------------------------------------------------
        // Otherwise fall back to border-color if present
        // ----------------------------------------------------------
        if (!indicatorColor) {
          const borderColors = [
            styles.borderTopColor,
            styles.borderRightColor,
            styles.borderBottomColor,
            styles.borderLeftColor
          ].filter((color) => color && color !== 'transparent')

          if (borderColors.length > 0) {
            indicatorColor = borderColors[0]
          }
        }

        // ----------------------------------------------------------
        // Or try to extract a color from box-shadow
        // ----------------------------------------------------------
        if (
          !indicatorColor &&
          styles.boxShadow &&
          styles.boxShadow !== 'none'
        ) {
          const match = styles.boxShadow.match(
            /(rgb[a]?\([^)]+\)|#[0-9a-fA-F]{3,8})/
          )
          if (match) {
            indicatorColor = match[1]
          }
        }

        expect(
          indicatorColor,
          `Focused link "${(await link.textContent()) || ''}" (href: "${
            (await link.getAttribute('href')) || ''
          }") does not appear to have an outline-color, border-color, or box-shadow focus indicator.`
        ).toBeTruthy()

        const contrastRatio = tinycolor.readability(
          tinycolor(indicatorColor as string),
          tinycolor(styles.backgroundColor)
        )

        expect(
          contrastRatio,
          `Focused link "${(await link.textContent()) || ''}" (href: "${
            (await link.getAttribute('href')) || ''
          }") has a focus indicator contrast ratio of ${contrastRatio.toFixed(
            2
          )}, which is below the required minimum of ${minContrastRatio}.`
        ).toBeGreaterThanOrEqual(minContrastRatio)
      }
    })

    test('validate that non-descriptive links have descriptive aria labels', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const root = await findContextBySelector(page, 'a')

      // ------------------------------------------------------------
      // Specify the non-descriptive link texts to check for
      // ------------------------------------------------------------
      const nonDescriptiveLinkTexts = [
        'Learn more',
        'Read more',
        'View more',
        'More',
        'View all',
        'Details',
        'View details',
        'See more',
        'See all'
      ]

      // ------------------------------------------------------------
      // Validate that each non-descriptive link has either
      // aria-label or aria-describedby
      // ------------------------------------------------------------
      for (const linkText of nonDescriptiveLinkTexts) {
        const links = root.locator(`a:has-text("${linkText}")`)
        const count = await links.count()

        for (let i = 0; i < count; i++) {
          const link = links.nth(i)
          const text = (await link.textContent())?.trim()

          if (text !== linkText) continue

          const ariaLabel = await link.getAttribute('aria-label')
          const ariaDescribedBy = await link.getAttribute('aria-describedby')

          expect(
            !!ariaLabel || !!ariaDescribedBy,
            `Non-descriptive link "${linkText}" found without aria-label or aria-describedby.`
          ).toBe(true)
        }
      }
    })

    test('validate that scope attributes are present in data tables', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const mainSelector = 'main'
      const root = await findContextBySelector(page, mainSelector)

      // ------------------------------------------------------------
      // Locate all table header cells (<th>) in the rendered content
      // ------------------------------------------------------------
      const tableHeaders = root.locator('th')
      const validScopes = ['col', 'row']

      // ------------------------------------------------------------
      // Validate that each <th> has a valid scope attribute
      // ------------------------------------------------------------
      for (let i = 0; i < (await tableHeaders.count()); i++) {
        const scopeAttr = await tableHeaders.nth(i).getAttribute('scope')

        expect(
          scopeAttr,
          `Missing scope attribute on <th> element at index ${i}`
        ).not.toBeNull()

        expect(
          validScopes,
          `Invalid scope attribute value on <th> element at index ${i}: ${scopeAttr}`
        ).toContain(scopeAttr)
      }
    })

    test('validate that links receive keyboard focus', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const root = await findContextBySelector(page, 'a[href]:not([href=""])')

      // ------------------------------------------------------------
      // Collect only valid links on the page
      // ------------------------------------------------------------
      const links = root.locator('a[href]:not([href=""])')
      const linkCount = await links.count()

      // ------------------------------------------------------------
      // Collect failures so the test can report all problematic links
      // at once with clearer diagnostics
      // ------------------------------------------------------------
      const failures: string[] = []

      // ------------------------------------------------------------
      // Validate that each visible, focusable valid link can receive focus
      // ------------------------------------------------------------
      for (let i = 0; i < linkCount; i++) {
        const link = links.nth(i)

        const isVisible = await link.isVisible()
        const isDisabled = (await link.getAttribute('disabled')) !== null
        const isTabDisabled = (await link.getAttribute('tabindex')) === '-1'

        if (!isVisible || isDisabled || isTabDisabled) {
          continue
        }

        const text = ((await link.textContent()) || '').trim()
        const ariaLabel = ((await link.getAttribute('aria-label')) || '').trim()
        const href = ((await link.getAttribute('href')) || '').trim()
        const outerHTML = await link.evaluate((el: HTMLElement) => el.outerHTML)

        const linkName = ariaLabel || text || '[no accessible text found]'

        await link.focus()

        const isFocused = await link.evaluate(
          (el: HTMLElement) => document.activeElement === el
        )

        if (!isFocused) {
          failures.push(
            [
              `Link ${i + 1}: "${linkName}"`,
              `href: "${href}"`,
              `outerHTML: ${outerHTML}`
            ].join('\n')
          )
        }
      }

      // ------------------------------------------------------------
      // Fail once with a human-readable summary of all failures
      // ------------------------------------------------------------
      expect(
        failures,
        failures.length
          ? `The following valid link(s) did not receive keyboard focus:\n\n${failures.join(
              '\n\n'
            )}`
          : ''
      ).toEqual([])
    })

    test.skip('validate presence of aria labels in footer navigation', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const footerSelector = 'footer'
      let footer = page.locator(footerSelector)

      if ((await footer.count()) === 0) {
        for (const f of page.frames()) {
          const candidate = f.locator(footerSelector)
          if ((await candidate.count()) > 0) {
            footer = candidate
            break
          }
        }
      }

      // ------------------------------------------------------------
      // Locate footer navigation elements
      // ------------------------------------------------------------
      const footerNavs = footer.locator('nav')

      // ------------------------------------------------------------
      // Validate aria-labels for footer navigation
      // ------------------------------------------------------------
      await expect(footerNavs.nth(0)).toHaveAttribute(
        'aria-label',
        'Primary Footer Navigation'
      )

      await expect(footerNavs.nth(1)).toHaveAttribute(
        'aria-label',
        'Secondary Social Media Footer Navigation'
      )
    })

    test('validate that referenced ids are unique', async ({ mount, page }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const root = await findContextBySelector(page, '[id]')

      // ------------------------------------------------------------
      // Collect all non-empty ids and all referenced ids from
      // accessibility and navigation-related attributes
      // ------------------------------------------------------------
      const { ids, referencedIds } = await root.evaluate(() => {
        const ids = Array.from(document.querySelectorAll('[id]'))
          .map((el) => el.id.trim())
          .filter((id) => id !== '')

        const referencedIds = new Set<string>()

        const addTokens = (value: string | null) => {
          if (!value) return
          value
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .forEach((token) => referencedIds.add(token))
        }

        document.querySelectorAll('[aria-labelledby]').forEach((el) => {
          addTokens(el.getAttribute('aria-labelledby'))
        })

        document.querySelectorAll('[aria-describedby]').forEach((el) => {
          addTokens(el.getAttribute('aria-describedby'))
        })

        document.querySelectorAll('label[for]').forEach((el) => {
          const value = el.getAttribute('for')
          if (value?.trim()) referencedIds.add(value.trim())
        })

        document.querySelectorAll('a[href^="#"]').forEach((el) => {
          const href = el.getAttribute('href')
          if (href && href.length > 1) {
            referencedIds.add(href.slice(1).trim())
          }
        })

        return {
          ids,
          referencedIds: Array.from(referencedIds)
        }
      })

      // ------------------------------------------------------------
      // Detect duplicate IDs that are actually referenced by
      // accessibility or navigation relationships
      // ------------------------------------------------------------
      const seen = new Map<string, number>()
      const duplicates: string[] = []

      for (const id of ids) {
        const count = seen.get(id) || 0
        seen.set(id, count + 1)

        if (count === 1 && referencedIds.includes(id)) {
          duplicates.push(id)
        }
      }

      // ------------------------------------------------------------
      // Assert that no referenced duplicate IDs are present
      // ------------------------------------------------------------
      expect(
        duplicates.length,
        `Referenced duplicate IDs found: ${duplicates.join(', ')}`
      ).toBe(0)
    })

    test('validate that lang attributes are present in header', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const langLinks = {
        es: 'Español',
        'zh-hant': '繁體中文',
        fil: 'Filipino',
        'vi-vn': 'Tiếng Việt'
      }

      const navSelector = 'nav[aria-label="Primary Header Navigation"]'
      const root = await findContextBySelector(page, navSelector)

      // ------------------------------------------------------------
      // Find the language selector within the same context
      // ------------------------------------------------------------
      const dropdown = root.locator('[aria-label="language selector"]')

      // ------------------------------------------------------------
      // Validate total number of language links
      // ------------------------------------------------------------
      await expect(dropdown.locator('ul a')).toHaveCount(
        Object.keys(langLinks).length
      )

      // ------------------------------------------------------------
      // Validate expected language links and lang attributes
      // ------------------------------------------------------------
      for (const [lang, text] of Object.entries(langLinks)) {
        await expect(
          dropdown.locator(`a[lang="${lang}"]`, { hasText: text }),
          `Missing or incorrect <a lang="${lang}">${text}</a> in header nav`
        ).toHaveCount(1)
      }
    })

    test('validate that aria labels are present in the expandable header navigation menus', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const navSelector = 'nav[aria-label="Primary Header Navigation"]'
      const root = await findContextBySelector(page, navSelector)

      const nav = root.locator(navSelector)
      await expect(nav).toHaveCount(1)

      // ------------------------------------------------------------
      // Open ALL duplicates of each top nav menu (<details>)
      // so submenu links render
      // ------------------------------------------------------------
      const menuLabels = ['Services', 'Departments', 'Contact'] as const

      for (const label of menuLabels) {
        const details = root.locator(`details[aria-label="${label}"]`)
        expect(await details.count()).toBeGreaterThan(0)

        await details.evaluateAll((els: HTMLDetailsElement[]) => {
          els.forEach((el) => el.setAttribute('open', ''))
        })
      }

      // ------------------------------------------------------------
      // Validate aria-labels WITHOUT hard-coding:
      // For each menu, ensure at least one link has an aria-label
      // matching: "List with <number> items. <some text>"
      // ------------------------------------------------------------
      const listLabelPattern = /^List with \d+ items\.\s*\S/

      for (const label of menuLabels) {
        const menus = nav.locator(`details[aria-label="${label}"]`)
        const menuCount = await menus.count()
        expect(menuCount).toBeGreaterThan(0)

        let found = false

        for (let i = 0; i < menuCount && !found; i++) {
          const links = menus.nth(i).locator('a[aria-label^="List with "]')
          const linkCount = await links.count()

          for (let j = 0; j < linkCount; j++) {
            const aria = await links.nth(j).getAttribute('aria-label')
            if (aria && listLabelPattern.test(aria)) {
              found = true
              break
            }
          }
        }

        expect(found).toBe(true)
      }
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

    test('validate required ARIA attribute and landmark role in the navigation landmark', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const root = await findContext(
        page,
        async (ctx: any) => (await ctx.getByRole('banner').count()) > 0
      )

      // ------------------------------------------------------------
      // Locate header and primary navigation landmarks
      // ------------------------------------------------------------
      const header = root.getByRole('banner')
      const primaryNav = header.getByRole('navigation', {
        name: 'Primary Header Navigation'
      })

      // ------------------------------------------------------------
      // Validate visibility of landmarks
      // ------------------------------------------------------------
      await expect(header).toBeVisible()
      await expect(primaryNav).toBeVisible()

      // ------------------------------------------------------------
      // Validate required ARIA attributes
      // ------------------------------------------------------------
      await expect(primaryNav).toHaveAttribute(
        'aria-label',
        'Primary Header Navigation'
      )
    })

    test('validate that the feedback form trigger button is fully accessible', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const buttonName = /did you find what you needed\?/i
      const root = await findContext(
        page,
        async (ctx: any) =>
          (await ctx.getByRole('button', { name: buttonName }).count()) > 0
      )

      // ------------------------------------------------------------
      // Locate the feedback modal trigger button
      // ------------------------------------------------------------
      const openModalButton = root.getByRole('button', { name: buttonName })

      // ------------------------------------------------------------
      // Validate visibility and enabled state
      // ------------------------------------------------------------
      await expect(openModalButton).toBeVisible()
      await expect(openModalButton).toBeEnabled()

      // ------------------------------------------------------------
      // Validate required ARIA attributes
      // ------------------------------------------------------------
      await expect(openModalButton).toHaveAttribute('aria-haspopup', 'dialog')

      // ------------------------------------------------------------
      // Validate keyboard focus behavior
      // ------------------------------------------------------------
      await openModalButton.focus()
      await expect(openModalButton).toBeFocused()

      // ------------------------------------------------------------
      // Activate the button using keyboard (Enter key)
      // ------------------------------------------------------------
      await page.keyboard.press('Enter')
    })

    test.skip('validate that search autocomplete features are present', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const selector = 'input[placeholder="Search"]'
      const root = await findContextBySelector(page, selector)

      // ------------------------------------------------------------
      // Locate the search input
      // ------------------------------------------------------------
      const searchInput = root.locator(selector)

      // ------------------------------------------------------------
      // Validate visibility of the input
      // ------------------------------------------------------------
      await expect(searchInput).toBeVisible()

      // ------------------------------------------------------------
      // Validate required ARIA attributes for autocomplete
      // ------------------------------------------------------------
      await expect(searchInput).toHaveAttribute('role', 'combobox')
      await expect(searchInput).toHaveAttribute('aria-autocomplete', 'both')
    })

    test('validate that all button elements have descriptive text labels', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const root = await findContextBySelector(page, 'button')

      // ------------------------------------------------------------
      // Specify non-descriptive button texts to check
      // ------------------------------------------------------------
      const nonDescriptiveButtonTexts = [
        'Learn more',
        'Read more',
        'View more',
        'More',
        'View all',
        'Details',
        'View details',
        'See more',
        'See all'
      ]

      // ------------------------------------------------------------
      // Validate that non-descriptive buttons have accessible names
      // ------------------------------------------------------------
      for (const text of nonDescriptiveButtonTexts) {
        const buttons = root.locator(`button:has-text("${text}")`)
        const count = await buttons.count()

        for (let i = 0; i < count; i++) {
          const button = buttons.nth(i)
          const label = (await button.textContent())?.trim()

          // Ensure exact match (avoids partial matches like "Learn more about...")
          if (label !== text) continue

          const ariaLabel = await button.getAttribute('aria-label')
          const ariaDescribedBy = await button.getAttribute('aria-describedby')

          expect(
            !!ariaLabel || !!ariaDescribedBy,
            `Non-descriptive <button> with text "${text}" found without aria-label or aria-describedby.`
          ).toBe(true)
        }
      }
    })

    test.skip('validate that all link tags include an href attribute and link text', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const root = await findContextBySelector(page, 'a')

      // ------------------------------------------------------------
      // Collect all link elements
      // ------------------------------------------------------------
      const links = root.locator('a')
      const linkCount = await links.count()

      // ------------------------------------------------------------
      // Validate that each link has an href and visible text
      // ------------------------------------------------------------
      for (let i = 0; i < linkCount; i++) {
        const link = links.nth(i)

        const href = await link.getAttribute('href')
        expect(
          href,
          'Link is missing href attribute or it is empty'
        ).toBeTruthy()

        const visibleText = (await link.innerText()).trim()
        expect(visibleText, 'Link has no visible label').not.toBe('')
      }
    })

    test('validates that all iframe elements include a title attribute', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const root = await findContextBySelector(page, 'iframe')

      // ------------------------------------------------------------
      // Collect all iframe elements
      // ------------------------------------------------------------
      const iframes = root.locator('iframe')
      const iframeCount = await iframes.count()

      // ------------------------------------------------------------
      // Validate that each iframe has a non-empty title attribute
      // ------------------------------------------------------------
      for (let i = 0; i < iframeCount; i++) {
        const title = await iframes.nth(i).getAttribute('title')

        expect(
          title,
          `Iframe at index ${i} is missing a title attribute or it is empty`
        ).toBeTruthy()
      }
    })

    test.skip('validate the correct alt text for the logo in the global footer', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      // ------------------------------------------------------------
      // Find the CT frame that contains the footer
      // ------------------------------------------------------------

      const selector = 'footer[role="contentinfo"] img'
      const root = await findContextBySelector(page, selector)

      // ------------------------------------------------------------
      // Validate the alt text for the footer logo
      // ------------------------------------------------------------
      const alt = await root.locator(selector).getAttribute('alt')

      expect(alt).toBe('City and County of San Francisco')
    })

    test.skip('validate the correct alt text for the logo in the global header', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      // ------------------------------------------------------------
      // Find the CT frame that contains the primary header navigation
      // ------------------------------------------------------------
      const selector =
        'nav[role="navigation"][aria-label="Primary Header Navigation"] img'
      const root = await findContextBySelector(page, selector)

      // ------------------------------------------------------------
      // Validate the alt text for the header logo
      // ------------------------------------------------------------
      const alt = await root.locator(selector).getAttribute('alt')

      expect(alt).toBe('City and County of San Francisco')
    })

    test.skip('validate the correct aria label attributes for social media links', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      // ------------------------------------------------------------
      // Find the CT iframe frame that contains the footer
      // ------------------------------------------------------------
      const root = await findContextBySelector(page, 'footer a[aria-label]')

      // ------------------------------------------------------------
      // Define expected aria-label values for social links
      // ------------------------------------------------------------
      const footerLinks = [
        'sf.gov facebook',
        'sf.gov instagram',
        'sf.gov threads',
        'sf.gov twitter'
      ]

      // ------------------------------------------------------------
      // Validate each social link has the correct aria-label
      // ------------------------------------------------------------
      for (const label of footerLinks) {
        const link = root.locator(`footer a[aria-label="${label}"]`)
        const aria = await link.getAttribute('aria-label')

        expect(aria).toBe(label)
      }
    })

    test('validate the correct aria label attribute for search button', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const selector = 'header form button[type="submit"]'
      const root = await findContextBySelector(page, selector)

      // ------------------------------------------------------------
      // Validate the aria-label for each search button
      // ------------------------------------------------------------
      const buttons = root.locator(selector)
      const buttonCount = await buttons.count()

      for (let i = 0; i < buttonCount; i++) {
        const aria = await buttons.nth(i).getAttribute('aria-label')
        expect(aria).toBe('search')
      }
    })

    test.skip('validate a logical reading order in the global footer', async ({
      mount,
      page
    }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      const footerSelector = 'footer'
      const root = await findContextBySelector(page, footerSelector)

      // ------------------------------------------------------------
      // Locate the footer landmark
      // ------------------------------------------------------------
      const footer = root.locator(footerSelector)

      // ------------------------------------------------------------
      // Validate expected section headings in the footer
      // ------------------------------------------------------------
      await expect(footer.locator('h2', { hasText: 'Our City' })).toBeVisible()
      await expect(footer.locator('h2', { hasText: 'Languages' })).toBeVisible()
      await expect(footer.locator('h2', { hasText: 'Policy' })).toBeVisible()
    })

    test('validate axe core accessibility tests', async ({ mount, page }) => {
      const data = factory.make()
      await mount(<Component page={data} />)

      await page.waitForLoadState('domcontentloaded')

      // ------------------------------------------------------------
      // Run axe-core accessibility tests
      // ------------------------------------------------------------
      const results = await new AxeBuilder({ page }).analyze()

      // ------------------------------------------------------------
      // Log violations for debugging (if present)
      // ------------------------------------------------------------
      if (results.violations.length) {
        console.log(results.violations)
        console.log(results.violations[0].nodes)
      }

      // ------------------------------------------------------------
      // Validate that no accessibility violations are found
      // ------------------------------------------------------------
      expect(results.violations.length).toBe(0)
    })
  })
}
