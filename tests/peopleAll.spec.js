import { test, expect } from '@playwright/test'

test.describe('People all page test', () => {
  test.beforeEach(async ({ page }) => {
    /** abort image loading */
    await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => route.abort())
    /** Go to the starting url before each test. */
    await page.goto('http://localhost:8080/people/all')
  })

  test('title exists', async ({ page }) => {
    await expect(
      page.getByText(
        'Everyone @ ASCDGet to know the people shaping our education community'
      )
    ).toBeVisible()
  })

  test('Content exist', async ({ page }) => {
    await expect(page.getByTestId('banner')).toBeVisible()
    await expect(
      page.getByTestId('custom-search-box-custom-searchbox')
    ).toBeVisible()
    await expect(page.getByTestId('people-all-2-col-cta-title')).toBeVisible()
    await expect(
      page
        .getByTestId('people-all-2-col-cta')
        .locator('div')
        .filter({ hasText: 'Learn more' })
        .nth(2)
    ).toBeVisible()
    await expect(
      page.getByTestId('people-all-2-col-cta-description')
    ).toBeVisible()
  })

  test('Bottom Two Col Cta', async ({ page }) => {
    await page.getByTestId('people-all-2-col-cta-cta1-button').click()
    await expect(page).toHaveURL('http://localhost:8080/write-for-ascd')
  })
})
