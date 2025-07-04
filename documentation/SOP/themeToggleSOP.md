window-services-website/
├── app/
│   ├── [lang]/
│   │   └── layout.tsx (update)
│   ├── globals.css (update)
│   └── layout.tsx (update)
├── components/
│   ├── AboutUs.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx (update)
│   ├── FullscreenViewer.tsx
│   ├── Header.tsx (update)
│   ├── Hero.tsx
│   ├── ImageComparison.tsx
│   ├── ImageGallery.tsx
│   ├── LanguageSwitcher.tsx
│   ├── Services.tsx
│   ├── ThemeToggle.tsx (new)
│   └── ThemeProvider.tsx (new)
└── docs/
    └── ThemeImplementationSOP.md (new)


1. app/[lang]/layout.tsx and app/layout.tsx: Update to include the ThemeProvider component.
2. app/globals.css: Update to include theme-specific CSS variables.
3. components/Header.tsx and components/Footer.tsx: Update to include the ThemeToggle component.
4. components/ThemeToggle.tsx: New component for the theme toggle button.
5. components/ThemeProvider.tsx: New component to manage the theme state and provide it to the app.
6. Checklist of Pages and Components to Update:
- [x] components/Footer.tsx
- [x] components/Header.tsx
- [x] components/AboutUs.tsx
- [x] components/ContactForm.tsx
- [x] components/FullscreenViewer.tsx
- [x] components/ImageGallery.tsx
- [x] components/Hero.tsx
- [x] components/ImageComparison.tsx
- [x] components/LanguageSwitcher.tsx
- [ ] components/Services.tsx
- [ ] styles/theme.css (new)

