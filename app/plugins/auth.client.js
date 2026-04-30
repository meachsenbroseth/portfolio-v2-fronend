export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  
  // Initialize auth when app starts
  await authStore.initAuth()
})