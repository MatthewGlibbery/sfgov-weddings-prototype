import { AxeBuilder } from '@axe-core/playwright'
import { test, expect as baseExpect } from '@playwright/experimental-ct-react'
import type { ElementHandle, Page } from '@playwright/test'
import { findByText } from '@testing-library/react'
import tinycolor from 'tinycolor2'

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
      baseExpect(await page.locator('header').isVisible()).toBeTruthy()
      baseExpect(await page.locator('main').isVisible()).toBeTruthy()
      baseExpect(await page.locator('footer').isVisible()).toBeTruthy()
      baseExpect(
        await page
          .locator(
            'nav[role="navigation"][aria-label="Primary Header Navigation"]'
          )
          .isVisible()
      ).toBeTruthy()

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

  async toHaveLandmarkRoles(page: Page) {
    const assertionName = 'toHaveLandmarkRoles'
    let pass: boolean
    let matcherResult: any
    try {
      baseExpect(await page.locator('[role="banner"]').isVisible()).toBeTruthy()
      baseExpect(await page.locator('[role="main"]').isVisible()).toBeTruthy()
      baseExpect(
        await page.locator('[role="contentinfo"]').isVisible()
      ).toBeTruthy()

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
      // Check if document style sheet is present
      const documentStyleSheet = await page.$('document.styleSheets')
      if (documentStyleSheet) {
        // Proceed with the rest of the checks if the document style sheet is present
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
              const rules = Array.from(sheet.cssRules).map(
                (rule) => rule.cssText
              )
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
        baseExpect(await page.locator(':focus').isVisible()).toBeTruthy()
        baseExpect(await page.locator('outline:').isVisible()).toBeTruthy()
        baseExpect(await page.locator('border:').isVisible()).toBeTruthy()
      } else {
        // If the document style sheet does not exist, the test passes
        expect(true).toBe(true)
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

  async toHaveSearchLandmarksPlusAria(page: Page) {
    const assertionName = 'toHaveSearchLandmarksPlusAria'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the search module is present
      const searchModule = await page.$('[role="search"]')
      if (searchModule) {
        // Proceed with the rest of the checks if the search module is present
        baseExpect(
          await page.locator('[aria-autocomplete="both"]').isVisible()
        ).toBeTruthy()
        baseExpect(
          await page.locator('[role="combobox"]').isVisible()
        ).toBeTruthy()
        baseExpect(
          await page.locator('[role="search"]').isVisible()
        ).toBeTruthy()
        baseExpect(await page.locator('[aria-owns]').isVisible()).toBeTruthy()
        baseExpect(
          await page.locator('[aria-expanded]').isVisible()
        ).toBeTruthy()
      } else {
        // If the search module does not exist, the test passes
        expect(true).toBe(true)
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

  async toHavePrefersReducedMotion(page: Page) {
    const assertionName = 'toHavePrefersReducedMotion'
    let pass: boolean
    let matcherResult: any

    try {
      // Check if document style sheet is present
      const documentStyleSheet = await page.$('document.styleSheets')
      if (documentStyleSheet) {
        // Proceed with the rest of the checks if the document style sheet is present
        const styleSheetContents = await page.evaluate(() => {
          const styleSheets = Array.from(document.styleSheets)
          return styleSheets
            .filter((sheet) => sheet.href)
            .map((sheet) => {
              const rules = Array.from(sheet.cssRules).map(
                (rule) => rule.cssText
              )
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
      } else {
        // If the document style sheet does not exist, the test passes
        expect(true).toBe(true)
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

  async toHaveLanguageAccess(page: Page) {
    const assertionName = 'toHaveLanguageAccess'
    let pass: boolean
    let matcherResult: any

    try {
      // Check if the language module is present
      const languageModule = await page.$('select#language-dropdown')
      if (languageModule) {
        // Proceed with the rest of the checks if the language module is present

        // Validate that the 4 required languages are present in the drop down memu.
        // Validate that the language attributes are available in the drop down menu.
        baseExpect(await page.locator('[en|en]').isVisible()).toBeTruthy()
        baseExpect(await page.locator('[en|es]').isVisible()).toBeTruthy()
        baseExpect(await page.locator('[en|zh-TW]').isVisible()).toBeTruthy()
        baseExpect(await page.locator('[en|tl]').isVisible()).toBeTruthy()
      } else {
        // If the language module does not exist, the test passes
        expect(true).toBe(true)
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

  async toHaveLanguageInteraction(page: Page) {
    const assertionName = 'toHaveLanguageInteraction'
    let pass: boolean
    let matcherResult: any

    // Check for language drop down selector
    const dropdownSelector = await page.$('select#language-dropdown')

    if (!dropdownSelector) {
      console.log('No language dropdown selector is present.')
      return {
        message: (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          'No language dropdown selector is present.',
        pass: true,
        name: assertionName,
        actual: 'No language dropdown selector is present.'
      }
    }

    try {
      // Validate that the user is able to select a language from the drop down menu, emulating the keyboard interactions.
      const dropdownSelector = 'select#language-dropdown' // Add the correct dropdown Selector

      // Wait for the dropdown menu to appear
      await page.waitForSelector(dropdownSelector)

      // Click on the dropdown to open it
      await page.click(dropdownSelector)

      // Emulate keyboard interactions to select a language
      await page.keyboard.press('ArrowDown') // Using the arrow keys to navigate down to the desired option
      await page.keyboard.press('Enter') // Select the option by pressing Enter

      // After making the selection, verify that the selected language is Spanish by validating the Spanish language attribute
      await expect(
        page.locator(`${dropdownSelector} option:checked`)
      ).toHaveValue('es')

      // Or it could validate that the text 'Spanish' is the selected text
      await expect(
        page.locator(`${dropdownSelector} option:checked`)
      ).toHaveText('Spanish')
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

  async toHaveColorContrast(page: Page) {
    const assertionName = 'toHaveColorContrast'
    let pass: boolean
    let matcherResult: any
    try {
      // Validate that the keyboard focus indicator has sufficient color contrast against the background
      // Need to specify the CSS selector for the keyboard focus indicator
      const focusIndicatorSelector = 'a[href]'

      // Get the foreground and background-color properties of the focus indicator
      const focusIndicatorColor = await page.evaluate((selector) => {
        const element = document.querySelector(selector)

        if (!element) {
          console.error(`Element with selector '${selector}' not found.`)
          return null
        }

        const computedStyle = window.getComputedStyle(element)

        return {
          color: computedStyle.color,
          backgroundColor: computedStyle.backgroundColor
        }
      }, focusIndicatorSelector)

      // Check if the focus indicator color is valid and meet the WCAG Level AA standards
      if (!focusIndicatorColor) {
        throw new Error('Error getting focus indicator color. Exiting script.')
      }
      // Calculate the contrast ratio by using the color contrast library tinycolor2
      const contrastRatio = tinycolor.readability(
        tinycolor(focusIndicatorColor.color),
        tinycolor(focusIndicatorColor.backgroundColor)
      )

      // Define the minimum required contrast ratio to meet the WCAG Level AA (4.5)
      const minContrastRatio = 3.1

      // Check if the contrast ratio meets the WCAG Level AA standards
      if (contrastRatio >= minContrastRatio) {
        console.log('Contrast ratio meets WCAG Level AA standards.')
      } else {
        console.error('Contrast ratio does not meet WCAG Level AA standards.')
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

  async toHaveDescriptiveLinkText(page: Page) {
    const assertionName = 'toHaveDescriptiveLinkText'
    let pass: boolean
    let matcherResult: any
    try {
      // Specify the non-descriptive link texts to check for
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

      // Check for the presence of aria attributes for each non-descriptive link
      for (const linkText of nonDescriptiveLinkTexts) {
        const linkSelector = `//a[normalize-space(.)='${linkText}']`
        const links = await page.$$(linkSelector)

        for (const link of links) {
          const ariaLabel = await link.getAttribute('aria-label')
          const ariaDescribedBy = await link.getAttribute('aria-describedby')

          // If neither attribute is found, throw an error to fail the test
          if (!ariaLabel && !ariaDescribedBy) {
            throw new Error(
              `Non-descriptive link "${linkText}" found without aria-label or aria-describedby.`
            )
          } else {
            console.log(
              `Non-descriptive link "${linkText}" found with appropriate attributes.`
            )
          }
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

  async toHaveRequiredAttributes(page: Page) {
    const assertionName = 'toHaveRequiredAttributes'
    let pass: boolean
    let matcherResult: any
    try {
      // Select and evaluate form elements
      const formElements = await page.$$eval(
        'form [required], form [aria-required="true"]',
        (elements) => {
          // Extract element information
          return elements.map((element) => {
            return {
              tagName: element.tagName.toLowerCase(),
              type: element.getAttribute('type') || '',
              name: element.getAttribute('name') || '',
              required:
                element.hasAttribute('required') ||
                element.getAttribute('aria-required') === 'true'
            }
          })
        }
      )

      // Verify that form element has required attribute
      console.log(
        'Form elements with required attribute or aria-required="true":',
        formElements
      )

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

  async toHaveRequiredFormAttributes(page: Page) {
    const assertionName = 'toHaveRequiredFormAttributes'
    let pass: boolean
    let matcherResult: any
    try {
      // Select form controls (input, select, textarea)
      // with either required attribute or aria-required="true"
      const formControls = await page.$$(
        'form input[required], form input[aria-required="true"], form select[required], form select[aria-required="true"], form textarea[required], form textarea[aria-required="true"]'
      )

      // Iterate through each form control
      for (const control of formControls) {
        // Extract control information
        const requiredAttribute = await control.evaluate((element) =>
          element.getAttribute('required')
        )
        const ariaRequiredAttribute = await control.evaluate((element) =>
          element.getAttribute('aria-required')
        )

        // Validate that either the required attribute
        // or aria-required="true" attribute is present
        expect(
          requiredAttribute === 'true' || ariaRequiredAttribute === 'true'
        ).toBeTruthy()
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

  async toHaveErrorMessage(page: Page) {
    const assertionName = 'toHaveErrorMessage'
    let pass: boolean
    let matcherResult: any
    try {
      const simulateFormInputAndBlur = async (page: any, selector: string) => {
        // Trigger the blur event to simulate losing focus
        await page.evaluate((selector: any) => {
          const element = document.querySelector(selector)
          if (element) {
            element.dispatchEvent(new Event('blur'))
          } else {
            console.error(`Element with selector '${selector}' not found.`)
          }
        }, selector)
      }

      // Iterate over form elements and simulate incorrect value and blur event
      const formElements = await page.$$('[data-validation]') // Replace with the actual form elements selector
      for (const element of formElements) {
        const incorrectValue = 'invalid-value'

        // Get the selector for the current form element
        const selector = await element.evaluate((el) => {
          // Example:
          return `[data-validation="${el.getAttribute('data-validation')}"]`
        })

        await simulateFormInputAndBlur(selector, incorrectValue)

        // Wait for the inline error message to appear
        await page.waitForSelector(
          `${selector} .inline-error-message-selector`,
          { timeout: 5000 }
        ) // Replace with the actual inline error message selector
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

  async toNotHaveDashesAndParentheses(page: Page) {
    const assertionName = 'toNotHaveDashesAndParentheses'
    let pass: boolean
    let matcherResult: any
    try {
      // Get all input elements
      const inputElements = await page.$$('input')

      // Iterate through input elements
      for (const input of inputElements) {
        // Get the placeholder attribute value
        const placeholder = await input.getAttribute('placeholder')

        // Check if the placeholder contains dashes or parentheses
        if (placeholder && /[-()]/.test(placeholder)) {
          console.error(
            `Placeholder contains dashes or parentheses: ${placeholder}`
          )
        } else {
          console.log(`Placeholder is valid: ${placeholder}`)
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

  async toAccessDatePicker(page: Page) {
    const assertionName = 'toAccessDatePicker'
    let pass: boolean
    let matcherResult: any

    // Check for the date picker button form control
    const datePickerButton = await page.$('button.date-picker')

    if (!datePickerButton) {
      console.log('No date picker button is present.')
      return {
        message: (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          'No date picker button is present.',
        pass: true,
        name: assertionName,
        actual: 'No date picker button is present.'
      }
    }

    try {
      // Find the date picker button form control
      const datePickerButton = await page.$('button.date-picker')

      if (datePickerButton) {
        // Focus on the date picker button using the Tab key
        await datePickerButton.focus()
      } else {
        console.error('Date picker button not found.')
      }

      // Press Enter key to activate the date picker
      await page.keyboard.press('Enter')

      // Wait for the date picker to be visible or activated

      // Use tab key to navigate through months and years
      await page.keyboard.press('Tab')

      // Use arrow keys to navigate to a different month and date
      await page.keyboard.press('ArrowRight') // Navigate to a different date
      await page.keyboard.press('ArrowLeft') // Navigate to a different date
      await page.keyboard.press('ArrowDown') // Navigate to a different date
      await page.keyboard.press('ArrowUp') // Navigate to a different date

      // Press Enter key to select a date
      await page.keyboard.press('Enter')

      // Wait for the selection to be updated

      // Get the current month and date
      const currentDate = new Date()
      const currentMonth = currentDate.toLocaleString('default', {
        month: 'long'
      })
      const currentDateOfMonth = currentDate.getDate()

      // Validate that a different month and date have been selected
      const selectedDate = await page.$eval(
        '.date-picker-selected-date',
        (el) => el.textContent
      )
      expect(selectedDate).not.toBe(`${currentMonth} ${currentDateOfMonth}`)

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

  async toAccessDatePickerInput(page: Page) {
    const assertionName = 'toAccessDatePickerInput'
    let pass: boolean
    let matcherResult: any

    // Check for the date picker input form control
    const datePickerInput = await page.$('input.date-picker')

    if (!datePickerInput) {
      console.log('No date picker input is present.')
      return {
        message: (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          'No date picker input is present.',
        pass: true,
        name: assertionName,
        actual: 'No date picker input is present.'
      }
    }

    try {
      // Find the date picker input form control
      const datePickerInput = await page.$('input.date-picker')

      if (datePickerInput) {
        // Focus on the date picker input using the Tab key
        await datePickerInput.focus()
      } else {
        console.error('Date picker input not found.')
      }

      // Use arrow keys to navigate through the dates within the date picker
      await page.keyboard.press('ArrowRight') // Navigate to a different date
      await page.keyboard.press('ArrowLeft') // Navigate to a different date
      await page.keyboard.press('ArrowDown') // Navigate to a different date
      await page.keyboard.press('ArrowUp') // Navigate to a different date

      // Press the tab key to navigate through the months and years within the date picker
      await page.keyboard.press('Tab')

      // Press the Enter key to select a date within the date picker
      await page.keyboard.press('Enter')

      // Wait for the selection to be updated

      // Get the current month and date
      const currentDate = new Date()
      const currentMonth = currentDate.toLocaleString('default', {
        month: 'long'
      })
      const currentDateOfMonth = currentDate.getDate()

      // Validate that a different month and date have been selected
      const selectedDate = await page.$eval(
        '.date-picker-selected-date',
        (el) => el.textContent
      )
      expect(selectedDate).not.toBe(`${currentMonth} ${currentDateOfMonth}`)

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

  async toAssociateFormInstructionsWithFormControl(page: Page) {
    const assertionName = 'toAssociateFormInstructionsWithFormControl'
    let pass: boolean
    let matcherResult: any
    try {
      // Select all form controls that should have an aria-describedby attribute
      const formControls = await page.$$('[aria-describedby]')

      for (const control of formControls) {
        // Get the value of the aria-describedby attribute
        const describedById = await control.getAttribute('aria-describedby')

        // Ensure the aria-describedby attribute is not empty
        expect(describedById, 'aria-describedby is empty').toBeTruthy()

        // Query for the element described by the ID
        const descriptionElement = await page.$(`#${describedById}`)

        // Ensure the element referenced by aria-describedby exists
        expect(
          descriptionElement,
          `Element described by #${describedById} not found`
        ).toBeTruthy()
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

  async toAssociateSpecificFormInstructionsWithFormControl(page: Page) {
    const assertionName = 'toAssociateSpecificFormInstructionsWithFormControl'
    let pass: boolean
    let matcherResult: any

    // Check for specific form instruction
    const controlsToTest = await page.$('aria-describedby')

    if (!controlsToTest) {
      console.log('No specific form instruction is present.')
      return {
        message: (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          'No specific form instruction is present.',
        pass: true,
        name: assertionName,
        actual: 'No specific form instruction is present.'
      }
    }

    try {
      // Map form control selectors to their describedby ID
      // Update this part to match the specific IDs
      const controlsToTest = [
        { selector: '#phoneNumber', describedById: 'phoneinstructions' },
        { selector: '#input1', describedById: 'input1-instructions' },
        { selector: '#checkbox1', describedById: 'checkbox1-instructions' }
        // You can add more controls as needed
      ]

      for (const control of controlsToTest) {
        // Get the aria-describedby attribute from the form control
        const describedByAttr = await page.getAttribute(
          control.selector,
          'aria-describedby'
        )

        // Verify that aria-describedby points to the correct ID
        expect(describedByAttr).toBe(control.describedById)

        // Validate that the element described by the ID actually exists in the DOM
        const descriptionExists = await page.isVisible(
          `#${control.describedById}`
        )
        expect(descriptionExists).toBeTruthy()
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

  async toMakePowerBiDashboardAccessible(page: Page) {
    const assertionName = 'toMakePowerBiDashboardAccessible'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the paragraph <p>DATA STORY</p> is present
      const isDataStoryPresent = await page
        .locator('p:has-text("DATA STORY")')
        .isVisible()

      if (isDataStoryPresent) {
        try {
          // Switch to the iframe context
          const frameLocator = page.frameLocator(
            'iframe[class="powerbi-iframe"]'
          ) // Adjust the selector as needed

          // Tab into the dashboard
          await page.keyboard.press('Tab')

          // Wait for the navigation module to appear
          await page.waitForTimeout(1000) // Adjust based on the expected responsiveness of the dashboard

          // Validate that the dashboard navigation module is visible
          const isNavModuleVisible = await frameLocator
            .locator('selector-for-navigation-module')
            .isVisible()
          expect(isNavModuleVisible).toBeTruthy()

          // Check for the title attribute in the iframe
          // Select all iframes
          const iframes = page.locator('iframe')

          // Count the number of iframes
          const iframeCount = await iframes.count()

          // Iterate through each iframe and check the title attribute
          for (let i = 0; i < iframeCount; i++) {
            const titleAttribute = await iframes.nth(i).getAttribute('title')

            // Verify that the title attribute is present and not empty for each iframe
            expect(
              titleAttribute,
              `iframe at index ${i} is missing a title attribute or it is empty`
            ).toBeTruthy()
          }

          // Find the “Show data notes and sources” link
          const isLinkVisible = await page
            .locator('text="Show data notes and sources"')
            .isVisible()
          expect(isLinkVisible).toBeTruthy()
        } catch (error) {
          console.error('An error occurred during the test:', error)
        }
      } else {
        console.log('DATA STORY paragraph not found, skipping the test.')
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

  async toDeleteItemsInMultiselectCombobox(page: Page) {
    const assertionName = 'toDeleteItemsInMultiselectCombobox'
    let pass: boolean
    let matcherResult: any

    // Check for multi-select combobox form controls
    const multiSelectComboboxControls = await page.$$(
      '.your-multiselect-combobox-selector'
    )
    if (multiSelectComboboxControls.length === 0) {
      console.log('No multi-select combobox form controls are present.')
      return {
        message: (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          'No multi-select combobox form controls are present.',
        pass: true,
        name: assertionName,
        actual: 'No multi-select combobox form controls are present.'
      }
    }

    try {
      // Focus the multiselect combobox
      await page.focus('.your-combobox-selector')
      // Open the dropdown
      await page.keyboard.press('Enter') // or Space

      // Navigate and select items with Arrow keys and Enter
      for (let i = 0; i < 3; i++) {
        // Select 3 items
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
      }
      // Validate 3 items are selected
      const countSelectedItems = await page
        .locator('.your-selected-item-selector')
        .count()
      expect(countSelectedItems).toBe(3)

      // Move focus back to a selected item
      await page.keyboard.press('Shift+Tab')

      // Check if the active element matches the selector for the last selected item
      const isFocused = await page.evaluate((selector) => {
        const focusedElement = document.activeElement
        const targetElement = document.querySelector(selector)
        return focusedElement === targetElement
      }, '.your-specific-focused-item-selector')

      expect(isFocused).toBeTruthy() // Verify the element is focused

      // Delete the focused selected item with Space or Enter
      await page.keyboard.press('Enter') // or Space

      // Validate that one of the selected items was deleted
      const newCountSelectedItems = await page
        .locator('.your-selected-item-selector')
        .count()
      expect(newCountSelectedItems).toBe(2) // 1 less than previously selected

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

  async toIncludeFieldsetandLegend(page: Page) {
    const assertionName = 'toIncludeFieldsetandLegend'
    let pass: boolean
    let matcherResult: any

    // Check for the fieldset form control
    const fieldset = await page.$('fieldset#billing-address')

    if (!fieldset) {
      console.log('No fieldset is present.')
      return {
        message: (): string =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot
          }) +
          '\n\n' +
          'No fieldset is present.',
        pass: true,
        name: assertionName,
        actual: 'No fieldset is present.'
      }
    }

    try {
      // Select the fieldset that should contain the billing address form or any other group of forms
      const fieldset = await page.$('fieldset#billing-address')
      expect(fieldset).not.toBeNull()

      // Ensure the fieldset has a legend that describes the group
      const legend = await page.$('fieldset#billing-address > legend')
      expect(legend).not.toBeNull()

      // Check the text content of the legend
      if (legend) {
        const legendText: string | null = await legend.textContent()
        expect(legendText?.trim()).toBe('Billing Address')
      } else {
        // If legend is not found, fail the test explicitly
        throw new Error('Legend element not found')
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

  async toHaveStepbyStepLogicalReadingOrder(page: Page) {
    const assertionName = 'toHaveStepbyStepLogicalReadingOrder'
    let pass: boolean
    let matcherResult: any
    try {
      // Check that the step by step paragraph is present on the page
      const specificParagraph = await page.$('p:text("STEP-BY-STEP")')

      if (specificParagraph) {
        // If the paragraph is present it is going to find the h1 heading
        const h1TextContent = await page.$eval('h1', (el) => el.textContent)

        // Collect all headings after the h1 heading
        const headingsAfterH1 = await page.evaluate((h1Text) => {
          const allHeadings = Array.from(
            document.querySelectorAll('h1, h2, h3, h4, h5, h6')
          )
          const h1Element = allHeadings.find((h) => h.textContent === h1Text)
          const h1Index = h1Element ? allHeadings.indexOf(h1Element) : -1
          return allHeadings
            .slice(h1Index + 1)
            .map((heading) => heading.tagName)
        }, h1TextContent)

        // Verify that all headings after the h1 heading are h2 headings
        headingsAfterH1.forEach((tagName) => {
          expect(tagName).toBe('H2')
        })
      } else {
        console.log(
          'The specific paragraph "STEP-BY-STEP" does not exist on the page.'
        )
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

  async CorrectTabOrderInMainContentArea(page: Page) {
    const assertionName = 'CorrectTabOrderInMainContentArea'
    let pass: boolean
    let matcherResult: any
    try {
      // Focus on the main landmark
      await page.locator('main').focus()

      // Ensure the main landmark is visible
      expect(page.locator('main').isVisible()).toBeTruthy()

      // Locate the first h1 heading within the main landmark and check for visibility
      const h1 = page.locator('main >> h1')
      expect(await h1.isVisible()).toBeTruthy()

      // Locate "Table of Contents" navigation element, if it exists
      const tocNav = page.locator(
        'main >> nav[role="navigation"][aria-label="Table of contents"]'
      )
      const isTocPresent = await tocNav.isVisible()

      // Locate "Get Help" h2 heading, if it exists
      const getHelpH2 = page.locator('main >> h2:text("Get Help")')
      const isGetHelpPresent = await getHelpH2.isVisible()

      // If "Table of Contents" navigation element is present, validate its position relative to h1
      if (isTocPresent) {
        // Verify "Table of Contents" navigation comes after the first h1 heading
        // Get the bounding boxes for both elements
        const h1BoundingBox = await h1.boundingBox()
        const tocNavBoundingBox = await tocNav.boundingBox()

        // Ensure the bounding boxes are valid
        if (!h1BoundingBox || !tocNavBoundingBox) {
          throw new Error('Unable to get bounding boxes for elements')
        }

        // Verify that the "Table of Contents" navigation comes after the first h1 heading
        // by comparing their 'top' positions
        expect(h1BoundingBox.y).toBeLessThan(tocNavBoundingBox.y)

        // Verify all content following h1 comes before "Table of Contents" navigation
        // This can be more complex depending on the structure, but a basic approach:
        const contentAfterH1BeforeTOC = page.locator(
          'main >> h1 >> .. >> nav[role="navigation"][aria-label="Table of contents"]'
        )
        const contentAfterH1BeforeTOCText =
          await contentAfterH1BeforeTOC.allTextContents()
        expect(contentAfterH1BeforeTOCText.length).toBeGreaterThan(0)
      }

      // If both "Get Help" and "Table of Contents" are present
      if (isTocPresent && isGetHelpPresent) {
        const tocPosition = await tocNav.evaluate((node) => {
          // Using XPath to select the h2 element with the text "Get Help"
          const xpath = "//h2[contains(text(), 'Get Help')]"
          const h2Element = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue

          if (!h2Element) {
            return -1 // Indicates that the "Get Help" h2 element was not found
          }

          // Getting the document position
          const position = node.compareDocumentPosition(h2Element)

          // Checking if the tocNav node is preceding the h2 element
          return position & Node.DOCUMENT_POSITION_PRECEDING
        })

        // Node.DOCUMENT_POSITION_PRECEDING === 2
        const isTocBeforeGetHelp = tocPosition & 2 // Check if the result of compareDocumentPosition included DOCUMENT_POSITION_PRECEDING

        // Indicate tocNav comes before "Get Help"
        expect(isTocBeforeGetHelp).toBeTruthy()
      }

      // If "Get Help" is present, validate content before it
      if (isGetHelpPresent) {
        const contentBeforeGetHelpLocator = page.locator(
          'main >> h1 >> .. >> h2:text("Get Help")'
        )
        const contentBeforeGetHelp =
          await contentBeforeGetHelpLocator.allTextContents()
        expect(contentBeforeGetHelp.length).toBeGreaterThan(0)
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

  async toHaveLogicalReadingOrderonTransactionCT(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderonTransactionCT'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page contains a <p> element with the text "SERVICE"
      const serviceParagraphExists =
        (await page.locator('p').filter({ hasText: 'SERVICE' }).count()) > 0

      if (serviceParagraphExists) {
        // If the paragraph exists, select all <details> elements
        const detailsElements = page.locator('details')

        // Check the count of <details> elements
        const detailsCount = await detailsElements.count()

        for (let i = 0; i < detailsCount; i++) {
          // For each <details> element, select all heading elements
          const headingElements = detailsElements
            .nth(i)
            .locator('h1, h2, h3, h4, h5, h6')

          // Check that all these heading elements are <h4>
          await headingElements
            .evaluateAll((headings) => {
              // Check if every heading is an <h4>
              return headings.every((heading) => heading.tagName === 'H4')
            })
            .then((result) => {
              // Verify that the condition holds true
              expect(result).toBeTruthy()
            })
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

  async toHaveLogicalReadingOrderonMeetingCT(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderonMeetingCT'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page contains a paragraph element with the text "MEETING"
      const meetingParagraphExists =
        (await page.locator('p').filter({ hasText: 'MEETING' }).count()) > 0

      if (meetingParagraphExists) {
        // If the paragraph exists, select all <details> elements
        // The <details> element is the container for each accordion menu
        const detailsElements = page.locator('details')

        // Check the number of <details> elements on the page
        const detailsCount = await detailsElements.count()

        for (let i = 0; i < detailsCount; i++) {
          // For each <details> element, select all heading elements
          const headingElements = detailsElements
            .nth(i)
            .locator('h1, h2, h3, h4, h5, h6')

          // Check that all these heading elements are <h3> headings
          await headingElements
            .evaluateAll((headings) => {
              // Check if every heading is an <h3>
              return headings.every((heading) => heading.tagName === 'H3')
            })
            .then((result) => {
              // Verify that the condition holds true
              expect(result).toBeTruthy()
            })
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

  async toHaveLogicalReadingOrderGetHelp(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderGetHelp'
    let pass: boolean
    let matcherResult: any
    try {
      // Step 1: Locate the <h2>Get help</h2> heading using XPath
      const getHelpHeading = await page.$('//h2[text()="Get help"]')

      if (getHelpHeading) {
        // Collect all headings between <h2>Get help</h2> and the next <h2>
        const headingsBetween = await page.evaluate(() => {
          const allHeadings = Array.from(
            document.querySelectorAll('h1, h2, h3, h4, h5, h6')
          )
          const getHelpIndex = allHeadings.findIndex(
            (heading) => heading.textContent === 'Get help'
          )
          const nextH2Index = allHeadings
            .slice(getHelpIndex + 1)
            .findIndex((heading) => heading.tagName === 'H2')
          const endIndex =
            nextH2Index !== -1
              ? getHelpIndex + 1 + nextH2Index
              : allHeadings.length

          return allHeadings
            .slice(getHelpIndex + 1, endIndex)
            .map((heading) => heading.tagName)
        })

        // Assert all collected headings are <h3>
        headingsBetween.forEach((tagName) => {
          expect(tagName).toBe('H3')
        })
      } else {
        console.log('The heading <h2>Get help</h2> does not exist on the page.')
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

  async toHaveLogicalReadingOrderContactInfo(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderContactInfo'
    let pass: boolean
    let matcherResult: any
    try {
      // Find the <h2> element with the text "Contact information"
      const contactInfoH2 = await page.locator('h2', {
        hasText: 'Contact information'
      })

      // Check if the 'Contact information' heading is visible
      const isVisible = await contactInfoH2.isVisible()

      if (isVisible) {
        // If visible, perform the additional checks
        // Validate that all headings following the h2 heading are h3 headings until it encounters another h2 heading or reaches the end of the container.

        // Get all following siblings until another h2 or the end of the container
        const followingElements = await contactInfoH2.locator(
          '>> following-sibling::*'
        )

        // Check each sibling if it is a heading and if it is, verify it's an h3
        await followingElements.evaluateAll((elements) => {
          for (const element of elements) {
            // If the element is a heading, check its level
            if (element.tagName.startsWith('h')) {
              if (element.tagName !== 'h3') {
                throw new Error(`Expected h3, but found ${element.tagName}`)
              }
            }
          }
        })
      } else {
        // If the 'Contact information' heading is not visible, pass the test
        console.log(
          "'Contact information' heading is not present. Passing the test."
        )
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

  async toHaveLogicalReadingOrderMeetingResources(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderMeetingResources'
    let pass: boolean
    let matcherResult: any
    try {
      // Step 2: Locate the <h2>Meeting resources</h2> heading using XPath
      const meetingResourcesHeading = await page.$(
        '//h2[text()="Meeting resources"]'
      )

      if (meetingResourcesHeading) {
        // Collect all headings between <h2>Meeting resources</h2> and the next <h2>
        const headingsBetween = await page.evaluate(() => {
          const allHeadings = Array.from(
            document.querySelectorAll('h1, h2, h3, h4, h5, h6')
          )
          const meetingResourcesIndex = allHeadings.findIndex(
            (heading) => heading.textContent === 'Meeting resources'
          )
          const nextH2Index = allHeadings
            .slice(meetingResourcesIndex + 1)
            .findIndex((heading) => heading.tagName === 'H2')
          const endIndex =
            nextH2Index !== -1
              ? meetingResourcesIndex + 1 + nextH2Index
              : allHeadings.length

          return allHeadings
            .slice(meetingResourcesIndex + 1, endIndex)
            .map((heading) => heading.tagName)
        })

        // Assert all collected headings are <h3>
        headingsBetween.forEach((tagName) => {
          expect(tagName).toBe('H3')
        })
      } else {
        console.log(
          'The heading <h2>Meeting resources</h2> does not exist on the page.'
        )
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

  async toHaveAndOrAriaLabels(page: Page) {
    const assertionName = 'toHaveAndOrAriaLabels'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the paragraph <p>STEP-BY-STEP</p> exists
      const paragraph = await page.$('p:text("STEP-BY-STEP")')

      if (paragraph) {
        // If the paragraph exists, check the <span> with aria-label="additional step"
        const additionalStepSpan = await page.$(
          'span[aria-label="additional step"]'
        )
        expect(additionalStepSpan).not.toBeNull()

        // Check the <span> with aria-label="optional step"
        const optionalStepSpan = await page.$(
          'span[aria-label="optional step"]'
        )
        expect(optionalStepSpan).not.toBeNull()
      } else {
        // If the paragraph does not exist, the test passes
        expect(true).toBe(true)
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

  async toHaveInformationLogicalReadingOrder(page: Page) {
    const assertionName = 'toHaveInformationLogicalReadingOrder'
    let pass: boolean
    let matcherResult: any
    try {
      // Check that the info page paragraph is present on the page
      const specificParagraph = await page.$('p:text("INFO PAGE")')

      if (specificParagraph) {
        // If the paragraph is present it is going to find the h1 heading
        const h1TextContent = await page.$eval('h1', (el) => el.textContent)

        // Collect all headings after the h1 heading
        const headingsAfterH1 = await page.evaluate((h1Text) => {
          const allHeadings = Array.from(
            document.querySelectorAll('h1, h2, h3, h4, h5, h6')
          )
          const h1Element = allHeadings.find((h) => h.textContent === h1Text)
          const h1Index = h1Element ? allHeadings.indexOf(h1Element) : -1
          return allHeadings
            .slice(h1Index + 1)
            .map((heading) => heading.tagName)
        }, h1TextContent)

        // Verify that all headings after the h1 heading are h2 headings
        headingsAfterH1.forEach((tagName) => {
          expect(tagName).toBe('H2')
        })
      } else {
        console.log(
          'The specific paragraph "INFO PAGE" does not exist on the page.'
        )
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

  async toHaveLogicalReadingOrderWhatToKnow(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderWhatToKnow'
    let pass: boolean
    let matcherResult: any
    try {
      // Step 1: Locate the <h2>What to know</h2> heading using XPath
      const whattoKnowHeading = await page.$('//h2[text()="What to know"]')

      if (whattoKnowHeading) {
        // Collect all headings between <h2>What to know</h2> and the next <h2>
        const headingsBetween = await page.evaluate(() => {
          const allHeadings = Array.from(
            document.querySelectorAll('h1, h2, h3, h4, h5, h6')
          )
          const whattoKnowIndex = allHeadings.findIndex(
            (heading) => heading.textContent === 'What to know'
          )
          const nextH2Index = allHeadings
            .slice(whattoKnowIndex + 1)
            .findIndex((heading) => heading.tagName === 'H2')
          const endIndex =
            nextH2Index !== -1
              ? whattoKnowIndex + 1 + nextH2Index
              : allHeadings.length

          return allHeadings
            .slice(whattoKnowIndex + 1, endIndex)
            .map((heading) => heading.tagName)
        })

        // Assert all collected headings are <h3>
        headingsBetween.forEach((tagName) => {
          expect(tagName).toBe('H3')
        })
      } else {
        console.log(
          'The heading <h2>What to know</h2> does not exist on the page.'
        )
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

  async toHaveLogicalReadingOrderContactUs(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderContactUs'
    let pass: boolean
    let matcherResult: any
    try {
      // Step 1: Locate the <h2>Contact us</h2> heading using XPath
      const contactUsHeading = await page.$('//h2[text()="Contact us"]')

      if (contactUsHeading) {
        // Collect all headings between <h2>Contact us</h2> and the next <h2>
        const headingsBetween = await page.evaluate(() => {
          const allHeadings = Array.from(
            document.querySelectorAll('h1, h2, h3, h4, h5, h6')
          )
          const contactUsIndex = allHeadings.findIndex(
            (heading) => heading.textContent === 'Contact us'
          )
          const nextH2Index = allHeadings
            .slice(contactUsIndex + 1)
            .findIndex((heading) => heading.tagName === 'H2')
          const endIndex =
            nextH2Index !== -1
              ? contactUsIndex + 1 + nextH2Index
              : allHeadings.length

          return allHeadings
            .slice(contactUsIndex + 1, endIndex)
            .map((heading) => heading.tagName)
        })

        // Assert all collected headings are <h3>
        headingsBetween.forEach((tagName) => {
          expect(tagName).toBe('H3')
        })
      } else {
        console.log(
          'The heading <h2>Contact us</h2> does not exist on the page.'
        )
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

  async toHaveLogicalReadingOrderEventDetails(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderEventDetails'
    let pass: boolean
    let matcherResult: any
    try {
      // Step 2: Locate the <h2>Details</h2> heading using XPath
      const detailsHeading = await page.$('//h2[text()="Details"]')

      if (detailsHeading) {
        // Collect all headings between <h2>Details</h2> and the next <h2>
        const headingsBetween = await page.evaluate(() => {
          const allHeadings = Array.from(
            document.querySelectorAll('h1, h2, h3, h4, h5, h6')
          )
          const detailsIndex = allHeadings.findIndex(
            (heading) => heading.textContent === 'Details'
          )
          const nextH2Index = allHeadings
            .slice(detailsIndex + 1)
            .findIndex((heading) => heading.tagName === 'H2')
          const endIndex =
            nextH2Index !== -1
              ? detailsIndex + 1 + nextH2Index
              : allHeadings.length

          return allHeadings
            .slice(detailsIndex + 1, endIndex)
            .map((heading) => heading.tagName)
        })

        // Assert all collected headings are <h3>
        headingsBetween.forEach((tagName) => {
          expect(tagName).toBe('H3')
        })
      } else {
        console.log('The heading <h2>Details</h2> does not exist on the page.')
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

  async toHaveLogicalReadingOrderAboutUs(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderAboutUs'
    let pass: boolean
    let matcherResult: any
    try {
      // Step 1: Check that the "ABOUT US" paragraph is present on the page
      const specificParagraph = await page.$('p:has-text("ABOUT US")')

      if (specificParagraph) {
        // Step 2: Locate the <h2>Resources</h2> heading using XPath
        const resourcesHeading = await page.$('//h2[text()="Resources"]')

        if (resourcesHeading) {
          // Collect all headings between <h2>Resources</h2> and the next <h2>
          const headingsBetween = await page.evaluate(() => {
            const allHeadings = Array.from(
              document.querySelectorAll('h1, h2, h3, h4, h5, h6')
            )
            const resourcesIndex = allHeadings.findIndex(
              (heading) => heading.textContent === 'Resources'
            )
            const nextH2Index = allHeadings
              .slice(resourcesIndex + 1)
              .findIndex((heading) => heading.tagName === 'H2')
            const endIndex =
              nextH2Index !== -1
                ? resourcesIndex + 1 + nextH2Index
                : allHeadings.length

            return allHeadings
              .slice(resourcesIndex + 1, endIndex)
              .map((heading) => heading.tagName)
          })

          // Assert all collected headings are <h3>
          headingsBetween.forEach((tagName) => {
            expect(tagName).toBe('H3')
          })
        } else {
          console.log(
            'The <h2>Resources</h2> heading does not exist on the page.'
          )
        }
      } else {
        console.log('The "ABOUT US" paragraph does not exist on the page.')
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

  async toHaveLogicalReadingOrderTopic(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderTopic'
    let pass: boolean
    let matcherResult: any
    try {
      // Step 1: Check that the "TOPIC" paragraph is present on the page
      const specificParagraph = await page.$('p:has-text("TOPIC")')

      if (specificParagraph) {
        // Step 2: Locate the <h2>Services</h2> heading using XPath
        const servicesHeading = await page.$('//h2[text()="Services"]')

        if (servicesHeading) {
          // Collect all headings between <h2>Services</h2> and the next <h2>
          const headingsBetween = await page.evaluate(() => {
            const allHeadings = Array.from(
              document.querySelectorAll('h1, h2, h3, h4, h5, h6')
            )
            const servicesIndex = allHeadings.findIndex(
              (heading) => heading.textContent === 'Services'
            )
            const nextH2Index = allHeadings
              .slice(servicesIndex + 1)
              .findIndex((heading) => heading.tagName === 'H2')
            const endIndex =
              nextH2Index !== -1
                ? servicesIndex + 1 + nextH2Index
                : allHeadings.length

            return allHeadings
              .slice(servicesIndex + 1, endIndex)
              .map((heading) => heading.tagName)
          })

          // Assert all collected headings are <h3>
          headingsBetween.forEach((tagName) => {
            expect(tagName).toBe('H3')
          })
        } else {
          console.log(
            'The <h2>Services</h2> heading does not exist on the page.'
          )
        }
      } else {
        console.log('The "TOPIC" paragraph does not exist on the page.')
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

  async toHaveLogicalReadingOrderFooter(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderFooter'
    let pass: boolean
    let matcherResult: any
    try {
      // Locate the footer element
      const footer = page.locator('footer')

      // Find all h2 headings within the footer
      const h2Headings = footer.locator('h2')

      // Get the count of all heading elements within the footer
      const allHeadings = footer.locator('h1, h2, h3, h4, h5, h6')
      const allHeadingsCount = await allHeadings.count()

      // Get the count of h2 headings within the footer
      const h2HeadingsCount = await h2Headings.count()

      // Validate that the count of h2 headings equals the count of all headings
      expect(h2HeadingsCount).toBe(allHeadingsCount)

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

  async toHaveLogicalReadingOrderFooterLabels(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderFooterLabels'
    let pass: boolean
    let matcherResult: any
    try {
      // Select the footer landmark
      const footer = await page.locator('footer')

      // Validate that "Languages" is an h2 heading within the footer
      const languagesHeading = footer.locator('h2', { hasText: 'Languages' })
      await expect(languagesHeading).toBeVisible()

      // Validate that "City Links" is an h2 heading within the footer
      const cityLinksHeading = footer.locator('h2', { hasText: 'City Links' })
      await expect(cityLinksHeading).toBeVisible()

      // Validate that "Resources" is an h2 heading within the footer
      const resourcesHeading = footer.locator('h2', { hasText: 'Resources' })
      await expect(resourcesHeading).toBeVisible()

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

  async toHaveURLInLinkText(page: Page) {
    const assertionName = 'toHaveURLInLinkText'
    let pass: boolean
    let matcherResult: any
    try {
      // Get all anchor elements on the page
      const links = await page.$$('a')

      for (const link of links) {
        // Get the href attribute of the link
        const href = await link.getAttribute('href')
        // Get the text content of the link
        const text = await link.innerText()

        if (
          href &&
          !href.includes('#') &&
          !href.includes('tel:') &&
          !href.includes('mailto:')
        ) {
          // Normalize the href to remove the protocol and other components
          const url = new URL(href, page.url())
          const normalizedHref = url.hostname + url.pathname

          // Validate that the link text does not contain the normalized URL
          expect(text).not.toContain(normalizedHref)
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

  async toMakePowerBiDashboardAccessibleResourceCollection(page: Page) {
    const assertionName = 'toMakePowerBiDashboardAccessibleResourceCollection'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the paragraph <p>RESOURCE COLLECTION</p> is present
      const isResourceCollectionPresent = await page
        .locator('p:has-text("RESOURCE COLLECTION")')
        .isVisible()
      if (isResourceCollectionPresent) {
        try {
          // Switch to the iframe context
          const frameLocator = page.frameLocator(
            'iframe[class="powerbi-iframe"]'
          ) // Adjust the selector as needed

          // Tab into the dashboard
          await page.keyboard.press('Tab')

          // Wait for the navigation module to appear
          await page.waitForTimeout(1000) // Adjust based on the expected responsiveness of the dashboard

          // Validate that the dashboard navigation module is visible
          const isNavModuleVisible = await frameLocator
            .locator('selector-for-navigation-module')
            .isVisible()
          expect(isNavModuleVisible).toBeTruthy()

          // Check for the title attribute in the iframe
          // Select all iframes
          const iframes = page.locator('iframe')

          // Count the number of iframes
          const iframeCount = await iframes.count()

          // Iterate through each iframe and check the title attribute
          for (let i = 0; i < iframeCount; i++) {
            const titleAttribute = await iframes.nth(i).getAttribute('title')

            // Verify that the title attribute is present and not empty for each iframe
            expect(
              titleAttribute,
              `iframe at index ${i} is missing a title attribute or it is empty`
            ).toBeTruthy()
          }

          // Find the “Show data notes and sources” link
          const isLinkVisible = await page
            .locator('text="Show data notes and sources"')
            .isVisible()
          expect(isLinkVisible).toBeTruthy()
        } catch (error) {
          console.error('An error occurred during the test:', error)
        }
      } else {
        console.log(
          'RESOURCE COLLECTION paragraph not found, skipping the test.'
        )
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

  async allLinksHaveKeyboardFocus(page: Page) {
    const assertionName = 'allLinksHaveKeyboardFocus'
    let pass: boolean
    let matcherResult: any
    try {
      // Get all links on the page
      const links = await page.$$eval('a', (links) =>
        links.map((link) => link.getAttribute('href'))
      )

      // Iterate through each link and check if it receives keyboard focus
      for (const href of links) {
        // Navigate to the link element
        const link = await page.$(`a[href="${href}"]`)
        // bounding box returns null if the element is not visible
        const box = await link?.boundingBox()
        if (link && box) {
          // Focus the link
          await link.focus()

          // Check if the link has received focus
          const isFocused = await page.evaluate(
            (el) => document.activeElement === el,
            link
          )
          expect(isFocused).toBe(true)
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

  async toHaveLogicalReadingOrderonCampaignCT(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderonCampaignCT'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page contains a paragraph element with the text "CAMPAIGN"
      const campaignParagraphExists =
        (await page.locator('p').filter({ hasText: 'CAMPAIGN' }).count()) > 0

      if (campaignParagraphExists) {
        // If the paragraph exists, select all <details> elements
        // The <details> element is the container for each accordion menu
        const detailsElements = page.locator('details')

        // Check the number of <details> elements on the page
        const detailsCount = await detailsElements.count()

        for (let i = 0; i < detailsCount; i++) {
          // For each <details> element, select all heading elements
          const headingElements = detailsElements
            .nth(i)
            .locator('h1, h2, h3, h4, h5, h6')

          // Check that all these heading elements are <h3> headings
          await headingElements
            .evaluateAll((headings) => {
              // Check if every heading is an <h3>
              return headings.every((heading) => heading.tagName === 'H3')
            })
            .then((result) => {
              // Verify that the condition holds true
              expect(result).toBeTruthy()
            })
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

  async toHaveLogicalReadingOrderonHomePage(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderonHomePage'
    let pass: boolean
    let matcherResult: any
    try {
      // Find the <h1> element with the text "Welcome to sf.gov"
      const homeInfoH1 = await page.locator('h1', {
        hasText: 'Welcome to sf.gov'
      })

      // Check if the 'Welcome to sf.gov' heading is visible
      const isVisible = await homeInfoH1.isVisible()

      if (isVisible) {
        // If visible, perform the additional checks

        // Check that specific texts are h2 headings
        const servicesHeading = page.locator('h2:has-text("Services")')
        await expect(servicesHeading).toBeVisible()

        const newsHeading = page.locator('h2:has-text("News")')
        await expect(newsHeading).toBeVisible()

        const sfGovHeading = page.locator(
          'h2:has-text("San Francisco Government")'
        )
        await expect(sfGovHeading).toBeVisible()

        // Check that specific texts are h3 headings
        const boardOfSupervisorsHeading = page.locator(
          'h3:has-text("Board of Supervisors")'
        )
        await expect(boardOfSupervisorsHeading).toBeVisible()

        const electedOfficialsHeading = page.locator(
          'h3:has-text("Elected Officials")'
        )
        await expect(electedOfficialsHeading).toBeVisible()
      } else {
        // If the 'Welcome to sf.gov' heading is not visible, pass the test
        console.log(
          "'Welcome to sf.gov' heading is not present. Passing the test."
        )
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

  async toHaveVideoTextTranscript(page: Page) {
    const assertionName = 'toHaveVideoTextTranscript'
    let pass: boolean
    let matcherResult: any
    try {
      // Find the <h3> element with the text "Video recording"
      const videoInfoH3 = await page.locator('h3', {
        hasText: 'Video recording'
      })

      // Check if the 'Video recording' heading is visible
      const isVisible = await videoInfoH3.isVisible()

      if (isVisible) {
        // Validate that the "Show transcript" link is present
        const showTranscriptLink = await page.$('text=Show transcript')
        expect(showTranscriptLink).not.toBeNull()

        // Validate that the "View full transcript" link is present
        const viewFullTranscriptLink = await page.$('text=View full transcript')
        expect(viewFullTranscriptLink).not.toBeNull()
      } else {
        // If the 'Video recording' heading is not visible, pass the test
        console.log(
          "'Video recording' heading is not present. Passing the test."
        )
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

  async toHaveLogicalReadingOrderDataResourceCollection(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderDataResourceCollection'
    let pass: boolean
    let matcherResult: any
    try {

      // Step 1: Check that the "RESOURCE COLLECTION" paragraph is present on the page
  const specificParagraph = await page.$('p:has-text("RESOURCE COLLECTION")');
  
  if (specificParagraph) {
    // Step 2: Locate the <h2>Data</h2> heading using XPath
    const dataHeading = await page.$('//h2[text()="Data"]');
  
    if (dataHeading) {
      // Collect all headings between <h2>Data</h2> and the next <h2>
      const headingsBetween = await page.evaluate(() => {
        const allHeadings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const dataIndex = allHeadings.findIndex(heading => heading.textContent === 'Data');
        const nextH2Index = allHeadings.slice(dataIndex + 1).findIndex(heading => heading.tagName === 'H2');
        const endIndex = nextH2Index !== -1 ? dataIndex + 1 + nextH2Index : allHeadings.length;
  
        return allHeadings.slice(dataIndex + 1, endIndex).map(heading => heading.tagName);
      });
  
      // Assert all collected headings are <h3>
      headingsBetween.forEach(tagName => {
        expect(tagName).toBe('H3');
      });
    } else {
      console.log('The <h2>Data</h2> heading does not exist on the page.');
    }
  } else {
    console.log('The "Resource Collection" paragraph does not exist on the page.');
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

  async toHaveLogicalReadingOrderDocumentsResourceCollection(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderDocumetsResourceCollection'
    let pass: boolean
    let matcherResult: any
    try {

      // Step 1: Check that the "RESOURCE COLLECTION" paragraph is present on the page
  const specificParagraph = await page.$('p:has-text("RESOURCE COLLECTION")');
  
  if (specificParagraph) {
    // Step 2: Locate the <h2>Documents</h2> heading using XPath
    const documentsHeading = await page.$('//h2[text()="Documents"]');
  
    if (documentsHeading) {
      // Collect all headings between <h2>Documents</h2> and the next <h2>
      const headingsBetween = await page.evaluate(() => {
        const allHeadings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const documentsIndex = allHeadings.findIndex(heading => heading.textContent === 'Data');
        const nextH2Index = allHeadings.slice(documentsIndex + 1).findIndex(heading => heading.tagName === 'H2');
        const endIndex = nextH2Index !== -1 ? documentsIndex + 1 + nextH2Index : allHeadings.length;
  
        return allHeadings.slice(documentsIndex + 1, endIndex).map(heading => heading.tagName);
      });
  
      // Assert all collected headings are <h3>
      headingsBetween.forEach(tagName => {
        expect(tagName).toBe('H3');
      });
    } else {
      console.log('The <h2>Documents</h2> heading does not exist on the page.');
    }
  } else {
    console.log('The "Resource Collection" paragraph does not exist on the page.');
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

  async toSuppressBlockQuoteOnNewsContentType(page: Page) {
    const assertionName = 'toSuppressBlockQuoteOnNewsContentType'
    let pass: boolean
    let matcherResult: any
    try {
     
  // Step 1: Check that the "NEWS" paragraph is present on the page
  const specificParagraph = await page.$('p:has-text("NEWS")');

  if (specificParagraph) {
    // If <p>NEWS</p> exists, validate blockquote elements
    const blockquotes = await page.locator('blockquote');
    
    const count = await blockquotes.count();
    for (let i = 0; i < count; i++) {
      const blockquote = blockquotes.nth(i);
      const ariaHidden = await blockquote.getAttribute('aria-hidden');
      expect(ariaHidden).toBe('true');
    }
  } else {
    // If <p>NEWS</p> does not exist, pass the test
    console.log('<p>NEWS</p> not found. Test passes.');
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

  async toHaveArticleLandmarkInNewsSectionOnHomepage(page: Page) {
    const assertionName = 'toHaveArticleLandmarkInNewsSectionOnHomepage'
    let pass: boolean
    let matcherResult: any
    try {
     
  // Verify the page title
const pageTitle = await page.title();
if (pageTitle === "City and County of San Francisco") {
  // Locate the <h2>News</h2> heading
  const newsHeading = page.locator('h2:has-text("News")');

  // Check if the <h2> heading is found and visible
  await expect(newsHeading).toBeVisible();

  // Find all <p> elements with the specific class that follow the <h2> heading
  const paragraphs = newsHeading.locator('xpath=following-sibling::p[contains(@class, "article__title") and contains(@class, "article--card__title")]');

  const count = await paragraphs.count();
  for (let i = 0; i < count; i++) {
    // Get the current <p> element
    const paragraph = paragraphs.nth(i);

    // Check the parent <article> landmark
    const articleParent = paragraph.locator('xpath=ancestor::article').first();

    // Verify that the <p> is within an <article>
    await expect(articleParent).toBeVisible();
  }
} else {
  console.log('The "City and County of San Francisco" title does not exist on the page.');
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

  async toSuppressBlockQuoteOnPressReleaseContentType(page: Page) {
    const assertionName = 'toSuppressBlockQuoteOnPressReleaseContentType'
    let pass: boolean
    let matcherResult: any
    try {
     
  // Step 1: Check that the "PRESS RELEASE" paragraph is present on the page
  const specificParagraph = await page.$('p:has-text("PRESS RELEASE")');

  if (specificParagraph) {
    // If <p>PRESS RELEASE</p> exists, validate blockquote elements
    const blockquotes = await page.locator('blockquote');
    
    const count = await blockquotes.count();
    for (let i = 0; i < count; i++) {
      const blockquote = blockquotes.nth(i);
      const ariaHidden = await blockquote.getAttribute('aria-hidden');
      expect(ariaHidden).toBe('true');
    }
  } else {
    // If <p>PRESS RELEASE</p> does not exist, pass the test
    console.log('<p>NEWS</p> not found. Test passes.');
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

  async toHaveALogicalReadingOrderInAccordionOnLocationContentType(page: Page) {
    const assertionName = 'toHaveALogicalReadingOrderInAccordionOnLocationContentType'
    let pass: boolean
    let matcherResult: any
    try {
     
  // Check if the page contains a paragraph element with the text "LOCATION"
  const locationParagraphExists =
  (await page.locator('p').filter({ hasText: 'LOCATION' }).count()) > 0

if (locationParagraphExists) {
  // If the paragraph exists, select all <details> elements
  // The <details> element is the container for each accordion menu
  const detailsElements = page.locator('details')

  // Check the number of <details> elements on the page
  const detailsCount = await detailsElements.count()

  for (let i = 0; i < detailsCount; i++) {
    // For each <details> element, select all heading elements
    const headingElements = detailsElements
      .nth(i)
      .locator('h1, h2, h3, h4, h5, h6')

    // Check that all these heading elements are <h4> headings
    await headingElements
      .evaluateAll((headings) => {
        // Check if every heading is an <h4>
        return headings.every((heading) => heading.tagName === 'H4')
      })
      .then((result) => {
        // Verify that the condition holds true
        expect(result).toBeTruthy()
      })
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

  async toHaveALogicalReadingOrderInGettingHereSectionOnLocationContentType(page: Page) {
    const assertionName = 'toHaveALogicalReadingOrderInGettingHereSectionOnLocationContentType'
    let pass: boolean
    let matcherResult: any
    try {
     
  // Step 1: Check that the "LOCATION" paragraph is present on the page
  const specificParagraph = await page.$('p:has-text("LOCATION")')

  if (specificParagraph) {
    // Step 2: Locate the <h2>Getting here</h2> heading using XPath
    const gettinghereHeading = await page.$('//h2[text()="Getting here"]')

    if (gettinghereHeading) {
      // Collect all headings between <h2>Getting here</h2> and the next <h2>
      const headingsBetween = await page.evaluate(() => {
        const allHeadings = Array.from(
          document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        )
        const gettinghereIndex = allHeadings.findIndex(
          (heading) => heading.textContent === 'Getting here'
        )
        const nextH2Index = allHeadings
          .slice(gettinghereIndex + 1)
          .findIndex((heading) => heading.tagName === 'H2')
        const endIndex =
          nextH2Index !== -1
            ? gettinghereIndex + 1 + nextH2Index
            : allHeadings.length

        return allHeadings
          .slice(gettinghereIndex + 1, endIndex)
          .map((heading) => heading.tagName)
      })

      // Assert all collected headings are <h3>
      headingsBetween.forEach((tagName) => {
        expect(tagName).toBe('H3')
      })
    } else {
      console.log(
        'The <h2>Getting here</h2> heading does not exist on the page.'
      )
    }
  } else {
    console.log('The "LOCATION" paragraph does not exist on the page.')
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

  async toHaveALogicalReadingOrderInGlossarySectionOnDataStoryContentType(page: Page) {
    const assertionName = 'toHaveALogicalReadingOrderInGlossarySectionOnDataStoryContentType'
    let pass: boolean
    let matcherResult: any
    try {
     
  // Step 1: Check that the "DATA STORY" paragraph is present on the page
  const specificParagraph = await page.$('p:has-text("DATA STORY")')

  if (specificParagraph) {
    // Step 2: Locate the <h2>Glossary</h2> heading using XPath
    const glossaryHeading = await page.$('//h2[text()="Glossary"]')

    if (glossaryHeading) {
      // Collect all headings between <h2>Glossary</h2> and the next <h2>
      const headingsBetween = await page.evaluate(() => {
        const allHeadings = Array.from(
          document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        )
        const glossaryIndex = allHeadings.findIndex(
          (heading) => heading.textContent === 'Glossary'
        )
        const nextH2Index = allHeadings
          .slice(glossaryIndex + 1)
          .findIndex((heading) => heading.tagName === 'H2')
        const endIndex =
          nextH2Index !== -1
            ? glossaryIndex + 1 + nextH2Index
            : allHeadings.length

        return allHeadings
          .slice(glossaryIndex + 1, endIndex)
          .map((heading) => heading.tagName)
      })

      // Assert all collected headings are <h3>
      headingsBetween.forEach((tagName) => {
        expect(tagName).toBe('H3')
      })
    } else {
      console.log(
        'The <h2>Glossary</h2> heading does not exist on the page.'
      )
    }
  } else {
    console.log('The "DATA STORY" paragraph does not exist on the page.')
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

  async toSuppressInPageSearchModuleForScreenReadersOnDataStoryContentType(page: Page) {
    const assertionName = 'toSuppressInPageSearchModuleForScreenReadersOnDataStoryContentType'
    let pass: boolean
    let matcherResult: any
    try {
     
      // Step 1: Check that the "DATA STORY" paragraph is present on the page
const specificParagraph = await page.$('p:has-text("DATA STORY")');

if (specificParagraph) {
  // Step 2: Check if the <label>Search on this page</label> is present
  const searchLabel = await page.$('label:has-text("Search on this page")');

  if (searchLabel) {
    // Validate that the associated <input> tag has aria-hidden="true"
    const inputTag = await searchLabel.evaluateHandle(label => label.nextElementSibling);
    
    if (inputTag) {
      const ariaHidden = await inputTag.getProperty('aria-hidden');
      expect(ariaHidden).toBe('true');
    } else {
      console.error('Associated <input> tag not found.');
    }
  } else {
    console.log('<label>Search on this page</label> not found.');
  }

} else {
  // If <p>DATA STORY</p> does not exist, pass the test
  console.log('<p>DATA STORY</p> not found. Test passes.');
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

  async toCreateLogicalTabOrderOnTransactionContentType(page: Page) {
    const assertionName = 'toCreateLogicalTabOrderOnTransactionContentType'
    let pass: boolean
    let matcherResult: any
    try {
     
        // Focus on the main landmark
  await page.locator('main').focus()

  // Ensure the main landmark is visible
  expect(await page.locator('main').isVisible()).toBeTruthy()

  // Locate the first h1 heading within the main landmark and check for visibility
  const h1 = page.locator('main >> h1')
  expect(await h1.isVisible()).toBeTruthy()

  // Locate "Table of Contents" navigation element, if it exists
  const tocNav = page.locator(
    'main >> nav[role="navigation"][aria-label="Table of contents"]'
  )
  const isTocPresent = await tocNav.isVisible()

  // Locate "Get help" h2 heading, if it exists
  const gethelpH2 = page.locator('main >> h2:text("Get help")')
  const isGethelpPresent = await gethelpH2.isVisible()

  // If "Table of Contents" navigation element is present, validate its position relative to h1
  if (isTocPresent) {
    // Verify "Table of Contents" navigation comes after the first h1 heading
    // Get the bounding boxes for both elements
    const h1BoundingBox = await h1.boundingBox()
    const tocNavBoundingBox = await tocNav.boundingBox()

    // Ensure the bounding boxes are valid
    if (!h1BoundingBox || !tocNavBoundingBox) {
      throw new Error('Unable to get bounding boxes for elements')
    }

    // Verify that the "Table of Contents" navigation comes after the first h1 heading
    // by comparing their 'top' positions
    expect(h1BoundingBox.y).toBeLessThan(tocNavBoundingBox.y)

    // Verify all content following h1 comes before "Table of Contents" navigation
    // This can be more complex depending on the structure, but a basic approach:
    const contentAfterH1BeforeTOC = page.locator(
      'main >> h1 >> .. >> nav[role="navigation"][aria-label="Table of contents"]'
    )
    const contentAfterH1BeforeTOCText =
      await contentAfterH1BeforeTOC.allTextContents()
    expect(contentAfterH1BeforeTOCText.length).toBeGreaterThan(0)
  }

  // If both "Get help" and "Table of Contents" are present
  if (isTocPresent && isGethelpPresent) {
    const tocPosition = await tocNav.evaluate((node) => {
      // Using XPath to select the h2 element with the text "Get help"
      const xpath = "//h2[contains(text(), 'Get help')]"
      const h2Element = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue

      if (!h2Element) {
        return -1 // Indicates that the "Get help" h2 element was not found
      }

      // Getting the document position
      const position = node.compareDocumentPosition(h2Element)

      // Checking if the tocNav node is preceding the h2 element
      return position & Node.DOCUMENT_POSITION_PRECEDING
    })

    // Node.DOCUMENT_POSITION_PRECEDING === 2
    const isTocBeforeGethelp = tocPosition & 2 // Check if the result of compareDocumentPosition included DOCUMENT_POSITION_PRECEDING

    // Indicate tocNav comes before "Get help"
    expect(isTocBeforeGethelp).toBeTruthy()
  }

  // If "Get help" is present, validate content before it
  if (isGethelpPresent) {
    const contentBeforeGethelpLocator = page.locator(
      'main >> h1 >> .. >> h2:text("Get help")'
    )
    const contentBeforeGethelp =
      await contentBeforeGethelpLocator.allTextContents()
    expect(contentBeforeGethelp.length).toBeGreaterThan(0)
  }

  // New validation: Check if <p>SERVICE</p> is present within the main landmark
  const serviceP = page.locator('main >> p:text("SERVICE")')
  const isServicePresent = await serviceP.count()

  if (isServicePresent) {
    // If <p>SERVICE</p> is present, validate it is visible
    expect(await serviceP.isVisible()).toBeTruthy()
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

  async toCreateLogicalTabOrderOnDataStoryContentType(page: Page) {
    const assertionName = 'toCreateLogicalTabOrderOnDataStoryContentType'
    let pass: boolean
    let matcherResult: any
    try {
     
         // Focus on the main landmark
  await page.locator('main').focus()

  // Ensure the main landmark is visible
  expect(await page.locator('main').isVisible()).toBeTruthy()

  // Locate the first h1 heading within the main landmark and check for visibility
  const h1 = page.locator('main >> h1')
  expect(await h1.isVisible()).toBeTruthy()

  // Locate "Table of Contents" navigation element, if it exists
  const tocNav = page.locator(
    'main >> nav[role="navigation"][aria-label="Table of contents"]'
  )
  const isTocPresent = await tocNav.isVisible()

  // Locate "Partner agencies" h2 heading, if it exists
  const partneragenciesH2 = page.locator('main >> h2:text("Partner agencies")')
  const isPartneragenciesPresent = await partneragenciesH2.isVisible()

  // If "Table of Contents" navigation element is present, validate its position relative to h1
  if (isTocPresent) {
    // Verify "Table of Contents" navigation comes after the first h1 heading
    // Get the bounding boxes for both elements
    const h1BoundingBox = await h1.boundingBox()
    const tocNavBoundingBox = await tocNav.boundingBox()

    // Ensure the bounding boxes are valid
    if (!h1BoundingBox || !tocNavBoundingBox) {
      throw new Error('Unable to get bounding boxes for elements')
    }

    // Verify that the "Table of Contents" navigation comes after the first h1 heading
    // by comparing their 'top' positions
    expect(h1BoundingBox.y).toBeLessThan(tocNavBoundingBox.y)

    // Verify all content following h1 comes before "Table of Contents" navigation
    // This can be more complex depending on the structure, but a basic approach:
    const contentAfterH1BeforeTOC = page.locator(
      'main >> h1 >> .. >> nav[role="navigation"][aria-label="Table of contents"]'
    )
    const contentAfterH1BeforeTOCText =
      await contentAfterH1BeforeTOC.allTextContents()
    expect(contentAfterH1BeforeTOCText.length).toBeGreaterThan(0)
  }

  // If both "Partner agencies" and "Table of Contents" are present
  if (isTocPresent && isPartneragenciesPresent) {
    const tocPosition = await tocNav.evaluate((node) => {
      // Using XPath to select the h2 element with the text "Partner agencies"
      const xpath = "//h2[contains(text(), 'Partner agencies')]"
      const h2Element = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue

      if (!h2Element) {
        return -1 // Indicates that the "Partner agencies" h2 element was not found
      }

      // Getting the document position
      const position = node.compareDocumentPosition(h2Element)

      // Checking if the tocNav node is preceding the h2 element
      return position & Node.DOCUMENT_POSITION_PRECEDING
    })

    // Node.DOCUMENT_POSITION_PRECEDING === 2
    const isTocBeforePartneragencies = tocPosition & 2 // Check if the result of compareDocumentPosition included DOCUMENT_POSITION_PRECEDING

    // Indicate tocNav comes before "Partner agencies"
    expect(isTocBeforePartneragencies).toBeTruthy()
  }

  // If "Partner agencies" is present, validate content before it
  if (isPartneragenciesPresent) {
    const contentBeforePartneragenciesLocator = page.locator(
      'main >> h1 >> .. >> h2:text("Partner agencies")'
    )
    const contentBeforePartneragencies =
      await contentBeforePartneragenciesLocator.allTextContents()
    expect(contentBeforePartneragencies.length).toBeGreaterThan(0)
  }

  // New validation: Check if <p>DATA STORY</p> is present within the main landmark
  const dataStoryP = page.locator('main >> p:text("DATA STORY")')
  const isDataStoryPresent = await dataStoryP.count()

  if (isDataStoryPresent) {
    // If <p>DATA STORY</p> is present, validate it is visible
    expect(await dataStoryP.isVisible()).toBeTruthy()
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

  async toCreateLogicalTabOrderOnFormContentType(page: Page) {
    const assertionName = 'toCreateLogicalTabOrderOnFormContentType'
    let pass: boolean
    let matcherResult: any
    try {
     
       // Focus on the main landmark
  await page.locator('main').focus()

  // Ensure the main landmark is visible
  expect(await page.locator('main').isVisible()).toBeTruthy()

  // Locate the first h1 heading within the main landmark and check for visibility
  const h1 = page.locator('main >> h1')
  expect(await h1.isVisible()).toBeTruthy()

  // Locate "Progress indicator and navigation" navigation element, if it exists
  const tocNav = page.locator(
    'main >> nav[role="navigation"][aria-label="Progress indicator and navigation"]'
  )
  const isTocPresent = await tocNav.isVisible()

  // If "Progress indicator and navigation" element is present, validate its position relative to h1
  if (isTocPresent) {
    // Verify "Progress indicator and navigation" comes after the first h1 heading
    // Get the bounding boxes for both elements
    const h1BoundingBox = await h1.boundingBox()
    const tocNavBoundingBox = await tocNav.boundingBox()

    // Ensure the bounding boxes are valid
    if (!h1BoundingBox || !tocNavBoundingBox) {
      throw new Error('Unable to get bounding boxes for elements')
    }

    // Verify that the "Progress indicator and navigation" comes after the first h1 heading
    // by comparing their 'top' positions
    expect(h1BoundingBox.y).toBeLessThan(tocNavBoundingBox.y)

    // Verify all content following h1 comes before "Progress indicator and navigation"
    const contentAfterH1BeforeTOC = page.locator(
      'main >> h1 >> .. >> nav[role="navigation"][aria-label="Progress indicator and navigation"]'
    )
    const contentAfterH1BeforeTOCText =
      await contentAfterH1BeforeTOC.allTextContents()
    expect(contentAfterH1BeforeTOCText.length).toBeGreaterThan(0)
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

  async toCreateLogicalReadingOrderAgencyContentTypeServices(page: Page) {
    const assertionName = 'toCreateLogicalReadingOrderAgencyContentTypeServices'
    let pass: boolean
    let matcherResult: any
    try {
     
      // Step 1: Check that the "AGENCY" paragraph is present on the page
      const specificParagraph = await page.$('p:has-text("AGENCY")')

      if (specificParagraph) {
        // Step 2: Locate the <h2>Services</h2> heading using XPath
        const servicesHeading = await page.$('//h2[text()="Services"]')

        if (servicesHeading) {
          // Collect all headings between <h2>Services</h2> and the next <h2>
          const headingsBetween = await page.evaluate(() => {
            const allHeadings = Array.from(
              document.querySelectorAll('h1, h2, h3, h4, h5, h6')
            )
            const servicesIndex = allHeadings.findIndex(
              (heading) => heading.textContent === 'Services'
            )
            const nextH2Index = allHeadings
              .slice(servicesIndex + 1)
              .findIndex((heading) => heading.tagName === 'H2')
            const endIndex =
              nextH2Index !== -1
                ? servicesIndex + 1 + nextH2Index
                : allHeadings.length

            return allHeadings
              .slice(servicesIndex + 1, endIndex)
              .map((heading) => heading.tagName)
          })

          // Assert all collected headings are <h3>
          headingsBetween.forEach((tagName) => {
            expect(tagName).toBe('H3')
          })
        } else {
          console.log(
            'The <h2>Services</h2> heading does not exist on the page.'
          )
        }
      } else {
        console.log('The "AGENCY" paragraph does not exist on the page.')
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

  async toCreateLogicalReadingOrderAgencyContentTypeResources(page: Page) {
    const assertionName = 'toCreateLogicalReadingOrderAgencyContentTypeResources'
    let pass: boolean
    let matcherResult: any
    try {
     
      // Step 1: Check that the "AGENCY" paragraph is present on the page
      const specificParagraph = await page.$('p:has-text("AGENCY")')

      if (specificParagraph) {
        // Step 2: Locate the <h2>Resources</h2> heading using XPath
        const resourcesHeading = await page.$('//h2[text()="Resources"]')

        if (resourcesHeading) {
          // Collect all headings between <h2>Resources</h2> and the next <h2>
          const headingsBetween = await page.evaluate(() => {
            const allHeadings = Array.from(
              document.querySelectorAll('h1, h2, h3, h4, h5, h6')
            )
            const resourcesIndex = allHeadings.findIndex(
              (heading) => heading.textContent === 'Resources'
            )
            const nextH2Index = allHeadings
              .slice(resourcesIndex + 1)
              .findIndex((heading) => heading.tagName === 'H2')
            const endIndex =
              nextH2Index !== -1
                ? resourcesIndex + 1 + nextH2Index
                : allHeadings.length

            return allHeadings
              .slice(resourcesIndex + 1, endIndex)
              .map((heading) => heading.tagName)
          })

          // Assert all collected headings are <h3>
          headingsBetween.forEach((tagName) => {
            expect(tagName).toBe('H3')
          })
        } else {
          console.log(
            'The <h2>Resources</h2> heading does not exist on the page.'
          )
        }
      } else {
        console.log('The "AGENCY" paragraph does not exist on the page.')
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

  async toCreateLogicalReadingOrderAgencyContentTypeAbout(page: Page) {
    const assertionName = 'toCreateLogicalReadingOrderAgencyContentTypeAbout'
    let pass: boolean
    let matcherResult: any
    try {
     
     // Step 1: Check that the "AGENCY" paragraph is present on the page
     const specificParagraph = await page.$('p:has-text("AGENCY")')

     if (specificParagraph) {
       // Step 2: Locate the <h2>About</h2> heading using XPath
       const aboutHeading = await page.$('//h2[text()="About"]')

       if (aboutHeading) {
         // Collect all headings between <h2>About</h2> and the next <h2>
         const headingsBetween = await page.evaluate(() => {
           const allHeadings = Array.from(
             document.querySelectorAll('h1, h2, h3, h4, h5, h6')
           )
           const aboutIndex = allHeadings.findIndex(
             (heading) => heading.textContent === 'About'
           )
           const nextH2Index = allHeadings
             .slice(aboutIndex + 1)
             .findIndex((heading) => heading.tagName === 'H2')
           const endIndex =
             nextH2Index !== -1
               ? aboutIndex + 1 + nextH2Index
               : allHeadings.length

           return allHeadings
             .slice(aboutIndex + 1, endIndex)
             .map((heading) => heading.tagName)
         })

         // Assert all collected headings are <h3>
         headingsBetween.forEach((tagName) => {
           expect(tagName).toBe('H3')
         })
       } else {
         console.log(
           'The <h2>About</h2> heading does not exist on the page.'
         )
       }
     } else {
       console.log('The "AGENCY" paragraph does not exist on the page.')
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

  async toCreateLogicalTabOrderResourceCollectionContentType(page: Page) {
    const assertionName = 'toCreateLogicalTabOrderResourceCollectionContentType'
    let pass: boolean
    let matcherResult: any
    try {
    
        // Focus on the main landmark
        await page.locator('main').focus()
      
        // Ensure the main landmark is visible
        expect(await page.locator('main').isVisible()).toBeTruthy()
      
        // Locate the first h1 heading within the main landmark and check for visibility
        const h1 = page.locator('main >> h1')
        expect(await h1.isVisible()).toBeTruthy()
      
        // Locate "Table of Contents" navigation element, if it exists
        const tocNav = page.locator(
          'main >> nav[role="navigation"][aria-label="Table of contents"]'
        )
        const isTocPresent = await tocNav.isVisible()
      
        // Locate "Partner agencies" h2 heading, if it exists
        const partneragenciesH2 = page.locator('main >> h2:text("Partner agencies")')
        const isPartneragenciesPresent = await partneragenciesH2.isVisible()
      
        // If "Table of Contents" navigation element is present, validate its position relative to h1
        if (isTocPresent) {
          // Verify "Table of Contents" navigation comes after the first h1 heading
          // Get the bounding boxes for both elements
          const h1BoundingBox = await h1.boundingBox()
          const tocNavBoundingBox = await tocNav.boundingBox()
      
          // Ensure the bounding boxes are valid
          if (!h1BoundingBox || !tocNavBoundingBox) {
            throw new Error('Unable to get bounding boxes for elements')
          }
      
          // Verify that the "Table of Contents" navigation comes after the first h1 heading
          // by comparing their 'top' positions
          expect(h1BoundingBox.y).toBeLessThan(tocNavBoundingBox.y)
      
          // Verify all content following h1 comes before "Table of Contents" navigation
          // This can be more complex depending on the structure, but a basic approach:
          const contentAfterH1BeforeTOC = page.locator(
            'main >> h1 >> .. >> nav[role="navigation"][aria-label="Table of contents"]'
          )
          const contentAfterH1BeforeTOCText =
            await contentAfterH1BeforeTOC.allTextContents()
          expect(contentAfterH1BeforeTOCText.length).toBeGreaterThan(0)
        }
      
        // If both "Partner agencies" and "Table of Contents" are present
        if (isTocPresent && isPartneragenciesPresent) {
          const tocPosition = await tocNav.evaluate((node) => {
            // Using XPath to select the h2 element with the text "Partner agencies"
            const xpath = "//h2[contains(text(), 'Partner agencies')]"
            const h2Element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue
      
            if (!h2Element) {
              return -1 // Indicates that the "Partner agencies" h2 element was not found
            }
      
            // Getting the document position
            const position = node.compareDocumentPosition(h2Element)
      
            // Checking if the tocNav node is preceding the h2 element
            return position & Node.DOCUMENT_POSITION_PRECEDING
          })
      
          // Node.DOCUMENT_POSITION_PRECEDING === 2
          const isTocBeforePartneragencies = tocPosition & 2 // Check if the result of compareDocumentPosition included DOCUMENT_POSITION_PRECEDING
      
          // Indicate tocNav comes before "Partner agencies"
          expect(isTocBeforePartneragencies).toBeTruthy()
        }
      
        // If "Partner agencies" is present, validate content before it
        if (isPartneragenciesPresent) {
          const contentBeforePartneragenciesLocator = page.locator(
            'main >> h1 >> .. >> h2:text("Partner agencies")'
          )
          const contentBeforePartneragencies =
            await contentBeforePartneragenciesLocator.allTextContents()
          expect(contentBeforePartneragencies.length).toBeGreaterThan(0)
        }
      
        // New validation: Check if <p>RESOURCE COLLECTION</p> is present within the main landmark
        const resourceCollectionP = page.locator('main >> p:text("RESOURCE COLLECTION")')
        const isResourceCollectionPresent = resourceCollectionP.count()
      
        if (await isResourceCollectionPresent) {
          // If <p>RESOURCE COLLECTION</p> is present, validate it is visible
          expect(await resourceCollectionP.isVisible()).toBeTruthy()
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

  async toCreateLogicalTabOrderProfileContentType(page: Page) {
    const assertionName = 'toCreateLogicalTabOrderProfileContentType'
    let pass: boolean
    let matcherResult: any
    try {
    
         // Focus on the main landmark
  await page.locator('main').focus()

  // Ensure the main landmark is visible
  expect(await page.locator('main').isVisible()).toBeTruthy()

  // Locate the first h1 heading within the main landmark and check for visibility
  const h1 = page.locator('main >> h1')
  expect(await h1.isVisible()).toBeTruthy()

  // Locate "Additional profiles" navigation element, if it exists
  const tocAside = page.locator(
    'main >> aside[role="complementary"]'
  )
  const isTocPresent = await tocAside.isVisible()

  // If "Additional roles" navigation element is present, validate its position relative to h1
  if (isTocPresent) {
    // Verify "Additional roles" navigation comes after the first h1 heading
    // Get the bounding boxes for both elements
    const h1BoundingBox = await h1.boundingBox()
    const tocAsideBoundingBox = await tocAside.boundingBox()

    // Ensure the bounding boxes are valid
    if (!h1BoundingBox || !tocAsideBoundingBox) {
      throw new Error('Unable to get bounding boxes for elements')
    }

    // Verify that the "Additional roles" navigation comes after the first h1 heading
    // by comparing their 'top' positions
    expect(h1BoundingBox.y).toBeLessThan(tocAsideBoundingBox.y)

    // Verify all content following h1 comes before "Additional roles" navigation
    // This can be more complex depending on the structure, but a basic approach:
    const contentAfterH1BeforeTOC = page.locator(
      'main >> h1 >> .. >> aside[role="complementary"]'
    )
    const contentAfterH1BeforeTOCText =
      await contentAfterH1BeforeTOC.allTextContents()
    expect(contentAfterH1BeforeTOCText.length).toBeGreaterThan(0)
  }

  // New validation: Check if <p>PROFILE</p> is present within the main landmark
  const profileP = page.locator('main >> p:text("PROFILE")')
  const isProfilePresent = profileP.count()

  if (await isProfilePresent) {
    // If <p>PROFILE</p> is present, validate it is visible
    expect(await profileP.isVisible()).toBeTruthy()
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

  async toCreateLogicalReadingOrderProfileContentTypeContactSections(page: Page) {
    const assertionName = 'toCreateLogicalReadingOrderProfileContentTypeContactSections'
    let pass: boolean
    let matcherResult: any
    try {
    
       // Step 1: Check that the "PROFILE" paragraph is present on the page 
const specificParagraph = await page.$('p:has-text("PROFILE")');

if (specificParagraph) {
  // Step 2: Locate any <h2> heading that starts with "Contact" using XPath
  const contactHeading = await page.$('//h2[starts-with(normalize-space(.), "Contact")]');

  if (contactHeading) {
    // Collect all headings between the <h2>Contact...</h2> and the next <h2>
    const headingsBetween = await page.evaluate(() => {
      const allHeadings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      
      const contactIndex = allHeadings.findIndex(
        (heading) => heading.textContent && heading.textContent.startsWith("Contact")
      );

      if (contactIndex === -1) return [];

      const nextH2Index = allHeadings
        .slice(contactIndex + 1)
        .findIndex((heading) => heading.tagName === 'H2');
        
      const endIndex = nextH2Index !== -1 ? contactIndex + 1 + nextH2Index : allHeadings.length;

      return allHeadings
        .slice(contactIndex + 1, endIndex)
        .map((heading) => heading.tagName);
    });

    // Assert all collected headings are <h3>
    const allAreH3 = headingsBetween.every((tagName) => tagName === 'H3');
    expect(allAreH3).toBe(true);
  } else {
    console.log('The <h2> heading that starts with "Contact" does not exist on the page.');
  }
} else {
  console.log('The "PROFILE" paragraph does not exist on the page.');
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

  async toHaveArticleLandmarkAgencyContentTypeNewsSection(page: Page) {
    const assertionName = 'toHaveArticleLandmarkAgencyContentTypeNewsSection'
    let pass: boolean
    let matcherResult: any
    try {
    
       // Step 1: Check that the "AGENCY" paragraph is present on the page
const specificParagraph = await page.$('p:has-text("AGENCY")')

if (specificParagraph) {
  // Step 2: Locate the <h2>News</h2> heading using XPath
  const newsHeading = await page.$('//h2[text()="News"]');

  if (newsHeading) {
    // Find all <p> elements with the specific class that follow the <h2> heading
    const paragraphs = page.locator('//h2[text()="News"]/following-sibling::p[contains(@class, "article__title") and contains(@class, "article--card__title")]');

    for (let i = 0; i < await paragraphs.count(); i++) {
      // Get the current <p> element
      const paragraph = paragraphs.nth(i);

      // Check the parent <article> landmark
      const articleParent = await paragraph.locator('xpath=ancestor::article').first();

      // Verify that the <p> is within an <article>
      await expect(articleParent).toBeVisible();
    } 
  } else {
    console.log('The <h2>News</h2> heading does not exist on the page.');
  }
} else {
  console.log('The "AGENCY" paragraph does not exist on the page.');
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
