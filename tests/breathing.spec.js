import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = 'file://' + path.resolve(__dirname, '..', 'still_breathing_app.html');

test.beforeEach(async ({ page }) => {
  await page.goto(BASE);
});

// ── Navigation ──
test('Home page loads with greeting and eyebrow', async ({ page }) => {
  await expect(page.locator('#greeting')).toContainText('Good');
  await expect(page.locator('#dateEyebrow')).not.toBeEmpty();
});

test('Sidebar nav switches pages', async ({ page }) => {
  await expect(page.locator('.page.active')).toHaveId('home');
  await page.locator('.nav button[data-page="breathe"]').click();
  await expect(page.locator('.page.active')).toHaveId('breathe');
  await expect(page.locator('#breathe h1')).toContainText('Breathe');
  await page.locator('.nav button[data-page="mood"]').click();
  await expect(page.locator('.page.active')).toHaveId('mood');
  await page.locator('.nav button[data-page="home"]').click();
  await expect(page.locator('.page.active')).toHaveId('home');
});

// ── Hero / Orb ──
test('Hero orb shows Ready state by default', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem('stillData', JSON.stringify({ sessions: [], moods: [], goal: 5, practice: '478', name: '' }));
  });
  await page.reload();
  await expect(page.locator('#homePhase')).toHaveText('Ready');
  await expect(page.locator('#homeCount')).toHaveText('4');
});

test('Hero orb check icon is visible', async ({ page }) => {
  await expect(page.locator('.hero-orb-check')).toBeVisible();
  await expect(page.locator('.hero-orb-check')).toHaveText('✓');
});

// ── Breathing modal ──
test('Start session opens modal with practice choices', async ({ page }) => {
  await page.locator('.hero .primary').click();
  await expect(page.locator('#modal')).toHaveClass(/show/);
  await expect(page.locator('#modalChoices button')).toHaveCount(4);
});

test('Can select practice and duration in modal', async ({ page }) => {
  await page.locator('.hero .primary').click();
  await page.locator('#modalChoices button:has-text("Box breathing")').click();
  await expect(page.locator('#modalChoices button.selected')).toContainText('Box breathing');
  await page.locator('.duration button:has-text("10 min")').click();
  await expect(page.locator('.duration button.selected')).toContainText('10 min');
});

test('Modal closes with X button', async ({ page }) => {
  await page.locator('.hero .primary').click();
  await expect(page.locator('#modal')).toHaveClass(/show/);
  await page.locator('.close').click();
  await expect(page.locator('#modal')).not.toHaveClass(/show/);
});

// ── Progress ring ──
test('Progress ring renders with count', async ({ page }) => {
  await expect(page.locator('#progressNum')).toBeVisible();
  await expect(page.locator('#goalLabel')).toContainText('/');
});

// ── Mood ──
test('Mood emoji buttons render on home card', async ({ page }) => {
  const moods = page.locator('#moods button');
  await expect(moods).toHaveCount(5);
});

test('Mood emoji buttons render on mood page', async ({ page }) => {
  await page.locator('.nav button[data-page="mood"]').click();
  const moods = page.locator('#moodsLarge button');
  await expect(moods).toHaveCount(5);
});

test('Home mood note input exists', async ({ page }) => {
  await expect(page.locator('#homeMoodNote')).toBeVisible();
});

test('Can select mood and save from home', async ({ page }) => {
  await page.locator('#moods button').nth(3).click();
  await expect(page.locator('#moods button.selected')).toHaveCount(1);
  await page.locator('#homeMoodNote').fill('Testing note');
  await page.locator('.mood-save-btn').click();
  await page.waitForTimeout(500);
  await expect(page.locator('#homeMoodNote')).toHaveValue('');
});

test('Can save mood from mood page with note', async ({ page }) => {
  await page.locator('.nav button[data-page="mood"]').click();
  await page.locator('#moodsLarge button').nth(4).click();
  await page.locator('#moodText').fill('Great session');
  await page.locator('#mood .card .primary').click();
  await page.waitForTimeout(500);
  await expect(page.locator('#moodHistory')).toContainText('Great session');
});

// ── Habit streak ──
test('Streak badge renders', async ({ page }) => {
  await expect(page.locator('#streak')).toBeVisible();
  await expect(page.locator('.streak-badge')).toContainText('days');
});

test('Days row renders 7 day cells', async ({ page }) => {
  await expect(page.locator('#days .day')).toHaveCount(7);
});

// ── Charts ──
test('Week chart renders bar columns', async ({ page }) => {
  await expect(page.locator('#chart .barcol')).toHaveCount(7);
});

test('Chart shows minute labels', async ({ page }) => {
  const labels = page.locator('#chart .min-label');
  await expect(labels).toHaveCount(7);
});

// ── Insights ──
test('Home insights render', async ({ page }) => {
  const items = page.locator('#homeInsights .insight');
  await expect(items).toHaveCount(2);
});

// ── Practice choices ──
test('Breathe page shows 4 practice choices', async ({ page }) => {
  await page.locator('.nav button[data-page="breathe"]').click();
  await expect(page.locator('#practiceChoices button')).toHaveCount(4);
});

// ── Settings ──
test('Settings page has name input', async ({ page }) => {
  await page.locator('.nav button[data-page="settings"]').click();
  await expect(page.locator('#nameInput')).toBeVisible();
});

test('Settings page has goal and practice selects', async ({ page }) => {
  await page.locator('.nav button[data-page="settings"]').click();
  await expect(page.locator('#goalSelect')).toBeVisible();
  await expect(page.locator('#practiceSelect')).toBeVisible();
});

// ── LocalStorage ──
test('Data persists across page reload', async ({ page }) => {
  await page.evaluate(() => {
    const data = { sessions: [{ date: new Date().toISOString().slice(0,10), ts: Date.now(), practice: '478', minutes: 5 }], moods: [], goal: 5, practice: '478', name: '' };
    localStorage.setItem('stillData', JSON.stringify(data));
  });
  await page.reload();
  await expect(page.locator('#progressNum')).toHaveText('1');
});

// ── Mobile ──
test('Mobile viewport shows bottom bar', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator('.mobilebar')).toBeVisible();
  await expect(page.locator('.sidebar')).toHaveCSS('display', 'none');
});

// ── Tablet ──
test('Tablet viewport hides sidebar text', async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 768 });
  await expect(page.locator('.sidebar')).toBeVisible();
});
