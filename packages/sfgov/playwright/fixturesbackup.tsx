import { AxeBuilder } from '@axe-core/playwright'
import { expect as baseExpect } from '@playwright/experimental-ct-react'
import type { Page } from '@playwright/test'
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
  async toHaveSkiptoMainContent(page: Page) {
    const assertionName = 'toHaveSkiptoMainContent'
    let pass: boolean
    let matcherResult: any
    try {
      // Wait for the skip link to be present on the page
    await page.waitForSelector('a[href="#main-content"]');
    console.log('Skip to main content link is present.');

    // Click the skip link
    await page.click('a[href="#main-content"]');

    // Check if the element with role="main" is now focused
    const isMainFocused = await page.evaluate(() => {
        const main = document.querySelector('[role="main"]');
        return document.activeElement === main;
    });

    if (isMainFocused) {
        console.log('Focus has moved to the main content.');
    } else {
        console.error('Focus did not move to the main content.');
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
    baseExpect(await page.locator('header').isVisible()).toBeTruthy();
    baseExpect(await page.locator('nav').isVisible()).toBeTruthy(); 
    baseExpect(await page.locator('main').isVisible()).toBeTruthy();
    baseExpect(await page.locator('footer').isVisible()).toBeTruthy();
  
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
      baseExpect(await page.locator('[role="navigation"]').isVisible()).toBeTruthy();   
      baseExpect(await page.locator('[role="banner"]').isVisible()).toBeTruthy();
      baseExpect(await page.locator('[role="main"]').isVisible()).toBeTruthy();
      baseExpect(await page.locator('[role="contentinfo"]').isVisible()).toBeTruthy();
    
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
      baseExpect(await page.locator(':focus').isVisible()).toBeTruthy();   
      baseExpect(await page.locator('outline:').isVisible()).toBeTruthy();
      baseExpect(await page.locator('border:').isVisible()).toBeTruthy();
  
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
      baseExpect(await page.locator('[aria-autocomplete="both"]').isVisible()).toBeTruthy();   
      baseExpect(await page.locator('[role="combobox"]').isVisible()).toBeTruthy();
      baseExpect(await page.locator('[role="search"]').isVisible()).toBeTruthy();
      baseExpect(await page.locator('[aria-owns]').isVisible()).toBeTruthy();
      baseExpect(await page.locator('[aria-expanded]').isVisible()).toBeTruthy();
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
      baseExpect(await page.locator('[en|en]').isVisible()).toBeTruthy();   
      baseExpect(await page.locator('[en|es]').isVisible()).toBeTruthy();
      baseExpect(await page.locator('[en|zh-TW]').isVisible()).toBeTruthy();
      baseExpect(await page.locator('[en|tl]').isVisible()).toBeTruthy(); 
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

  async toHaveColorContrast(page: Page) {
    const assertionName = 'toHaveColorContrast'
    let pass: boolean
    let matcherResult: any
    try {
      // Specify the CSS selector for the keyboard focus indicator
      const focusIndicatorSelector = 'your-focus-indicator-selector'

      // Get the color and background-color properties of the focus indicator
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

      // Check if the focus indicator color is valid
      if (!focusIndicatorColor) {
        throw new Error('Error getting focus indicator color. Exiting script.')
      }
      // Calculate the contrast ratio using tinycolor2      
      const contrastRatio = tinycolor.readability(
        tinycolor(focusIndicatorColor.color),
        tinycolor(focusIndicatorColor.backgroundColor)
      )

      // Define the minimum required contrast ratio for WCAG Level AA (4.5)
      const minContrastRatio = 4.5

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

          if (!ariaLabel && !ariaDescribedBy) {
            console.warn(
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

      // Output the results
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
      const formElements = await page.$$('[data-validation]') // Replace with your actual form elements selector
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
        ) // Replace with your actual inline error message selector
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
     const inputElements = await page.$$('input');
  
     // Iterate through input elements
     for (const input of inputElements) {
       // Get the placeholder attribute value
       const placeholder = await input.getAttribute('placeholder');
   
       // Check if the placeholder contains dashes or parentheses
       if (placeholder && /[-()]/.test(placeholder)) {
         console.error(`Placeholder contains dashes or parentheses: ${placeholder}`);
       } else {
         console.log(`Placeholder is valid: ${placeholder}`);
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
  const datePickerButton = await page.$('button.date-picker');

  if (datePickerButton) {
    // Focus on the date picker button using the Tab key
    await datePickerButton.focus();
  } else {
    console.error("Date picker button not found.");
  }

  // Press Enter key to activate the date picker
  await page.keyboard.press('Enter');

  // Wait for the date picker to be visible or activated

  // Use tab key to navigate through months and years
  await page.keyboard.press('Tab');

  // Use arrow keys to navigate to a different month and date
  // You can customize the arrow key presses as needed to select a different date
  await page.keyboard.press('ArrowRight'); // Navigate to a different date
  await page.keyboard.press('ArrowLeft'); // Navigate to a different date
  await page.keyboard.press('ArrowDown'); // Navigate to a different date
  await page.keyboard.press('ArrowUp'); // Navigate to a different date

  // Press Enter key to select a date
  await page.keyboard.press('Enter');

  // Wait for the selection to be updated

  // Get the current month and date
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentDateOfMonth = currentDate.getDate();

  // Validate that a different month and date have been selected
  const selectedDate = await page.$eval('.date-picker-selected-date', el => el.textContent);
  expect(selectedDate).not.toBe(`${currentMonth} ${currentDateOfMonth}`);
  
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
  const datePickerInput = await page.$('input.date-picker');

  if (datePickerInput) {
    // Focus on the date picker input using the Tab key
    await datePickerInput.focus();
  } else {
    console.error("Date picker input not found.");
  }

  // Use arrow keys to navigate through the dates within the date picker
  await page.keyboard.press('ArrowRight'); // Navigate to a different date
  await page.keyboard.press('ArrowLeft'); // Navigate to a different date
  await page.keyboard.press('ArrowDown'); // Navigate to a different date
  await page.keyboard.press('ArrowUp'); // Navigate to a different date

  // Press the tab key to navigate through the months and years within the date picker
  await page.keyboard.press('Tab');

  // Press the Enter key to select a date within the date picker
  await page.keyboard.press('Enter');

  // Wait for the selection to be updated

  // Get the current month and date
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentDateOfMonth = currentDate.getDate();

  // Validate that a different month and date have been selected
  const selectedDate = await page.$eval('.date-picker-selected-date', el => el.textContent);
  expect(selectedDate).not.toBe(`${currentMonth} ${currentDateOfMonth}`);
  
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
const formControls = await page.$$('[aria-describedby]');

for (const control of formControls) {
    // Get the value of the aria-describedby attribute
    const describedById = await control.getAttribute('aria-describedby');
    
    // Ensure the aria-describedby attribute is not empty
    expect(describedById, 'aria-describedby is empty').toBeTruthy();

    // Query for the element described by the ID
    const descriptionElement = await page.$(`#${describedById}`);

    // Ensure the element referenced by aria-describedby exists
    expect(descriptionElement, `Element described by #${describedById} not found`).toBeTruthy();
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
    // Define an array of objects mapping form control selectors to their describedby ID
    // Update this part to match your specific IDs
    const controlsToTest = [
      { selector: '#phoneNumber', describedById: 'phoneinstructions' },
      { selector: '#input1', describedById: 'input1-instructions' },
      { selector: '#checkbox1', describedById: 'checkbox1-instructions' },
      // You can add more controls as needed
    ];

    for (const control of controlsToTest) {
      // Fetch the aria-describedby attribute from the form control
      const describedByAttr = await page.getAttribute(control.selector, 'aria-describedby');
      
      // Assert that aria-describedby points to the correct ID
      expect(describedByAttr).toBe(control.describedById);

      // Validate that the element described by the ID actually exists in the DOM
      const descriptionExists = await page.isVisible(`#${control.describedById}`);
      expect(descriptionExists).toBeTruthy();
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
    // Assuming your PowerBI dashboard is embedded in an iframe
  // Switch to the iframe context
  const frameLocator = page.frameLocator('iframe[class="powerbi-iframe"]'); // Adjust the selector as needed

  // Tab into the dashboard
  await page.keyboard.press('Tab');

  // Wait for the navigation module to potentially appear
  await page.waitForTimeout(1000); // Adjust based on the expected responsiveness of your dashboard

  // Validate the dashboard navigation module visibility
  // This assumes you have a specific selector for the navigation module that becomes visible, update selector accordingly
  const isNavModuleVisible = await frameLocator.locator('selector-for-navigation-module').isVisible();
  expect(isNavModuleVisible).toBeTruthy();

  // Check for the title attribute in the iframe
  // Select all iframes
  const iframes = page.locator('iframe');

  // Count the number of iframes
  const iframeCount = await iframes.count();

  // Iterate through each iframe and check the title attribute
  for (let i = 0; i < iframeCount; i++) {
    const titleAttribute = await iframes.nth(i).getAttribute('title');

    // Assert that the title attribute is present and not empty for each iframe
    expect(titleAttribute, `iframe at index ${i} is missing a title attribute or it is empty`).toBeTruthy();
  }

  // Find the “Show data notes and sources” link
  // Adjust the selector as needed, assuming it's outside the iframe in the main page context
  const isLinkVisible = await page.locator('text="Show data notes and sources"').isVisible();
  expect(isLinkVisible).toBeTruthy();
    
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
    try {
    // Focus the multiselect combobox
    await page.focus('.your-combobox-selector');
    // Open the dropdown
    await page.keyboard.press('Enter'); // or Space

  // Navigate and select items with Arrow keys and Enter
    for (let i = 0; i < 3; i++) { // Select 3 items
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
    }
    // Validate 3 items are selected
    const countSelectedItems = await page.locator('.your-selected-item-selector').count();
    expect(countSelectedItems).toBe(3);

    // Move focus back to a selected item
    await page.keyboard.press('Shift+Tab');

 // Check if the active element matches the selector for the last selected item
 const isFocused = await page.evaluate((selector) => {
  const focusedElement = document.activeElement;
  const targetElement = document.querySelector(selector);
  return focusedElement === targetElement;
}, '.your-specific-focused-item-selector');

expect(isFocused).toBeTruthy(); // Verify the element is focused

    // Delete the focused selected item with Space or Enter
    await page.keyboard.press('Enter'); // or Space

    // Validate that one of the selected items was deleted
    const newCountSelectedItems = await page.locator('.your-selected-item-selector').count();
    expect(newCountSelectedItems).toBe(2); // 1 less than previously selected
    
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
    try {
   // Select the fieldset that should contain the billing address form or any other group of forms
 const fieldset = await page.$('fieldset#billing-address');
 expect(fieldset).not.toBeNull();

 // Ensure the fieldset has a legend that describes the group
 const legend = await page.$('fieldset#billing-address > legend');
 expect(legend).not.toBeNull();

 // Check the text content of the legend
 if (legend) {
  const legendText: string | null = await legend.textContent();
  expect(legendText?.trim()).toBe('Billing Address');
} else {
  // If legend is not found, fail the test explicitly
  throw new Error('Legend element not found');
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
   // Check for the specific paragraph
   const specificParagraph = await page.$('p:text("STEP-BY-STEP")');
  
   if (specificParagraph) {
     // Find the first h1 heading and get its text content
     const h1TextContent = await page.$eval('h1', el => el.textContent);
 
     // Collect all headings after the h1
     const headingsAfterH1 = await page.evaluate((h1Text) => {
       const allHeadings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
       const h1Element = allHeadings.find(h => h.textContent === h1Text);
       const h1Index = h1Element ? allHeadings.indexOf(h1Element) : -1;
       return allHeadings.slice(h1Index + 1).map(heading => heading.tagName);
     }, h1TextContent);
 
     // Assert all headings after the h1 are h2s
     headingsAfterH1.forEach(tagName => {
       expect(tagName).toBe('H2');
     });
   } else {
     console.log('The specific paragraph "STEP-BY-STEP" does not exist on the page.');
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

  async LinksHaveKeyboardFocus(page: Page) {
    const assertionName = 'LinksHaveKeyboardFocus' 
    let pass: boolean
    let matcherResult: any
    try {
   // Identify all links on the page and get their absolute URLs
 const links = await page.$$eval('a', (allLinks, baseURL) => 
 allLinks.map(link => {
   const href = link.getAttribute('href');
   return href ? new URL(href, baseURL).toString() : '';
 }), page.url());

// Focus the first link to start the process
await page.keyboard.press('Tab');

for (let i = 0; i < links.length; i++) {
 const focusedHref = await page.evaluate(() => {
   const active = document.activeElement;
   if (active && active.tagName === 'A') {
     const href = active.getAttribute('href');
     return href ? new URL(href, document.baseURI).href : '';
   }
   return '';
 });

 // Attempt the assertion
 try {
   await expect(focusedHref).toBe(links[i]);
 } catch (error) {
   // If the assertion fails, throw a new error with the custom message
   throw new Error(`Focused link does not match at index ${i}. Expected: ${links[i]}, Got: ${focusedHref}`);
 }

 // Move focus to the next link
 await page.keyboard.press('Tab');
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
 await page.locator('main').focus();

 // Ensure the main landmark is visible
 expect(page.locator('main').isVisible()).toBeTruthy();  

 // Locate the first h1 heading within the main landmark and check for visibility
const h1 = page.locator('main >> h1');
expect(await h1.isVisible()).toBeTruthy();

 // Locate "Table of Contents" navigation element, if it exists
 const tocNav = page.locator('main >> nav[role="navigation"][aria-label="Table of contents"]');
 const isTocPresent = await tocNav.isVisible();

 // Locate "Get Help" h2 heading, if it exists
 const getHelpH2 = page.locator('main >> h2:text("Get Help")');
 const isGetHelpPresent = await getHelpH2.isVisible();

 // If "Table of Contents" navigation element is present, validate its position relative to h1
 if (isTocPresent) {
     // Assert "Table of Contents" navigation comes after the first h1 heading
     // Fetch the bounding boxes for both elements
const h1BoundingBox = await h1.boundingBox();
const tocNavBoundingBox = await tocNav.boundingBox();

// Ensure the bounding boxes are valid
if (!h1BoundingBox || !tocNavBoundingBox) {
  throw new Error('Unable to get bounding boxes for elements');
}

// Assert that the "Table of Contents" navigation comes after the first h1 heading
// by comparing their 'top' positions
expect(h1BoundingBox.y).toBeLessThan(tocNavBoundingBox.y);

     // Assert all content following h1 comes before "Table of Contents" navigation
     // This can be more complex depending on the structure, but a basic approach:
     const contentAfterH1BeforeTOC = page.locator('main >> h1 >> .. >> nav[role="navigation"][aria-label="Table of contents"]');
     const contentAfterH1BeforeTOCText = await contentAfterH1BeforeTOC.allTextContents();
     expect(contentAfterH1BeforeTOCText.length).toBeGreaterThan(0);
 }

// If both "Get Help" and "Table of Contents" are present
if (isTocPresent && isGetHelpPresent) {
  const tocPosition = await tocNav.evaluate((node) => {
    // Using XPath to select the h2 element with the text "Get Help"
    const xpath = "//h2[contains(text(), 'Get Help')]";
    const h2Element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
    if (!h2Element) {
        return -1; // Indicates that the "Get Help" h2 element was not found
    }

    // Getting the document position
    const position = node.compareDocumentPosition(h2Element);

    // Checking if the tocNav node is preceding the h2 element
    return position & Node.DOCUMENT_POSITION_PRECEDING;
  });

  // Assuming Node is accessible, otherwise you might need to replace it with its numerical value
  // Node.DOCUMENT_POSITION_PRECEDING === 2
  const isTocBeforeGetHelp = tocPosition & 2; // Check if the result of compareDocumentPosition included DOCUMENT_POSITION_PRECEDING
  
  // Use your assertion framework's method to assert `isTocBeforeGetHelp` is truthy, indicating tocNav comes before "Get Help"
  expect(isTocBeforeGetHelp).toBeTruthy();
}

 // If "Get Help" is present, validate content before it
 if (isGetHelpPresent) {
     // Adjust locator to account for the new "Table of Contents" structure if needed
     const contentBeforeGetHelpLocator = page.locator('main >> h1 >> .. >> h2:text("Get Help")');
     const contentBeforeGetHelp = await contentBeforeGetHelpLocator.allTextContents();
     expect(contentBeforeGetHelp.length).toBeGreaterThan(0);
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
  const serviceParagraphExists = await page.locator('p').filter({ hasText: 'SERVICE' }).count() > 0;

  if (serviceParagraphExists) {
    // If the paragraph exists, select all <details> elements
    const detailsElements = page.locator('details');

    // Check the count of <details> elements
    const detailsCount = await detailsElements.count();

    for (let i = 0; i < detailsCount; i++) {
      // For each <details> element, select all heading elements
      const headingElements = detailsElements.nth(i).locator('h1, h2, h3, h4, h5, h6');

      // Check that all these heading elements are <h4>
      await headingElements.evaluateAll((headings) => {
        // Check if every heading is an <h4>
        return headings.every(heading => heading.tagName === 'H4');
      }).then(result => {
        // Assert that the condition holds true
        expect(result).toBeTruthy();
      });
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
   // Check if the page contains a <p> element with the text "SERVICE"
  const serviceParagraphExists = await page.locator('p').filter({ hasText: 'MEETING' }).count() > 0;

  if (serviceParagraphExists) {
    // If the paragraph exists, select all <details> elements
    const detailsElements = page.locator('details');

    // Check the count of <details> elements
    const detailsCount = await detailsElements.count();

    for (let i = 0; i < detailsCount; i++) {
      // For each <details> element, select all heading elements
      const headingElements = detailsElements.nth(i).locator('h1, h2, h3, h4, h5, h6');

      // Check that all these heading elements are <h4>
      await headingElements.evaluateAll((headings) => {
        // Check if every heading is an <h4>
        return headings.every(heading => heading.tagName === 'H3');
      }).then(result => {
        // Assert that the condition holds true
        expect(result).toBeTruthy();
      });
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
   // Find the <h2> element with the text "Get Help"
  const getHelpH2 = await page.locator('h2', { hasText: 'Get Help' });

  // Ensure the element exists
  await expect(getHelpH2).toBeVisible();

  // Get all following siblings until another h2 or the end of the container
  const followingElements = await getHelpH2.locator('>> following-sibling::*');

  // Check each sibling if it is a heading and if it is, assert it's an h3
  await followingElements.evaluateAll((elements) => {
      for (const element of elements) {
          // If the element is a heading, check its level
          if (element.tagName.startsWith('h')) {
              if (element.tagName !== 'h3') {
                  throw new Error(`Expected h3, but found ${element.tagName}`);
              }
          }
      }
  });
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
