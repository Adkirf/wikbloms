# Quick Guide: Working with Internationalization

## Key Files & Locations
- `middleware.ts` - Handles language detection and routing
- `dictionaries/` - Contains translation files (en.json, es.json)
- `lib/i18n.ts` - Utility functions for translations
- `app/[lang]/` - Root directory for all pages with language parameter

## Adding New Translations
1. Add translation keys to language files in `dictionaries/`:
   - `en.json` for English
   - `es.json` for Spanish

## Using Translations in Components
1. Import the dictionary utility: 