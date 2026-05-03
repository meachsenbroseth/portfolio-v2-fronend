export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  
  // Initialize auth if not done
  if (!authStore.initialized) {
    await authStore.initAuth()
  }
  
  // Check if route is in admin section
  if (to.path.startsWith('/admin')) {
    // Skip login page
    if (to.path === '/admin/login') return
    
    // Redirect to login if not authenticated
    if (!authStore.isAuthenticated) {
      // Abort current navigation to prevent flash
      abortNavigation()
      return navigateTo('/admin/login', { replace: true })
    }
  }
  
  // Redirect to admin if already logged in and trying to access login
  if (to.path === '/admin/login' && authStore.isAuthenticated) {
    abortNavigation()
    return navigateTo('/admin/projects', { replace: true })
  }
})