import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = 'file://' + path.resolve(__dirname, '..', 'still_breathing_app.html');

test.beforeEach(async ({ page }) => {
  await page.goto(BASE);
});

// ── Navigation ──
test('Home page loads with greeting and date', async ({ page }) => {
  await expect(page.locator('#greeting')).toContainText('Good');
  await expect(page.locator('#dateDisplay')).not.toBeEmpty();
});

test('Sidebar nav switches pages', async ({ page }) => {
  await expect(page.locator('.page.active')).toHaveId('home');
  await page.locator('.nav-menu a[data-page="breathe"]').click();
  await expect(page.locator('.page.active')).toHaveId('breathe');
  await expect(page.locator('#breathe h2')).toContainText('Breathe');
  await page.locator('.nav-menu a[data-page="mood"]').click();
  await expect(page.locator('.page.active')).toHaveId('mood');
  await page.locator('.nav-menu a[data-page="home"]').click();
  await expect(page.locator('.page.active')).toHaveId('home');
});

// ── Hero / Breathing Card ──
test('Breathing ring with meditation logo is visible', async ({ page }) => {
  await expect(page.locator('#breathingRing')).toBeVisible();
  await expect(page.locator('.meditation-illustration')).toBeVisible();
});

test('Start session button opens modal', async ({ page }) => {
  await page.locator('.start-btn').click();
  await expect(page.locator('#sessionModal')).toHaveClass(/active/);
});

test('Breathing info shows 4-7-8 pattern by default', async ({ page }) => {
  await expect(page.locator('.breathing-card h3')).toContainText('4-7-8 Breathing');
  await expect(page.locator('.timer-box')).toHaveCount(3);
});

// ── Progress ──
test('Progress ring shows session count and goal', async ({ page }) => {
  await expect(page.locator('#todaySessions')).toBeVisible();
  await expect(page.locator('#dailyGoal')).toBeVisible();
});

test('Progress message is displayed', async ({ page }) => {
  await expect(page.locator('#progressMessage')).toBeVisible();
});

// ── Mood ──
test('Mood emoji buttons render on home card', async ({ page }) => {
  const moods = page.locator('#home .mood-emojis .mood-emoji');
  await expect(moods).toHaveCount(5);
});

test('Mood emoji buttons render on mood page', async ({ page }) => {
  await page.locator('.nav-menu a[data-page="mood"]').click();
  const moods = page.locator('#mood .mood-emojis .mood-emoji');
  await expect(moods).toHaveCount(5);
});

test('Home mood note input exists', async ({ page }) => {
  await expect(page.locator('#moodNote')).toBeVisible();
});

test('Can select mood and save from home', async ({ page }) => {
  await page.locator('.mood-emojis .mood-emoji').nth(3).click();
  await expect(page.locator('.mood-emojis .mood-emoji.selected')).toHaveCount(1);
  await page.locator('#moodNote').fill('Testing note');
  page.on('dialog', dialog => dialog.accept());
  await page.locator('#home .save-btn').click();
});

test('Can save mood from mood page with note', async ({ page }) => {
  await page.locator('.nav-menu a[data-page="mood"]').click();
  await page.locator('#mood .mood-emojis .mood-emoji').nth(4).click();
  await page.locator('#moodPageNote').fill('Great session');
  page.on('dialog', dialog => dialog.accept());
  await page.locator('#mood .save-btn').click();
});

// ── Habit streak ──
test('Streak count is visible', async ({ page }) => {
  await expect(page.locator('#streakCount')).toBeVisible();
});

test('Streak week renders 7 day cells', async ({ page }) => {
  const days = page.locator('#streakWeek .streak-day');
  await expect(days).toHaveCount(7);
});

// ── Charts ──
test('Week chart renders bar columns', async ({ page }) => {
  const bars = page.locator('#weekChart .week-bar');
  await expect(bars).toHaveCount(7);
});

test('Chart shows bar labels', async ({ page }) => {
  const labels = page.locator('#weekChart .bar-label');
  await expect(labels).toHaveCount(7);
});

test('Chart shows bar values', async ({ page }) => {
  const values = page.locator('#weekChart .bar-value');
  await expect(values).toHaveCount(7);
});

// ── Breathe page ──
test('Breathe page shows practice cards', async ({ page }) => {
  await page.locator('.nav-menu a[data-page="breathe"]').click();
  const cards = page.locator('#breathPractices .practice-card');
  await expect(cards).toHaveCount(4);
});

// ── Settings ──
test('Settings page has name input', async ({ page }) => {
  await page.locator('.nav-menu a[data-page="settings"]').click();
  await expect(page.locator('#userName')).toBeVisible();
});

test('Settings page has goal and practice selects', async ({ page }) => {
  await page.locator('.nav-menu a[data-page="settings"]').click();
  await expect(page.locator('#settingsDailyGoal')).toBeVisible();
  await expect(page.locator('#defaultPractice')).toBeVisible();
});

// ── Insights page ──
test('Insights page has weekly sessions count', async ({ page }) => {
  await page.locator('.nav-menu a[data-page="insights"]').click();
  await expect(page.locator('#weeklySessions')).toBeVisible();
});

test('Insights page has total practice time', async ({ page }) => {
  await page.locator('.nav-menu a[data-page="insights"]').click();
  await expect(page.locator('#totalPracticeTime')).toBeVisible();
});

test('Insights page has practice mood insight section', async ({ page }) => {
  await page.locator('.nav-menu a[data-page="insights"]').click();
  await expect(page.locator('#practiceMoodInsight')).toBeVisible();
});

test('Insights page renders week chart', async ({ page }) => {
  await page.locator('.nav-menu a[data-page="insights"]').click();
  const bars = page.locator('#insightsWeekChart .week-bar');
  await expect(bars).toHaveCount(7);
});

// ── LocalStorage ──
test('Data persists across page reload', async ({ page }) => {
  await page.evaluate(() => {
    const data = {
      sessions: [{ startTime: new Date().toISOString(), duration: 5 }],
      moodCheckins: [],
      dailyGoal: 5,
      defaultPractice: '4-7-8',
      currentUser: ''
    };
    localStorage.setItem('stillAppState', JSON.stringify(data));
  });
  await page.reload();
  await expect(page.locator('#todaySessions')).toHaveText('1');
});

// ── Mobile ──
test('Mobile viewport hides sidebar', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator('.sidebar')).toHaveCSS('display', 'none');
});

// ── Session Modal ──
test('Session modal shows breathing pattern name', async ({ page }) => {
  await page.locator('.start-btn').click();
  await expect(page.locator('#sessionTitle')).toContainText('Breathing');
});

test('Session modal shows phase text and countdown', async ({ page }) => {
  await page.locator('.start-btn').click();
  await expect(page.locator('#phaseText')).toBeVisible();
  await expect(page.locator('#countdown')).toBeVisible();
});

test('Session modal can be closed', async ({ page }) => {
  await page.locator('.start-btn').click();
  await expect(page.locator('#sessionModal')).toHaveClass(/active/);
  await page.locator('#sessionModal .close-btn').click();
  await expect(page.locator('#sessionModal')).not.toHaveClass(/active/);
});
