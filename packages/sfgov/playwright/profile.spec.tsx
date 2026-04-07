// packages/sfgov/playwright/globalA11yTests.ts
import React from 'react'
import { test, expect } from './fixtures'
import { ProfilePage } from '../components/page/ProfilePage'
import { ProfilePageFactory } from '@/lib/factories'
import { runGlobalA11yTests } from './globalA11yTests'

// ============================================================
// Run all shared global accessibility tests
// ============================================================
runGlobalA11yTests(ProfilePage, ProfilePageFactory)

// ============================================================
// Content Type Specific Tests
// ============================================================
test.describe('Profile Page – Content Type Specific A11y Tests', () => {
  test('create a logical tab order on the Profile content type', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(page).toCreateLogicalTabOrderProfileContentType()
  })

  test('create a logical reading order in the Contact sections on the Profile content type', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(
      page
    ).toCreateLogicalReadingOrderInContactSectionsOnProfileContentType()
  })
  test('create a logical reading order in the Additional Roles section on the Profile content type', async ({
    mount,
    page
  }) => {
    const data = ProfilePageFactory.make()
    await mount(<ProfilePage page={data} />)

    await expect(
      page
    ).toHaveLogicalReadingOrderInAdditionalRolesSectionOnProfile()
  })
})
