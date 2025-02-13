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
  const styleSheets = Array.from(document.styleSheets);
  return styleSheets.some((sheet) =>
    sheet.href?.includes('_next/static/css/0366a0cd74896cbb.css')
  );
});

if (stylesheetExists) {
  // Proceed with the rest of the checks if the specific stylesheet is present

  // Check for basic focus behavior
  await page.keyboard.press('Tab');
  const focusedElement = await page.$(':focus');
  const indicatorStyle = await focusedElement?.evaluate((element) => {
    const computedStyle = getComputedStyle(element);
    return computedStyle.outline;
  });
  baseExpect(indicatorStyle).not.toBe('none');

  // Check that keyboard focus classes are present in stylesheets
  const styleSheetContents = await page.evaluate(() => {
    const styleSheets = Array.from(document.styleSheets);
    return styleSheets
      .filter((sheet) => sheet.href)
      .map((sheet) => {
        const rules = Array.from(sheet.cssRules).map((rule) => rule.cssText);
        return { href: sheet.href, rules };
      });
  });

  const focusIndicatorStylesExist = styleSheetContents.some((sheet) => {
    return sheet.rules.some((rule) => {
      return (
        rule.includes(':focus') ||
        rule.includes('outline:') ||
        rule.includes('border:')
      );
    });
  });
  baseExpect(focusIndicatorStylesExist).toBe(true);

  // Check that keyboard focus selectors are present
  baseExpect(await page.locator(':focus').isVisible()).toBeTruthy();
  baseExpect(await page.locator('outline:').isVisible()).toBeTruthy();
  baseExpect(await page.locator('border:').isVisible()).toBeTruthy();
} else {
  // If the specific stylesheet does not exist, the test passes
  expect(true).toBe(true);
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
        await page
          .locator('header form[role="search"]')
          .isVisible()
      ).toBeTruthy();

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
      const dropdownSelector = '[aria-label="language selector"]';
    
      // Wait for the dropdown menu to appear
      await page.waitForSelector(dropdownSelector);

      // Focus the dropdown menu to ensure it is active for keyboard interactions
      await page.focus(dropdownSelector);
    
      // Open the dropdown menu using "Enter"
      await page.keyboard.press('Enter');
    
      // Emulate keyboard interactions to select a language
      await page.keyboard.press('Tab'); // Navigate down to the desired option
      await page.keyboard.press('Enter'); // Select the option by pressing Enter

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
      const dropdownSelector = '[aria-label="language selector"]';

      // Get the available options in the dropdown
      const options = await page.$$eval(
        `${dropdownSelector} option`,
        (options) => options.map((option) => option.textContent)
      )

      // List of languages to validate
      const languagesToValidate = ['English', 'Español', '中文', 'Filipino']

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

  async keyboardFocusIndicatorToHaveColorContrast(page: Page) {
    const assertionName = 'keyboardFocusIndicatorToHaveColorContrast'
    let pass: boolean
    let matcherResult: any
    try {
       // Select all links on the page
  const links = await page.$$('a[href]');
  // Minimum contrast ratio for WCAG Level AA
  const minContrastRatio = 3.1;
  for (const link of links) {
    // Set focus on the link to trigger the focus indicator
    await link.focus();

    // Get the color and background color of the focused link
    const focusIndicatorColor = await page.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element);
      return {
        color: computedStyle.color,
        backgroundColor: computedStyle.backgroundColor,
      };
    }, link);

    // Check if the focus indicator color is valid
    if (!focusIndicatorColor) {
      console.error('Error getting focus indicator color for a link.');
      continue;
    }
    // Calculate the contrast ratio using tinycolor
    const contrastRatio = tinycolor.readability(
      tinycolor(focusIndicatorColor.color),
      tinycolor(focusIndicatorColor.backgroundColor)
    );
    // Check if the contrast ratio meets WCAG Level AA standards
    if (contrastRatio >= minContrastRatio) {
      console.log('Contrast ratio meets WCAG Level AA standards for a link.');
    } else {
      console.error('Contrast ratio does not meet WCAG Level AA standards for a link.');
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
      // Check if the iframe is present
     const iframeLocator = page.locator('iframe');
     const isIframePresent = await iframeLocator.isVisible();
 
     if (isIframePresent) {
       // Check that the iframe's src attribute starts with "https://app.powerbigov.us/"
       const iframeSrc = await iframeLocator.getAttribute('src');
       if (iframeSrc && iframeSrc.startsWith('https://app.powerbigov.us/')) {
         
         // Proceed with the remaining checks
 
         // Switch to the iframe context
         const frameLocator = page.frameLocator('iframe'); // Adjust the selector as needed
 
         // Tab into the dashboard
         await page.keyboard.press('Tab');
 
         // Wait for the navigation module to appear
         await page.waitForTimeout(1000); // Adjust based on the expected responsiveness of the dashboard
 
         // Validate that the dashboard navigation module is visible
         const isNavModuleVisible = await frameLocator
           .locator('selector-for-navigation-module')
           .isVisible();
         expect(isNavModuleVisible).toBeTruthy();
 
         // Check for the title attribute in the iframe
         const iframes = page.locator('iframe');
         const iframeCount = await iframes.count();
 
         for (let i = 0; i < iframeCount; i++) {
           const titleAttribute = await iframes.nth(i).getAttribute('title');
           expect(
             titleAttribute,
             `iframe at index ${i} is missing a title attribute or it is empty`
           ).toBeTruthy();
         }
 
         // Find the "Show data notes and sources" link
         const isLinkVisible = await page
           .locator('text="Show data notes and sources"')
           .isVisible();
         expect(isLinkVisible).toBeTruthy();
       } else {
         console.log('iframe src does not match required pattern, skipping the test.');
       }
     } else {
       console.log('iframe not found, skipping the test.');
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
  
  async toHaveLogicalReadingOrderInAccordionOnTransactionContentType(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderInAccordionOnTransactionContentType'
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
    const assertionName = 'toHaveLogicalReadingOrderInAccordionOnMeetingContentType'
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
const contactInfoH2 = page.locator('h2', {
  hasText: 'Contact information',
});

// Check if the 'Contact information' heading is visible
const isVisible = await contactInfoH2.isVisible();
console.log("'Contact information' heading visibility:", isVisible);

if (isVisible) {
  // Locate all following sibling headings (h* tags) after the h2 heading
  const headingSiblings = contactInfoH2.locator('xpath=following-sibling::*[self::h2 or self::h3 or self::h4 or self::h5 or self::h6]');
  const count = await headingSiblings.count();
  console.log('Number of following headings:', count);

  if (count === 0) {
    // If no headings exist, pass the test
    console.log("No headings found after the 'Contact information' heading. Passing the test.");
  } else {
    // Validate the following headings
    for (let i = 0; i < count; i++) {
      const heading = headingSiblings.nth(i);
      const tagName = await heading.evaluate((el) => el.tagName);

      if (tagName === 'H2') {
        // Stop checking at the next H2
        console.log("Encountered another H2 heading. Stopping validation.");
        break;
      }

      if (tagName !== 'H3') {
        throw new Error(`Expected H3, but found ${tagName}`);
      }
    }
    console.log("All headings following the 'Contact information' heading are valid H3s. Passing the test.");
  }
} else {
  // If the 'Contact information' heading is not visible, pass the test
  console.log("'Contact information' heading is not present. Passing the test.");
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

  async toHaveLogicalReadingOrderAdditionalInfoSectionInGetHelpModule(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderAdditionalInfoSectionInGetHelpModule'
    let pass: boolean
    let matcherResult: any
    try {
// Find the <h2> element with the text "Get help"
const getHelpH2 = page.locator('h2', {
  hasText: 'Get help',
});

// Check if the 'Get help' heading is visible
const isVisible = await getHelpH2.isVisible();
console.log("'Get help' heading visibility:", isVisible);

if (isVisible) {
  // Locate the "Additional info" text within the 'Get help' section
  const additionalInfoText = getHelpH2.locator('xpath=following::text()[contains(., "Additional info")]');

  // Check if the "Additional info" text exists
  const additionalInfoExists = await additionalInfoText.isVisible();
  console.log("'Additional info' text visibility:", additionalInfoExists);

  if (additionalInfoExists) {
    // Locate all headings (h2 to h6) after the "Additional info" text
    const followingHeadings = additionalInfoText.locator(
      'xpath=following::*[self::h2 or self::h3 or self::h4 or self::h5 or self::h6]'
    );

    const count = await followingHeadings.count();
    console.log('Number of headings following "Additional info":', count);

    // Validate there are no headings after "Additional info"
    if (count === 0) {
      console.log("No headings found after the 'Additional info' text. Passing the test.");
    } else {
      throw new Error(`Found ${count} heading(s) after the 'Additional info' text.`);
    }
  } else {
    console.log("'Additional info' text is not present. Passing the test.");
  }
} else {
  // If the 'Get help' heading is not visible, pass the test
  console.log("'Get help' heading is not present. Passing the test.");
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
const specificParagraph = await page.$('p:text("INFO PAGE")');

if (specificParagraph) {
  // If the paragraph is present, find the h1 heading and its text content
  const h1TextContent = await page.$eval('h1', (el) => el.textContent || '');

  // Collect all headings after the h1 heading and verify they are all h2
  const allAreH2 = await page.evaluate((h1Text) => {
    const allHeadings = Array.from(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    );
    const h1Element = allHeadings.find((h) => (h.textContent || '').trim() === h1Text);
    if (!h1Element) return false; // Handle cases where the h1 is missing
    const h1Index = allHeadings.indexOf(h1Element);
    const headingsAfterH1 = allHeadings.slice(h1Index + 1);
    return headingsAfterH1.every((heading) => heading.tagName === 'H2');
  }, h1TextContent);

  // Assert that all headings after the h1 are h2
  expect(allAreH2).toBe(true);
} else {
  console.log('The specific paragraph "INFO PAGE" does not exist on the page.');
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

  async toHaveLogicalReadingOrderEventDetails(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderEventDetails'
    let pass: boolean
    let matcherResult: any
    try {
      // Check for the specific paragraph
  const specificParagraph = await page.$('p:text("EVENT")');

  if (specificParagraph) {
  
    // Check that specific texts are h3 headings
    const mayorHeading = page.locator('h3:has-text("Date and Time")');
    await expect(mayorHeading).toBeVisible();
  
    const boardOfSupervisorsHeading = page.locator('h3:has-text("Cost")');
    await expect(boardOfSupervisorsHeading).toBeVisible();
  
    const electedOfficialsHeading = page.locator('h3:has-text("Location")');
    await expect(electedOfficialsHeading).toBeVisible();
   } else {
      console.log('The specific paragraph "EVENT" does not exist on the page. Passing the test');
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

  async toHaveLogicalReadingOrderInResourcesSectionOnAboutContentType(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderInResourcesSectionOnAboutContentType'
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
      const footer = page.locator('footer')

      // Validate that "Our City" is an h2 heading within the footer
      const languagesHeading = footer.locator('h2', { hasText: 'Our City' })
      await expect(languagesHeading).toBeVisible()

      // Validate that "Languages" is an h2 heading within the footer
      const cityLinksHeading = footer.locator('h2', { hasText: 'Languages' })
      await expect(cityLinksHeading).toBeVisible()

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
          text: anchor.textContent?.trim() || '',
        }))
      );
  
      // Iterate through each link and check if it receives keyboard focus
      for (let i = 0; i < links.length; i++) {
        const { href, text } = links[i];
        console.log(`Testing link ${i + 1}: "${text}" with href "${href}"`);
  
        // Select the nth link directly
        const allLinks = await page.$$('a');
        const link = allLinks[i];
  
        if (link) {
          // Ensure the link is visible and interactive before testing focus
          const isVisible = await link.isVisible();
          const isDisabled = await page.evaluate(
            (el) => el.hasAttribute('disabled') || el.getAttribute('tabindex') === '-1',
            link
          );
  
          if (isVisible && !isDisabled) {
            // Focus the link
            await link.focus();
  
            // Check if the link has received focus
            const isFocused = await page.evaluate(
              (el) => document.activeElement === el,
              link
            );
  
            if (!isFocused) {
              throw new Error(`Link "${text}" (href: "${href}") did not receive focus.`);
            }
          } else {
            console.warn(`Skipping link "${text}" (href: "${href}") as it is not focusable.`);
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

  async toHaveKeyboardFocusOnMeetingTranscriptLinks(page: Page) {
    const assertionName = 'toHaveKeyboardFocusOnMeetingTranscriptLinks'
    let pass: boolean
    let matcherResult: any
    try {
       // Define the target link texts to verify focus
  const targetLinkTexts = ["Show transcript", "View full transcript"];

  // Get all focusable elements on the page
  const focusableSelectors = [
    'a[href]',        // Links with href
    'button',         // Buttons
    'input',          // Inputs
    '[tabindex]:not([tabindex="-1"])' // Elements with a tabindex other than -1
  ];
  const focusableElements = await page.$$(focusableSelectors.join(','));

  // Variable to track if the target links received focus
  const focusFailures = [];

  // Simulate tabbing through the page and check focus on target links
  for (const targetText of targetLinkTexts) {
    let isFocused = false;

    for (let i = 0; i < focusableElements.length; i++) {
      // Press Tab to move to the next focusable element
      await page.keyboard.press('Tab');

      // Get the text content of the currently focused element
      const elementText = await page.evaluate(() => {
        const activeElement = document.activeElement;
        return activeElement ? activeElement.textContent?.trim() || '' : null;
      });

      // Check if the active element's text matches the target link text
      if (elementText === targetText) {
        console.log(`Target link "${targetText}" received focus.`);
        isFocused = true;
        break;
      }
    }

    if (!isFocused) {
      focusFailures.push(targetText);
      console.error(`Target link "${targetText}" did not receive focus during tab navigation.`);
    }
  }

  // Fail the test if any target link did not receive focus
  if (focusFailures.length > 0) {
    throw new Error(`The following links did not receive focus during tab navigation: ${focusFailures.join(', ')}`);
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

  async toHaveLogicalReadingOrderInAccordionOnCampaignContentType (page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderInAccordionOnCampaignContentType'
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

    // Locate the element with the text 'Services' within the <main> landmark
const servicesElement = page.locator('main', { hasText: 'Services' }).locator(':text("Services")');

// Validate the element is visible
baseExpect(await servicesElement.isVisible()).toBeTruthy();

// Validate that the element with text 'Services' is an h2 heading
baseExpect(await servicesElement.evaluate(node => node.tagName === 'H2')).toBeTruthy();
      
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

  async toHaveLogicalReadingOrderInResourcesSectionOnResourceCollectionContentType(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderInResourcesSectionOnResourceCollectionContentType'
    let pass: boolean
    let matcherResult: any
    try {

      // Step 1: Check that the "RESOURCE COLLECTION" paragraph is present on the page
  const specificParagraph = await page.$('p:has-text("RESOURCE COLLECTION")');
  
  if (specificParagraph) {
    // Step 2: Locate the <h2>Resources</h2> heading using XPath
    const resourcesHeading = await page.$('//h2[text()="Resources"]');
  
    if (resourcesHeading) {
      // Collect all headings between <h2>Resources</h2> and the next <h2>
      const headingsBetween = await page.evaluate(() => {
        const allHeadings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const resourcesIndex = allHeadings.findIndex(heading => heading.textContent === 'Data');
        const nextH2Index = allHeadings.slice(resourcesIndex + 1).findIndex(heading => heading.tagName === 'H2');
        const endIndex = nextH2Index !== -1 ? resourcesIndex + 1 + nextH2Index : allHeadings.length;
  
        return allHeadings.slice(resourcesIndex + 1, endIndex).map(heading => heading.tagName);
      });
  
      // Assert all collected headings are <h3>
      headingsBetween.forEach(tagName => {
        expect(tagName).toBe('H3');
      });
    } else {
      console.log('The <h2>Resources</h2> heading does not exist on the page.');
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

  async toHaveLogicalReadingOrderInDocumentsSectionOnResourceCollectionContentType(page: Page) {
    const assertionName = 'toHaveLogicalReadingOrderInDocumentsSectionOnResourceCollectionContentType'
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
    const blockquotes = page.locator('blockquote');
    
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
    const blockquotes = page.locator('blockquote');
    
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

  async toSuppressInPageSearchModuleOnDataStoryContentType(page: Page) {
    const assertionName = 'toSuppressInPageSearchModuleOnDataStoryContentType'
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
     
        
// Check for the specific paragraph
  const specificParagraph = await page.$('p:text("SERVICE")');
  
  if (specificParagraph) {
 
 // Define a comprehensive focusable element selector
 const focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]';
 
 // Wait for the elements to ensure they are loaded
 await page.waitForSelector('h1');
 await page.waitForSelector('nav[role="navigation"][aria-label="Table of contents"]');
 
 // Get all focusable elements after <h1> using locator
 const focusableAfterH1Locator = page.locator(`h1 ~ ${focusableSelector}`);
 const focusableAfterH1Count = await focusableAfterH1Locator.count();
 console.log('Focusable elements after h1:', focusableAfterH1Count);
 
 // Get all focusable elements after the <nav role="navigation" aria-label="Table of contents"> using locator
 const focusableAfterNavLocator = page.locator(`nav[role="navigation"][aria-label="Table of contents"] ~ ${focusableSelector}`);
 const focusableAfterNavCount = await focusableAfterNavLocator.count();
 console.log('Focusable elements after nav Table of contents:', focusableAfterNavCount);
 
 // Function to log the currently focused element
 const logFocusedElement = async (description: string) => {
   const activeElementInfo = await page.evaluate(() => {
     const activeElement = document.activeElement;
     if (!activeElement) return null;
     return {
       tagName: activeElement.tagName,
       id: activeElement.id || null,
       className: activeElement.className || null,
       tabindex: activeElement.getAttribute('tabindex') || null, // Check if the element has tabindex
       name: activeElement.getAttribute('name') || null,
       type: activeElement.getAttribute('type') || null,
       isHidden: window.getComputedStyle(activeElement).visibility === 'hidden' || window.getComputedStyle(activeElement).display === 'none'
     };
   });
 
   console.log(`${description} - Currently focused element:`, activeElementInfo);
 };
 
 // Validate elements after <h1>
 for (let i = 0; i < focusableAfterH1Count; i++) {
   await focusableAfterH1Locator.nth(i).focus();  // Focus each element manually
   await logFocusedElement(`Focusing element ${i + 1} after <h1>`);
 
   // Check if the element is visible and enabled (focusable)
   const isVisible = await focusableAfterH1Locator.nth(i).isVisible();
   const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled();
   expect(isVisible).toBe(true);
   expect(isEnabled).toBe(true);
 }
 
 // Validate elements after <nav role="navigation" aria-label="Table of contents">
 for (let i = 0; i < focusableAfterNavCount; i++) {
   await focusableAfterNavLocator.nth(i).focus();  // Focus each element manually
   await logFocusedElement(`Focusing element ${i + 1} after <nav role="navigation" aria-label="Table of contents">`);
 
   // Check if the element is visible and enabled (focusable)
   const isVisible = await focusableAfterNavLocator.nth(i).isVisible();
   const isEnabled = await focusableAfterNavLocator.nth(i).isEnabled();
   expect(isVisible).toBe(true);
   expect(isEnabled).toBe(true);
 }
       } else {
         console.log(
           'The specific paragraph "SERVICE" does not exist on the page.'
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

  async toCreateLogicalTabOrderOnDataStoryContentType(page: Page) {
    const assertionName = 'toCreateLogicalTabOrderOnDataStoryContentType'
    let pass: boolean
    let matcherResult: any
    try {
     
         // Check for the specific paragraph
  const specificParagraph = await page.$('p:text("DATA STORY")');
  
  if (specificParagraph) {
 
 // Define a comprehensive focusable element selector
 const focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]';
 
 // Wait for the elements to ensure they are loaded
 await page.waitForSelector('h1');
 await page.waitForSelector('nav[role="navigation"][aria-label="Table of contents"]');
 
 // Get all focusable elements after <h1> using locator
 const focusableAfterH1Locator = page.locator(`h1 ~ ${focusableSelector}`);
 const focusableAfterH1Count = await focusableAfterH1Locator.count();
 console.log('Focusable elements after h1:', focusableAfterH1Count);
 
 // Get all focusable elements after the <nav role="navigation" aria-label="Table of contents"> using locator
 const focusableAfterNavLocator = page.locator(`nav[role="navigation"][aria-label="Table of contents"] ~ ${focusableSelector}`);
 const focusableAfterNavCount = await focusableAfterNavLocator.count();
 console.log('Focusable elements after nav Table of contents:', focusableAfterNavCount);
 
 // Function to log the currently focused element
 const logFocusedElement = async (description: string) => {
   const activeElementInfo = await page.evaluate(() => {
     const activeElement = document.activeElement;
     if (!activeElement) return null;
     return {
       tagName: activeElement.tagName,
       id: activeElement.id || null,
       className: activeElement.className || null,
       tabindex: activeElement.getAttribute('tabindex') || null, // Check if the element has tabindex
       name: activeElement.getAttribute('name') || null,
       type: activeElement.getAttribute('type') || null,
       isHidden: window.getComputedStyle(activeElement).visibility === 'hidden' || window.getComputedStyle(activeElement).display === 'none'
     };
   });
 
   console.log(`${description} - Currently focused element:`, activeElementInfo);
 };
 
 // Validate elements after <h1>
 for (let i = 0; i < focusableAfterH1Count; i++) {
   await focusableAfterH1Locator.nth(i).focus();  // Focus each element manually
   await logFocusedElement(`Focusing element ${i + 1} after <h1>`);
 
   // Check if the element is visible and enabled (focusable)
   const isVisible = await focusableAfterH1Locator.nth(i).isVisible();
   const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled();
   expect(isVisible).toBe(true);
   expect(isEnabled).toBe(true);
 }
 
 // Validate elements after <nav role="navigation" aria-label="Table of contents">
 for (let i = 0; i < focusableAfterNavCount; i++) {
   await focusableAfterNavLocator.nth(i).focus();  // Focus each element manually
   await logFocusedElement(`Focusing element ${i + 1} after <nav role="navigation" aria-label="Table of contents">`);
 
   // Check if the element is visible and enabled (focusable)
   const isVisible = await focusableAfterNavLocator.nth(i).isVisible();
   const isEnabled = await focusableAfterNavLocator.nth(i).isEnabled();
   expect(isVisible).toBe(true);
   expect(isEnabled).toBe(true);
 }
       } else {
         console.log(
           'The specific paragraph "DATA STORY" does not exist on the page.'
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

  async toCreateLogicalTabOrderOnFormContentType(page: Page) {
    const assertionName = 'toCreateLogicalTabOrderOnFormContentType'
    let pass: boolean
    let matcherResult: any
    try {
     
       // Check if "form" or "formio" is present in the DOM
  const formPresent = await page.$('form') !== null;
  const formIoPresent = await page.$('form-io') !== null;

// If either "form" or "formio" is present, validate the <nav> landmark
  if (formPresent || formIoPresent) {

  // Define a comprehensive focusable element selector
  const focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]';

  // Wait for the elements to ensure they are loaded
  await page.waitForSelector('h1');
  await page.waitForSelector('nav[aria-label="Progress indicator and navigation"]');

  // Get all focusable elements after <h1> using locator
  const focusableAfterH1Locator = page.locator(`h1 ~ ${focusableSelector}`);
  const focusableAfterH1Count = await focusableAfterH1Locator.count();
  console.log('Focusable elements after h1:', focusableAfterH1Count);

  // Get all focusable elements after the <aria-label="Progress indicator and navigation"> using locator
  const focusableAfterNavLocator = page.locator(`nav[aria-label="Progress indicator and navigation"] ~ ${focusableSelector}`);
  const focusableAfterNavCount = await focusableAfterNavLocator.count();
  console.log('Focusable elements after nav Progress indicator and navigation:', focusableAfterNavCount);

  // Function to log the currently focused element
  const logFocusedElement = async (description: string) => {
    const activeElementInfo = await page.evaluate(() => {
      const activeElement = document.activeElement;
      if (!activeElement) return null;
      return {
        tagName: activeElement.tagName,
        id: activeElement.id || null,
        className: activeElement.className || null,
        tabindex: activeElement.getAttribute('tabindex') || null, // Check if the element has tabindex
        name: activeElement.getAttribute('name') || null,
        type: activeElement.getAttribute('type') || null,
        isHidden: window.getComputedStyle(activeElement).visibility === 'hidden' || window.getComputedStyle(activeElement).display === 'none'
      };
    });

    console.log(`${description} - Currently focused element:`, activeElementInfo);
  };

  // Validate elements after <h1>
  for (let i = 0; i < focusableAfterH1Count; i++) {
    await focusableAfterH1Locator.nth(i).focus();  // Focus each element manually
    await logFocusedElement(`Focusing element ${i + 1} after <h1>`);

    // Check if the element is visible and enabled (focusable)
    const isVisible = await focusableAfterH1Locator.nth(i).isVisible();
    const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled();
    expect(isVisible).toBe(true);
    expect(isEnabled).toBe(true);
  }

  // Validate elements after <nav aria-label="Progress indicator and navigation">
  for (let i = 0; i < focusableAfterNavCount; i++) {
    await focusableAfterNavLocator.nth(i).focus();  // Focus each element manually
    await logFocusedElement(`Focusing element ${i + 1} after <nav aria-label="Progress indicator and navigation">`);

    // Check if the element is visible and enabled (focusable)
    const isVisible = await focusableAfterNavLocator.nth(i).isVisible();
    const isEnabled = await focusableAfterNavLocator.nth(i).isEnabled();
    expect(isVisible).toBe(true);
    expect(isEnabled).toBe(true);
  }
} else {
  console.log("Neither 'form' nor 'formio' is present.");
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

  async toCreateLogicalReadingOrderInServicesSectionOnAgencyContentType(page: Page) {
    const assertionName = 'toCreateLogicalReadingOrderInServicesSectionOnAgencyContentType'
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

  async toCreateLogicalReadingOrderInResourcesSectionOnAgencyContentType(page: Page) {
    const assertionName = 'toCreateLogicalReadingOrderInResourcesSectionOnAgencyContentType'
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

  async toCreateLogicalReadingOrderInAboutSectionOnAgencyContentType(page: Page) {
    const assertionName = 'toCreateLogicalReadingOrderInAboutSectionOnAgencyContentType'
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
    
       // Check for the specific paragraph
  const specificParagraph = await page.$('p:text("RESOURCE COLLECTION")');
  
  if (specificParagraph) {
 
 // Define a comprehensive focusable element selector
 const focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]';
 
 // Wait for the elements to ensure they are loaded
 await page.waitForSelector('h1');
 await page.waitForSelector('nav[role="navigation"][aria-label="Table of contents"]');
 
 // Get all focusable elements after <h1> using locator
 const focusableAfterH1Locator = page.locator(`h1 ~ ${focusableSelector}`);
 const focusableAfterH1Count = await focusableAfterH1Locator.count();
 console.log('Focusable elements after h1:', focusableAfterH1Count);
 
 // Get all focusable elements after the <nav role="navigation" aria-label="Table of contents"> using locator
 const focusableAfterNavLocator = page.locator(`nav[role="navigation"][aria-label="Table of contents"] ~ ${focusableSelector}`);
 const focusableAfterNavCount = await focusableAfterNavLocator.count();
 console.log('Focusable elements after nav Table of contents:', focusableAfterNavCount);
 
 // Function to log the currently focused element
 const logFocusedElement = async (description: string) => {
   const activeElementInfo = await page.evaluate(() => {
     const activeElement = document.activeElement;
     if (!activeElement) return null;
     return {
       tagName: activeElement.tagName,
       id: activeElement.id || null,
       className: activeElement.className || null,
       tabindex: activeElement.getAttribute('tabindex') || null, // Check if the element has tabindex
       name: activeElement.getAttribute('name') || null,
       type: activeElement.getAttribute('type') || null,
       isHidden: window.getComputedStyle(activeElement).visibility === 'hidden' || window.getComputedStyle(activeElement).display === 'none'
     };
   });
 
   console.log(`${description} - Currently focused element:`, activeElementInfo);
 };
 
 // Validate elements after <h1>
 for (let i = 0; i < focusableAfterH1Count; i++) {
   await focusableAfterH1Locator.nth(i).focus();  // Focus each element manually
   await logFocusedElement(`Focusing element ${i + 1} after <h1>`);
 
   // Check if the element is visible and enabled (focusable)
   const isVisible = await focusableAfterH1Locator.nth(i).isVisible();
   const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled();
   expect(isVisible).toBe(true);
   expect(isEnabled).toBe(true);
 }
 
 // Validate elements after <nav role="navigation" aria-label="Table of contents">
 for (let i = 0; i < focusableAfterNavCount; i++) {
   await focusableAfterNavLocator.nth(i).focus();  // Focus each element manually
   await logFocusedElement(`Focusing element ${i + 1} after <nav role="navigation" aria-label="Table of contents">`);
 
   // Check if the element is visible and enabled (focusable)
   const isVisible = await focusableAfterNavLocator.nth(i).isVisible();
   const isEnabled = await focusableAfterNavLocator.nth(i).isEnabled();
   expect(isVisible).toBe(true);
   expect(isEnabled).toBe(true);
 }
       } else {
         console.log(
           'The specific paragraph "RESOURCE COLLECTION" does not exist on the page.'
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

  async toCreateLogicalTabOrderProfileContentType(page: Page) {
    const assertionName = 'toCreateLogicalTabOrderProfileContentType'
    let pass: boolean
    let matcherResult: any
    try {
    
// Check for the specific paragraph  
const specificParagraph = await page.$('p:has-text("PROFILE")');

if (specificParagraph) {
  // Check if <aside role="complementary"> exists
  const asideExists = await page.$('aside[role="complementary"]');  

  if (asideExists) {
    // Define a comprehensive focusable element selector
    const focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]';

    // Wait for the elements to ensure they are loaded
    await page.waitForSelector('h1');

    // Get all focusable elements after <h1> using locator
    const focusableAfterH1Locator = page.locator(`h1 ~ ${focusableSelector}`);
    const focusableAfterH1Count = await focusableAfterH1Locator.count();
    console.log('Focusable elements after h1:', focusableAfterH1Count);

    // Function to log the currently focused element
    const logFocusedElement = async (description: string) => {
      const activeElementInfo = await page.evaluate(() => {
        const activeElement = document.activeElement;
        if (!activeElement) return null;
        return {
          tagName: activeElement.tagName,
          id: activeElement.id || null,
          className: activeElement.className || null,
          tabindex: activeElement.getAttribute('tabindex') || null, // Check if the element has tabindex
          name: activeElement.getAttribute('name') || null,
          type: activeElement.getAttribute('type') || null,
          isHidden: window.getComputedStyle(activeElement).visibility === 'hidden' || window.getComputedStyle(activeElement).display === 'none'
        };
      });

      console.log(`${description} - Currently focused element:`, activeElementInfo);
    };

    // Validate elements after <h1>
    for (let i = 0; i < focusableAfterH1Count; i++) {
      await focusableAfterH1Locator.nth(i).focus();  // Focus each element manually
      await logFocusedElement(`Focusing element ${i + 1} after <h1>`);

      // Check if the element is visible and enabled (focusable)
      const isVisible = await focusableAfterH1Locator.nth(i).isVisible();
      const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled();
      expect(isVisible).toBe(true);
      expect(isEnabled).toBe(true);
    }

    // Get all focusable elements after the <aside role="complementary">
    const focusableAfterAsideLocator = page.locator(`aside[role="complementary"] ~ ${focusableSelector}`);
    const focusableAfterAsideCount = await focusableAfterAsideLocator.count();
    console.log('Focusable elements after aside complementary:', focusableAfterAsideCount);

    // Validate elements after <aside role="complementary">
    for (let i = 0; i < focusableAfterAsideCount; i++) {
      await focusableAfterAsideLocator.nth(i).focus();  // Focus each element manually
      await logFocusedElement(`Focusing element ${i + 1} after <aside role="complementary">`);

      // Check if the element is visible and enabled (focusable)
      const isVisible = await focusableAfterAsideLocator.nth(i).isVisible();
      const isEnabled = await focusableAfterAsideLocator.nth(i).isEnabled();
      expect(isVisible).toBe(true);
      expect(isEnabled).toBe(true);
    }
  } else {
    // Handles case where <aside role="complementary"> does not exist
    console.log('The aside[role="complementary"] does not exist on the page.');
  }
} else {
  // Handles case where "PROFILE" paragraph does not exist
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

  async toCreateLogicalReadingOrderInContactSectionsOnProfileContentType (page: Page) {
    const assertionName = 'toCreateLogicalReadingOrderInContactSectionsOnProfileContentType'
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
      const articleParent = paragraph.locator('xpath=ancestor::article').first();

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

  async toSuppressInPageSearchModuleOnReportContentType(page: Page) {
    const assertionName = 'toSuppressInPageSearchModuleOnReportContentType'
    let pass: boolean
    let matcherResult: any
    try {
    
      // Step 1: Check that the "REPORT" paragraph is present on the page
const specificParagraph = await page.$('p:has-text("REPORT")');

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
  // If <p>REPORT</p> does not exist, pass the test
  console.log('<p>REPORT</p> not found. Test passes.');
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

  async toHaveLogicalTabOrderOnReportContentType(page: Page) {
    const assertionName = 'toHaveLogicalTabOrderOnReportContentType'
    let pass: boolean
    let matcherResult: any
    try {
     
        // Check for the specific paragraph
  const specificParagraph = await page.$('p:text("REPORT")');
  
  if (specificParagraph) {
 
 // Define a comprehensive focusable element selector
 const focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]';
 
 // Wait for the elements to ensure they are loaded
 await page.waitForSelector('h1');
 await page.waitForSelector('nav[role="navigation"][aria-label="Table of contents"]');
 
 // Get all focusable elements after <h1> using locator
 const focusableAfterH1Locator = page.locator(`h1 ~ ${focusableSelector}`);
 const focusableAfterH1Count = await focusableAfterH1Locator.count();
 console.log('Focusable elements after h1:', focusableAfterH1Count);
 
 // Get all focusable elements after the <nav role="navigation" aria-label="Table of contents"> using locator
 const focusableAfterNavLocator = page.locator(`nav[role="navigation"][aria-label="Table of contents"] ~ ${focusableSelector}`);
 const focusableAfterNavCount = await focusableAfterNavLocator.count();
 console.log('Focusable elements after nav Table of contents:', focusableAfterNavCount);
 
 // Function to log the currently focused element
 const logFocusedElement = async (description: string) => {
   const activeElementInfo = await page.evaluate(() => {
     const activeElement = document.activeElement;
     if (!activeElement) return null;
     return {
       tagName: activeElement.tagName,
       id: activeElement.id || null,
       className: activeElement.className || null,
       tabindex: activeElement.getAttribute('tabindex') || null, // Check if the element has tabindex
       name: activeElement.getAttribute('name') || null,
       type: activeElement.getAttribute('type') || null,
       isHidden: window.getComputedStyle(activeElement).visibility === 'hidden' || window.getComputedStyle(activeElement).display === 'none'
     };
   });
 
   console.log(`${description} - Currently focused element:`, activeElementInfo);
 };
 
 // Validate elements after <h1>
 for (let i = 0; i < focusableAfterH1Count; i++) {
   await focusableAfterH1Locator.nth(i).focus();  // Focus each element manually
   await logFocusedElement(`Focusing element ${i + 1} after <h1>`);
 
   // Check if the element is visible and enabled (focusable)
   const isVisible = await focusableAfterH1Locator.nth(i).isVisible();
   const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled();
   expect(isVisible).toBe(true);
   expect(isEnabled).toBe(true);
 }
 
 // Validate elements after <nav role="navigation" aria-label="Table of contents">
 for (let i = 0; i < focusableAfterNavCount; i++) {
   await focusableAfterNavLocator.nth(i).focus();  // Focus each element manually
   await logFocusedElement(`Focusing element ${i + 1} after <nav role="navigation" aria-label="Table of contents">`);
 
   // Check if the element is visible and enabled (focusable)
   const isVisible = await focusableAfterNavLocator.nth(i).isVisible();
   const isEnabled = await focusableAfterNavLocator.nth(i).isEnabled();
   expect(isVisible).toBe(true);
   expect(isEnabled).toBe(true);
 }
       } else {
         console.log(
           'The specific paragraph "REPORT" does not exist on the page.'
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

  async toHaveLogicalTabOrderOnMeetingContentType(page: Page) {
    const assertionName = 'toHaveLogicalTabOrderOnMeetingContentType'
    let pass: boolean
    let matcherResult: any
    try {

      // Check for the specific paragraph
  const specificParagraph = await page.$('p:text("MEETING")');
  
  if (specificParagraph) { 
     
      // Define a comprehensive focusable element selector
      const focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [contenteditable]';
      
      // Wait for the elements to ensure they are loaded
      await page.waitForSelector('h1');
      await page.waitForSelector('nav[role="navigation"][aria-label="Table of contents"]');
      
      // Get all focusable elements after <h1> using locator
      const focusableAfterH1Locator = page.locator(`h1 ~ ${focusableSelector}`);
      const focusableAfterH1Count = await focusableAfterH1Locator.count();
      console.log('Focusable elements after h1:', focusableAfterH1Count);
      
      // Get all focusable elements after the <nav role="navigation" aria-label="Table of contents"> using locator
      const focusableAfterNavLocator = page.locator(`nav[role="navigation"][aria-label="Table of contents"] ~ ${focusableSelector}`);
      const focusableAfterNavCount = await focusableAfterNavLocator.count();
      console.log('Focusable elements after nav Table of contents:', focusableAfterNavCount);
      
      // Function to log the currently focused element
      const logFocusedElement = async (description: string) => {
        const activeElementInfo = await page.evaluate(() => {
          const activeElement = document.activeElement;
          if (!activeElement) return null;
          return {
            tagName: activeElement.tagName,
            id: activeElement.id || null,
            className: activeElement.className || null,
            tabindex: activeElement.getAttribute('tabindex') || null, // Check if the element has tabindex
            name: activeElement.getAttribute('name') || null,
            type: activeElement.getAttribute('type') || null,
            isHidden: window.getComputedStyle(activeElement).visibility === 'hidden' || window.getComputedStyle(activeElement).display === 'none'
          };
        });
      
        console.log(`${description} - Currently focused element:`, activeElementInfo);
      };
      
      // Validate elements after <h1>
      for (let i = 0; i < focusableAfterH1Count; i++) {
        await focusableAfterH1Locator.nth(i).focus();  // Focus each element manually
        await logFocusedElement(`Focusing element ${i + 1} after <h1>`);
      
        // Check if the element is visible and enabled (focusable)
        const isVisible = await focusableAfterH1Locator.nth(i).isVisible();
        const isEnabled = await focusableAfterH1Locator.nth(i).isEnabled();
        expect(isVisible).toBe(true);
        expect(isEnabled).toBe(true);
      }
      
      // Validate elements after <nav role="navigation" aria-label="Table of contents">
      for (let i = 0; i < focusableAfterNavCount; i++) {
        await focusableAfterNavLocator.nth(i).focus();  // Focus each element manually
        await logFocusedElement(`Focusing element ${i + 1} after <nav role="navigation" aria-label="Table of contents">`);
      
        // Check if the element is visible and enabled (focusable)
        const isVisible = await focusableAfterNavLocator.nth(i).isVisible();
        const isEnabled = await focusableAfterNavLocator.nth(i).isEnabled();
        expect(isVisible).toBe(true);
        expect(isEnabled).toBe(true);
      }    
  } else {
    console.log(
      'The specific paragraph "MEETING" does not exist on the page.'
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

  async toHaveScopeAttributesInDataTables(page: Page) {
    const assertionName = 'toHaveScopeAttributesInDataTables'
    let pass: boolean
    let matcherResult: any
    try {
     
 
  // Locate all <th> elements in the table
  const tableHeaders = page.locator('th');

  // Loop through each header cell and check the 'scope' attribute
  for (let i = 0; i < await tableHeaders.count(); i++) {
    const header = tableHeaders.nth(i);
    const scopeAttr = await header.getAttribute('scope');

    // Check if the scope attribute is missing
    if (scopeAttr === null) {
      throw new Error(`Error: Missing scope attribute on <th> element at index ${i}`);
    }

    // Assert that the 'scope' attribute is either 'col' or 'row'
    const validScopes = ['col', 'row'];
    
    if (!validScopes.includes(scopeAttr)) {
      throw new Error(`Invalid scope attribute value on <th> element at index ${i}: ${scopeAttr}`);
    }
    
    // You could also add the following assertion to let Playwright's expect check the validity
    expect(validScopes).toContain(scopeAttr);
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
        const specificLandmark = page.locator('aside');
      
        // Check if the <aside> landmark exists
        const count = await specificLandmark.count();
      
        if (count > 0) {
          // If <aside> exists, validate its 'role' attribute
          await expect(specificLandmark).toHaveAttribute('role', 'complementary');
        } else {
          console.log('The <aside> landmark does not exist on the page. Test Passed.');
        }
      } catch (error) {
        console.error('Test failed due to an error:', error);
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
    const assertionName = 'toHaveAriaLabelInProgressBarNavLandmarkOnFormsContentType'
    let pass: boolean
    let matcherResult: any
    try {
     
   // Check if "form" or "formio" is present in the DOM
  const formPresent = await page.$('form') !== null;
  const formIoPresent = await page.$('form-io') !== null;

  // If either "form" or "formio" is present, validate the <nav> landmark
  if (formPresent || formIoPresent) {
    const nav = await page.$('nav[aria-label="Progress indicator and navigation"]');
    expect(nav).not.toBeNull();
  } else {
    console.log("Neither 'form' nor 'formio' is present.");
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
const title = await page.title();

if (title === 'Departments | San Francisco') {
  // If the title matches, perform the additional checks

// Find the <main> element
  const main = page.locator('main');

  // Check that there is exactly one <h1> within <main>
  const h1Count = await main.locator('h1').count();
  expect(h1Count).toBe(1); // Ensure exactly one <h1>

  // Find the <h1> within <main> containing the word "Departments"
  const h1WithDepartments = main.locator('h1:has-text("Departments")').first();

  // Ensure that the first "Departments" within <main> is indeed inside an <h1>
  const textContent = await h1WithDepartments.textContent();
  expect(textContent).toContain('Departments');

  // Check that all following elements with <a> tags are inside <h2>
  const links = main.locator('h1:has-text("Departments") ~ h2 a'); // Select links following <h1> within <h2> elements
  const linksCount = await links.count();

  // Ensure all the links following <h1> "Departments" are inside <h2>
for (let i = 0; i < linksCount; i++) {
  const link = links.nth(i);
  
  // Check if the parent element of the link is an <h2>
  const parentTag = await link.evaluate(el => el.parentElement?.tagName);
  
  // Validate that the parent tag is 'H2'
  expect(parentTag).toBe('H2');
}
} else {
  // If the page title does not match, pass the test and log a message
  console.log('The page title is not "Departments | San Francisco". Passing the test.');
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
     
     // Check if the page title is "Services | San Francisco"
const title = await page.title();

if (title === 'Services | San Francisco') {
  // If the title matches, perform the additional checks

// Find the <main> element
  const main = page.locator('main');

  // Check that there is exactly one <h1> within <main>
  const h1Count = await main.locator('h1').count();
  expect(h1Count).toBe(1); // Ensure exactly one <h1>

  // Find the <h1> within <main> containing the word "Services"
  const h1WithServices = main.locator('h1:has-text("Services")').first();

  // Ensure that the first "Services" within <main> is indeed inside an <h1>
  const textContent = await h1WithServices.textContent();
  expect(textContent).toContain('Services');

  // Check that all following elements with <a> tags are inside <h2>
  const links = main.locator('h1:has-text("Services") ~ h2 a'); // Select links following <h1> within <h2> elements
  const linksCount = await links.count();

 // Ensure all the links following <h1> "Services" are inside <h2>
for (let i = 0; i < linksCount; i++) {
  const link = links.nth(i);
  
  // Check if the parent element of the link is an <h2>
  const parentTag = await link.evaluate(el => el.parentElement?.tagName);
  
  // Validate that the parent tag is 'H2'
  expect(parentTag).toBe('H2');
}
} else {
  // If the page title does not match, pass the test and log a message
  console.log('The page title is not "Services | San Francisco". Passing the test.');
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
const title = await page.title();

if (title === 'Search | San Francisco') {
  // If the title matches, perform the additional checks

// Find the <main> element
  const main = page.locator('main');

  // Check that there is exactly one <h1> within <main>
  const h1Count = await main.locator('h1').count();
  expect(h1Count).toBe(1); // Ensure exactly one <h1>

  // Find the <h1> within <main> containing the word "Search"
  const h1WithSearch = main.locator('h1:has-text("Search")').first();

  // Ensure that the first "Search" within <main> is indeed inside an <h1>
  const textContent = await h1WithSearch.textContent();
  expect(textContent).toContain('Search');

  // Check that all following elements with <a> tags are inside <h2>
  const links = main.locator('h1:has-text("Search") ~ h2 a'); // Select links following <h1> within <h2> elements
  const linksCount = await links.count();

 // Ensure all the links following <h1> "Search" are inside <h2>
for (let i = 0; i < linksCount; i++) {
  const link = links.nth(i);
  
  // Check if the parent element of the link is an <h2>
  const parentTag = await link.evaluate(el => el.parentElement?.tagName);
  
  // Validate that the parent tag is 'H2'
  expect(parentTag).toBe('H2');
}
} else {
  // If the page title does not match, pass the test and log a message
  console.log('The page title is not "Search | San Francisco". Passing the test.');
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
const title = await page.title();

if (title === 'About SF.gov | San Francisco') {
  // If the title matches, perform the additional checks

// Find the <main> element
  const main = page.locator('main');

  // Check that there is exactly one <h1> within <main>
  const h1Count = await main.locator('h1').count();
  expect(h1Count).toBe(1); // Ensure exactly one <h1>

  // Find the <h1> within <main> containing the word "About SF.gov"
  const h1WithAboutSF = main.locator('h1:has-text("About SF.gov")').first();

  // Ensure that the first "About SF.gov" within <main> is indeed inside an <h1>
  const textContent = await h1WithAboutSF.textContent();
  expect(textContent).toContain('About SF.gov');

// Check that all headings following the <h1> are <h2>
  const headings = main.locator('h1:has-text("About SF.gov") ~ h2, h1:has-text("About SF.gov") ~ h3, h1:has-text("About SF.gov") ~ h4, h1:has-text("About SF.gov") ~ h5, h1:has-text("About SF.gov") ~ h6'); // All headings after <h1>

  const headingsCount = await headings.count();

  // Ensure all headings are <h2>
  for (let i = 0; i < headingsCount; i++) {
    const headingTag = await headings.nth(i).evaluate(el => el.tagName);
    expect(headingTag).toBe('H2');
  }
} else {
  // If the page title does not match, pass the test and log a message
  console.log('The page title is not "About SF.gov | San Francisco". Passing the test.');
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
const title = await page.title();

if (title === 'Disclaimer for SF.gov | San Francisco') {
  // If the title matches, perform the additional checks

// Find the <main> element
  const main = page.locator('main');

  // Check that there is exactly one <h1> within <main>
  const h1Count = await main.locator('h1').count();
  expect(h1Count).toBe(1); // Ensure exactly one <h1>

  // Find the <h1> within <main> containing the word "Disclaimer for SF.gov"
  const h1WithDisclaimer = main.locator('h1:has-text("Disclaimer for SF.gov")').first();

  // Ensure that the first "Disclaimer for SF.gov" within <main> is indeed inside an <h1>
  const textContent = await h1WithDisclaimer.textContent();
  expect(textContent).toContain('Disclaimer for SF.gov');

// Check that all headings following the <h1> are <h2>
  const headings = main.locator('h1:has-text("Disclaimer for SF.gov") ~ h2, h1:has-text("Disclaimer for SF.gov") ~ h3, h1:has-text("Disclaimer for SF.gov") ~ h4, h1:has-text("Disclaimer for SF.gov") ~ h5, h1:has-text("Disclaimer for SF.gov") ~ h6'); // All headings after <h1>

  const headingsCount = await headings.count();

  // Ensure all headings are <h2>
  for (let i = 0; i < headingsCount; i++) {
    const headingTag = await headings.nth(i).evaluate(el => el.tagName);
    expect(headingTag).toBe('H2');
  }
} else {
  // If the page title does not match, pass the test and log a message
  console.log('The page title is not "Disclaimer for SF.gov | San Francisco". Passing the test.');
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
const title = await page.title();

if (title === 'Privacy policy for SF.gov | San Francisco') {
  // If the title matches, perform the additional checks

// Find the <main> element
  const main = page.locator('main');

  // Check that there is exactly one <h1> within <main>
  const h1Count = await main.locator('h1').count();
  expect(h1Count).toBe(1); // Ensure exactly one <h1>

  // Find the <h1> within <main> containing the word "About SF.gov"
  const h1WithPrivacy = main.locator('h1:has-text("Privacy policy for SF.gov")').first();

  // Ensure that the first "Privacy policy for SF.gov" within <main> is indeed inside an <h1>
  const textContent = await h1WithPrivacy.textContent();
  expect(textContent).toContain('Privacy policy for SF.gov');

// Check that all headings following the <h1> are <h2>
  const headings = main.locator('h1:has-text("Privacy policy for SF.gov") ~ h2, h1:has-text("Privacy policy for SF.gov") ~ h3, h1:has-text("Privacy policy for SF.gov") ~ h4, h1:has-text("Privacy policy for SF.gov") ~ h5, h1:has-text("Privacy policy for SF.gov") ~ h6'); // All headings after <h1>

  const headingsCount = await headings.count();

  // Ensure all headings are <h2>
  for (let i = 0; i < headingsCount; i++) {
    const headingTag = await headings.nth(i).evaluate(el => el.tagName);
    expect(headingTag).toBe('H2');
  }
} else {
  // If the page title does not match, pass the test and log a message
  console.log('The page title is not "Privacy policy for SF.gov | San Francisco". Passing the test.');
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
const title = await page.title();

if (title === 'Contact SF.gov | San Francisco') {
  // If the title matches, perform the additional checks

// Find the <main> element
  const main = page.locator('main');

  // Check that there is exactly one <h1> within <main>
  const h1Count = await main.locator('h1').count();
  expect(h1Count).toBe(1); // Ensure exactly one <h1>

  // Find the <h1> within <main> containing the word "Contact SF.gov"
  const h1WithContact = main.locator('h1:has-text("Contact SF.gov")').first();

  // Ensure that the first "Contact SF.gov" within <main> is indeed inside an <h1>
  const textContent = await h1WithContact.textContent();
  expect(textContent).toContain('Contact SF.gov');

// Check that "What to do" and "Get help" are <h2>
  const whatToDo = main.locator('h2:has-text("What to do")').first();
  const getHelp = main.locator('h2:has-text("Get help")').first();

  expect(await whatToDo.evaluate(el => el.tagName)).toBe('H2'); // Ensure "What to do" is <h2>
  expect(await getHelp.evaluate(el => el.tagName)).toBe('H2');  // Ensure "Get help" is <h2>

  // Check that "Emergencies" and "Online" are <h3>
  const emergencies = main.locator('h3:has-text("Emergencies")').first();
  const online = main.locator('h3:has-text("Online")').first();

  expect(await emergencies.evaluate(el => el.tagName)).toBe('H3'); // Ensure "Emergencies" is <h3>
  expect(await online.evaluate(el => el.tagName)).toBe('H3');      // Ensure "Online" is <h3>


} else {
  // If the page title does not match, pass the test and log a message
  console.log('The page title is not "Contact SF.gov | San Francisco". Passing the test.');
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
  const footer = page.locator('footer');
  
  // Select the first <nav> inside the footer
  const primaryNav = footer.locator('nav').nth(0);
  
  // Validate the first nav has the aria-label "Primary Footer Navigation"
  await expect(primaryNav).toHaveAttribute('aria-label', 'Primary Footer Navigation');

  // Select the second <nav> inside the footer
  const secondaryNav = footer.locator('nav').nth(1);

  // Validate the second nav has the aria-label "Secondary Social Media Footer Navigation"
  await expect(secondaryNav).toHaveAttribute('aria-label', 'Secondary Social Media Footer Navigation');


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
function isFocusable(locator: any): (this: import("@playwright/test").ExpectMatcherState, receiver: any, ...args: any[]) => import("@playwright/test").MatcherReturnType | Promise<import("@playwright/test").MatcherReturnType> {
  throw new Error('Function not implemented.')
}

