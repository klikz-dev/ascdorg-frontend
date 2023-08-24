import { test, expect } from '@playwright/test'

test.describe('Affiliates all page test', () => {
  test.beforeEach(async ({ page }) => {
    /** abort image loading */
    await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => route.abort())
    /** Go to the starting url before each test. */
    await page.goto('http://localhost:8080/affiliates/all')
  })

  test('content exist', async ({ page }) => {
    await expect(page.getByTestId('banner')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Africa' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Asia' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Canada' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Caribbean' })).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Central & South America' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'United States' })
    ).toBeVisible()
  })

  test('Ghana Button', async ({ page }) => {
    await page.getByRole('button', { name: 'Ghana Ghana' }).click()
    await expect(
      page.getByRole('heading', { name: 'Ghana ASCD' })
    ).toBeVisible()
    await expect(
      page.getByText(
        'Ghana ASCD facilitates professional learning for new and veteran teachers across'
      )
    ).toBeVisible()
    await expect(
      page.getByText(
        'ContactCharles Badu Yeboah dryeboahics@gmail.com Website https://ghascd.org/ Fac'
      )
    ).toBeVisible()
  })

  test('Kenya Button', async ({ page }) => {
    await page.getByRole('button', { name: 'Kenya - Thumbnail Kenya' }).click()
    await expect(
      page.getByRole('heading', { name: 'Kenya ASCD' })
    ).toBeVisible()
    await expect(
      page.getByText('ContactJoseph Mwaura ascdkenya2016@gmail.com')
    ).toBeVisible()
  })

  test('Singapore Button', async ({ page }) => {
    await page.getByRole('button', { name: 'Singapore Singapore' }).click()
    await expect(
      page.getByRole('heading', { name: 'Singapore ASCD' })
    ).toBeVisible()
    await expect(
      page.getByText(
        'ContactKoshu Lulla koshu@work-solutions.com Website www.ascdsingapore.org Facebo'
      )
    ).toBeVisible()
  })

  test('China Button', async ({ page }) => {
    await page.getByRole('button', { name: 'China - Thumbnail China' }).click()
    await expect(
      page.getByRole('heading', { name: 'China ASCD' })
    ).toBeVisible()
    await expect(
      page.getByText('ContactJian Wang Jian.wang5718@gmail.com')
    ).toBeVisible()
  })

  test('Pakistan Button', async ({ page }) => {
    await page
      .getByRole('button', { name: 'Pakistan - Thumbnail Pakistan' })
      .click()
    await expect(
      page.getByRole('heading', { name: 'Pakistan ASCD' })
    ).toBeVisible()
    await expect(
      page.getByText(
        'ContactUmair Qureshi engrumair78@gmail.com Website www.pakistanascd.org Facebook'
      )
    ).toBeVisible()
  })

  test('View more button and view less button', async ({ page }) => {
    await page.getByRole('button', { name: 'Alabama Alabama' }).click()
    await expect(
      page.getByRole('heading', { name: 'Alabama ASCD' })
    ).toBeVisible()
    await expect(
      page.getByText(
        'ContactJane Cobia cobiajane@gmail.com Website www.alabamaascd.org Twitter @Alaba'
      )
    ).toBeVisible()
    await page.getByRole('button', { name: 'Close modal button' }).click()
    await expect(
      page.getByText(
        'ContactJane Cobia cobiajane@gmail.com Website www.alabamaascd.org Twitter @Alaba'
      )
    ).not.toBeVisible()
    await page
      .getByRole('button', { name: 'View more expand more icon' })
      .click()
    await expect(
      page.getByRole('button', { name: 'Wyoming - Thumbnail Wyoming' })
    ).toBeVisible()
    await page
      .getByRole('button', { name: 'Wyoming - Thumbnail Wyoming' })
      .click()
    await expect(
      page.getByRole('heading', { name: 'Wyoming ASCD' })
    ).toBeVisible()
    await expect(
      page.getByText(
        'ContactR J Kost kostfmly@tritel.net Facebook https://www.facebook.com/groups/185'
      )
    ).toBeVisible()
    await page.getByRole('button', { name: 'Close modal button' }).click()
    await expect(
      page.getByRole('button', { name: 'Wyoming - Thumbnail Wyoming' })
    ).toBeVisible()
    await page.getByRole('button', { name: 'View less' }).click()
    await expect(
      page.getByRole('button', { name: 'Wyoming - Thumbnail Wyoming' })
    ).not.toBeVisible()
  })
})
