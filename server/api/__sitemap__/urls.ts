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

const extractProjects = (response: any) => {
  const payload = response?.data ?? response
  const paginator = payload?.data?.data ? payload.data : payload
  const items = paginator?.data ?? (Array.isArray(payload) ? payload : [])

  return Array.isArray(items) ? items : []
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
    const response = await $fetch(`${config.public.apiBase}/projects`)
    const projects = extractProjects(response)

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
