export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  if (import.meta.server) return
  
  // Initialize auth if not done yet
  if (!authStore.initialized) {
    await authStore.initAuth()
  }
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/admin/login')
  }
  
  // Check if user is admin
  if (!authStore.isAdmin) {
    return navigateTo('/')
  }
  
  // User is admin, allow access
  return
})
