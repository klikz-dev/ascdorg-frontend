import { test, expect } from '@playwright/test'
import { menuItems } from '../const'

/**
 * use test.describe with an anonymous callback to
 * use test.skip to skip a test
 * use test.only to only run a single test
 * use test.slow() to triple the default timeout for slow tests
 */

test.describe('header navigation tests', () => {
  test.beforeEach(async ({ page, isMobile }) => {
    /** abort image loading */
    await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => route.abort())
    /** Go to the starting url before each test. */
    await page.goto('http://localhost:8080')

    /** Open Mobile Menu if mobile */

    if (isMobile) {
      await page.getByTestId('header-mobile-drawerOpen').click()
    }
  })

  for (const { testId: menuTestId, items, rightLinks } of menuItems.filter(
    (menu) => menu.id !== 'menu-activateHome'
  )) {
    test(`${menuTestId} menu opens with expected items`, async ({ page }) => {
      /** click the menu item */
      await page.getByTestId(menuTestId).click()

      /** correct number of items are rendered */
      const linkItems = page.getByTestId(`${menuTestId}-link-items`)
      const rightItems = page.getByTestId(`${menuTestId}-right-link-items`)

      expect(linkItems.length === items.length)
      expect(rightItems?.length || 0 === rightLinks?.length || 0)
    })

    for (const { testId, href } of items) {
      test(`${testId} header navigation links`, async ({ page }) => {
        const adjustedHref = href.startsWith('/')
          ? `http://localhost:8080${href}`
          : href
        const regex = new RegExp(`${adjustedHref}`)
        await page.getByTestId(menuTestId).click()

        /** click the menu item */
        await page.getByTestId(testId).click()

        /** expect a url change */

        expect(page.url()).toMatch(regex)
      })
    }

    /** only test right links if they exist */
    if (rightLinks?.length) {
      /** click all the li items inside the links items, skip the links that are not behaving */
      for (const { testId, href } of rightLinks.filter(
        (link) => link.testId !== 'collections-link'
      )) {
        test(`${testId} header navigation right links`, async ({ page }) => {
          const adjustedHref = href.startsWith('/')
            ? `http://localhost:8080${href}`
            : href
          const regex = new RegExp(`${adjustedHref}.*`)
          await page.getByTestId(menuTestId).click()
          /** abort image loading */
          await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) =>
            route.abort()
          )
          /** click the menu item */
          await page.getByTestId(testId).click()
          /** expect a url change */

          expect(page.url()).toMatch(regex)
        })
      }
    }
  }

  /** @todo: set up a login for a test user that has access to activate */
})
