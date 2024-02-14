import { AgencyPage } from '@/components'
import { AgencyPageFactory } from '@/lib/factories'
import { test, expect } from './fixtures'

test.describe('A11y tests', () => {
  test('headings are rendered in a logical reading order', async ({
    mount,
    page
  }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLogicalReadingOrder()
  })

  test('has link to main content', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page.locator('a[href="#main-content"]')).toBeVisible()
  })

  test('has accessible landmark roles', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toHaveLandmarks()
  })

  test('is keyboard accessible', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toBeKeyboardAccessible()
  })

  test('has no accessibility violations', async ({ mount, page }) => {
    const data = AgencyPageFactory.make()
    await mount(<AgencyPage page={data} />)

    await expect(page).toPassA11yScan()
  })
})
