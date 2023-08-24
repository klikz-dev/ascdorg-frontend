import { test, expect, isMobile } from '@playwright/test'

test.describe('Search page test', () => {
  test.beforeEach(async ({ page }) => {
    /** abort image loading */
    await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => route.abort())
    /** Go to the starting url before each test. */
    await page.goto('http://localhost:8080/search?')
  })

  test('content exists', async ({ page }) => {
    if (isMobile) {
      await expect(
        page.getByTestId('premium-resources-switch')
      ).not.toBeVisible()
      await expect(
        page.getByRole('heading', { name: 'Featured' })
      ).not.toBeVisible()
      await expect(
        page.getByRole('heading', { name: 'Content Type' })
      ).not.toBeVisible()
      await expect(
        page.getByRole('heading', { name: 'Topics' })
      ).not.toBeVisible()
      await expect(
        page.getByRole('heading', { name: 'Grades' })
      ).not.toBeVisible()
      await expect(
        page.getByRole('heading', { name: 'Subjects' })
      ).not.toBeVisible()
      await expect(
        page.getByRole('heading', { name: 'Roles' })
      ).not.toBeVisible()
      await expect(
        page.getByRole('heading', { name: 'Book Filters:' })
      ).not.toBeVisible()
      await expect(
        page.getByRole('heading', { name: 'Year Published' })
      ).not.toBeVisible()
      await expect(
        page.getByRole('heading', { name: 'More Filters' })
      ).not.toBeVisible()
      await expect(
        page.getByRole('heading', { name: 'Keywords' })
      ).not.toBeVisible()
      await expect(
        page.getByRole('heading', { name: 'Department' })
      ).not.toBeVisible()
      await expect(
        page.getByRole('heading', { name: 'Author' })
      ).not.toBeVisible()
      await expect(page.getByText('Sort by:')).not.toBeVisible()
    }
    await expect(
      page.getByTestId('custom-search-box-custom-searchbox')
    ).toBeVisible()
  })
})
