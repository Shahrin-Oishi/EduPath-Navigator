import { test, expect } from '@playwright/test'
import { randomUUID } from 'node:crypto'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
let account
test.beforeAll(async ({ request }) => {
  const response = await request.post('/api/auth/signup', { data: {
    name: 'Browser verification', email: `browser-${randomUUID()}@example.test`, password: randomUUID(),
  } })
  expect(response.status()).toBe(201)
  account = await response.json()
})
test.beforeEach(async ({ page }) => {
  await page.addInitScript(token => localStorage.setItem('edupath_token', token), account.token)
})
test.afterAll(async () => {
  if (!account?.user?._id) return
  require('../../backend/node_modules/dotenv').config({ path: '../backend/.env' })
  const mongoose = require('../../database/node_modules/mongoose')
  await mongoose.connect(process.env.MONGO_URI)
  try {
    for (const name of ['Chat', 'Progress']) await require(`../../database/models/${name}`).deleteMany({ userId: account.user._id })
    await require('../../database/models/User').deleteOne({ _id: account.user._id })
  } finally { await mongoose.disconnect() }
})

test('navbar search filters careers and survives refresh', async ({ page }) => {
  await page.goto('/dashboard')
  const search = page.getByRole('textbox', { name: 'Search roadmaps and skills' })
  await search.fill('React')
  await search.press('Enter')
  await expect(page).toHaveURL(/career-paths\?q=React/)
  await expect(page.locator('main').getByText('Web Development', { exact: true })).toBeVisible()
  await expect(page.locator('main').getByText('Cybersecurity', { exact: true })).toHaveCount(0)
  await page.reload()
  await expect(page.getByPlaceholder('Search career paths or skills...')).toHaveValue('React')
  await search.fill('Web Performance')
  const result = page.waitForResponse(response => response.url().includes('/api/roadmaps?q=Web') && response.ok())
  await search.press('Enter')
  await result
  await expect(page.locator('main').getByText('Web Development', { exact: true })).toBeVisible()
  await search.fill('no-such-career')
  await search.press('Enter')
  await expect(page.getByText('No career paths found')).toBeVisible()
})

test('notifications reflect progress, open its roadmap and persist read state', async ({ page, request }) => {
  const headers = { Authorization: `Bearer ${account.token}` }
  const response = await request.post('/api/progress/update', { headers, data: {
    roadmapId: 'web-development', skillId: 'html', completed: true, totalSkills: 20,
  } })
  expect(response.ok()).toBeTruthy()
  await page.goto('/dashboard')
  await page.getByRole('button', { name: 'Notifications', exact: true }).click()
  await expect(page.getByText('1 of 20 skills completed. 19 remaining.')).toBeVisible()
  await page.getByRole('link', { name: /Continue Web Development/ }).click()
  await expect(page).toHaveURL(/roadmap\/web-development/)
  const ids = await page.evaluate(id => JSON.parse(localStorage.getItem(`edupath_notifications_${id}`)), account.user._id)
  expect(ids.length).toBeGreaterThan(0)
})

test('AI failures are visible and executable HTML is displayed safely', async ({ page }) => {
  await page.route('**/api/ai/generate-roadmap', route => route.fulfill({ status: 503, json: { message: 'AI unavailable for verification' } }))
  await page.goto('/ai/generate')
  await page.getByPlaceholder(/I want to become a machine learning/).fill('Learn React')
  await page.getByRole('button', { name: 'Generate Roadmap' }).click()
  await expect(page.getByText('AI unavailable for verification')).toBeVisible()
  await page.route('**/api/ai/skill-analyze', route => route.fulfill({ status: 503, json: { message: 'Skill analysis unavailable for verification' } }))
  await page.goto('/ai/analyze')
  await page.getByPlaceholder(/I know HTML/).fill('Python and SQL')
  await page.getByRole('button', { name: 'Analyze My Skills' }).click()
  await expect(page.getByText('Skill analysis unavailable for verification')).toBeVisible()
  await page.route('**/api/ai/chat', route => route.fulfill({ json: { reply: '<img src=x onerror="window.xssExecuted=true">' } }))
  await page.goto('/ai/chat')
  await page.getByPlaceholder(/Ask EduBot anything/).fill('Explain HTML')
  await page.getByPlaceholder(/Ask EduBot anything/).press('Enter')
  await expect(page.getByText('<img src=x onerror="window.xssExecuted=true">', { exact: true })).toBeVisible()
  expect(await page.evaluate(() => window.xssExecuted)).toBeUndefined()
  await expect(page.getByRole('button', { name: 'Open AI Chat' })).toHaveCount(0)
})

test('mobile navigation, notification panel and chat fit a small screen', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 })
  await page.goto('/dashboard')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('link', { name: 'Career Paths', exact: true }).click()
  await expect(page).toHaveURL(/career-paths/)
  await page.getByRole('button', { name: 'Notifications', exact: true }).click()
  const notification = page.getByText('Notifications', { exact: true })
  await expect(notification).toBeVisible()
  const bounds = await notification.locator('..').locator('..').boundingBox()
  expect(bounds.x).toBeGreaterThanOrEqual(0)
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(320)
  await page.getByRole('button', { name: 'Notifications', exact: true }).click()
  await page.getByRole('button', { name: 'Open AI Chat' }).click()
  const input = page.getByPlaceholder('Ask me anything...')
  await expect(input).toBeVisible()
  const chat = await input.boundingBox()
  expect(chat.x).toBeGreaterThanOrEqual(0)
  expect(chat.x + chat.width).toBeLessThanOrEqual(320)
})

test('all main screens render on desktop and mobile without horizontal overflow', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  for (const viewport of [{ width: 1366, height: 768 }, { width: 375, height: 812 }]) {
    await page.setViewportSize(viewport)
    for (const path of ['/dashboard', '/career-paths', '/roadmap/web-development', '/ai/generate', '/ai/analyze', '/ai/chat', '/profile']) {
      await page.goto(path)
      await expect(page.locator('main')).toBeVisible()
      await expect(page.locator('main h1').first()).toBeVisible()
      const overflow = await page.locator('main').evaluate(element => element.scrollWidth - element.clientWidth)
      expect(overflow, `${path} at ${viewport.width}px`).toBeLessThanOrEqual(1)
    }
  }
  expect(errors).toEqual([])
})
