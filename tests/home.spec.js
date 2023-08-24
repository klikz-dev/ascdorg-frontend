import { test, expect } from '@playwright/test'

/**
 * use test.describe with an anonymous callback to
 * use test.skip to skip a test
 * use test.only to only run a single test
 * use test.slow() to triple the default timeout for slow tests
 */

test.describe('home page', () => {
  test.beforeEach(async ({ page }) => {
    /** abort image loading */
    await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => route.abort())
    /** Go to the starting url before each test. */
    await page.goto('http://localhost:8080')
  })

  test('page metadata', async ({ page }) => {
    const title = page.locator('meta[property="og:title"]')
    const twitterImage = page.locator('meta[name="twitter:image"]')
    const image = page.locator('meta[property="og:image"]')
    const description = page.locator('meta[property="og:description"]')
    const url = page.locator('meta[property="og:url"]')
    await expect(title).toHaveAttribute('content', 'ASCD')
    await expect(description).toHaveAttribute(
      'content',
      'We create practical, timely, affordable professional learning to help educators and instructional leaders provide students with a modern, equitable, and quality education.'
    )
    await expect(twitterImage).toHaveAttribute(
      'content',
      'https://images.ctfassets.net/cguvp07qpj80/2nGsDLLOUtjSrMNPED4j9p/f6e806fbce947490a2bd1d08ab48d9ad/logo.png?q=90'
    )
    await expect(image).toHaveAttribute(
      'content',
      'https://images.ctfassets.net/cguvp07qpj80/2nGsDLLOUtjSrMNPED4j9p/f6e806fbce947490a2bd1d08ab48d9ad/logo.png?q=90'
    )
    await expect(url).toHaveAttribute('content', 'https://ascd.org')
  })

  /** main logo */
  test('main logo', async ({ page, isMobile }) => {
    /** clicking on main logo navigates to home page */
    await page
      .getByTestId(`ascd-logo-${isMobile ? 'mobile' : 'desktop'}`)
      .click()
    /** except no navigation */
    await expect(page).toHaveURL('http://localhost:8080')
  })

  test('content exists', async ({ page }) => {
    /** smoke tests for existing content */
    await expect(page.getByTestId('home-page-content')).toBeVisible()
    /** this seems contingent on local storage, which has no normal way of being cleared */
    // await expect(page.getByTestId('index-merger-banner')).toBeVisible()
    // await expect(page.getByTestId('index-merger-banner')).toHaveText(
    //   'ASCD, ISTE unite to accelerate the future of learning.'
    // )
    await expect(page.getByTestId('index-home-banner')).toBeVisible()
    await expect(page.getByTestId('index-image-banner')).toBeVisible()
    await expect(page.getByTestId('index-latest-articles')).toBeVisible()
    await expect(page.getByTestId('index-topics')).toBeVisible()
    await expect(page.getByTestId('index-shop-books')).toBeVisible()
    await expect(page.getByTestId('index-membership')).toBeVisible()
    await expect(page.getByTestId('upcoming-events-index')).toBeVisible()
    await expect(page.getByTestId('index-subscribe-cta')).toBeVisible()
  })
})
