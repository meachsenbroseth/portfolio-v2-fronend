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
    // Fonts are downloaded at build time and self-hosted, eliminating render-blocking CDN round-trips
    families: [
      {
        name: 'Google Sans Code',
        provider: 'google',
        weights: [400, 500, 700]
      },
      {
        name: 'Inter',
        provider: 'google',
        weights: [400, 500, 600, 700, 800, 900]
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
      // Fallback title so a page that sets its own SEO can never end up
      // with an empty <title>.
      title: 'Meach Senbroseth - Full-Stack Developer Cambodia',
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

        // Mobile Capability
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'MSB Seth' }
      ],
      link: [
        // Canonical URL
        { rel: 'canonical', href: `${siteUrl}/` },

        // Favicon & Manifest
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-0.png' },
        { rel: 'manifest', href: '/site.webmanifest' },

        // Safe DNS Prefetch when apiBase is configured
        ...(apiBase && apiBase.startsWith('http') ? [{ rel: 'dns-prefetch', href: new URL(apiBase).origin }] : [])
      ],
      htmlAttrs: {
        lang: 'en',
        dir: 'ltr'
      },
      bodyAttrs: {
        class: 'antialiased'
      },
      script: [
        // Progressive Enhancement: set 'js' class immediately so CSS animations activate progressively
        {
          innerHTML: "document.documentElement.classList.add('js');",
          type: 'text/javascript'
        },

        // Google Analytics
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-1DNM65TRNT',
          async: true
        },
        {
          innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-1DNM65TRNT');
        `,
          type: 'text/javascript'
        },

        // Schema JSON-LD
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Meach Senbroseth"
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
    disallow: ['/admin/'],
    sitemap: `${siteUrl}/sitemap.xml`
  },

  // Compression
  nitro: {
    compressPublicAssets: true,
    minify: true
  }
})
