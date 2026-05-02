export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  
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
    // Not an admin, redirect to dashboard or show error
    return navigateTo('/admin/dashboard')
  }
  
  // User is admin, allow access
  return
})