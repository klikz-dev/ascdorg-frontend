import { test, expect } from '@playwright/test'

test.describe('resources tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => route.abort())
    /** Go to the starting url before each test. */
    await page.goto('http://localhost:8080/resources')
  })

  test('content exists', async ({ page }) => {
    await expect(page.getByTestId('issue-banner-title')).toBeVisible()
    await expect(page.getByTestId('grid-section')).toBeVisible()
    await expect(
      page.getByTestId('resources-publication-2-col-cta')
    ).toBeVisible()
    await expect(page.getByTestId('horizontal-scroll')).toBeVisible()
    await expect(page.getByText('Listen & LearnView all')).toBeVisible()
    await expect(page.getByText('Featured VideosView all')).toBeVisible()
    await expect(
      page.getByTestId('resources-publication-2-col-cta')
    ).toBeVisible()
    await expect(
      page.getByTestId('resources-featured-auth-2-col-cta')
    ).toBeVisible()
    await expect(page.getByTestId('two-column-cta')).toBeVisible()
    await expect(page.getByTestId('topics')).toBeVisible()
    await expect(page.getByTestId('two-column-content-list')).toBeVisible()
  })

  test('View all exists featured articles', async ({ page }) => {
    await page
      .getByTestId('grid-section')
      .getByTestId('view-all-cta-link')
      .click()
    await expect(page).toHaveURL(
      'http://localhost:8080/search?refinementList%5Btype%5D%5B0%5D=article&refinementList%5Bfeatured%5D%5B0%5D=true'
    )
  })

  test('View all exists el all', async ({ page }) => {
    await page
      .getByTestId('resources-publication-2-col-cta-cta2-button-2-cta-link')
      .click()
    await expect(page).toHaveURL('http://localhost:8080/el/all')
  })

  test('View all exists podcast', async ({ page }) => {
    await page
      .locator('div')
      .filter({ hasText: /^Listen & LearnView all$/ })
      .getByTestId('view-all-cta-link')
      .click()
    await expect(page).toHaveURL('http://localhost:8080/podcasts')
  })

  test('View all exists horizontal scroll', async ({ page }) => {
    await page
      .getByTestId('horizontal-scroll')
      .getByTestId('view-all-cta-link')
      .click()
    await expect(page).toHaveURL(
      'http://localhost:8080/search?refinementList%5Btype%5D%5B0%5D=book'
    )
  })
})
