import type { ComputedRef, Ref } from 'vue'

type BreadcrumbItem = {
  name: string
  path: string
}

type SeoOptions = {
  title: string | Ref<string | undefined> | ComputedRef<string | undefined>
  description: string | Ref<string | undefined> | ComputedRef<string | undefined>
  path?: string | Ref<string | undefined> | ComputedRef<string | undefined>
  image?: string | Ref<string | undefined> | ComputedRef<string | undefined>
  type?: 'website' | 'article'
  breadcrumbs?: BreadcrumbItem[] | Ref<BreadcrumbItem[] | undefined> | ComputedRef<BreadcrumbItem[] | undefined>
  jsonLd?: unknown | Ref<unknown> | ComputedRef<unknown>
}

const DEFAULT_IMAGE = '/og-image.jpg'
const SITE_NAME = 'MSB Seth Portfolio'
const DEFAULT_SITE_URL = 'https://msbseth.com'

const joinSiteUrl = (baseUrl: string, path = '/') => {
  const cleanBaseUrl = baseUrl.replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  return `${cleanBaseUrl}${cleanPath}`
}

export const useSiteUrl = (path = '/') => {
  const config = useRuntimeConfig()
  return joinSiteUrl(String(config.public.siteUrl || DEFAULT_SITE_URL), path)
}

export const createBreadcrumbSchema = (items: BreadcrumbItem[], baseUrl = DEFAULT_SITE_URL) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: joinSiteUrl(baseUrl, item.path)
  }))
})

export const createWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: useSiteUrl('/'),
  inLanguage: 'en',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${useSiteUrl('/projects')}?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
})

export const createProjectSchema = (project: Record<string, any>, baseUrl = DEFAULT_SITE_URL) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  headline: project.title,
  description: project.description || project.desc,
  url: joinSiteUrl(baseUrl, `/projects/${project.slug}`),
  image: project.image || undefined,
  datePublished: project.date || undefined,
  creator: {
    '@type': 'Person',
    name: 'Meach Senbroseth',
    jobTitle: 'Full-Stack Developer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Phnom Penh',
      addressCountry: 'Cambodia'
    }
  },
  keywords: Array.isArray(project.technologies) ? project.technologies.join(', ') : undefined,
  programmingLanguage: project.technologies || undefined
})

export const useSEO = (options: SeoOptions) => {
  const route = useRoute()
  const config = useRuntimeConfig()
  const siteUrl = String(config.public.siteUrl || DEFAULT_SITE_URL)
  const title = computed(() => toValue(options.title) || 'Meach Senbroseth - Full-Stack Developer Cambodia')
  const description = computed(() => toValue(options.description) || 'Full-stack developer in Phnom Penh, Cambodia specializing in Laravel, Nuxt.js, Vue.js, and performance-focused web applications.')
  const path = computed(() => toValue(options.path) || route.path)
  const canonical = computed(() => joinSiteUrl(siteUrl, path.value))
  const image = computed(() => {
    const value = toValue(options.image) || DEFAULT_IMAGE
    return value.startsWith('http') ? value : joinSiteUrl(siteUrl, value)
  })

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogImage: image,
    ogType: options.type || 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: canonical
      }
    ],
    script: computed(() => {
      const schemas = []
      const breadcrumbs = toValue(options.breadcrumbs)
      const jsonLd = toValue(options.jsonLd)

      if (breadcrumbs?.length) schemas.push(createBreadcrumbSchema(breadcrumbs, siteUrl))
      if (jsonLd) schemas.push(jsonLd)

      return schemas.map((schema, index) => ({
        key: `json-ld-${path.value}-${index}`,
        type: 'application/ld+json',
        children: JSON.stringify(schema)
      }))
    })
  })
}
