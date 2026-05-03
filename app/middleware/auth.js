export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  
  if (!authStore.initialized) {
    await authStore.initAuth()
  }
  
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    if (!authStore.isAuthenticated) {
      abortNavigation()
      return navigateTo('/admin/login', { replace: true })
    }
  }
  
  if (to.path === '/admin/login' && authStore.isAuthenticated) {
    abortNavigation()
    return navigateTo('/admin', { replace: true })
  }
})