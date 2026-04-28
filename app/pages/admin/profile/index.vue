<!-- /admin/profile/index.vue -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Profile</h1>
        <p class="text-sm text-muted-foreground">View your account information</p>
      </div>
      <NuxtLink to="/admin/settings">
        <Button variant="outline">
          <Settings class="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </NuxtLink>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Profile Card -->
      <Card class="lg:col-span-1">
        <CardContent class="pt-6">
          <div class="flex flex-col items-center text-center">
            <!-- Avatar -->
            <div class="relative">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                <img 
                  :src="profile.avatar || 'https://i.pinimg.com/736x/ad/83/26/ad83266f29567835516024bb1fdff3a7.jpg'" 
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs">
                {{ profile.role }}
              </div>
            </div>

            <div class="mt-4">
              <h2 class="text-xl font-bold">{{ profile.fullName }}</h2>
              <p class="text-sm text-muted-foreground">@{{ profile.username }}</p>
            </div>

            <div class="mt-4 w-full">
              <div class="flex items-center justify-between text-sm py-2 border-t">
                <span class="text-muted-foreground">Email</span>
                <span class="font-medium">{{ profile.email }}</span>
              </div>
              <div class="flex items-center justify-between text-sm py-2 border-t">
                <span class="text-muted-foreground">Location</span>
                <span class="font-medium">{{ profile.location }}</span>
              </div>
              <div class="flex items-center justify-between text-sm py-2 border-t">
                <span class="text-muted-foreground">Member Since</span>
                <span class="font-medium">{{ memberSince }}</span>
              </div>
            </div>

            <!-- Social Links -->
            <div class="mt-6 w-full">
              <h3 class="text-sm font-medium mb-3">Social Profiles</h3>
              <div class="flex justify-center gap-3">
                <a v-if="profile.social.github" :href="profile.social.github" target="_blank" class="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Github class="h-4 w-4" />
                </a>
                <a v-if="profile.social.linkedin" :href="profile.social.linkedin" target="_blank" class="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Linkedin class="h-4 w-4" />
                </a>
                <a v-if="profile.social.twitter" :href="profile.social.twitter" target="_blank" class="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Twitter class="h-4 w-4" />
                </a>
                <a v-if="profile.social.instagram" :href="profile.social.instagram" target="_blank" class="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Instagram class="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Bio & Stats -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Bio Card -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg">Bio</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground leading-relaxed">
              {{ profile.bio || 'No bio added yet.' }}
            </p>
          </CardContent>
        </Card>

        <!-- Stats Cards -->
        <div class="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Projects</CardTitle>
              <Folder class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ stats.projects }}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Experience</CardTitle>
              <Briefcase class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ stats.experience }}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Education</CardTitle>
              <GraduationCap class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ stats.education }}</div>
            </CardContent>
          </Card>
        </div>

        <!-- Recent Activity -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-3 text-sm">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <component :is="activity.icon" class="h-4 w-4 text-primary" />
              </div>
              <div class="flex-1">
                <p>{{ activity.description }}</p>
                <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Settings,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Folder,
  Briefcase,
  GraduationCap,
  PlusCircle,
  Edit,
  Star
} from "lucide-vue-next"

definePageMeta({
  layout: 'admin-layout'
})

// Profile Data (read-only view)
const profile = ref({
  username: 'seth_dev',
  fullName: 'Meach Senbroseth',
  email: 'seth.dev@example.com',
  role: 'Administrator',
  location: 'Phnom Penh, Cambodia',
  bio: 'Full-stack developer passionate about building amazing web experiences. Specialized in TALL Stack and Nuxt ecosystem. With over 3 years of experience in web development, I love creating efficient, scalable, and beautiful applications.',
  avatar: '',
  social: {
    github: 'https://github.com/seth-dev',
    linkedin: 'https://linkedin.com/in/seth-dev',
    twitter: 'https://twitter.com/seth_dev',
    instagram: ''
  }
})

// Stats
const stats = ref({
  projects: 8,
  experience: 2,
  education: 2
})

// Recent Activities
const recentActivities = ref([
  {
    id: 1,
    icon: PlusCircle,
    description: 'Added new project: KHQR Dashboard',
    time: '2 days ago'
  },
  {
    id: 2,
    icon: Edit,
    description: 'Updated portfolio design',
    time: '5 days ago'
  },
  {
    id: 3,
    icon: Star,
    description: 'Completed Phanna Computer ERP project',
    time: '1 week ago'
  }
])

const memberSince = computed(() => {
  const date = new Date(2024, 0, 1)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})
</script>