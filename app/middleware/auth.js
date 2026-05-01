export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
 
  // On server-side rendering there's no localStorage — skip
  if (import.meta.server) return
 
  // Wait for initAuth() to finish if the plugin hasn't completed yet
  // (can happen on hard refresh before plugin resolves)
  if (!authStore.initialized) {
    await authStore.initAuth()
  }
 
  // Now check if actually authenticated
  if (!authStore.token) {
    return navigateTo('/admin/login')
  }
})