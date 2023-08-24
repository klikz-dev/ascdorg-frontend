import { test, expect } from '@playwright/test'

test.describe('404 tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => route.abort())
    /** Go to the starting url before each test. */
    await page.goto('http://localhost:8080/404')
  })

  test('content exists', async ({ page }) => {
    await expect(page.getByTestId('404-2-col-cta')).toBeVisible()
    await expect(page.getByTestId('grid-section')).toBeVisible()
  })

  test('search button exists', async ({ page }) => {
    await page.getByTestId('404-2-col-cta-cta1-button-2-cta-link').click()
    await expect(page).toHaveURL('http://localhost:8080/search')
  })

  test('View all button exists', async ({ page }) => {
    await page.getByTestId('view-all-cta-link').click()
    await expect(page).toHaveURL(
      'http://localhost:8080/search?sortBy%5B0%5D=featured_article&refinementList%5Btype%5D%5B0%5D=article&refinementList%5Bfeatured%5D%5B0%5D=true'
    )
  })
})
