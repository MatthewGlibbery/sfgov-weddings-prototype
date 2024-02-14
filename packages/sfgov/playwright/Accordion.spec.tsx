import { test, expect } from '@playwright/experimental-ct-react'
import { Accordion } from '../components/Accordion'

test.use({ viewport: { width: 500, height: 500 } })

test('should work', async ({ mount }) => {
  const component = await mount(
    <Accordion title="Test">
      <div>Hello</div>
    </Accordion>
  )
  await expect(component).toContainText('Test')
})
