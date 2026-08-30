name: Breathing Exercise App
version: 1.0.0

description: A modern breathing exercise app with habit tracking and mood tracking
platforms:
  - Web (desktop and mobile)
  - Mobile app (iOS/Android) - Future feature

features:
  implemented:
    - Four breathing techniques (4-7-8, Box, 4-6 Relax, 5-5 Coherent)
    - Animated breathing guide with visual timer
    - Daily habit tracking with streaks
    - Weekly progress charts
    - Mood tracking with emoji selector
    - Session history and insights
    - Responsive design (mobile, tablet, desktop)
    - LocalStorage data persistence
  
  planned:
    - Additional breathing techniques (Relaxation, Focus, Sleep/Recover)
    - Audio cues for breathing sessions
    - Dark/light mode toggle
    - Data export functionality
    - Custom duration + cycle timing
    - Mobile app (PWA)

tech_stack:
  - Frontend: HTML5, CSS3 with CSS Grid/Flexbox
  - JavaScript: Vanilla (ES6+)
  - State management: LocalStorage
  - Testing: Playwright
  - Design: Clean, modern, accessible

mobile_compatibility:
  - Viewport meta tag included
  - Breakpoints at 1000px (tablet) and 720px (mobile)
  - Touch-friendly buttons
  - Mobile sidebar navigation

accessibility:
  - Semantic HTML5 structure
  - ARIA labels where needed
  - High contrast colors
  - Keyboard navigation support

styling:
  - CSS variables for theme colors
  - Soft gradients and shadows
  - Modern typography (Inter font)
  - Smooth animations

next_steps:
  1. Implement additional breathing techniques from FEATURE_PLAN.md
  2. Add audio cue functionality
  3. Implement dark/light mode toggle
  4. Add data export/reset functionality
  5. Convert to Progressive Web App (PWA)
  6. Add mobile app considerations

https://github.com/user/breathing-app
