# Flaticon Flat Icons Integration Plan

## Context

The app currently uses a mix of emojis, unicode symbols, and hand-drawn SVG icons. The user wants to replace these with **flat-looking icons** from Flaticon. After testing, Flaticon's CDN URLs are unreliable for direct embedding. 

**Recommendation:** Use **Lucide Icons** (https://lucide.dev) instead — ISC licensed, clean flat design, embeddable as inline SVGs with zero external dependencies. This matches the "flat looking" requirement perfectly and keeps the single-file architecture intact.

If the user prefers Flaticon specifically, we can download PNGs and base64-encode them, or serve them from a local `icons/` folder.

---

## Current Icon Inventory

| Location | Current Icon | Type |
|----------|-------------|------|
| Sidebar: Home | Inline SVG (house) | SVG |
| Sidebar: Breathe | Inline SVG (bullseye) | SVG |
| Sidebar: Habits | Inline SVG (checkbox) | SVG |
| Sidebar: Mood | Inline SVG (smiley) | SVG |
| Sidebar: Insights | Inline SVG (lightbulb) | SVG |
| Sidebar: History | Inline SVG (clock) | SVG |
| Sidebar: Settings | Inline SVG (sliders) | SVG |
| App logo | 🧘 emoji | Emoji |
| Greeting wave | 👋 emoji | Emoji |
| Notification bell | 🔔 emoji | Emoji |
| Tip of the day | 🌿 emoji | Emoji |
| Insights lightbulb | 💡 emoji | Emoji |
| Streak fire | 🔥 emoji | Emoji |
| Session complete | 🎉 emoji | Emoji |
| Start button | ▶ unicode | Symbol |
| Checkmark | ✓ unicode | Symbol |
| Close modal | × unicode | Symbol |
| Mood faces | 😢😕😐😊😄 emojis | Emoji |

---

## Feature Branches

### Branch 1: `feature/sidebar-icons`
**Scope:** Replace 7 sidebar navigation SVGs with Lucide flat icons

| Nav Item | Lucide Icon Name | Description |
|----------|-----------------|-------------|
| Home | `house` | Clean house outline |
| Breathe | `wind` | Air/wind symbol for breathing |
| Habits | `target` | Bullseye/target for goals |
| Mood | `smile` | Smiley face |
| Insights | `lightbulb` | Lightbulb idea icon |
| History | `clock` | Clock with hands |
| Settings | `settings-2` | Gear/cog icon |

**Changes:**
- Replace each inline SVG with the Lucide equivalent
- Keep existing CSS classes (`.icon`, `.nav-menu a`)
- No layout changes needed

---

### Branch 2: `feature/app-logo`
**Scope:** Replace 🧘 emoji in sidebar logo with a flat Lucide icon

| Element | Current | New (Lucide) |
|---------|---------|--------------|
| Logo icon | 🧘 emoji | `sparkles` or custom meditation SVG |

**Changes:**
- Replace emoji in `.logo-icon` div
- Adjust CSS for the icon container if needed

---

### Branch 3: `feature/utility-icons`
**Scope:** Replace utility emojis (bell, leaf, lightbulb, flame) with flat Lucide icons

| Location | Current | New (Lucide) |
|----------|---------|--------------|
| Notification bell | 🔔 | `bell` |
| Tip of the day | 🌿 | `leaf` |
| Insights card | 💡 | `lightbulb` |
| Streak display | 🔥 | `flame` |
| Session complete | 🎉 | `party-popper` or `sparkles` |

**Changes:**
- Replace emoji characters with inline SVGs
- Adjust sizing in CSS to match surrounding text
- Keep existing container styles (`.notification-btn`, `.insights-icon`, `.streak-days`)

---

### Branch 4: `feature/action-icons`
**Scope:** Replace unicode action symbols with flat Lucide icons

| Location | Current | New (Lucide) |
|----------|---------|--------------|
| Start button | ▶ | `play` |
| Checkmark | ✓ | `check` |
| Close modal | × | `x` |
| View insights → | → | `arrow-right` |
| Begin practice → | → | `arrow-right` |

**Changes:**
- Replace unicode characters with inline SVGs
- Adjust CSS sizing for button icons

---

### Branch 5: `feature/mood-emoji-display` (Optional)
**Scope:** Mood emojis (😢😕😐😊😄) — these work well as-is. Only change if user wants flat icon alternatives.

**Options:**
- Keep emojis (recommended — they're expressive and recognizable)
- Replace with flat face icons from Lucide: `frown`, `meh`, `smile`, `smile-plus`

---

## Implementation Approach

1. **Create feature branch** from `main`
2. **Make icon changes** — replace emoji/unicode with inline SVG
3. **Test locally** — open HTML in browser, verify icons render
4. **Commit and push** feature branch
5. **Wait for user approval** before merging to `main`

For each branch, the changes are isolated and don't affect other features.

---

## Icon Attribution (if using Lucide)

Lucide is ISC licensed. Attribution not required but appreciated:
```
Icons from Lucide (https://lucide.dev) — ISC License
```

---

## Next Steps

1. User reviews this plan
2. User confirms which branches to proceed with
3. User confirms Lucide vs Flaticon preference
4. Start with Branch 1 (sidebar-icons) as a demo
5. Iterate based on feedback
