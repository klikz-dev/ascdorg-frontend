import { test, expect } from '@playwright/test'

test.describe('EL all page test', () => {
  test.beforeEach(async ({ page }) => {
    /** abort image loading */
    await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => route.abort())
    /** Go to the starting url before each test. */
    await page.goto('http://localhost:8080/el/all')
  })

  test('title exists', async ({ page }) => {
    await expect(page).toHaveTitle(/Educational Leadership/)
  })

  test('get started link', async ({ page }) => {
    await page.getByRole('link', { name: 'Subscribe' }).click()
    await expect(page).toHaveURL('http://localhost:8080/memberships')
  })

  test('authors link', async ({ page }) => {
    await page.getByRole('link', { name: '100+ Featured Authors' }).click()
    await expect(page).toHaveURL('http://localhost:8080/authors')
  })

  test('write for us link', async ({ page }) => {
    await page.getByRole('link', { name: 'View upcoming themes' }).click()
    await expect(page).toHaveURL('http://localhost:8080/el/write')
  })

  test('guidelines link', async ({ page }) => {
    await page.getByRole('link', { name: 'View all link' }).click()
    await expect(page).toHaveURL('http://localhost:8080/guidelines-for-el')
  })

  test('content exist', async ({ page }) => {
    await expect(page.getByTestId('el-all-issue-banner-title')).toBeVisible()
    await expect(page.getByTestId('el-all-issue-grid')).toBeVisible()
    await expect(page.getByTestId('el-all-2-col-cta')).toBeVisible()
  })
})
