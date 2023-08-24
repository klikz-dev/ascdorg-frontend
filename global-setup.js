import { chromium } from '@playwright/test'

async function globalSetup(config) {
  const { storageState } = config.projects[0].use
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:8080')
  await page.getByRole('button', { name: 'Accept All' }).click()
  await page.context().storageState({ path: storageState })
  await browser.close()
}

export default globalSetup
