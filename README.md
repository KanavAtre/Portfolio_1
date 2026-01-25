# Portfolio

A personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and MDX.

## Features

- **Next.js 14** with Pages Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MDX** for project content
- **Framer Motion** for animations
- **next-sitemap** for SEO

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── content/
│   └── projects/          # MDX project files
├── public/
│   └── resume.pdf         # Your resume (add this file)
├── src/
│   ├── components/        # React components
│   ├── lib/               # Utility functions
│   ├── pages/             # Next.js pages
│   └── styles/            # Global styles
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Adding Projects

Create a new `.mdx` file in `content/projects/`:

```mdx
---
title: "Project Title"
description: "Short description"
date: "2025-01-01"
tags: ["tag1", "tag2"]
image: "https://example.com/image.jpg"
github: "https://github.com/..."
demo: "https://..."
featured: true
---

Your project content in Markdown...
```

## Customization

1. Update personal info in pages (`index.tsx`, `about.tsx`, `resume.tsx`)
2. Update social links in `Footer.tsx`
3. Add your resume PDF to `public/resume.pdf`
4. Update colors in `tailwind.config.ts`
5. Update site URL in `next-sitemap.config.js`

## Deployment

Deploy to Vercel:

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## License

MIT
