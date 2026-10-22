const staticRoutes = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: 1
  },
  {
    loc: '/projects',
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    loc: '/about',
    changefreq: 'monthly',
    priority: 0.8
  }
]

// The sitemap is generated during the build. If the API is slow the build
// must not hang, and if it is down the build must not fail — in both cases we
// fall back to the static routes only.
const API_TIMEOUT_MS = 8000
// Overall budget for the whole source. Even with several slow pages the
// build can never stall for more than this.
const TOTAL_BUDGET_MS = 15000
// Never walk more pages than this, so a misbehaving API can never turn the
// build into an endless loop.
const MAX_PAGES = 20

const extractProjects = (response: any) => {
  // Laravel returns a paginator: { current_page, data: [...], last_page }.
  // The paginator can be the response itself or wrapped in `data`, so find
  // the object that actually carries the meta data.
  const candidates = [response, response?.data, response?.data?.data]
  const paginator =
    candidates.find(
      (candidate: any) =>
        candidate &&
        !Array.isArray(candidate) &&
        (candidate.current_page !== undefined || candidate.last_page !== undefined)
    ) ?? null

  if (Array.isArray(paginator?.data)) return paginator.data
  if (Array.isArray(response?.data)) return response.data
  if (Array.isArray(response)) return response

  return []
}

const extractLastPage = (response: any) => {
  const candidates = [response, response?.data, response?.data?.data]
  const paginator = candidates.find(
    (candidate: any) =>
      candidate &&
      !Array.isArray(candidate) &&
      (candidate.current_page !== undefined || candidate.last_page !== undefined)
  )

  return Number(paginator?.last_page) || 1
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const now = new Date().toISOString()
  const routes = staticRoutes.map((route) => ({
    ...route,
    lastmod: now
  }))

  if (!config.public.apiBase) return routes

  try {
    const projects: any[] = []
    const deadline = Date.now() + TOTAL_BUDGET_MS
    let page = 1
    let lastPage = 1

    // The collection endpoint is paginated — walking the pages makes sure
    // projects beyond the first page end up in the sitemap too.
    while (page <= Math.min(lastPage, MAX_PAGES)) {
      const remaining = deadline - Date.now()
      if (remaining <= 0) break

      const response = await $fetch(`${config.public.apiBase}/projects?page=${page}`, {
        timeout: Math.min(API_TIMEOUT_MS, remaining)
      })

      const items = extractProjects(response)
      if (items.length === 0) break

      projects.push(...items)
      lastPage = extractLastPage(response)
      page += 1
    }

    return [
      ...routes,
      ...projects
        .filter((project: any) => project?.slug)
        .map((project: any) => ({
          loc: `/projects/${project.slug}`,
          lastmod: project.updated_at || project.created_at || project.date || now,
          changefreq: 'monthly',
          priority: 0.75
        }))
    ]
  } catch {
    return routes
  }
})
