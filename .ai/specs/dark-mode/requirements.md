# Requirements Document

## Introduction
Proyek ini mengimplementasikan fitur Dark Mode untuk aplikasi WPU Cafe POS. Tujuannya adalah menyediakan tema antarmuka gelap yang nyaman untuk mata dan menjaga estetika *bakery glassmorphism* dalam palet warna gelap (seperti *Dark Roast*).

## Glossary
- **Dark Mode**: Tema antarmuka dengan palet warna dominan gelap.
- **Glassmorphism**: Gaya desain yang meniru tampilan kaca tembus pandang (translucent).
- **CSS Variables**: Variabel yang didefinisikan dalam CSS untuk mengatur warna, jarak, dll secara global.

## Requirements

### Requirement 1: Dark Mode Toggle
User Story:
"As a user, I want to toggle between light and dark themes so that I can choose the appearance that is most comfortable for my eyes."

Acceptance Criteria:
1. THE `ThemeToggle` component SHALL be visible in the main application navigation/header.
2. WHEN the user clicks the `ThemeToggle`, THE application SHALL switch to the opposite theme (light to dark, or dark to light).
3. THE application SHALL reflect the chosen theme immediately without requiring a page reload.

### Requirement 2: Theme Persistence
User Story:
"As a user, I want my theme preference to be saved so that I don't have to change it every time I open the application."

Acceptance Criteria:
1. WHEN a theme is selected, THE system SHALL store the preference in `localStorage` under the key `theme`.
2. WHEN the application initializes, THE system SHALL read the `theme` key from `localStorage` and apply it.
3. IF no preference is found in `localStorage`, THE system SHALL fall back to the "light" theme.

### Requirement 3: Dark Mode Appearance
User Story:
"As a user, I want the dark mode to look visually appealing and maintain the glassmorphism and bakery aesthetic."

Acceptance Criteria:
1. WHEN the dark mode is active, THE `[data-theme="dark"]` attribute SHALL be applied to the `document.documentElement` (`<html>` tag).
2. THE dark theme SHALL redefine core color variables (`--color-bg-default`, `--color-text-primary`, `--color-surface`, dll.) to darker shades.
3. THE `glassmorphism` utility classes (backgrounds, borders) SHALL maintain adequate visibility and contrast against the dark background.
