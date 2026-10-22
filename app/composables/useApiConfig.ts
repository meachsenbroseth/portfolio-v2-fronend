type PublicApiConfig = {
  apiBase: string
  siteUrl: string
}

let cached: PublicApiConfig | null = null

/**
 * Resolve the public runtime config once and reuse it.
 *
 * `useRuntimeConfig()` may only be called while the Nuxt app context is
 * active. Reading it from a lazily evaluated computed — for example one that
 * re-evaluates once the async data resolves — throws
 * "[nuxt] instance unavailable" and turns the whole page into a 500.
 *
 * The public runtime config is identical for every request, so caching it
 * after the first successful read is safe.
 */
export const useApiConfig = (): PublicApiConfig => {
  if (cached) return cached

  try {
    const config = useRuntimeConfig()

    cached = {
      apiBase: String(config.public.apiBase || ''),
      siteUrl: String(config.public.siteUrl || ''),
    }
  } catch {
    // No Nuxt context available. The result is deliberately not cached so a
    // later call from a valid context can still resolve the real config.
    return { apiBase: '', siteUrl: '' }
  }

  return cached
}
