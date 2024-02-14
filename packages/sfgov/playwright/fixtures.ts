import { AxeBuilder } from '@axe-core/playwright'
import { expect as baseExpect } from '@playwright/experimental-ct-react'
import type { Page } from '@playwright/test'

export { test } from '@playwright/experimental-ct-react'

export const expect = baseExpect.extend({
  async toHaveLogicalReadingOrder(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrder'
    let pass: boolean
    let matcherResult: any
    try {
      // We have to wait for an element we know is on the page to load
      // before querying, otherwise `getByRole` won't retrieve elements
      const h1 = await page.waitForSelector('h1')

      // Get all the headings on the page
      const headings = await page.getByRole('heading')
      let previousHeadingLevel = 0
      let isHeadingOrderCorrect = true
      const count = await headings.count()
      for (let i = 0; i < count; i++) {
        const element = headings.nth(i)
        const tagName = await element.evaluate((heading) => heading.tagName)
        const currentHeadingLevel = parseInt(tagName.charAt(1))
        if (currentHeadingLevel < previousHeadingLevel) {
          isHeadingOrderCorrect = false
        }
        previousHeadingLevel = currentHeadingLevel
        baseExpect(isHeadingOrderCorrect).toBeTruthy()
      }
      pass = true
    } catch (e: any) {
      matcherResult = e.matcherResult
      pass = false
    }

    const message = pass
      ? (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: ${this.isNot ? 'not' : ''} true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')
      : (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual
    }
  },
  async toHaveLandmarks(page: Page) {
    const assertionName = 'toHaveLandmarks'
    let pass: boolean
    let matcherResult: any
    try {
      baseExpect(page.locator('header')).toBeVisible()
      baseExpect(page.locator('banner')).toBeVisible()
      baseExpect(page.locator('nav')).toBeVisible()
      baseExpect(page.locator('main')).toBeVisible()
      baseExpect(page.locator('footer')).toBeVisible()
      baseExpect(page.locator('aside')).toBeVisible()
      pass = true
    } catch (e: any) {
      matcherResult = e.matcherResult
      pass = false
    }

    const message = pass
      ? (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: ${this.isNot ? 'not' : ''} true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')
      : (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual
    }
  },

  async toBeKeyboardAccessible(page: Page) {
    const assertionName = 'toBeKeyboardAccessible'
    let pass: boolean
    let matcherResult: any
    try {
      // Check for basic focus behavior
      await page.keyboard.press('Tab')
      const focusedElement = await page.$(':focus')
      const indicatorStyle = await focusedElement?.evaluate((element) => {
        const computedStyle = getComputedStyle(element)
        return computedStyle.outline
      })
      baseExpect(indicatorStyle).not.toBe('none')

      // Checks that keyboard focus classes are present in stylesheet
      const styleSheetContents = await page.evaluate(() => {
        const styleSheets = Array.from(document.styleSheets)
        return styleSheets
          .filter((sheet) => sheet.href)
          .map((sheet) => {
            const rules = Array.from(sheet.cssRules).map((rule) => rule.cssText)
            return { href: sheet.href, rules }
          })
      })
      const focusIndicatorStylesExist = styleSheetContents.some((sheet) => {
        return sheet.rules.some((rule) => {
          return (
            rule.includes(':focus') ||
            rule.includes('outline:') ||
            rule.includes('border:')
          )
        })
      })
      baseExpect(focusIndicatorStylesExist).toBe(true)

      // Checks that keyboard focus selectors are present
      baseExpect(page.locator(':focus')).toBeVisible()
      baseExpect(page.locator('outline:')).toBeVisible()
      baseExpect(page.locator('border:')).toBeVisible()
      pass = true
    } catch (e: any) {
      matcherResult = e.matcherResult
      pass = false
    }

    const message = pass
      ? (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: ${this.isNot ? 'not' : ''} true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')
      : (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual
    }
  },

  async toHaveSearchLandmarksPlusAria(page: Page) {
    const assertionName = 'toHaveSearchLandmarksPlusAria'
    let pass: boolean
    let matcherResult: any
    try {
      baseExpect(page.locator('[aria-autocomplete="both"]')).toBeVisible()
      baseExpect(page.locator('[role="combobox"]')).toBeVisible()
      baseExpect(page.locator('[role="search"]')).toBeVisible()
      baseExpect(page.locator('[aria-owns]')).toBeVisible()
      baseExpect(page.locator('[aria-expanded]')).toBeVisible()
      pass = true
    } catch (e: any) {
      matcherResult = e.matcherResult
      pass = false
    }

    const message = pass
      ? (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: ${this.isNot ? 'not' : ''} true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')
      : (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual
    }
  },

  async toHavePrefersReducedMotion(page: Page) {
    const assertionName = 'toHavePrefersReducedMotion'
    let pass: boolean
    let matcherResult: any
    try {
      const styleSheetContents = await page.evaluate(() => {
        const styleSheets = Array.from(document.styleSheets)
        return styleSheets
          .filter((sheet) => sheet.href)
          .map((sheet) => {
            const rules = Array.from(sheet.cssRules).map((rule) => rule.cssText)
            return { href: sheet.href, rules }
          })
      })
      const prefersReducedMotionStylesExist = styleSheetContents.some(
        (sheet) => {
          return sheet.rules.some((rule) => {
            return (
              rule.includes('prefers-reduced-motion:') ||
              rule.includes('reduce')
            )
          })
        }
      )
      baseExpect(prefersReducedMotionStylesExist).toBe(true)
      pass = true
    } catch (e: any) {
      matcherResult = e.matcherResult
      pass = false
    }

    const message = pass
      ? (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: ${this.isNot ? 'not' : ''} true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')
      : (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual
    }
  },

  async toHaveLanguageAccess(page: Page) {
    const assertionName = 'toHaveLanguageAccess'
    let pass: boolean
    let matcherResult: any
    try {
      baseExpect(page.locator('[en|en]')).toBeVisible()
      baseExpect(page.locator('[en|es]')).toBeVisible()
      baseExpect(page.locator('[en|zh-TW]')).toBeVisible()
      baseExpect(page.locator('[en|tl]')).toBeVisible()
      pass = true
    } catch (e: any) {
      matcherResult = e.matcherResult
      pass = false
    }

    const message = pass
      ? (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: ${this.isNot ? 'not' : ''} true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')
      : (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual
    }
  },

  async toHaveLanguageInteraction(page: Page) {
    const assertionName = 'toHaveLanguageInteraction'
    let pass: boolean
    let matcherResult: any
    try {
      const dropdownSelector = 'select#language-dropdown' // Replace with selector

      // Wait for the dropdown menu to appear
      await page.waitForSelector(dropdownSelector)

      // Click on the dropdown to open it
      await page.click(dropdownSelector)

      // Emulate keyboard interactions to select a language
      await page.keyboard.press('ArrowDown') // Navigate down to the desired option
      await page.keyboard.press('Enter') // Select the option by pressing Enter

      pass = true
    } catch (e: any) {
      matcherResult = e.matcherResult
      pass = false
    }

    const message = pass
      ? (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: ${this.isNot ? 'not' : ''} true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')
      : (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual
    }
  },

  async toHaveLanguageAccessInDropdownmenu(page: Page) {
    const assertionName = 'toHaveLanguageAccessInDropdownmenu'
    let pass: boolean
    let matcherResult: any
    try {
      // Replace 'your_dropdown_selector'
      // with the name of our dropdown menu selector
      const dropdownSelector = 'your_dropdown_selector'

      // Get the available options in the dropdown
      const options = await page.$$eval(
        `${dropdownSelector} option`,
        (options) => options.map((option) => option.textContent)
      )

      // List of languages to validate
      const languagesToValidate = ['English', 'Spanish', 'Chinese', 'Filipino']

      // Validate if each language is available in the dropdown
      for (const language of languagesToValidate) {
        if (!options.includes(language)) {
          console.error(
            `Language '${language}' is not available in the dropdown.`
          )
        } else {
          console.log(`Language '${language}' is available.`)
        }
      }

      pass = true
    } catch (e: any) {
      matcherResult = e.matcherResult
      pass = false
    }

    const message = pass
      ? (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: ${this.isNot ? 'not' : ''} true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')
      : (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual
    }
  },

  async toPassA11yScan(page: Page) {
    const assertionName = 'toPassA11yScan'
    let pass: boolean
    let matcherResult: any
    try {
      // @ts-expect-error erg
      const results = await new AxeBuilder({ page }).analyze()
      if (results.violations.length) {
        console.log(results.violations)
      }
      baseExpect(results.violations.length).toBe(0)
      pass = true
    } catch (e: any) {
      matcherResult = e.matcherResult
      pass = false
    }

    const message = pass
      ? (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: ${this.isNot ? 'not' : ''} true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')
      : (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          `Expected: true\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.pass)}`
            : '')

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual
    }
  }
})
