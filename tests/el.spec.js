import { test, expect } from '@playwright/test'

test.describe('EL page test', () => {
  test.beforeEach(async ({ page }) => {
    /** abort image loading */
    await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => route.abort())
    /** Go to the starting url before each test. */
    await page.goto('http://localhost:8080/el')
  })

  test('title exists', async ({ page }) => {
    await expect(page).toHaveTitle('Educational Leadership')
  })

  test('content exist', async ({ page }) => {
    await expect(page.getByTestId('issue-banner-title')).toBeVisible()
    await expect(page.getByTestId('horizontal-scroll')).toBeVisible()
    await expect(page.getByTestId('grid-section')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Featured Column' })
    ).toBeVisible()
    await expect(page.getByTestId('two-column-cta-cta1').first()).toBeVisible()
    await expect(page.getByTestId('SearchCarousel-title')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Listen & Learn' })
    ).toBeVisible()
    await expect(page.getByTestId('rich-text')).toBeVisible()
  })

  test('join link', async ({ page }) => {
    await page.getByTestId('issue-banner-title-cta').click()
    await expect(page).toHaveURL('http://localhost:8080/memberships')
  })

  test('authors link', async ({ page }) => {
    await page.getByRole('link', { name: '100+ Featured Authors' }).click()
    await expect(page).toHaveURL('http://localhost:8080/authors')
  })

  test('horizontal view all link', async ({ page }) => {
    await page
      .getByTestId('horizontal-scroll')
      .getByTestId('view-all-cta-link')
      .click()
    await expect(page).toHaveURL('http://localhost:8080/el/all')
  })

  test('featured articles view all link', async ({ page }) => {
    await page
      .getByTestId('grid-section')
      .getByTestId('view-all-cta-link')
      .click()
    await expect(page).toHaveURL(
      'http://localhost:8080/search?refinementList%5Btype%5D%5B0%5D=article&refinementList%5Bfeatured%5D%5B0%5D=true'
    )
  })

  test('resources link', async ({ page }) => {
    await page.getByRole('link', { name: 'View resources' }).click()
    await expect(page).toHaveURL('http://localhost:8080/el-topic-selects')
  })

  test('search carousel view all link', async ({ page }) => {
    await page.getByTestId('SearchCarousel-cta-link').click()
    await expect(page).toHaveURL(
      'http://localhost:8080/search?refinementList%5Btype%5D%5B0%5D=article&refinementList%5Bfeatured%5D=&page=1&configure%5BhitsPerPage%5D=12&query='
    )
  })

  test('podcast view all link', async ({ page }) => {
    await page
      .locator('div')
      .filter({ hasText: /^Listen & LearnView all$/ })
      .getByTestId('view-all-cta-link')
      .click()
    await expect(page).toHaveURL('http://localhost:8080/podcasts')
  })

  test('view upcoming theme link', async ({ page }) => {
    await page.getByRole('link', { name: 'View upcoming themes' }).click()
    await expect(page).toHaveURL('http://localhost:8080/el/write')
  })

  test('view guidance link', async ({ page }) => {
    await page.getByTestId('two-column-cta-cta2-button').click()
    await expect(page).toHaveURL('http://localhost:8080/guidelines-for-el')
  })
})
