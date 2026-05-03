// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@nuxtjs/sitemap'
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
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    }
  },
 app: {
    head: {
      title: 'MSB Seth - Portfolio',
      meta: [
        // Basic SEO
        { name: 'description', content: 'Professional full-stack developer specializing in TALL Stack, Nuxt.js, and Laravel. Building enterprise systems and high-performance web applications.' },
        { name: 'keywords', content: 'full-stack developer, web developer, TALL stack, Nuxt.js, Laravel, Vue.js, portfolio, Cambodia developer' },
        { name: 'author', content: 'Meach Senbroseth (Seth)' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'theme-color', content: '#131313' },
        { name: 'color-scheme', content: 'light' },
        { name: 'format-detection', content: 'telephone=no' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://msbseth.com/' },
        { property: 'og:title', content: 'MSB Seth - Full-Stack Developer Portfolio' },
        { property: 'og:description', content: 'Professional full-stack developer specializing in TALL Stack, Nuxt.js, and Laravel. Building enterprise systems and high-performance web applications.' },
        { property: 'og:image', content: 'https://msbseth.com/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:site_name', content: 'MSB Seth Portfolio' },
        { property: 'og:locale', content: 'en_US' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://msbseth.com/' },
        { name: 'twitter:title', content: 'MSB Seth - Full-Stack Developer Portfolio' },
        { name: 'twitter:description', content: 'Professional full-stack developer specializing in TALL Stack, Nuxt.js, and Laravel.' },
        { name: 'twitter:image', content: 'https://msbseth.com/og-image.jpg' },
        { name: 'twitter:site', content: '@msbseth' },
        { name: 'twitter:creator', content: '@msbseth' },
        
        // Robots
        { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'bingbot', content: 'index, follow' },
        
        // Verification (for search consoles)
        { name: 'google-site-verification', content: 'your-google-verification-code' },
        { name: 'msvalidate.01', content: 'your-bing-verification-code' },
        
        // Additional
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'MSB Seth' }
      ],
      link: [
        // Canonical URL
        { rel: 'canonical', href: 'https://msbseth.com/' },
        
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
        { rel: 'dns-prefetch', href: 'https://api.msbseth.com' },
        
        // Fonts
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap' },
        
        // RSS Feed (if you have blog)
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
            "url": "https://msbseth.com",
            "sameAs": [
              "https://github.com/msbseth",
              "https://linkedin.com/in/msbseth",
              "https://twitter.com/msbseth"
            ],
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
            "description": "Professional full-stack developer specializing in TALL Stack and Nuxt.js ecosystem. Building enterprise systems and high-performance web applications."
          })
        }
      ]
    }
  },
  
  // Generate sitemap
  sitemap: {
    enabled: true,
    urls: [
      '/',
      '/projects',
      '/about',
    ],
    exclude: ['/admin/**'],
    defaults: {
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString()
    }
  },
  
  // Robots.txt configuration
  robots: {
    UserAgent: '*',
    Allow: '/',
    Disallow: ['/admin/', '/api/'],
    Sitemap: 'https://msbseth.com/sitemap.xml'
  },
  
  // Compression
  nitro: {
    compressPublicAssets: true,
    minify: true
  }
})