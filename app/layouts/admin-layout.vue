<!-- layouts/admin-layout.vue -->
<template>
  <div v-if="!authStore.initialized" class="min-h-screen flex items-center justify-center bg-white">
    <div class="flex flex-col items-center gap-3">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <p class="text-sm text-gray-500 font-mono">Loading admin panel...</p>
    </div>
  </div>
  
  <div v-else-if="!authStore.isAuthenticated" class="min-h-screen flex items-center justify-center bg-white">
    <div class="flex flex-col items-center gap-3">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <p class="text-sm text-gray-500 font-mono">Redirecting to login...</p>
    </div>
  </div>
  
  <SidebarProvider v-else>
    <AdminSidebar />
    <SidebarInset>
      <header class="flex items-center gap-2 px-4 h-14 border-b border-gray-100">
        <SidebarTrigger class="-ml-1" />
        <div class="w-px h-4 bg-gray-200" />
        <span class="text-sm text-gray-500 font-medium tracking-wide">
          {{ currentPageLabel }}
        </span>
      </header>
      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup>
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import AdminSidebar from '@/components/AdminSidebar.vue'

const route = useRoute()
const authStore = useAuthStore()

const labels = {
  '/admin':          'Dashboard',
  '/admin/projects': 'Projects',
  '/admin/status':   'Status',
  '/admin/settings': 'Settings',
  '/admin/profile':  'Profile',
}

const currentPageLabel = computed(() => labels[route.path] ?? 'Admin')

// Optional: Watch for auth state changes
watch(() => authStore.isAuthenticated, (isAuth) => {
  if (!isAuth && authStore.initialized) {
    navigateTo('/admin/login')
  }
}, { immediate: true })
</script>

<style scoped>
/* Smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>