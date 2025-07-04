window-services-website/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx (new file)
│   └── ui/
│       └── (potentially affected UI components)
├── lib/
│   └── utils.ts (potentially affected for translation helpers)
├── public/
│   └── locales/
│       ├── en.json
│       └── sv.json


1. components/Header.tsx: Needs to be adjusted for the current layout and translation logic.
2. components/Footer.tsx: Needs to be adjusted for the current layout and translation logic.
3. components/LanguageSwitcher.tsx: New component to be added to the Header.
4. app/[lang]/layout.tsx: May need updates to incorporate the new Header and Footer components.
5. public/locales/en.json and public/locales/sv.json: May need updates for new translation keys.
