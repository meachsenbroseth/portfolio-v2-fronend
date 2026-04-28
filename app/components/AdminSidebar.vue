<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <div class="flex items-center gap-2 px-2 py-1">
        <div class="w-7 h-7 rounded-md bg-black flex items-center justify-center shrink-0">
          <span class="text-white text-xs font-black tracking-wider">S</span>
        </div>
        <span class="text-sm font-semibold tracking-tight text-black truncate group-data-[collapsible=icon]:hidden">
          Seth / Admin
        </span>
      </div>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in navItems" :key="item.path">
              <SidebarMenuButton as-child :is-active="isActive(item.path)" :tooltip="item.label">
                <nuxt-link :to="item.path" class="flex items-center gap-3">
                  <Icon :name="item.icon" class="w-4 h-4 shrink-0" />
                  <span>{{ item.label }}</span>
                </nuxt-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton size="lg"
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <!-- Avatar -->
                <div
                  class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">
                  ST
                </div>
                <!-- Name + email — hidden when icon-collapsed -->
                <div class="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
                  <span class="text-sm font-semibold truncate">Seth</span>
                  <span class="text-xs text-muted-foreground truncate">seth@email.com</span>
                </div>
                <!-- Chevron -->
                <Icon name="lucide:chevrons-up-down"
                  class="ml-auto w-4 h-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="top" class="w-56" align="start">
              <!-- Profile info header -->
              <div class="flex items-center gap-2 px-2 py-1.5 mb-1">
                <div
                  class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">
                  ST
                </div>
                <div class="flex flex-col leading-tight">
                  <span class="text-sm font-semibold">Seth</span>
                  <span class="text-xs text-muted-foreground">seth@email.com</span>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem class="cursor-pointer">
                <nuxt-link to="/admin/profile">
                  <Icon name="lucide:user" class="w-4 h-4 mr-2" />
                  Profile
                </nuxt-link>
              </DropdownMenuItem>
              <DropdownMenuItem class="cursor-pointer">
                <nuxt-link to="/admin/settings">
                  <Icon name="lucide:settings" class="w-4 h-4 mr-2" />
                  Settings
                </nuxt-link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem as-child>
                <nuxt-link to="/" class="flex items-center cursor-pointer">
                  <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
                  Back to Site
                </nuxt-link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem class="cursor-pointer text-red-500 focus:text-red-500">
                <Icon name="lucide:log-out" class="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>

<script setup>
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const route = useRoute()

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
  { path: '/admin/projects', label: 'Projects', icon: 'lucide:folder-kanban' },
  { path: '/admin/status', label: 'Status', icon: 'lucide:activity' },
]

const isActive = (path) => {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}
</script>