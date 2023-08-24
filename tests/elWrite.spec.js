import { test, expect } from '@playwright/test'

test.describe('el write tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => route.abort())
    /** Go to the starting url before each test. */
    await page.goto('http://localhost:8080/el/write')
  })

  test('content exists', async ({ page }) => {
    await expect(page.getByTestId('issue-banner-title')).toBeVisible()
    await expect(page.getByTestId('TextCTA')).toBeVisible()
    await expect(page.getByTestId('horizontal-scroll')).toBeVisible()
    await expect(
      page.getByTestId('TextCTA-ctaLabel').getByTestId('view-all-cta-link')
    ).toBeVisible()
  })

  test('first button exists', async ({ page }) => {
    await page
      .getByTestId('issue-banner-title-cta')
      .getByTestId('undefined-button')
      .click()
    await expect(page).toHaveURL('http://localhost:8080/guidelines-for-el')
  })

  test('View all button exists', async ({ page }) => {
    await page
      .getByTestId('horizontal-scroll')
      .getByTestId('view-all-cta-link')
      .click()
    await expect(page).toHaveURL('http://localhost:8080/el/all')
  })
})
