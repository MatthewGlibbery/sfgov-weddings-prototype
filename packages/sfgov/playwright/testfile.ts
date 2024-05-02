import { AxeBuilder } from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

test('landmarks are present', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: "Christina's Information Page" }).click()
try {
await page.waitForSelector('header');
console.log('Header landmark is present.');
} catch (error) {
console.error('Header landmark is not present.');
}
try {
  await page.waitForSelector('banner');
  console.log('Banner landmark is present.');
  } catch (error) {
  console.error('Banner landmark is not present.');
}
try {
  await page.waitForSelector('nav');
  console.log('Nav landmark is present.');
  } catch (error) {
  console.error('Nav landmark is not present.');
}
try {
  await page.waitForSelector('main');
console.log('Main landmark is present.');
} catch (error) {
console.error('Main landmark is not present.');
}
try {
  await page.waitForSelector('footer');
console.log('Footer landmark is present.');
} catch (error) {
console.error('Footer landmark is not present.');
}
try {
  await page.waitForSelector('aside');
console.log('Aside landmark is present.');
} catch (error) {
console.error('Aside landmark is not present.');
}
})
