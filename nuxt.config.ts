// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://msbseth.com').replace(/\/$/, '')
const apiBase = process.env.NUXT_PUBLIC_API_BASE || ''

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    exposeConfig: true
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },
  site: {
    url: siteUrl,
    name: 'MSB Seth Portfolio'
  },
  fonts: {
    families: [
      {
        name: 'Google Sans Code',
        provider: 'google',
        weights: [400, 500, 700]
      }
    ]
  },
  runtimeConfig: {
    public: {
      siteUrl,
      apiBase,
      githubUrl: process.env.PUBLIC_GITHUB_URL,
      linkedinUrl: process.env.PUBLIC_LINKEDIN_URL,
      telegramUrl: process.env.PUBLIC_TELEGRAM_URL,
      contactEmail: process.env.PUBLIC_CONTACT_EMAIL,
      youtubeUrl: process.env.PUBLIC_YOUTUBE_URL,
    }
  },
  app: {
    head: {
      titleTemplate: '%s',
      meta: [
        // Basic SEO
        { name: 'description', content: 'Hire Meach Senbroseth, a full-stack developer in Phnom Penh, Cambodia building Laravel, Nuxt.js, Vue, and high-performance web applications.' },
        { name: 'keywords', content: 'full-stack developer Cambodia, Nuxt.js developer, Laravel developer freelance, Vue.js developer Phnom Penh, web developer Cambodia' },
        { name: 'author', content: 'Meach Senbroseth (Seth)' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'theme-color', content: '#131313' },
        { name: 'color-scheme', content: 'light' },
        { name: 'format-detection', content: 'telephone=no' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${siteUrl}/` },
        { property: 'og:title', content: 'Meach Senbroseth - Full-Stack Developer Cambodia' },
        { property: 'og:description', content: 'Laravel, Nuxt.js, and Vue developer based in Phnom Penh, Cambodia for freelance and client web application work.' },
        { property: 'og:image', content: `${siteUrl}/og-image.jpg` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:site_name', content: 'MSB Seth Portfolio' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: `${siteUrl}/` },
        { name: 'twitter:title', content: 'Meach Senbroseth - Full-Stack Developer Cambodia' },
        { name: 'twitter:description', content: 'Freelance Laravel, Nuxt.js, and Vue developer based in Phnom Penh, Cambodia.' },
        { name: 'twitter:image', content: `${siteUrl}/og-image.jpg` },
        { name: 'twitter:site', content: '@msbseth' },
        { name: 'twitter:creator', content: '@msbseth' },

        // Robots
        { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'bingbot', content: 'index, follow' },

        // Additional
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'MSB Seth' }
      ],
      link: [
        // Canonical URL
        { rel: 'canonical', href: `${siteUrl}/` },

        // Favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },

        // Preconnect to important origins
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },

        // DNS Prefetch
        ...(apiBase ? [{ rel: 'dns-prefetch', href: new URL(apiBase).origin }] : []),

        // Fonts
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap' },

        // RSS Feed (enable when a blog feed exists)
        { rel: 'alternate', type: 'application/rss+xml', title: 'MSB Seth Blog', href: '/feed.xml' }
      ],
      htmlAttrs: {
        lang: 'en',
        dir: 'ltr'
      },
      bodyAttrs: {
        class: 'antialiased'
      },
      script: [
        // Structured Data / JSON-LD
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Meach Senbroseth",
            "alternateName": "Seth",
            "url": siteUrl,
            "sameAs": [
              process.env.PUBLIC_GITHUB_URL,
              process.env.PUBLIC_LINKEDIN_URL,
              process.env.PUBLIC_TELEGRAM_URL
            ].filter(Boolean),
            "jobTitle": "Full-Stack Developer",
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Phnom Penh",
              "addressCountry": "Cambodia"
            },
            "knowsAbout": ["Laravel", "Nuxt.js", "Vue.js", "Tailwind CSS", "PostgreSQL", "PHP", "JavaScript"],
            "description": "Full-stack developer in Phnom Penh, Cambodia specializing in Laravel, Nuxt.js, Vue.js, and high-performance web applications."
          })
        }
      ]
    }
  },

  // Generate sitemap
  sitemap: {
    siteUrl,
    enabled: true,
    sources: ['/api/__sitemap__/urls'],
    exclude: ['/admin/**'],
    defaults: {
      changefreq: 'weekly',
      priority: 0.7
    }
  },

  // Robots.txt configuration
  robots: {
    allow: '/',
    disallow: ['/admin/', '/api/'],
    sitemap: `${siteUrl}/sitemap.xml`
  },

  // Compression
  nitro: {
    compressPublicAssets: true,
    minify: true
  }
})
