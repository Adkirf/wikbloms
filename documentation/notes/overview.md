# Description
Website for Prietos Kompaniet, a window renovation company in Sweden. The website has mulitlanguage support for english, spanish and swedish, is built with Next.js 14, uses the app router and gives the user information about the company, its services, projects and contact information.

# Project Structure
** General ** 
- Use next.js version 14 app router
- Use shadcn/ui components wherever possible
- Use globals.css variables whereever possible
- Use tailwind css for styling
- Use existing code wherever possible

** Pages **
- app/layout app metadata and language routing
- app/[lang]/layout.tsx app layout, Context Providers, directories with english, spanish and swedish (default)
- app/[lang]/page.tsx landing page
- app/[lang]/about/page.tsx about page
- app/[lang]/projects/page.tsx projects-gallerypage
- app/[lang]/contact/page.tsx contact-formular page

** Utilities ** 
- internationalization: middleware.ts, app/[lang]/dictionaries.ts, app/layout.tsx
- types/video.d.ts: video type
