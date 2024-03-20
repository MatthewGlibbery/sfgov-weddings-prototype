import { MeetingPage } from '../components/page/MeetingPage'
import { MeetingPageFactory } from '@/lib/factories'
import { test, expect } from './fixtures'

test.describe('A11y tests', () => {
  test('headings are rendered in a logical reading order', async ({
    mount,
    page
  }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLogicalReadingOrder()
  })

  test('has link to main content', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page.locator('a[href="#main-content"]')).toContainText(
      'Skip to main content'
    )
  })

  test('has accessible landmark roles', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLandmarks()
  })

  test('has search landmarks plus aria', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveSearchLandmarksPlusAria()
  })

  test('has prefers reduced motion', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)
    await expect(page).toHavePrefersReducedMotion()
  })

  test('has language access', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLanguageAccess()
  })

  test('has language interaction', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLanguageInteraction()
  })

  test('has language access in dropdown menu', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toHaveLanguageAccessInDropdownmenu()
  })

  test('is keyboard accessible', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toBeKeyboardAccessible()
  })

  test('has no accessibility violations', async ({ mount, page }) => {
    const data = MeetingPageFactory.make()
    await mount(<MeetingPage page={data} />)

    await expect(page).toPassA11yScan()
  })
})
