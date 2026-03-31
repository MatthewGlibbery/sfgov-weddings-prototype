import AxeBuilder from '@axe-core/playwright'
import { test, expect } from './fixtures'
import { LocationPage } from '../components/page/LocationPage'
import { LocationPageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'
import { runModuleA11yTests } from './moduleA11yTests'

// ============================================================
// Skip ONLY the shared global axe test in THIS file (Location)
// ============================================================
test.beforeEach(async ({}, testInfo) => {
  if (testInfo.title === 'validate axe core accessibility tests') {
    test.skip(
      true,
      'Location page uses custom axe config: disable empty-heading rule only.'
    )
  }
})

// ============================================================
// Run all shared global accessibility tests
// (Everything runs EXCEPT the shared axe test skipped above.)
// ============================================================
runGlobalA11yTests(LocationPage, LocationPageFactory)

// ============================================================
// Run all module specific accessibility tests
// ============================================================
runModuleA11yTests(LocationPage, LocationPageFactory)

// ============================================================
// Location-only override for axe-core:
// Run ALL axe rules EXCEPT `empty-heading`
// ============================================================
test('validate axe core accessibility tests (location override)', async ({
  mount,
  page
}) => {
  const data = LocationPageFactory.make()
  await mount(<LocationPage page={data} />)

  const results = await new AxeBuilder({ page })
    .disableRules(['empty-heading'])
    .analyze()

  expect(
    results.violations,
    JSON.stringify(results.violations, null, 2)
  ).toEqual([])
})

// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Location Page – Content Type Specific A11y Tests', () => {
  test('create a logical reading order in the accordion on the Location content type', async ({
    mount,
    page
  }) => {
    const data = LocationPageFactory.make()
    await mount(<LocationPage page={data} />)

    await expect(
      page
    ).toHaveALogicalReadingOrderInAccordionOnLocationContentType()
  })

  test('create a logical reading order in the Getting Here section on the Location content type', async ({
    mount,
    page
  }) => {
    const data = LocationPageFactory.make()
    await mount(<LocationPage page={data} />)

    await expect(
      page
    ).toHaveALogicalReadingOrderInGettingHereSectionOnLocationContentType()
  })
})

// ============================================================
// Module Specific Tests
// ============================================================
test.describe('Location Page – Module Specific A11y Tests', () => {
  test('logical reading order in the contact us section', async ({
    mount,
    page
  }) => {
    const data = LocationPageFactory.make()
    await mount(<LocationPage page={data} />)

    await expect(page).toHaveLogicalReadingOrderContactUs()
  })
})
