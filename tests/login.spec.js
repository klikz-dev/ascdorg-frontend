import { test, expect } from '@playwright/test'

/**
 * use test.describe with an anonymous callback to
 * use test.skip to skip a test
 * use test.only to only run a single test
 * use test.slow() to triple the default timeout for slow tests
 */

test.describe('login tests', () => {
  test.beforeEach(async ({ page }) => {
    /** abort image loading */
    await page.route('**/*.{png,jpg,jpeg,webp,svg}', (route) => route.abort())
    /** Go to the starting url before each test. */
    await page.goto('http://localhost:8080')
  })

  /** login */
  test('login/signout', async ({ page, context }) => {
    /** click the login button */
    await page.getByTestId('login-button-button').click()

    /** fill out the forms */
    await page.getByRole('textbox', { name: 'Username' }).click()
    await page
      .getByRole('textbox', { name: 'Username' })
      .fill(process.env.OKTA_TEST_USERNAME)

    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByRole('textbox', { name: 'Password' }).click()
    await page
      .getByRole('textbox', { name: 'Password' })
      .fill(process.env.OKTA_TEST_PASSWORD)

    await page.getByRole('button', { name: 'Verify' }).click()

    await expect(page).toHaveURL('http://localhost:8080')

    /** click the profile button */
    await page.getByTestId('profile-button').click()

    /** expect the name to be populated correctly */
    await expect(page.getByTestId('account-username')).toHaveText('Okta Test')

    /** expect the login button to no longer be visible */
    expect(await page.getByTestId('login-button-button').count()).toEqual(0)

    /** Capture storage state after login */
    const storageState = await context.storageState()

    /** Check if expected local storage item exists */

    expect(
      JSON.parse(
        storageState.origins[0].localStorage.find(
          (item) => item.name === 'okta-token-storage'
        )?.value
      ).accessToken
    ).toBeTruthy()

    /** click the log out button */
    await page.getByTestId('account-sign-out').click()

    /** expect the login button to be visible */
    await expect(page.getByTestId('login-button')).toBeVisible()
    /** expect the profile button to not be visible */
    expect(await page.getByTestId('profile-button').count()).toEqual(0)

    /** Capture storage state after logout */
    const storageStateAfter = await context.storageState()

    /** Check that the item no longer exists */
    expect(
      JSON.parse(
        storageStateAfter.origins[0].localStorage.find(
          (item) => item.name === 'okta-token-storage'
        )?.value
      )?.accessToken
    ).toBeUndefined()
  })

  test('reset password', async ({ page, browserName }) => {
    /** click the login button */
    /** @todo: there seems to be an issue with the emulated browser with clicking the reset password.  Not sure why. */
    test.skip(
      ['webkit', 'mobile-safari'].includes(browserName),
      '@todo: the reset password window never appears for these browsers in the last step of the test'
    )
    await page.getByTestId('login-button').click()

    /** fill out the forms */
    await page.getByRole('textbox', { name: 'Username' }).click()
    await page
      .getByRole('textbox', { name: 'Username' })
      .fill(process.env.OKTA_TEST_USERNAME)

    await page.getByRole('button', { name: 'Next' }).click()

    await page.getByRole('textbox', { name: 'Password' }).click()
    await page
      .getByRole('textbox', { name: 'Password' })
      .fill(process.env.OKTA_TEST_PASSWORD)

    await page.getByRole('button', { name: 'Verify' }).click()

    await expect(page).toHaveURL('http://localhost:8080')

    /** click the profile button */
    await page.getByTestId('profile-button').click()

    /** click the reset password button */
    await page.getByTestId('account-reset-password').click()

    /** fill out the forms */
    await page
      .getByRole('textbox', { name: 'Username' })
      .fill(process.env.OKTA_TEST_USERNAME)

    await page.getByRole('button', { name: 'Next' }).click()

    /** click the cancel button (we dont actually want to reset the pw rigt now) */
    await page.getByRole('link', { name: 'Back to sign in' }).click()
  })
})
