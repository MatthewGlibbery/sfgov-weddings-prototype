import SearchPage from '../pages/search'
import { SearchResultsPageFactory } from '@/lib/factories'
import { test, expect } from './fixtures'

test.describe('search results page', () => {
  test('logical reading order', async ({ mount, page }) => {
    const data = SearchResultsPageFactory.make()
    await mount(<SearchPage {...data} />)
    await expect(page).toHaveLogicalReadingOrderSearchListView()
  })
})
