<template>
  <SidebarProvider>
    <AdminSidebar />
    <SidebarInset>
      <header class="flex items-center gap-2 px-4 h-14 border-b border-gray-100">
        <SidebarTrigger class="-ml-1" />
        <div class="w-px h-4 bg-gray-200" />
        <span class="text-sm text-gray-500 font-medium tracking-wide">
          {{ currentPageLabel }}
        </span>
      </header>
      <main class="flex-1 p-6">
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

const labels = {
  '/admin':          'Dashboard',
  '/admin/projects': 'Projects',
  '/admin/status':   'Status',
  '/admin/settings': 'Settings',
}

const currentPageLabel = computed(() => labels[route.path] ?? 'Admin')
</script>