import { test, expect } from '@playwright/test'

test.describe('FAQ page test', () => {
  test.beforeEach(async ({ page }) => {
    /** abort image loading */
    await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => route.abort())
    /** Go to the starting url before each test. */
    await page.goto('http://localhost:8080/faq')
  })

  test('content exist', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Frequently Asked Questions' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: 'Find answers to common questions across all ASCD resources, events, and services',
      })
    ).toBeVisible()
    await expect(page.getByTestId('TextCTA')).toBeVisible()
    await expect(page.getByTestId('layout-content')).toBeVisible()
    await expect(
      page
        .getByTestId('layout-content')
        .locator('div')
        .filter({ hasText: 'Filters:All Services' })
        .first()
    ).toBeVisible()
  })

  test('all service button', async ({ page }) => {
    await page.getByRole('button', { name: 'All Services' }).click()
    await expect(
      page.getByTestId('custom-drop-down-select-selectAll')
    ).toBeVisible()
  })
})
