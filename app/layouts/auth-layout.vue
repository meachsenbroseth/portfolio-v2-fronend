<!-- layouts/auth-layout.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      <!-- Logo -->
      <div class="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <div class="w-8 h-8 bg-[#131313] rounded flex items-center justify-center">
          <span class="text-white font-bold text-sm">MSB</span>
        </div>
        <span class="font-semibold text-gray-900">Admin Panel</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-6">
        <div class="space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 rounded-md transition-all duration-200"
            :class="$route.path === item.path ? 'bg-gray-100 text-gray-900 font-medium' : 'hover:bg-gray-50 hover:text-gray-900'"
          >
            <Icon :name="item.icon" size="18" />
            {{ item.label }}
          </NuxtLink>
        </div>
      </nav>

      <!-- User Section -->
      <div class="border-t border-gray-100 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <button class="flex items-center gap-3 w-full hover:bg-gray-50 rounded-md p-2 transition-colors">
              <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  v-if="authStore.user?.avatar"
                  :src="authStore.user.avatar" 
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-xs font-bold">{{ authStore.user?.name?.charAt(0) || 'A' }}</span>
              </div>
              <div class="flex-1 text-left">
                <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name || 'Admin' }}</p>
                <p class="text-xs text-gray-500">{{ authStore.user?.role || 'Administrator' }}</p>
              </div>
              <ChevronDown class="h-4 w-4 text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuItem @click="navigateTo('/admin/profile')">
              <User class="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem @click="navigateTo('/admin/settings')">
              <Settings class="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="handleLogout" class="text-red-600">
              <LogOut class="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-64 p-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ChevronDown, User, Settings, LogOut } from 'lucide-vue-next'

// const authStore = useAuthStore()
const router = useRouter()

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: 'lucide:layout-dashboard' },
  { label: 'Projects', path: '/admin/projects', icon: 'lucide:folder-kanban' },
  { label: 'Experience', path: '/admin/experience', icon: 'lucide:briefcase' },
  { label: 'Education', path: '/admin/education', icon: 'lucide:graduation-cap' },
  { label: 'Status', path: '/admin/status', icon: 'lucide:activity' },
  { label: 'Profile', path: '/admin/profile', icon: 'lucide:user' },
  { label: 'Settings', path: '/admin/settings', icon: 'lucide:settings' }
]

const handleLogout = async () => {
  await authStore.logout()
  router.push('/admin/login')
}
</script>