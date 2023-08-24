import { test, expect } from '@playwright/test'
import { about, involved, partner } from '../const/menuItems'

/**
 * use test.describe with an anonymous callback to
 * use test.skip to skip a test
 * use test.only to only run a single test
 * use test.slow() to triple the default timeout for slow tests
 */

test.describe('footer navigation tests', () => {
  test.beforeEach(async ({ page }) => {
    /** abort image loading */
    await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => route.abort())
    /** Go to the starting url before each test. */
    await page.goto('http://localhost:8080')
  })

  for (const { testId, href } of [...about, ...involved, ...partner]) {
    const adjustedHref = href.startsWith('/')
      ? `http://localhost:8080${href}`
      : href

    test(`${testId}-footer-navigation`, async ({ page }) => {
      /** click the menu item */
      await page.getByTestId(testId).click()

      /** this fails without this here for some reason... */
      await page.waitForURL(adjustedHref)

      expect(page.url()).toBe(adjustedHref)
    })
  }
})
