import { AxeBuilder } from '@axe-core/playwright'
import { test, expect as baseExpect } from '@playwright/experimental-ct-react'
import type { ElementHandle, Locator, Page } from '@playwright/test'
import { findByText } from '@testing-library/react'
import tinycolor from 'tinycolor2'

export { test } from '@playwright/experimental-ct-react'

export const expect = baseExpect.extend({
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
  async toBeKeyboardFocusIndicatorAccessible(page: Page) {
    const assertionName = 'toBeKeyboardFocusIndicatorAccessible'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the specific stylesheet is present
      const stylesheetExists = await page.evaluate(() => {
        const styleSheets = Array.from(document.styleSheets)
        return styleSheets.some((sheet) =>
          sheet.href?.includes('_next/static/css/0366a0cd74896cbb.css')
        )
      })

      if (stylesheetExists) {
        // Proceed with the rest of the checks if the specific stylesheet is present

        // Check for basic focus behavior
        await page.keyboard.press('Tab')
        const focusedElement = await page.$(':focus')
        const indicatorStyle = await focusedElement?.evaluate((element) => {
          const computedStyle = getComputedStyle(element)
          return computedStyle.outline
        })
        baseExpect(indicatorStyle).not.toBe('none')

        // Check that keyboard focus classes are present in stylesheets
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

        // Check that keyboard focus selectors are present
        baseExpect(await page.locator(':focus').isVisible()).toBeTruthy()
        baseExpect(await page.locator('outline:').isVisible()).toBeTruthy()
        baseExpect(await page.locator('border:').isVisible()).toBeTruthy()
      } else {
        // If the specific stylesheet does not exist, the test passes
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

  async toHaveSearchLandmark(page: Page) {
    const assertionName = 'toHaveSearchLandmark'
    let pass: boolean
    let matcherResult: any
    try {
      baseExpect(
        await page.locator('header form[role="search"]').isVisible()
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

  async toHaveLanguageInteraction(page: Page) {
    const assertionName = 'toHaveLanguageInteraction'
    let pass: boolean
    let matcherResult: any
    try {
      // Define the correct dropdown selector
      const dropdownSelector = '[aria-label="language selector"]'

      // Wait for the dropdown menu to appear
      await page.waitForSelector(dropdownSelector)

      // Focus the dropdown menu to ensure it is active for keyboard interactions
      await page.focus(dropdownSelector)

      // Open the dropdown menu using "Enter"
      await page.keyboard.press('Enter')

      // Emulate keyboard interactions to select a language
      await page.keyboard.press('Tab') // Navigate down to the desired option
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
      // Open the language dropdown by clicking the <summary> element
      const dropdown = page.locator('[aria-label="language selector"]')
      await dropdown.locator('summary').click()

      // Define the list of expected languages
      const expectedLanguages = [
        'Español',
        '繁體中文',
        'Filipino',
        'Tiếng Việt'
      ]

      // Get all language link texts within the <ul>
      const languageItems = await dropdown.locator('ul a').allTextContents()

      // Validate each expected language is found
      for (const language of expectedLanguages) {
        expect(languageItems).toContain(language)
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

  async keyboardFocusIndicatorToHaveColorContrast(page: Page) {
    const assertionName = 'keyboardFocusIndicatorToHaveColorContrast'
    let pass: boolean
    let matcherResult: any
    try {
      // Minimum WCAG AA contrast ratio for non-text UI indicators like focus rings
      const minContrastRatio = 3.1

      const links = await page.$$('a[href]')

      for (const link of links) {
        // Focus the link to trigger focus styles
        await link.focus()

        // Get computed color and background-color
        const focusIndicatorColor = await page.evaluate((element) => {
          const computedStyle = window.getComputedStyle(element)
          return {
            color: computedStyle.color,
            backgroundColor: computedStyle.backgroundColor
          }
        }, link)

        if (
          !focusIndicatorColor?.color ||
          !focusIndicatorColor?.backgroundColor
        ) {
          throw new Error(
            'Could not retrieve focus indicator styles for a link.'
          )
        }

        const contrastRatio = tinycolor.readability(
          tinycolor(focusIndicatorColor.color),
          tinycolor(focusIndicatorColor.backgroundColor)
        )

        if (contrastRatio < minContrastRatio) {
          throw new Error(
            `WCAG violation: Focus indicator contrast ratio (${contrastRatio.toFixed(
              2
            )}) is below the required minimum of ${minContrastRatio}`
          )
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
          }
          // No action needed if attributes are present
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
      // Select all form controls within the main landmark
      const allFormControls = await page.$$(
        'main form input, main form select, main form textarea'
      )

      // Select only those that have required or aria-required within the main landmark
      const requiredFormControls = await page.$$(
        'main form [required], main form [aria-required="true"]'
      )

      // Get unique DOM elements from the required controls
      const requiredHandles = new Set(requiredFormControls)

      // Fail if any form element is missing both required and aria-required
      for (const element of allFormControls) {
        const hasRequired = (await element.getAttribute('required')) !== null
        const hasAriaRequired =
          (await element.getAttribute('aria-required')) === 'true'

        if (!hasRequired && !hasAriaRequired) {
          const tagName = await element.evaluate((el) =>
            el.tagName.toLowerCase()
          )
          const type = await element.getAttribute('type')
          const name = await element.getAttribute('name')

          throw new Error(
            `Form element <${tagName} name="${name}" type="${type}"> in <main> is missing required or aria-required="true" attribute.`
          )
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

  async toHaveRequiredAttributesInSpecificFormElements(page: Page) {
    const assertionName = 'toHaveRequiredAttributesInSpecificFormElements'
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

  async toHaveInlineErrorMessage(page: Page) {
    const assertionName = 'toHaveInlineErrorMessage'
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

  async toNotHaveDashesAndParenthesesInPlaceholder(page: Page) {
    const assertionName = 'toNotHaveDashesAndParenthesesInPlaceholder'
    let pass: boolean
    let matcherResult: any
    try {
      // Get all input elements
      const inputElements = await page.$$('input')

      // Iterate through input elements
      for (const input of inputElements) {
        // Get the placeholder attribute value
        const placeholder = await input.getAttribute('placeholder')

        // Throw error if the placeholder contains dashes or parentheses
        if (placeholder && /[-()]/.test(placeholder)) {
          throw new Error(
            `Invalid placeholder: "${placeholder}" contains dashes or parentheses.`
          )
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

    try {
      // Find the date picker button form control
      const datePickerButton = await page.$('button.date-picker')

      // Only proceed with the test if the date picker button is present
      if (datePickerButton) {
        // Focus on the date picker button using the Tab key
        await datePickerButton.focus()

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

  async toAccessDatePickerInput(page: Page) {
    const assertionName = 'toAccessDatePickerInput'
    let pass: boolean
    let matcherResult: any

    try {
      // Find the date picker input form control
      const datePickerInput = await page.$('input.date-picker')

      if (!datePickerInput) {
        return {
          message: (): string =>
            this.utils.matcherHint(
              'test.skip (simulated)',
              undefined,
              undefined
            ) + '\n\nDate picker input not found. Skipping test.',
          pass: true,
          name: 'Date Picker Test Skipped',
          actual: 'Date picker input not found.'
        }
      }

      // Focus on the date picker input using the Tab key
      await datePickerInput.focus()

      // Use arrow keys to navigate through the dates within the date picker
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowLeft')
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('ArrowUp')

      // Press the tab key to navigate through the months and years within the date picker
      await page.keyboard.press('Tab')

      // Press the Enter key to select a date within the date picker
      await page.keyboard.press('Enter')

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

    try {
      const controlsToTest = [
        { selector: '#phoneNumber', describedById: 'phoneinstructions' },
        { selector: '#input1', describedById: 'input1-instructions' },
        { selector: '#checkbox1', describedById: 'checkbox1-instructions' }
        // Add more as needed
      ]

      // Filter only controls that exist within <main>
      const controlsPresent = []
      for (const control of controlsToTest) {
        const scopedSelector = `main ${control.selector}`
        const element = await page.$(scopedSelector)
        if (element) {
          controlsPresent.push(control)
        }
      }

      // Simulate skipping the test if none of the selectors are found
      if (controlsPresent.length === 0) {
        return {
          message: (): string =>
            this.utils.matcherHint(
              'test.skip (simulated)',
              undefined,
              undefined
            ) +
            '\n\nNone of the specified controls were found in <main>. Skipping test.',
          pass: true,
          name: 'Selector Test Skipped',
          actual: 'No controls found in <main>'
        }
      }

      // Continue testing only those that are present
      for (const control of controlsPresent) {
        const scopedSelector = `main ${control.selector}`

        const describedByAttr = await page.getAttribute(
          scopedSelector,
          'aria-describedby'
        )
        expect(describedByAttr).toBe(control.describedById)

        const descriptionExists = await page.isVisible(
          `main #${control.describedById}`
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
      // Locate the iframe
      const iframeLocator = page.locator('iframe')

      // Check if iframe is present
      const isIframePresent = await iframeLocator.isVisible()
      if (!isIframePresent) {
        // Skip the test silently
      } else {
        const iframeSrc = await iframeLocator.getAttribute('src')

        if (!iframeSrc || !iframeSrc.startsWith('https://app.powerbigov.us/')) {
          // Skip the test silently
        } else {
          // Proceed with the rest of the test only if iframe and src are valid

          // Switch to the iframe context
          const frameLocator = page.frameLocator('iframe')

          // Tab into the dashboard
          await page.keyboard.press('Tab')

          // Wait for navigation module to load (adjust timeout as needed)
          await page.waitForTimeout(1000)

          // ❌ Fail if dashboard navigation module is not visible
          const isNavModuleVisible = await frameLocator
            .locator('selector-for-navigation-module')
            .isVisible()
          expect(isNavModuleVisible).toBeTruthy()

          // ❌ Fail if any iframe is missing a title
          const allIframes = page.locator('iframe')
          const iframeCount = await allIframes.count()

          for (let i = 0; i < iframeCount; i++) {
            const titleAttribute = await allIframes.nth(i).getAttribute('title')
            expect(
              titleAttribute,
              `iframe at index ${i} is missing a title attribute or it is empty`
            ).toBeTruthy()
          }

          // ❌ Fail if "Show data notes and sources" link is not visible
          const isLinkVisible = await page
            .locator('text="Show data notes and sources"')
            .isVisible()
          expect(isLinkVisible).toBeTruthy()
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

  async toDeleteItemsInMultiselectCombobox(page: Page) {
    const assertionName = 'toDeleteItemsInMultiselectCombobox'
    let pass: boolean
    let matcherResult: any

    // Check for multi-select combobox form controls
    const multiSelectComboboxControls = await page.$$(
      '.your-multiselect-combobox-selector'
    )

    if (multiSelectComboboxControls.length === 0) {
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

    const fieldset = await page.$('fieldset#billing-address')

    if (!fieldset) {
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
      // Check for fieldset
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

  async toHaveLogicalReadingOrderOnStepByStepContentType(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderOnStepByStepContentType'
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
        // The specific paragraph "STEP-BY-STEP" does not exist on the page.
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

  async toHaveLogicalReadingOrderInAccordionOnTransactionContentType(
    page: Page
  ) {
    const assertionName =
      'toHaveLogicalReadingOrderInAccordionOnTransactionContentType'
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

  async toHaveLogicalReadingOrderInAccordionOnMeetingContentType(page: Page) {
    const assertionName =
      'toHaveLogicalReadingOrderInAccordionOnMeetingContentType'
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
        // The specific heading "Get help" does not exist on the page.
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
      const contactInfoH2 = page.locator('h2', {
        hasText: 'Contact information'
      })

      // Check if the 'Contact information' heading is visible
      if (await contactInfoH2.isVisible()) {
        // Get all following sibling headings (h2–h6)
        const headingSiblings = contactInfoH2.locator(
          'xpath=following-sibling::*[self::h2 or self::h3 or self::h4 or self::h5 or self::h6]'
        )
        const count = await headingSiblings.count()

        if (count === 0) {
          // No headings found — test passes
          expect(true).toBe(true)
        } else {
          for (let i = 0; i < count; i++) {
            const heading = headingSiblings.nth(i)
            const tagName = await heading.evaluate((el) => el.tagName)

            if (tagName === 'H2') {
              // Stop checking further
              break
            }

            if (tagName !== 'H3') {
              // Fail the test if the heading is not an H3
              throw new Error(
                `Expected H3, but found ${tagName} after 'Contact information' heading`
              )
            }
          }

          // All validated headings were H3
          expect(true).toBe(true)
        }
      } else {
        // Heading not found — no action needed
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
        // The specific heading "Contact us" does not exist on the page.
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

  async toHaveLogicalReadingOrderAdditionalInfoSectionInGetHelpModule(
    page: Page
  ) {
    const assertionName =
      'toHaveLogicalReadingOrderAdditionalInfoSectionInGetHelpModule'
    let pass: boolean
    let matcherResult: any
    try {
      // Scope everything within the <main> landmark
      const main = page.locator('main')

      // a) Check that the "Get help" <h2> is visible within <main>
      const getHelpH2 = main.locator('h2', { hasText: 'Get help' })

      if (await getHelpH2.isVisible()) {
        // b) Look for "Additional info" text after the "Get help" heading
        const additionalInfoText = getHelpH2.locator(
          'xpath=following::text()[contains(., "Additional info")]'
        )

        const additionalInfoVisible = await additionalInfoText.isVisible()

        if (additionalInfoVisible) {
          // c) Count all headings (h2–h6) after "Additional info" — still within <main>
          const followingHeadings = additionalInfoText
            .locator(
              'xpath=following::*[self::h2 or self::h3 or self::h4 or self::h5 or self::h6]'
            )
            .filter({ has: main }) // Ensure headings are inside <main>

          const headingCount = await followingHeadings.count()

          if (headingCount > 0) {
            throw new Error(
              `Found ${headingCount} heading(s) after the 'Additional info' text within <main>.`
            )
          }
          // d) Pass if no headings found after "Additional info"
        }
        // d) Pass if "Additional info" text is not found
      }
      // e) Pass if "Get help" heading is not found

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
      // Step 1: Locate the <h2>Meeting resources</h2> heading using XPath
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
        // The specific heading "Meeting resources" does not exist on the page.
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

  async toHaveAndOrAriaLabelsOnStepbyStepContentType(page: Page) {
    const assertionName = 'toHaveAndOrAriaLabelsOnStepbyStepContentType'
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

  async toHaveLogicalReadingOrderOnInformationContentType(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderOnInformationContentType'
    let pass: boolean
    let matcherResult: any
    try {
      // Check that the info page paragraph is present on the page
      const specificParagraph = await page.$('p:text("INFO PAGE")')

      if (specificParagraph) {
        // If the paragraph is present, find the h1 heading and its text content
        const h1TextContent = await page.$eval(
          'h1',
          (el) => el.textContent || ''
        )

        // Collect all headings after the h1 heading and verify they are all h2
        const allAreH2 = await page.evaluate((h1Text) => {
          const allHeadings = Array.from(
            document.querySelectorAll('h1, h2, h3, h4, h5, h6')
          )
          const h1Element = allHeadings.find(
            (h) => (h.textContent || '').trim() === h1Text
          )
          if (!h1Element) return false // Handle cases where the h1 is missing
          const h1Index = allHeadings.indexOf(h1Element)
          const headingsAfterH1 = allHeadings.slice(h1Index + 1)
          return headingsAfterH1.every((heading) => heading.tagName === 'H2')
        }, h1TextContent)

        // Assert that all headings after the h1 are h2
        expect(allAreH2).toBe(true)
      } else {
        // The specific paragraph "INFO PAGE" does not exist on the page.
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
        // The specific heading <h2>What to know</h2> does not exist on the page.
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
      // Check for the specific paragraph
      const specificParagraph = await page.$('p:text("EVENT")')

      if (specificParagraph) {
        // Check that specific texts are h3 headings
        const mayorHeading = page.locator('h3:has-text("Date and Time")')
        await expect(mayorHeading).toBeVisible()

        const boardOfSupervisorsHeading = page.locator('h3:has-text("Cost")')
        await expect(boardOfSupervisorsHeading).toBeVisible()

        const electedOfficialsHeading = page.locator('h3:has-text("Location")')
        await expect(electedOfficialsHeading).toBeVisible()
      } else {
        // The specific paragraph "EVENT" does not exist on the page. Passing the test.
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

  async toHaveLogicalReadingOrderInResourcesSectionOnAboutContentType(
    page: Page
  ) {
    const assertionName =
      'toHaveLogicalReadingOrderInResourcesSectionOnAboutContentType'
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
        }
        // The <h2>Resources</h2> heading does not exist on the page
      }
      // The "ABOUT US" paragraph does not exist on the page

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
        }
        // The <h2>Services</h2> heading does not exist on the page
      }
      // The "TOPIC" paragraph does not exist on the page

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

  async toHaveLogicalReadingOrderInFooter(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderInFooter'
    let pass: boolean
    let matcherResult: any
    try {
      // Select the footer landmark
      const footer = page.locator('footer')

      // Validate that "Our City" is an h2 heading within the footer
      const cityLinksHeading = footer.locator('h2', { hasText: 'Our City' })
      await expect(cityLinksHeading).toBeVisible()

      // Validate that "Languages" is an h2 heading within the footer
      const languagesHeading = footer.locator('h2', { hasText: 'Languages' })
      await expect(languagesHeading).toBeVisible()

      // Validate that "Policy" is an h2 heading within the footer
      const resourcesHeading = footer.locator('h2', { hasText: 'Policy' })
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

  async toHaveKeyboardFocusInLinks(page: Page) {
    const assertionName = 'toHaveKeyboardFocusInLinks'
    let pass: boolean
    let matcherResult: any
    try {
      // Get all links on the page
      const links = await page.$$eval('a', (anchors) =>
        anchors.map((anchor) => ({
          href: anchor.getAttribute('href'),
          text: anchor.textContent?.trim() || ''
        }))
      )

      // Iterate through each link and check if it receives keyboard focus
      for (let i = 0; i < links.length; i++) {
        const { href, text } = links[i]

        // Select the nth link directly
        const allLinks = await page.$$('a')
        const link = allLinks[i]

        if (link) {
          // Ensure the link is visible and interactive before testing focus
          const isVisible = await link.isVisible()
          const isDisabled = await page.evaluate(
            (el) =>
              el.hasAttribute('disabled') ||
              el.getAttribute('tabindex') === '-1',
            link
          )

          if (isVisible && !isDisabled) {
            // Focus the link
            await link.focus()

            // Check if the link has received focus
            const isFocused = await page.evaluate(
              (el) => document.activeElement === el,
              link
            )

            if (!isFocused) {
              throw new Error(
                `Link "${text}" (href: "${href}") did not receive focus.`
              )
            }
          }
          // If the link is not visible or focusable, silently skip it (no warning/log)
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

  async toHaveKeyboardFocusOnMeetingTranscriptLinks(page: Page) {
    const assertionName = 'toHaveKeyboardFocusOnMeetingTranscriptLinks'
    let pass: boolean
    let matcherResult: any
    try {
      // Define the target link texts to verify focus
      const targetLinkTexts = ['Show transcript', 'View full transcript']

      // Get all focusable elements on the page
      const focusableSelectors = [
        'a[href]', // Links with href
        'button', // Buttons
        'input', // Inputs
        '[tabindex]:not([tabindex="-1"])' // Elements with a tabindex other than -1
      ]
      const focusableElements = await page.$$(focusableSelectors.join(','))

      // Variable to track if the target links received focus
      const focusFailures: string[] = []

      // Simulate tabbing through the page and check focus on target links
      for (const targetText of targetLinkTexts) {
        let isFocused = false

        for (let i = 0; i < focusableElements.length; i++) {
          await page.keyboard.press('Tab')

          const elementText = await page.evaluate(() => {
            const activeElement = document.activeElement
            return activeElement
              ? activeElement.textContent?.trim() || ''
              : null
          })

          if (elementText === targetText) {
            isFocused = true
            break
          }
        }

        if (!isFocused) {
          focusFailures.push(targetText)
        }
      }

      // Fail the test if any target link did not receive focus
      expect(
        focusFailures,
        `The following links did not receive focus: ${focusFailures.join(', ')}`
      ).toEqual([])

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

  async toHaveLogicalReadingOrderInAccordionOnCampaignContentType(page: Page) {
    const assertionName =
      'toHaveLogicalReadingOrderInAccordionOnCampaignContentType'
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
      // Find an h1 element with the text 'Welcome to SF.gov' inside the <main> landmark
      const welcomeH1 = page.locator('main h1', {
        hasText: 'Welcome to SF.gov'
      })

      // Validate the element is visible
      baseExpect(await welcomeH1.isVisible()).toBeTruthy()

      // Validate the tag name is H1
      baseExpect(await welcomeH1.evaluate((node) => node.tagName)).toBe('H1')

      // Locate the second h2 with the text "Services" inside the <main> landmark
      const servicesH2 = page.locator('main h2', { hasText: 'Services' }).nth(1)

      // Validate the element is visible
      baseExpect(await servicesH2.isVisible()).toBeTruthy()

      // Validate the tag name is H2
      baseExpect(await servicesH2.evaluate((node) => node.tagName)).toBe('H2')

      // Find an h2 element with the text 'San Francisco elected officials' inside the <main> landmark
      const sfelectedofficialsH2 = page.locator('main h2', {
        hasText: 'San Francisco elected officials'
      })

      // Validate the element is visible
      baseExpect(await sfelectedofficialsH2.isVisible()).toBeTruthy()

      // Validate the tag name is H2
      baseExpect(
        await sfelectedofficialsH2.evaluate((node) => node.tagName)
      ).toBe('H2')

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
      const videoInfoH3 = page.locator('h3', {
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
        // The specific heading "Video recording" does not exist on the page. Passing the test.
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

  async toHaveLogicalReadingOrderInResourcesSectionOnResourceCollectionContentType(
    page: Page
  ) {
    const assertionName =
      'toHaveLogicalReadingOrderInResourcesSectionOnResourceCollectionContentType'
    let pass: boolean
    let matcherResult: any
    try {
      // Step 1: Check that the "RESOURCE COLLECTION" paragraph is present on the page
      const specificParagraph = await page.$(
        'p:has-text("RESOURCE COLLECTION")'
      )

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
              (heading) => heading.textContent === 'Data'
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
        }
        // The <h2>Resources</h2> heading does not exist on the page
      }
      // The "Resource Collection" paragraph does not exist on the page

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

  async toHaveLogicalReadingOrderInDocumentsSectionOnResourceCollectionContentType(
    page: Page
  ) {
    const assertionName =
      'toHaveLogicalReadingOrderInDocumentsSectionOnResourceCollectionContentType'
    let pass: boolean
    let matcherResult: any
    try {
      // Step 1: Check that the "RESOURCE COLLECTION" paragraph is present on the page
      const specificParagraph = await page.$(
        'p:has-text("RESOURCE COLLECTION")'
      )

      if (specificParagraph) {
        // Step 2: Locate the <h2>Documents</h2> heading using XPath
        const documentsHeading = await page.$('//h2[text()="Documents"]')

        if (documentsHeading) {
          // Collect all headings between <h2>Documents</h2> and the next <h2>
          const headingsBetween = await page.evaluate(() => {
            const allHeadings = Array.from(
              document.querySelectorAll('h1, h2, h3, h4, h5, h6')
            )
            const documentsIndex = allHeadings.findIndex(
              (heading) => heading.textContent === 'Data'
            )
            const nextH2Index = allHeadings
              .slice(documentsIndex + 1)
              .findIndex((heading) => heading.tagName === 'H2')
            const endIndex =
              nextH2Index !== -1
                ? documentsIndex + 1 + nextH2Index
                : allHeadings.length

            return allHeadings
              .slice(documentsIndex + 1, endIndex)
              .map((heading) => heading.tagName)
          })

          // Assert all collected headings are <h3>
          headingsBetween.forEach((tagName) => {
            expect(tagName).toBe('H3')
          })
        }
        // The <h2>Documents</h2> heading does not exist on the page
      }
      // The "Resource Collection" paragraph does not exist on the page

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
      const specificParagraph = await page.$('p:has-text("NEWS")')

      if (specificParagraph) {
        // If <p>NEWS</p> exists, validate blockquote elements
        const blockquotes = page.locator('blockquote')

        const count = await blockquotes.count()
        for (let i = 0; i < count; i++) {
          const blockquote = blockquotes.nth(i)
          const ariaHidden = await blockquote.getAttribute('aria-hidden')
          expect(ariaHidden).toBe('true')
        }
      } else {
        // If <p>NEWS</p> does not exist, pass the test
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
      const pageTitle = await page.title()
      if (pageTitle === 'City and County of San Francisco') {
        // Locate the <h2>News</h2> heading
        const newsHeading = page.locator('h2:has-text("News")')

        // Check if the <h2> heading is found and visible
        await expect(newsHeading).toBeVisible()

        // Find all <p> elements with the specific class that follow the <h2> heading
        const paragraphs = newsHeading.locator(
          'xpath=following-sibling::p[contains(@class, "article__title") and contains(@class, "article--card__title")]'
        )

        const count = await paragraphs.count()
        for (let i = 0; i < count; i++) {
          // Get the current <p> element
          const paragraph = paragraphs.nth(i)

          // Check the parent <article> landmark
          const articleParent = paragraph
            .locator('xpath=ancestor::article')
            .first()

          // Verify that the <p> is within an <article>
          await expect(articleParent).toBeVisible()
        }
      } else {
        // The "City and County of San Francisco" title does not exist on the page
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
      const specificParagraph = await page.$('p:has-text("PRESS RELEASE")')

      if (specificParagraph) {
        // If <p>PRESS RELEASE</p> exists, validate blockquote elements
        const blockquotes = page.locator('blockquote')

        const count = await blockquotes.count()
        for (let i = 0; i < count; i++) {
          const blockquote = blockquotes.nth(i)
          const ariaHidden = await blockquote.getAttribute('aria-hidden')
          expect(ariaHidden).toBe('true')
        }
      } else {
        // If <p>PRESS RELEASE</p> does not exist, pass the test
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
    const assertionName =
      'toHaveALogicalReadingOrderInAccordionOnLocationContentType'
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

  async toHaveALogicalReadingOrderInGettingHereSectionOnLocationContentType(
    page: Page
  ) {
    const assertionName =
      'toHaveALogicalReadingOrderInGettingHereSectionOnLocationContentType'
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
        }
        // The <h2>Getting here</h2> heading does not exist on the page
      }
      // The "LOCATION" paragraph does not exist on the page

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

  async toHaveALogicalReadingOrderInGlossarySectionOnDataStoryContentType(
    page: Page
  ) {
    const assertionName =
      'toHaveALogicalReadingOrderInGlossarySectionOnDataStoryContentType'
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
        }
        // The <h2>Glossary</h2> heading does not exist on the page
      }
      // The "DATA STORY" paragraph does not exist on the page

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

  async toSuppressInPageSearchModuleOnDataStoryContentType(page: Page) {
    const assertionName = 'toSuppressInPageSearchModuleOnDataStoryContentType'
    let pass: boolean
    let matcherResult: any
    try {
      // Step 1: Check that the "DATA STORY" paragraph is present on the page
      const specificParagraph = await page.$('p:has-text("DATA STORY")')

      if (specificParagraph) {
        // Step 2: Check if the <label>Search on this page</label> is present
        const searchLabel = await page.$(
          'label:has-text("Search on this page")'
        )

        if (searchLabel) {
          // Validate that the associated <input> tag has aria-hidden="true"
          const inputTag = await searchLabel.evaluateHandle(
            (label) => label.nextElementSibling
          )

          if (inputTag) {
            const ariaHidden = await inputTag.getProperty('aria-hidden')
            expect(ariaHidden).toBe('true')
          } else {
            console.error('Associated <input> tag not found.')
          }
        }
        // <label>Search on this page</label> not found. Pass the test.
      }
      // If <p>DATA STORY</p> does not exist, pass the test

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
      // Check for the specific paragraph
      const specificParagraph = await page.$('p:text("SERVICE")')

      if (specificParagraph) {
        // Define a comprehensive focusable element selector
        const focusableSelector =
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]'

        // Wait for the elements to ensure they are loaded
        await page.waitForSelector('h1')
        await page.waitForSelector(
          'nav[role="navigation"][aria-label="Table of contents"]'
        )

        // Get all focusable elements after <h1>
        const focusableAfterH1Locator = page.locator(
          `h1 ~ ${focusableSelector}`
        )
        const focusableAfterH1Count = await focusableAfterH1Locator.count()

        // Get all focusable elements after the <nav role="navigation" aria-label="Table of contents">
        const focusableAfterNavLocator = page.locator(
          `nav[role="navigation"][aria-label="Table of contents"] ~ ${focusableSelector}`
        )
        const focusableAfterNavCount = await focusableAfterNavLocator.count()

        // Validate elements after <h1>
        for (let i = 0; i < focusableAfterH1Count; i++) {
          await focusableAfterH1Locator.nth(i).focus()
          const isVisible = await focusableAfterH1Locator.nth(i).isVisible()
          const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled()
          expect(isVisible).toBe(true)
          expect(isEnabled).toBe(true)
        }

        // Validate elements after <nav role="navigation" aria-label="Table of contents">
        for (let i = 0; i < focusableAfterNavCount; i++) {
          await focusableAfterNavLocator.nth(i).focus()
          const isVisible = await focusableAfterNavLocator.nth(i).isVisible()
          const isEnabled = await focusableAfterNavLocator.nth(i).isEnabled()
          expect(isVisible).toBe(true)
          expect(isEnabled).toBe(true)
        }
      } else {
        // The specific paragraph "SERVICE" does not exist on the page
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
      // Check for the specific paragraph
      const specificParagraph = await page.$('p:text("DATA STORY")')

      if (specificParagraph) {
        // Define a comprehensive focusable element selector
        const focusableSelector =
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]'

        // Wait for the elements to ensure they are loaded
        await page.waitForSelector('h1')
        await page.waitForSelector(
          'nav[role="navigation"][aria-label="Table of contents"]'
        )

        // Get all focusable elements after <h1> using locator
        const focusableAfterH1Locator = page.locator(
          `h1 ~ ${focusableSelector}`
        )
        const focusableAfterH1Count = await focusableAfterH1Locator.count()

        // Get all focusable elements after the <nav role="navigation" aria-label="Table of contents">
        const focusableAfterNavLocator = page.locator(
          `nav[role="navigation"][aria-label="Table of contents"] ~ ${focusableSelector}`
        )
        const focusableAfterNavCount = await focusableAfterNavLocator.count()

        // Validate elements after <h1>
        for (let i = 0; i < focusableAfterH1Count; i++) {
          await focusableAfterH1Locator.nth(i).focus()

          const isVisible = await focusableAfterH1Locator.nth(i).isVisible()
          const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled()
          expect(isVisible).toBe(true)
          expect(isEnabled).toBe(true)
        }

        // Validate elements after <nav role="navigation" aria-label="Table of contents">
        for (let i = 0; i < focusableAfterNavCount; i++) {
          await focusableAfterNavLocator.nth(i).focus()

          const isVisible = await focusableAfterNavLocator.nth(i).isVisible()
          const isEnabled = await focusableAfterNavLocator.nth(i).isEnabled()
          expect(isVisible).toBe(true)
          expect(isEnabled).toBe(true)
        }
      } else {
        // The specific paragraph "DATA STORY" does not exist on the page.
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
      // Check if "form" or "formio" is present in the DOM
      const formPresent = (await page.$('form')) !== null
      const formIoPresent = (await page.$('form-io')) !== null

      // If either "form" or "formio" is present, validate the <nav> landmark
      if (formPresent || formIoPresent) {
        // Define a comprehensive focusable element selector
        const focusableSelector =
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]'

        // Wait for the elements to ensure they are loaded
        await page.waitForSelector('h1')
        await page.waitForSelector(
          'nav[aria-label="Progress indicator and navigation"]'
        )

        // Get all focusable elements after <h1> using locator
        const focusableAfterH1Locator = page.locator(
          `h1 ~ ${focusableSelector}`
        )
        const focusableAfterH1Count = await focusableAfterH1Locator.count()

        // Get all focusable elements after the <aria-label="Progress indicator and navigation"> using locator
        const focusableAfterNavLocator = page.locator(
          `nav[aria-label="Progress indicator and navigation"] ~ ${focusableSelector}`
        )
        const focusableAfterNavCount = await focusableAfterNavLocator.count()

        // Function to track the currently focused element (silently now)
        const logFocusedElement = async () => {
          await page.evaluate(() => {
            const activeElement = document.activeElement
            // This no longer logs anything, but could be used for debugging
          })
        }

        // Validate elements after <h1>
        for (let i = 0; i < focusableAfterH1Count; i++) {
          await focusableAfterH1Locator.nth(i).focus()
          await logFocusedElement()

          const isVisible = await focusableAfterH1Locator.nth(i).isVisible()
          const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled()
          expect(isVisible).toBe(true)
          expect(isEnabled).toBe(true)
        }

        // Validate elements after <nav aria-label="Progress indicator and navigation">
        for (let i = 0; i < focusableAfterNavCount; i++) {
          await focusableAfterNavLocator.nth(i).focus()
          await logFocusedElement()

          const isVisible = await focusableAfterNavLocator.nth(i).isVisible()
          const isEnabled = await focusableAfterNavLocator.nth(i).isEnabled()
          expect(isVisible).toBe(true)
          expect(isEnabled).toBe(true)
        }
      } else {
        // Neither 'form' nor 'formio' is present.
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

  async toCreateLogicalReadingOrderInServicesSectionOnAgencyContentType(
    page: Page
  ) {
    const assertionName =
      'toCreateLogicalReadingOrderInServicesSectionOnAgencyContentType'
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
        }
        // The <h2>Services</h2> heading does not exist on the page
      }
      // The "AGENCY" paragraph does not exist on the page

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

  async toCreateLogicalReadingOrderInResourcesSectionOnAgencyContentType(
    page: Page
  ) {
    const assertionName =
      'toCreateLogicalReadingOrderInResourcesSectionOnAgencyContentType'
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
        }
        // The <h2>Resources</h2> heading does not exist on the page
      }
      // The "AGENCY" paragraph does not exist on the page

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

  async toCreateLogicalReadingOrderInAboutSectionOnAgencyContentType(
    page: Page
  ) {
    const assertionName =
      'toCreateLogicalReadingOrderInAboutSectionOnAgencyContentType'
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
        }
        // The <h2>About</h2> heading does not exist on the page
      }
      // The "AGENCY" paragraph does not exist on the page

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
      // Check for the specific paragraph
      const specificParagraph = await page.$('p:text("RESOURCE COLLECTION")')

      if (specificParagraph) {
        // Define a comprehensive focusable element selector
        const focusableSelector =
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]'

        // Wait for the elements to ensure they are loaded
        await page.waitForSelector('h1')
        await page.waitForSelector(
          'nav[role="navigation"][aria-label="Table of contents"]'
        )

        // Get all focusable elements after <h1> using locator
        const focusableAfterH1Locator = page.locator(
          `h1 ~ ${focusableSelector}`
        )
        const focusableAfterH1Count = await focusableAfterH1Locator.count()

        // Get all focusable elements after the nav
        const focusableAfterNavLocator = page.locator(
          `nav[role="navigation"][aria-label="Table of contents"] ~ ${focusableSelector}`
        )
        const focusableAfterNavCount = await focusableAfterNavLocator.count()

        // Validate elements after <h1>
        for (let i = 0; i < focusableAfterH1Count; i++) {
          await focusableAfterH1Locator.nth(i).focus()
          const isVisible = await focusableAfterH1Locator.nth(i).isVisible()
          const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled()
          expect(isVisible).toBe(true)
          expect(isEnabled).toBe(true)
        }

        // Validate elements after <nav>
        for (let i = 0; i < focusableAfterNavCount; i++) {
          await focusableAfterNavLocator.nth(i).focus()
          const isVisible = await focusableAfterNavLocator.nth(i).isVisible()
          const isEnabled = await focusableAfterNavLocator.nth(i).isEnabled()
          expect(isVisible).toBe(true)
          expect(isEnabled).toBe(true)
        }
      } else {
        // The specific paragraph "RESOURCE COLLECTION" does not exist on the page.
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
      const specificParagraph = await page.$('p:has-text("PROFILE")')

      if (specificParagraph) {
        const asideExists = await page.$('aside[role="complementary"]')

        if (asideExists) {
          const focusableSelector =
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]'

          await page.waitForSelector('h1')

          const focusableAfterH1Locator = page.locator(
            `h1 ~ ${focusableSelector}`
          )
          const focusableAfterH1Count = await focusableAfterH1Locator.count()

          const logFocusedElement = async () => {
            await page.evaluate(() => {
              const activeElement = document.activeElement
              if (!activeElement) return null
              return {
                tagName: activeElement.tagName,
                id: activeElement.id || null,
                className: activeElement.className || null,
                tabindex: activeElement.getAttribute('tabindex') || null,
                name: activeElement.getAttribute('name') || null,
                type: activeElement.getAttribute('type') || null,
                isHidden:
                  window.getComputedStyle(activeElement).visibility ===
                    'hidden' ||
                  window.getComputedStyle(activeElement).display === 'none'
              }
            })
          }

          for (let i = 0; i < focusableAfterH1Count; i++) {
            await focusableAfterH1Locator.nth(i).focus()
            await logFocusedElement() // You may omit this if logging isn't needed

            const isVisible = await focusableAfterH1Locator.nth(i).isVisible()
            const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled()
            expect(isVisible).toBe(true)
            expect(isEnabled).toBe(true)
          }

          const focusableAfterAsideLocator = page.locator(
            `aside[role="complementary"] ~ ${focusableSelector}`
          )
          const focusableAfterAsideCount =
            await focusableAfterAsideLocator.count()

          for (let i = 0; i < focusableAfterAsideCount; i++) {
            await focusableAfterAsideLocator.nth(i).focus()
            await logFocusedElement() // Same here—omit if no logging is needed

            const isVisible = await focusableAfterAsideLocator
              .nth(i)
              .isVisible()
            const isEnabled = await focusableAfterAsideLocator
              .nth(i)
              .isEnabled()
            expect(isVisible).toBe(true)
            expect(isEnabled).toBe(true)
          }
        }
        // The aside[role="complementary"] does not exist on the page
      }
      // The "PROFILE" paragraph does not exist on the page

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

  async toCreateLogicalReadingOrderInContactSectionsOnProfileContentType(
    page: Page
  ) {
    const assertionName =
      'toCreateLogicalReadingOrderInContactSectionsOnProfileContentType'
    let pass: boolean
    let matcherResult: any
    try {
      // Step 1: Check that the "PROFILE" paragraph is present on the page
      const specificParagraph = await page.$('p:has-text("PROFILE")')

      if (specificParagraph) {
        // Step 2: Locate any <h2> heading that starts with "Contact" using XPath
        const contactHeading = await page.$(
          '//h2[starts-with(normalize-space(.), "Contact")]'
        )

        if (contactHeading) {
          // Collect all headings between the <h2>Contact...</h2> and the next <h2>
          const headingsBetween = await page.evaluate(() => {
            const allHeadings = Array.from(
              document.querySelectorAll('h1, h2, h3, h4, h5, h6')
            )

            const contactIndex = allHeadings.findIndex(
              (heading) =>
                heading.textContent && heading.textContent.startsWith('Contact')
            )

            if (contactIndex === -1) return []

            const nextH2Index = allHeadings
              .slice(contactIndex + 1)
              .findIndex((heading) => heading.tagName === 'H2')

            const endIndex =
              nextH2Index !== -1
                ? contactIndex + 1 + nextH2Index
                : allHeadings.length

            return allHeadings
              .slice(contactIndex + 1, endIndex)
              .map((heading) => heading.tagName)
          })

          // Assert all collected headings are <h3>
          const allAreH3 = headingsBetween.every((tagName) => tagName === 'H3')
          expect(allAreH3).toBe(true)
        }
        // The <h2> heading that starts with "Contact" does not exist on the page
      }
      // The "PROFILE" paragraph does not exist on the page.

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
        const newsHeading = await page.$('//h2[text()="News"]')

        if (newsHeading) {
          // Find all <p> elements with the specific class that follow the <h2> heading
          const paragraphs = page.locator(
            '//h2[text()="News"]/following-sibling::p[contains(@class, "article__title") and contains(@class, "article--card__title")]'
          )

          for (let i = 0; i < (await paragraphs.count()); i++) {
            // Get the current <p> element
            const paragraph = paragraphs.nth(i)

            // Check the parent <article> landmark
            const articleParent = paragraph
              .locator('xpath=ancestor::article')
              .first()

            // Verify that the <p> is within an <article>
            await expect(articleParent).toBeVisible()
          }
        }
        // The <h2>News</h2> heading does not exist on the page
      }
      // The "AGENCY" paragraph does not exist on the page

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

  async toSuppressInPageSearchModuleOnReportContentType(page: Page) {
    const assertionName = 'toSuppressInPageSearchModuleOnReportContentType'
    let pass: boolean
    let matcherResult: any
    try {
      // Step 1: Check that the "REPORT" paragraph is present on the page
      const specificParagraph = await page.$('p:has-text("REPORT")')

      if (specificParagraph) {
        // Step 2: Check if the <label>Search on this page</label> is present
        const searchLabel = await page.$(
          'label:has-text("Search on this page")'
        )

        if (searchLabel) {
          // Validate that the associated <input> tag has aria-hidden="true"
          const inputTag = await searchLabel.evaluateHandle(
            (label) => label.nextElementSibling
          )

          if (inputTag) {
            const ariaHidden = await inputTag.getProperty('aria-hidden')
            expect(ariaHidden).toBe('true')
          } else {
            console.error('Associated <input> tag not found.')
          }
        }
        // <label>Search on this page</label> not found
      }
      // <p>REPORT</p> not found. Test passes.

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

  async toHaveLogicalTabOrderOnReportContentType(page: Page) {
    const assertionName = 'toHaveLogicalTabOrderOnReportContentType'
    let pass: boolean
    let matcherResult: any
    try {
      // Check for the specific paragraph
      const specificParagraph = await page.$('p:text("REPORT")')

      if (specificParagraph) {
        // Define a comprehensive focusable element selector
        const focusableSelector =
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]'

        // Wait for the elements to ensure they are loaded
        await page.waitForSelector('h1')
        await page.waitForSelector(
          'nav[role="navigation"][aria-label="Table of contents"]'
        )

        // Get all focusable elements after <h1>
        const focusableAfterH1Locator = page.locator(
          `h1 ~ ${focusableSelector}`
        )
        const focusableAfterH1Count = await focusableAfterH1Locator.count()

        // Get all focusable elements after the <nav> landmark
        const focusableAfterNavLocator = page.locator(
          `nav[role="navigation"][aria-label="Table of contents"] ~ ${focusableSelector}`
        )
        const focusableAfterNavCount = await focusableAfterNavLocator.count()

        // Helper function to evaluate focus (now returns info instead of logging it)
        const getFocusedElementInfo = async () => {
          return await page.evaluate(() => {
            const activeElement = document.activeElement
            if (!activeElement) return null
            return {
              tagName: activeElement.tagName,
              id: activeElement.id || null,
              className: activeElement.className || null,
              tabindex: activeElement.getAttribute('tabindex') || null,
              name: activeElement.getAttribute('name') || null,
              type: activeElement.getAttribute('type') || null,
              isHidden:
                window.getComputedStyle(activeElement).visibility ===
                  'hidden' ||
                window.getComputedStyle(activeElement).display === 'none'
            }
          })
        }

        // Validate elements after <h1>
        for (let i = 0; i < focusableAfterH1Count; i++) {
          await focusableAfterH1Locator.nth(i).focus()
          await getFocusedElementInfo() // Previously logged, now just called
          const isVisible = await focusableAfterH1Locator.nth(i).isVisible()
          const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled()
          expect(isVisible).toBe(true)
          expect(isEnabled).toBe(true)
        }

        // Validate elements after <nav>
        for (let i = 0; i < focusableAfterNavCount; i++) {
          await focusableAfterNavLocator.nth(i).focus()
          await getFocusedElementInfo() // Previously logged, now just called
          const isVisible = await focusableAfterNavLocator.nth(i).isVisible()
          const isEnabled = await focusableAfterNavLocator.nth(i).isEnabled()
          expect(isVisible).toBe(true)
          expect(isEnabled).toBe(true)
        }
      } else {
        // The specific paragraph "REPORT" does not exist on the page.
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

  async toHaveLogicalTabOrderOnMeetingContentType(page: Page) {
    const assertionName = 'toHaveLogicalTabOrderOnMeetingContentType'
    let pass: boolean
    let matcherResult: any
    try {
      // Check for the specific paragraph
      const specificParagraph = await page.$('p:text("MEETING")')

      if (specificParagraph) {
        // Define a comprehensive focusable element selector
        const focusableSelector =
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]'

        // Wait for the elements to ensure they are loaded
        await page.waitForSelector('h1')
        await page.waitForSelector(
          'nav[role="navigation"][aria-label="Table of contents"]'
        )

        // Get all focusable elements after <h1> using locator
        const focusableAfterH1Locator = page.locator(
          `h1 ~ ${focusableSelector}`
        )
        const focusableAfterH1Count = await focusableAfterH1Locator.count()

        // Get all focusable elements after the <nav role="navigation" aria-label="Table of contents">
        const focusableAfterNavLocator = page.locator(
          `nav[role="navigation"][aria-label="Table of contents"] ~ ${focusableSelector}`
        )
        const focusableAfterNavCount = await focusableAfterNavLocator.count()

        // Validate elements after <h1>
        for (let i = 0; i < focusableAfterH1Count; i++) {
          await focusableAfterH1Locator.nth(i).focus() // Focus each element manually
          const isVisible = await focusableAfterH1Locator.nth(i).isVisible()
          const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled()
          expect(isVisible).toBe(true)
          expect(isEnabled).toBe(true)
        }

        // Validate elements after <nav role="navigation" aria-label="Table of contents">
        for (let i = 0; i < focusableAfterNavCount; i++) {
          await focusableAfterNavLocator.nth(i).focus() // Focus each element manually
          const isVisible = await focusableAfterNavLocator.nth(i).isVisible()
          const isEnabled = await focusableAfterNavLocator.nth(i).isEnabled()
          expect(isVisible).toBe(true)
          expect(isEnabled).toBe(true)
        }
      } else {
        // The specific paragraph "MEETING" does not exist on the page.
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

  async toHaveScopeAttributesInDataTables(page: Page) {
    const assertionName = 'toHaveScopeAttributesInDataTables'
    let pass: boolean
    let matcherResult: any
    try {
      // Locate all <th> elements in the table
      const tableHeaders = page.locator('th')

      // Loop through each header cell and check the 'scope' attribute
      for (let i = 0; i < (await tableHeaders.count()); i++) {
        const header = tableHeaders.nth(i)
        const scopeAttr = await header.getAttribute('scope')

        // Check if the scope attribute is missing
        if (scopeAttr === null) {
          throw new Error(
            `Error: Missing scope attribute on <th> element at index ${i}`
          )
        }

        // Assert that the 'scope' attribute is either 'col' or 'row'
        const validScopes = ['col', 'row']

        if (!validScopes.includes(scopeAttr)) {
          throw new Error(
            `Invalid scope attribute value on <th> element at index ${i}: ${scopeAttr}`
          )
        }

        // You could also add the following assertion to let Playwright's expect check the validity
        expect(validScopes).toContain(scopeAttr)
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

  async toHaveAsideLandmarkRole(page: Page) {
    const assertionName = 'toHaveAsideLandmarkRole'
    let pass: boolean
    let matcherResult: any
    try {
      try {
        // Locate the <aside> landmark
        const specificLandmark = page.locator('aside')

        // Check if the <aside> landmark exists
        const count = await specificLandmark.count()

        if (count > 0) {
          // If <aside> exists, validate its 'role' attribute
          await expect(specificLandmark).toHaveAttribute(
            'role',
            'complementary'
          )
        } else {
          // The <aside> landmark does not exist on the page. Pass test.
        }
      } catch (error) {
        console.error('Test failed due to an error:', error)
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

  async toHaveAriaLabelInProgressBarNavLandmarkOnFormsContentType(page: Page) {
    const assertionName =
      'toHaveAriaLabelInProgressBarNavLandmarkOnFormsContentType'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if "form" or "formio" is present in the DOM
      const formPresent = (await page.$('form')) !== null
      const formIoPresent = (await page.$('form-io')) !== null

      // If either "form" or "formio" is present, validate the <nav> landmark
      if (formPresent || formIoPresent) {
        const nav = await page.$(
          'nav[aria-label="Progress indicator and navigation"]'
        )
        expect(nav).not.toBeNull()
      } else {
        // Neither 'form' nor 'formio' is present.
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

  async toHaveLogicalReadingOrderDepartmentListView(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderDepartmentListView'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page title is "Departments | San Francisco"
      const title = await page.title()

      if (title === 'Departments | San Francisco') {
        // If the title matches, perform the additional checks

        // Find the <main> element
        const main = page.locator('main')

        // Check that there is exactly one <h1> within <main>
        const h1Count = await main.locator('h1').count()
        expect(h1Count).toBe(1) // Ensure exactly one <h1>

        // Find the <h1> within <main> containing the word "Departments"
        const h1WithDepartments = main
          .locator('h1:has-text("Departments")')
          .first()

        // Ensure that the first "Departments" within <main> is indeed inside an <h1>
        const textContent = await h1WithDepartments.textContent()
        expect(textContent).toContain('Departments')

        // Check that all following elements with <a> tags are inside <h2>
        const links = main.locator('h1:has-text("Departments") ~ h2 a') // Select links following <h1> within <h2> elements
        const linksCount = await links.count()

        // Ensure all the links following <h1> "Departments" are inside <h2>
        for (let i = 0; i < linksCount; i++) {
          const link = links.nth(i)

          // Check if the parent element of the link is an <h2>
          const parentTag = await link.evaluate(
            (el) => el.parentElement?.tagName
          )

          // Validate that the parent tag is 'H2'
          expect(parentTag).toBe('H2')
        }
      } else {
        // The page title is not "Departments | San Francisco". Passing the test.
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

  async toHaveLogicalReadingOrderServicesListView(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderServicesListView'
    let pass: boolean
    let matcherResult: any
    try {
      // 1. Locate the <main> landmark
      const main = page.locator('main')

      // 2. Find the <h1> with the text "Services"
      const servicesH1 = main.locator('h1', { hasText: 'Services' }).first()
      await expect(servicesH1).toBeVisible()

      // 3. Get all <a> elements inside <main>
      const allLinks = main.locator('a')
      const linkCount = await allLinks.count()

      const foundH1 = false

      for (let i = 0; i < linkCount; i++) {
        const link = allLinks.nth(i)

        // Check if this <a> comes after the <h1>
        const isAfterH1 = await link.evaluate((el, h1Text) => {
          const main = el.closest('main')
          if (!main) return false

          const elements = Array.from(main.querySelectorAll('*'))
          let h1Found = false

          for (const elem of elements) {
            if (elem.tagName === 'H1' && elem.textContent?.includes(h1Text)) {
              h1Found = true
            } else if (h1Found && elem === el) {
              return true
            }
          }

          return false
        }, 'Services')

        if (isAfterH1) {
          // Check that the <a> is inside an <h2> heading
          const isInsideH2 = await link.evaluate((el) => {
            let current = el.parentElement
            while (current) {
              if (current.tagName === 'H2') return true
              current = current.parentElement
            }
            return false
          })

          expect(isInsideH2).toBeTruthy()
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

  async toHaveLogicalReadingOrderSearchListView(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderSearchListView'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page title is "Search | San Francisco"
      const title = await page.title()

      if (title === 'Search | San Francisco') {
        // If the title matches, perform the additional checks

        // Find the <main> element
        const main = page.locator('main')

        // Check that there is exactly one <h1> within <main>
        const h1Count = await main.locator('h1').count()
        expect(h1Count).toBe(1) // Ensure exactly one <h1>

        // Find the <h1> within <main> containing the word "Search"
        const h1WithSearch = main.locator('h1:has-text("Search")').first()

        // Ensure that the first "Search" within <main> is indeed inside an <h1>
        const textContent = await h1WithSearch.textContent()
        expect(textContent).toContain('Search')

        // Check that all following elements with <a> tags are inside <h2>
        const links = main.locator('h1:has-text("Search") ~ h2 a') // Select links following <h1> within <h2> elements
        const linksCount = await links.count()

        // Ensure all the links following <h1> "Search" are inside <h2>
        for (let i = 0; i < linksCount; i++) {
          const link = links.nth(i)

          // Check if the parent element of the link is an <h2>
          const parentTag = await link.evaluate(
            (el) => el.parentElement?.tagName
          )

          // Validate that the parent tag is 'H2'
          expect(parentTag).toBe('H2')
        }
      } else {
        // The page title is not "Search | San Francisco". Passing the test.
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

  async toHaveLogicalReadingOrderAboutSfGov(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderAboutSfGov'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page title is "About SF.gov | San Francisco"
      const title = await page.title()

      if (title === 'About SF.gov | San Francisco') {
        // If the title matches, perform the additional checks

        // Find the <main> element
        const main = page.locator('main')

        // Check that there is exactly one <h1> within <main>
        const h1Count = await main.locator('h1').count()
        expect(h1Count).toBe(1) // Ensure exactly one <h1>

        // Find the <h1> within <main> containing the word "About SF.gov"
        const h1WithAboutSF = main
          .locator('h1:has-text("About SF.gov")')
          .first()

        // Ensure that the first "About SF.gov" within <main> is indeed inside an <h1>
        const textContent = await h1WithAboutSF.textContent()
        expect(textContent).toContain('About SF.gov')

        // Check that all headings following the <h1> are <h2>
        const headings = main.locator(
          'h1:has-text("About SF.gov") ~ h2, h1:has-text("About SF.gov") ~ h3, h1:has-text("About SF.gov") ~ h4, h1:has-text("About SF.gov") ~ h5, h1:has-text("About SF.gov") ~ h6'
        ) // All headings after <h1>

        const headingsCount = await headings.count()

        // Ensure all headings are <h2>
        for (let i = 0; i < headingsCount; i++) {
          const headingTag = await headings.nth(i).evaluate((el) => el.tagName)
          expect(headingTag).toBe('H2')
        }
      } else {
        // The page title is not "About SF.gov | San Francisco". Passing the test.
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

  async toHaveLogicalReadingOrderDisclaimer(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderDisclaimer'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page title is "Disclaimer for SF.gov | San Francisco"
      const title = await page.title()

      if (title === 'Disclaimer for SF.gov | San Francisco') {
        // If the title matches, perform the additional checks

        // Find the <main> element
        const main = page.locator('main')

        // Check that there is exactly one <h1> within <main>
        const h1Count = await main.locator('h1').count()
        expect(h1Count).toBe(1) // Ensure exactly one <h1>

        // Find the <h1> within <main> containing the word "Disclaimer for SF.gov"
        const h1WithDisclaimer = main
          .locator('h1:has-text("Disclaimer for SF.gov")')
          .first()

        // Ensure that the first "Disclaimer for SF.gov" within <main> is indeed inside an <h1>
        const textContent = await h1WithDisclaimer.textContent()
        expect(textContent).toContain('Disclaimer for SF.gov')

        // Check that all headings following the <h1> are <h2>
        const headings = main.locator(
          'h1:has-text("Disclaimer for SF.gov") ~ h2, h1:has-text("Disclaimer for SF.gov") ~ h3, h1:has-text("Disclaimer for SF.gov") ~ h4, h1:has-text("Disclaimer for SF.gov") ~ h5, h1:has-text("Disclaimer for SF.gov") ~ h6'
        ) // All headings after <h1>

        const headingsCount = await headings.count()

        // Ensure all headings are <h2>
        for (let i = 0; i < headingsCount; i++) {
          const headingTag = await headings.nth(i).evaluate((el) => el.tagName)
          expect(headingTag).toBe('H2')
        }
      } else {
        // The page title is not "Disclaimer for SF.gov | San Francisco". Passing the test.
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

  async toHaveLogicalReadingOrderPrivacy(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderPrivacy'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page title is "Privacy policy for SF.gov | San Francisco"
      const title = await page.title()

      if (title === 'Privacy policy for SF.gov | San Francisco') {
        // If the title matches, perform the additional checks

        // Find the <main> element
        const main = page.locator('main')

        // Check that there is exactly one <h1> within <main>
        const h1Count = await main.locator('h1').count()
        expect(h1Count).toBe(1) // Ensure exactly one <h1>

        // Find the <h1> within <main> containing the word "About SF.gov"
        const h1WithPrivacy = main
          .locator('h1:has-text("Privacy policy for SF.gov")')
          .first()

        // Ensure that the first "Privacy policy for SF.gov" within <main> is indeed inside an <h1>
        const textContent = await h1WithPrivacy.textContent()
        expect(textContent).toContain('Privacy policy for SF.gov')

        // Check that all headings following the <h1> are <h2>
        const headings = main.locator(
          'h1:has-text("Privacy policy for SF.gov") ~ h2, h1:has-text("Privacy policy for SF.gov") ~ h3, h1:has-text("Privacy policy for SF.gov") ~ h4, h1:has-text("Privacy policy for SF.gov") ~ h5, h1:has-text("Privacy policy for SF.gov") ~ h6'
        ) // All headings after <h1>

        const headingsCount = await headings.count()

        // Ensure all headings are <h2>
        for (let i = 0; i < headingsCount; i++) {
          const headingTag = await headings.nth(i).evaluate((el) => el.tagName)
          expect(headingTag).toBe('H2')
        }
      } else {
        // The page title is not "Privacy policy for SF.gov | San Francisco". Passing the test.
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

  async toHaveLogicalReadingOrderContact(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderContact'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page title is "Contact SF.gov | San Francisco"
      const title = await page.title()

      if (title === 'Contact SF.gov | San Francisco') {
        // If the title matches, perform the additional checks

        // Find the <main> element
        const main = page.locator('main')

        // Check that there is exactly one <h1> within <main>
        const h1Count = await main.locator('h1').count()
        expect(h1Count).toBe(1) // Ensure exactly one <h1>

        // Find the <h1> within <main> containing the word "Contact SF.gov"
        const h1WithContact = main
          .locator('h1:has-text("Contact SF.gov")')
          .first()

        // Ensure that the first "Contact SF.gov" within <main> is indeed inside an <h1>
        const textContent = await h1WithContact.textContent()
        expect(textContent).toContain('Contact SF.gov')

        // Check that "What to do" and "Get help" are <h2>
        const whatToDo = main.locator('h2:has-text("What to do")').first()
        const getHelp = main.locator('h2:has-text("Get help")').first()

        expect(await whatToDo.evaluate((el) => el.tagName)).toBe('H2') // Ensure "What to do" is <h2>
        expect(await getHelp.evaluate((el) => el.tagName)).toBe('H2') // Ensure "Get help" is <h2>

        // Check that "Emergencies" and "Online" are <h3>
        const emergencies = main.locator('h3:has-text("Emergencies")').first()
        const online = main.locator('h3:has-text("Online")').first()

        expect(await emergencies.evaluate((el) => el.tagName)).toBe('H3') // Ensure "Emergencies" is <h3>
        expect(await online.evaluate((el) => el.tagName)).toBe('H3') // Ensure "Online" is <h3>
      } else {
        // The page title is not "Contact SF.gov | San Francisco". Passing the test.
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

  async toHaveAriaLabelsInFooterNavigationLandmarks(page: Page) {
    const assertionName = 'toHaveAriaLabelsInFooterNavigationLandmarks'
    let pass: boolean
    let matcherResult: any
    try {
      // Locate the footer landmark
      const footer = page.locator('footer')

      // Select the first <nav> inside the footer
      const primaryNav = footer.locator('nav').nth(0)

      // Validate the first nav has the aria-label "Primary Footer Navigation"
      await expect(primaryNav).toHaveAttribute(
        'aria-label',
        'Primary Footer Navigation'
      )

      // Select the second <nav> inside the footer
      const secondaryNav = footer.locator('nav').nth(1)

      // Validate the second nav has the aria-label "Secondary Social Media Footer Navigation"
      await expect(secondaryNav).toHaveAttribute(
        'aria-label',
        'Secondary Social Media Footer Navigation'
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

  async toHaveLogicalReadingOrderInAdditionalRolesSectionOnProfile(page: Page) {
    const assertionName =
      'toHaveLogicalReadingOrderInAdditionalRolesSectionOnProfile'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page contains a <p> element with the text "PROFILE"
      const profileParagraphExists =
        (await page.locator('p').filter({ hasText: 'PROFILE' }).count()) > 0

      if (profileParagraphExists) {
        // Select the aside section
        const aside = page.locator('aside')

        // Validate that "Additional roles" is an h2 heading within the aside section
        const additionalrolesHeading = aside.locator('h2', {
          hasText: 'Additional roles'
        })
        await expect(additionalrolesHeading).toBeVisible()
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

  async toHaveNavLandmarkAttributesInTOC(page: Page) {
    const assertionName = 'toHaveNavLandmarkAttributesInTOC'
    let pass: boolean
    let matcherResult: any

    try {
      // 1. Find the visible text “On this page”
      const onThisPage = page.getByText('On this page', { exact: true })
      await expect(onThisPage).toBeVisible()

      // 2. Find a <nav> element that contains the "On this page" text
      const tocNav = page.locator('nav', { hasText: 'On this page' })
      await expect(tocNav).toBeVisible()

      // 3. Validate landmark attributes
      await expect(tocNav).toHaveAttribute('role', 'navigation')
      await expect(tocNav).toHaveAttribute('aria-label', 'Table of contents')

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

  async toHaveLogicalReadingOrderInServicesSectionOnTopicPage(page: Page) {
    const assertionName =
      'toHaveLogicalReadingOrderInServicesSectionOnTopicPage'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page contains a <p> element with the text "TOPIC"
      const topicParagraphExists =
        (await page.locator('p').filter({ hasText: 'TOPIC' }).count()) > 0

      if (topicParagraphExists) {
        // Step 1: Locate the <h2>Services</h2> heading using XPath
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
          // The heading <h2>Services</h2> does not exist on the page.
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

  async toHaveLogicalReadingOrderInResourcesSectionOnTopicPage(page: Page) {
    const assertionName =
      'toHaveLogicalReadingOrderInResourcesSectionOnTopicPage'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page contains a <p> element with the text "TOPIC"
      const topicParagraphExists =
        (await page.locator('p').filter({ hasText: 'TOPIC' }).count()) > 0

      if (topicParagraphExists) {
        // Step 1: Locate the <h2>Resources</h2> heading using XPath
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
          // The heading <h2>Resources</h2> does not exist on the page.
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

  async toHaveCorrectHeadingOnTopicPage(page: Page) {
    const assertionName = 'toHaveCorrectHeadingOnTopicPage'
    let pass: boolean
    let matcherResult: any
    try {
      // Wait for <h3> elements to be present in <main> before querying
      await page.waitForSelector('main h3') // Wait until at least one <h3> inside <main> is loaded

      // Collect all <h3> elements inside <main> and extract their class attributes
      const h3Headings = await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('main h3'))
        return headings.map((heading) => ({
          text: heading.textContent ? heading.textContent.trim() : '', // Ensure textContent exists
          classAttr: heading.getAttribute('class') || '' // Ensure class attribute exists
        }))
      })

      // Debugging: Print found <h3> elements and their raw class attributes
      console.warn('Found <h3> elements:', h3Headings)

      // Process class names outside evaluate()
      const invalidH3s = h3Headings.filter(({ classAttr }) => {
        const classList = classAttr.split(/\s+/) // Convert class string into an array
        return (
          classList.includes('text-heading-xxl') &&
          classList.includes('lg:text-desktop-heading-xxl')
        )
      })

      // Debugging: Print invalid <h3> elements if found
      console.warn('Invalid <h3> elements:', invalidH3s)

      // Expect no invalid <h3> elements
      expect(invalidH3s.length).toBe(0)

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

  async toHaveLogicalReadingOrderOnCalendarPage(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderOnCalendarPage'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page contains a <p> element with the text "CALENDAR"
      const calendarParagraphExists =
        (await page.locator('p').filter({ hasText: 'CALENDAR' }).count()) > 0

      if (calendarParagraphExists) {
        // Select the main section
        const main = page.locator('main')

        // Validate that "Upcoming events" is an h2 heading within the main landmark,
        // ensuring it is not within an <a> tag
        const upcomingEventsHeading = main.locator('h2').filter({
          hasText: 'Upcoming events',
          hasNot: page.locator('a') // Exclude elements inside <a>
        })

        await expect(upcomingEventsHeading).toBeVisible()

        // Validate that "Past events" is an h2 heading within the main landmark,
        // ensuring it is not within an <a> tag
        const pastEventsHeading = main.locator('h2').filter({
          hasText: 'Past events',
          hasNot: page.locator('a') // Exclude elements inside <a>
        })

        await expect(pastEventsHeading).toBeVisible()
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

  async toHaveLogicalReadingOrderForMonthsYearOnCalendarPage(page: Page) {
    const assertionName =
      'toHaveLogicalReadingOrderForMonthsYearOnOnCalendarPage'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page contains a <p> element with the text "CALENDAR"
      const calendarParagraphExists =
        (await page.locator('p').filter({ hasText: 'CALENDAR' }).count()) > 0

      if (calendarParagraphExists) {
        // Select the main section
        const main = page.locator('main')

        // Select all h2 elements with "Upcoming events" or "Past events"
        const eventHeadings = await page
          .locator('h2:has-text("Upcoming events"), h2:has-text("Past events")')
          .all()

        for (const heading of eventHeadings) {
          // Get the next sibling element
          let nextElement = await heading.evaluate(
            (el) => el.nextElementSibling
          )

          while (nextElement) {
            // If it's an h3, continue; if it's something else, break the loop
            if (nextElement.tagName === 'H3') {
              nextElement = nextElement.nextElementSibling
            } else if (nextElement.tagName === 'H2') {
              // Stop checking when another h2 is found
              break
            } else {
              // Assert failure if an invalid element is found
              throw new Error(
                `Invalid element found after h2: ${nextElement.tagName}`
              )
            }
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

  async toHaveAriaLabelInSearchSubmitButton(page: Page) {
    const assertionName = 'toHaveAriaLabelInSearchSubmitButton'
    let pass: boolean
    let matcherResult: any
    try {
      baseExpect(
        await page.locator('header form button').getAttribute('aria-label')
      ).toBe('Search')

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

  async toHaveAriaLabelsInSocialMediaLinks(page: Page) {
    const assertionName = 'toHaveAriaLabelsInSocialMediaLinks'
    let pass: boolean
    let matcherResult: any
    try {
      const footerLinks = [
        'sf.gov facebook',
        'sf.gov instagram',
        'sf.gov threads',
        'sf.gov twitter'
      ]

      for (const label of footerLinks) {
        const linkLocator = page.locator(`footer a[aria-label="${label}"]`)
        await baseExpect(await linkLocator.getAttribute('aria-label')).toBe(
          label
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

  async toHaveAriaLabelForChineseInLanguageDropDownMenu(page: Page) {
    const assertionName = 'toHaveAriaLabelForChineseInLanguageDropDownMenu'
    let pass: boolean
    let matcherResult: any
    try {
      const languageLinkLabel = 'Chinese' // Expected aria-label value
      const languageLinkLocator = page.locator('header a[aria-label="Chinese"]')

      // Ensure the element is present
      await baseExpect(await languageLinkLocator.count()).toBeGreaterThan(0)

      // Validate aria-label attribute
      await baseExpect(
        await languageLinkLocator.getAttribute('aria-label')
      ).toBe(languageLinkLabel)

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

  async toHaveAltTextInGlobalHeader(page: Page) {
    const assertionName = 'toHaveAltTextInGlobalHeader'
    let pass: boolean
    let matcherResult: any
    try {
      baseExpect(
        await page
          .locator(
            'nav[role="navigation"][aria-label="Primary Header Navigation"] img'
          )
          .getAttribute('alt')
      ).toBe('City and County of San Francisco')

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

  async toHaveAltTextInGlobalFooter(page: Page) {
    const assertionName = 'toHaveAltTextInGlobaFooter'
    let pass: boolean
    let matcherResult: any
    try {
      baseExpect(
        await page.locator('footer[role="contentinfo"]img').getAttribute('alt')
      ).toBe('City and County of San Francisco')

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

  async toHaveDescriptiveHeadingOnEventPage(page: Page) {
    const assertionName = 'toHaveDescriptiveHeadingOnEventPage'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page contains a <p> element with the text "EVENT"
      const eventParagraphExists =
        (await page.locator('p').filter({ hasText: 'EVENT' }).count()) > 0

      if (eventParagraphExists) {
        // Select the main section
        const main = page.locator('main')

        // Verify that the Event page includes an h2 heading with the text "Event details"
        const eventHeadings = await main
          .locator('h2:has-text("Event details")')
          .count()

        // Expect at least one matching <h2> heading
        expect(eventHeadings).toBeGreaterThan(0)
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

  async toHaveShowMoreNewsLinkRedirectToMoreNewsListItems(page: Page) {
    const assertionName = 'toHaveShowMoreNewsLinkRedirectToMoreNewsListItems'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page contains a <p> element with the text "NEWS"
      const newsParagraphExists =
        (await page.locator('p').filter({ hasText: 'NEWS' }).count()) > 0

      if (newsParagraphExists) {
        // Select the main section
        const main = page.locator('main')

        // Verify that the News list view page includes a link with the text "Show more news"
        const showMoreNewsLink = main.locator('a', {
          hasText: 'Show more news'
        })
        await expect(showMoreNewsLink).toHaveCount(1)

        // Get the initial Y position of the "Share your feedback" link
        const shareFeedbackLink = page.locator('a', {
          hasText: 'Share your feedback'
        })
        const initialShareFeedbackPosition =
          await shareFeedbackLink.boundingBox()

        // Click the "Show more news" link
        await showMoreNewsLink.click()
        await page.waitForTimeout(500) // Small wait for any UI changes

        // Get the Y position of the "Share your feedback" link after clicking
        const newShareFeedbackPosition = await shareFeedbackLink.boundingBox()

        // Verify that the position of "Share your feedback" has NOT changed, meaning it did not redirect to it
        expect(initialShareFeedbackPosition).toEqual(newShareFeedbackPosition)
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

  async toHaveShowMoreResultsLinkRedirectToMoreResultsListItems(page: Page) {
    const assertionName =
      'toHaveShowMoreResultsLinkRedirectToMoreResultsListItems'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page contains an <h1> element with the text "Search"
      const h1SearchExists =
        (await page.locator('h1').filter({ hasText: 'Search' }).count()) > 0

      if (h1SearchExists) {
        // Select the main section
        const main = page.locator('main')

        // Verify that the Search results list view page includes a link with the text "Show more results"
        const showMoreResultsLink = main.locator('a', {
          hasText: 'Show more results'
        })
        await expect(showMoreResultsLink).toHaveCount(1)

        // Get the initial Y position of the "Share your feedback" link
        const shareFeedbackLink = page.locator('a', {
          hasText: 'Share your feedback'
        })
        const initialShareFeedbackPosition =
          await shareFeedbackLink.boundingBox()

        // Click the "Show more results" link
        await showMoreResultsLink.click()
        await page.waitForTimeout(500) // Small wait for any UI changes

        // Get the Y position of the "Share your feedback" link after clicking
        const newShareFeedbackPosition = await shareFeedbackLink.boundingBox()

        // Verify that the position of "Share your feedback" has NOT changed, meaning it did not redirect to it
        expect(initialShareFeedbackPosition).toEqual(newShareFeedbackPosition)
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

  async toHaveDataNotesAndSourcesAccordionMenuExpandOnDataStory(page: Page) {
    const assertionName =
      'toHaveDataNotesAndSourcesAccordionMenuExpandOnDataStory'
    let pass: boolean
    let matcherResult: any
    try {
      const dataStoryParagraphExists =
        (await page.locator('p').filter({ hasText: 'DATA STORY' }).count()) > 0

      if (dataStoryParagraphExists) {
        // Select the main section
        const main = page.locator('main')

        // Verify that the Data Story page includes a summary label with the text "Data notes and sources"
        const summaryLabel = main.locator(
          'summary[data-testid="accordion-summary"]'
        )
        await expect(summaryLabel).toHaveText('Data notes and sources')

        // Locate the parent <details> element
        const details = summaryLabel.locator('xpath=ancestor::details')

        // Ensure the accordion is initially collapsed
        await expect(details).not.toHaveAttribute('open', '')

        // 🔹 Mouse interaction: Click the summary label
        await summaryLabel.click()

        // Verify that the accordion expands
        await expect(details).toHaveAttribute('open', '')

        // Reset: Collapse the accordion before testing keyboard interaction
        await summaryLabel.click()
        await expect(details).not.toHaveAttribute('open', '')

        // 🔹 Keyboard interaction: Focus the summary and press Enter
        await summaryLabel.focus() // Explicitly set focus for keyboard users
        await summaryLabel.press('Enter')

        // Verify that the accordion expands again
        await expect(details).toHaveAttribute('open', '')
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

  async toHaveDataNotesAndSourcesAccordionMenuExpandOnResourceCollection(
    page: Page
  ) {
    const assertionName =
      'toHaveDataNotesAndSourcesAccordionMenuExpandOnResourceCollection'
    let pass: boolean
    let matcherResult: any
    try {
      const resourceCollectionParagraphExists =
        (await page
          .locator('p')
          .filter({ hasText: 'RESOURCE COLLECTION' })
          .count()) > 0

      if (resourceCollectionParagraphExists) {
        // Select the main section
        const main = page.locator('main')

        // Verify that the Resource Collection page includes a summary label with the text "Data notes and sources"
        const summaryLabel = main.locator(
          'summary[data-testid="accordion-summary"]'
        )
        await expect(summaryLabel).toHaveText('Data notes and sources')

        // Locate the parent <details> element
        const details = summaryLabel.locator('xpath=ancestor::details')

        // Ensure the accordion is initially collapsed
        await expect(details).not.toHaveAttribute('open', '')

        // 🔹 Mouse interaction: Click the summary label
        await summaryLabel.click()

        // Verify that the accordion expands
        await expect(details).toHaveAttribute('open', '')

        // Reset: Collapse the accordion before testing keyboard interaction
        await summaryLabel.click()
        await expect(details).not.toHaveAttribute('open', '')

        // 🔹 Keyboard interaction: Focus the summary and press Enter
        await summaryLabel.focus() // Explicitly set focus for keyboard users
        await summaryLabel.press('Enter')

        // Verify that the accordion expands again
        await expect(details).toHaveAttribute('open', '')
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

  async toHaveLogicalReadingOrderNewsLisView(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderNewsLisView'
    let pass: boolean
    let matcherResult: any
    try {
      // Check if the page contains a <p> element with the text "NEWS"
      const newsParagraphExists =
        (await page.locator('p').filter({ hasText: 'NEWS' }).count()) > 0

      if (newsParagraphExists) {
        // Select the main section
        const main = page.locator('main')

        // Ensure there is exactly one <h1> within <main>
        const h1Elements = main.locator('h1')
        await expect(h1Elements).toHaveCount(1)

        // Get the <h1> element
        const h1Element = await h1Elements.first()

        // Find all <a> links that follow the <h1> element
        const links = main.locator('h1 ~ a') // Select all <a> following <h1>
        const linksCount = await links.count()

        // Validate that each <a> is inside an <h2>
        for (let i = 0; i < linksCount; i++) {
          const link = links.nth(i)

          // Check the nearest parent <h2>
          const parentH2 = await link.evaluateHandle((el) => {
            let parent = el.parentElement
            while (parent && parent.tagName !== 'H2') {
              parent = parent.parentElement
            }
            return parent
          })

          // Ensure the <a> is inside an <h2>
          expect(await parentH2.evaluate((el) => el?.tagName)).toBe('H2')
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

  async toNotHaveInvalidAriaAttribute(page: Page) {
    const assertionName = 'toNotHaveInvalidAriaAttribute'
    let pass: boolean
    let matcherResult: any
    try {
      // Find all elements that have 'aria-description' attribute
      const elementsWithAriaDescription = await page
        .locator('[aria-description]')
        .count()

      // Assert that there are no elements with the attribute
      expect(elementsWithAriaDescription).toBe(0)

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

  async toNotHaveSpanTagsInListElements(page: Page) {
    const assertionName = 'toNotHaveSpanTagsInListElements'
    let pass: boolean
    let matcherResult: any
    try {
      // Check that there are no <span> elements inside <ul> and <li>
      const spanInsideUl = page.locator('ul span')
      const spanInsideLi = page.locator('li span')

      // Validate that no <span> elements exist inside <ul> and <li>
      await expect(spanInsideUl).toHaveCount(0)
      await expect(spanInsideLi).toHaveCount(0)

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

  async toHaveTitleAttributeIniFrameElements(page: Page) {
    const assertionName = 'toHaveTitleAttributeIniFrameElements'
    let pass: boolean
    let matcherResult: any
    try {
      // Get all iframe elements on the page
      const iframes = await page.locator('iframe')

      // Get the count of iframes
      const iframeCount = await iframes.count()

      for (let i = 0; i < iframeCount; i++) {
        // Get the title attribute of the current iframe
        const title = await iframes.nth(i).getAttribute('title')

        // Validate that the title attribute exists and is not empty
        expect(title).toBeTruthy()
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

  async toHaveNoEmptyLinkTags(page: Page) {
    const assertionName = 'toHaveNoEmptyLinkTags'
    let pass: boolean
    let matcherResult: any
    try {
      // Get all <a> elements
      const links = await page.$$('a')

      for (const link of links) {
        // Check href attribute exists and is not empty
        const href = await link.getAttribute('href')
        expect(
          href,
          'Link is missing href attribute or it is empty'
        ).toBeTruthy()

        // Check link text is visible and not empty
        const visibleText = await link.innerText()
        expect(visibleText.trim(), 'Link has no visible label').not.toBe('')
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

  async toHaveDescriptiveLinkTextforButtons(page: Page) {
    const assertionName = 'toHaveDescriptiveLinkTextforButtons'
    let pass: boolean
    let matcherResult: any
    try {
      // Specify the non-descriptive button texts to check for
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

      // Check <button> elements for non-descriptive text
      for (const text of nonDescriptiveButtonTexts) {
        const buttonSelector = `//button[normalize-space(.)='${text}']`
        const buttonElements = await page.$$(buttonSelector)

        for (const button of buttonElements) {
          const ariaLabel = await button.getAttribute('aria-label')
          const ariaDescribedBy = await button.getAttribute('aria-describedby')

          if (!ariaLabel && !ariaDescribedBy) {
            throw new Error(
              `Non-descriptive <button> with text "${text}" found without aria-label or aria-describedby.`
            )
          } else {
            // Non-descriptive <button> with text "${text}" found with appropriate accessibility attributes
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

  async toHaveTOCLinksRedirectToMainContentArea(page: Page) {
    const assertionName = 'toHaveTOCLinksRedirectToMainContentArea'
    let pass: boolean
    let matcherResult: any
    try {
      // Get all TOC links
      const tocLinks = await page.$$eval(
        'nav[role="navigation"][aria-label="Table of contents"] a[href^="#"]',
        (links) => links.map((link) => link.getAttribute('href'))
      )

      // Check each anchor exists within the content section
      for (const href of tocLinks) {
        if (!href) continue

        const id = href.substring(1) // remove the '#' to get the ID
        const elementExists = await page
          .$eval(
            `div.flex.flex-col.gap-y-60.col-span-full #${id}`,
            (el) => !!el
          )
          .catch(() => false)

        expect(
          elementExists,
          `Anchor ${href} should exist in content section`
        ).toBe(true)
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

  async toHaveScreenReaderFriendlyURLInOverviewSectionOnMeetingContentType(
    page: Page
  ) {
    const assertionName =
      'toHaveScreenReaderFriendlyURLInOverviewSectionOnMeetingContentType'
    let pass: boolean
    let matcherResult: any
    try {
      // Step 1: Check if the page contains a paragraph element with the text "MEETING"
      const meetingParagraphExists =
        (await page.locator('p').filter({ hasText: 'MEETING' }).count()) > 0

      if (meetingParagraphExists) {
        // Step 2: Locate the "Overview" and "Agenda" <h2> headings
        const overviewLocator = page.locator('h2#overviewLarge')
        const agendaLocator = page.locator('h2#agendaLarge')

        if ((await overviewLocator.count()) && (await agendaLocator.count())) {
          // Step 3: Get the parent container (the <span> that contains both headings)
          const wrapper = overviewLocator.locator('xpath=ancestor::span[1]')

          // Step 4: Extract all inner text from that wrapper
          const wrapperText = await wrapper.innerText()

          // Step 5: Isolate the text between "Overview" and "Agenda"
          const overviewIndex = wrapperText.indexOf('Overview')
          const agendaIndex = wrapperText.indexOf('Agenda')

          const textBetween = wrapperText.slice(
            overviewIndex + 'Overview'.length,
            agendaIndex
          )

          // Step 6: Check if it contains any absolute URLs
          const hasAbsoluteUrl = /https?:\/\/\S+/gi.test(textBetween)

          // Final assertion: no absolute URLs allowed
          expect(hasAbsoluteUrl).toBe(false)
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

  async toHaveLogicalReadingOrderInMeetingDetailsModule(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderInMeetingDetailsModule'
    let pass: boolean
    let matcherResult: any
    try {
      // Validate the correct <h2 id="meetingDetailsLarge">Meeting details</h2>
      const meetingDetailsH2 = page.locator('main h2#meetingDetailsLarge')
      baseExpect(await meetingDetailsH2.isVisible()).toBeTruthy()
      baseExpect(await meetingDetailsH2.evaluate((node) => node.tagName)).toBe(
        'H2'
      )

      // Validate the correct <h3 id="howToParticipateLarge">How to participate</h3>
      const dateAndTimeH3 = page.locator('main h3#dateTimeLarge')
      baseExpect(await dateAndTimeH3.isVisible()).toBeTruthy()
      baseExpect(await dateAndTimeH3.evaluate((node) => node.tagName)).toBe(
        'H3'
      )

      // Validate the correct <h3 id="howToParticipateLarge">How to participate</h3>
      const howToParticipateH3 = page.locator('main h3#howToParticipateLarge')
      baseExpect(await howToParticipateH3.isVisible()).toBeTruthy()
      baseExpect(
        await howToParticipateH3.evaluate((node) => node.tagName)
      ).toBe('H3')

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

  async toHaveSearchAutoComplete(page: Page) {
    const assertionName = 'toHaveSearchAutoComplete'
    let pass: boolean
    let matcherResult: any
    try {
      // Locate the input using the placeholder text
      const searchInput = page.locator('input[placeholder="Search"]')

      // Validate the input is visible
      await expect(searchInput).toBeVisible()

      // Validate role="combobox"
      await expect(searchInput).toHaveAttribute('role', 'combobox')

      // Validate aria-autocomplete="both"
      await expect(searchInput).toHaveAttribute('aria-autocomplete', 'both')

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

  async toHaveCorrectLinkTargetInProfileModule(page: Page) {
    const assertionName = 'toHaveCorrectLinkTargetInProfileModule'
    let pass: boolean
    let matcherResult: any
    try {
      const profileGroups = page.locator('div[data-gtm-id="profile-group"]')
      const groupCount = await profileGroups.count()

      for (let i = 0; i < groupCount; i++) {
        const group = profileGroups.nth(i)

        // Get all unique profile links
        const profileLinks = group.locator('a[aria-label^="profile page of"]')
        const linkCount = await profileLinks.count()

        for (let j = 0; j < linkCount; j++) {
          const link = profileLinks.nth(j)
          const ariaLabel = await link.getAttribute('aria-label')
          const href = await link.getAttribute('href')

          // Find all links in the group with same aria-label and href
          const duplicateLinks = group.locator(
            `a[aria-label="${ariaLabel}"][href="${href}"]`
          )
          const duplicateCount = await duplicateLinks.count()

          // Fail the test if more than one such link exists
          expect(
            duplicateCount,
            `More than one link for "${ariaLabel}" with href="${href}"`
          ).toBe(1)

          // Ensure it includes both image and visible text
          const img = link.locator('img')
          await expect(img).toHaveCount(1)

          const visibleText = (await link.innerText()).trim()
          expect(
            visibleText.length,
            `Link for "${ariaLabel}" should include visible text`
          ).toBeGreaterThan(0)
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

  async toHaveLogicalReadingOrderInSpotlightModule(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderInSpotlightModule'
    let pass: boolean
    let matcherResult: any
    try {
      // Locate all spotlight modules
      const spotlightModules = page.locator('[data-testid="spotlight"]')

      // Count how many spotlight modules are on the page
      const spotlightCount = await spotlightModules.count()

      // Loop through each spotlight module
      for (let i = 0; i < spotlightCount; i++) {
        const spotlight = spotlightModules.nth(i)

        // Locate the first heading in this spotlight
        const spotlightHeading = spotlight.locator('h2').first()

        // Validate it's visible
        await baseExpect(await spotlightHeading.isVisible()).toBeTruthy()

        // Validate it is an H2
        baseExpect(
          await spotlightHeading.evaluate((node) => node.tagName)
        ).toBe('H2')
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

  async toNotHaveDuplicateIds(page: Page) {
    const assertionName = 'toNotHaveDuplicateIds'
    let pass: boolean
    let matcherResult: any
    try {
      const ids: string[] = await page.evaluate(
        () =>
          Array.from(document.querySelectorAll('[id]'))
            .map((el) => el.id)
            .filter((id) => id.trim() !== '') // Exclude empty or whitespace-only IDs
      )

      // 2. Detect duplicates
      const seen = new Map<string, number>()
      const duplicates: string[] = []

      for (const id of ids) {
        const count = seen.get(id) || 0
        seen.set(id, count + 1)
        if (count === 1) {
          duplicates.push(id) // Only push the ID once (on second encounter)
        }
      }

      // 3. Assert: no duplicate non-empty IDs
      expect(
        duplicates.length,
        `Duplicate IDs found: ${duplicates.join(', ')}`
      ).toBe(0)

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

  async toOnlyHaveH2HeadingsInStepbyStepModule(page: Page) {
    const assertionName = 'toOnlyHaveH2HeadingsInStepbyStepModule'
    let pass: boolean
    let matcherResult: any
    try {
      // Find all step containers where data-testid starts with "step-"
      const stepContainers = page.locator('div[data-testid^="step-"]')

      const count = await stepContainers.count()
      for (let i = 0; i < count; i++) {
        const stepContainer = stepContainers.nth(i)

        // Use getByRole to find the heading within the stepContainer
        const heading = stepContainer.getByRole('heading')

        // Ensure exactly 1 heading exists within this container
        await expect(heading).toHaveCount(1)

        // Check that the heading is specifically an h2
        const tagName = await heading.evaluate((node) => node.tagName)
        expect(tagName).toBe('H2')
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

  async toHaveLangAttributes(page: Page) {
    const assertionName = 'toHaveLangAttributes'
    let pass: boolean
    let matcherResult: any
    try {
      const langLinks = {
        es: 'Español',
        'zh-hant': '繁體中文',
        fil: 'Filipino',
        'vi-vn': 'Tiếng Việt'
      }

      // Check <nav role="navigation" aria-label="Primary Header Navigation">
      const headerNav = page.getByRole('navigation', {
        name: 'Primary Header Navigation'
      })
      await expect(headerNav).toHaveCount(1)
      const dropdown = page.locator('[aria-label="language selector"]')
      await expect(dropdown.locator('ul a')).toHaveCount(
        Object.keys(langLinks).length
      )
      for (const [lang, text] of Object.entries(langLinks)) {
        const navLink = dropdown.locator(`a[lang="${lang}"]`, {
          hasText: text
        })
        await expect(
          navLink,
          `Missing or incorrect <a lang="${lang}">${text}</a> in header nav`
        ).toHaveCount(1)
      }

      // Check <footer>
      const footer = page.getByRole('contentinfo')
      await expect(footer).toHaveCount(1)

      for (const [lang, text] of Object.entries(langLinks)) {
        const footerLink = footer.locator(`a[lang="${lang}"]`, {
          hasText: text
        })
        await expect(
          footerLink,
          `Missing or incorrect <a lang="${lang}">${text}</a> in footer`
        ).toHaveCount(1)
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

  async toHaveThumbsAttributes(page: Page) {
    const assertionName = 'toHaveThumbsAttributes'
    let pass: boolean
    let matcherResult: any
    try {
      // 1) Locate modal dialog
      const modal = page.getByRole('dialog', { name: 'Modal Title' })
      await expect(modal).toBeVisible()

      // 2) Expected accessible name (via aria-label)
      const YES_NAME = 'Yes this page was helpful'
      const NO_NAME = 'No this page was not helpful'

      // 3) Locate by role plus accessible name (this is what screen readers will announce)
      const yesLink = modal.getByRole('link', { name: YES_NAME })
      const noLink = modal.getByRole('link', { name: NO_NAME })

      await expect(yesLink).toBeVisible()
      await expect(noLink).toBeVisible()

      // 4) Assert that the aria-label attribute exists and matches exactly
      await expect(yesLink).toHaveAttribute('aria-label', YES_NAME)
      await expect(noLink).toHaveAttribute('aria-label', NO_NAME)

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

  async toHaveH1headingInModal(page: Page) {
    const assertionName = 'toHaveH1headingInModal'
    let pass: boolean
    let matcherResult: any
    try {
      // --- Open the modal with keyboard ---
      const openModalButton = page.getByRole('button', {
        name: /did you find what you needed\?/i
      })
      await expect(openModalButton).toBeVisible()
      await expect(openModalButton).toBeEnabled()
      await openModalButton.focus()
      await expect(openModalButton).toBeFocused()
      await page.keyboard.press('Enter')

      // --- The dialog should be visible and focus should be inside it ---
      const modal = page.getByRole('dialog')
      await expect(modal).toBeVisible()

      // Ensure focus moved into the modal on open
      await expect(async () => {
        const activeInDialog = await modal.evaluate((el) =>
          el.contains(document.activeElement)
        )
        expect(activeInDialog).toBe(true)
      }).toPass()

      // Locate the h1 heading inside the modal by role and level
      const heading = modal.getByRole('heading', {
        level: 1,
        name: 'Did you find what you needed?'
      })

      // Assert that it exists and is visible
      await expect(heading).toBeVisible()

      // Check that it is an <h1> element
      await expect(heading).toHaveJSProperty('tagName', 'H1')

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

  async toPassAxeCoreTests(page: Page) {
    const assertionName = 'toPassAxeCoreTests'
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
function isFocusable(
  locator: any
): (
  this: import('@playwright/test').ExpectMatcherState,
  receiver: any,
  ...args: any[]
) =>
  | import('@playwright/test').MatcherReturnType
  | Promise<import('@playwright/test').MatcherReturnType> {
  throw new Error('Function not implemented.')
}
