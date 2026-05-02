<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="authStore.loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>

    <div v-else>
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

      <div class="grid gap-6 lg:grid-cols-3 mt-6">
        <!-- Profile Card -->
        <Card class="lg:col-span-1">
          <CardContent class="pt-6">
            <div class="flex flex-col items-center text-center">
              <!-- Avatar -->
              <div class="relative">
                <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                  <img 
                    :src="authStore.userAvatar" 
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-xs"
                  :class="authStore.isAdmin ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'">
                  {{ authStore.isAdmin ? 'Admin' : 'User' }}
                </div>
              </div>

              <div class="mt-4">
                <h2 class="text-xl font-bold">{{ authStore.user?.name }}</h2>
                <p class="text-sm text-muted-foreground">Member since {{ memberSince }}</p>
              </div>

              <div class="mt-4 w-full">
                <div class="flex items-center justify-between text-sm py-2 border-t">
                  <span class="text-muted-foreground">Email</span>
                  <span class="font-medium">{{ authStore.user?.email }}</span>
                </div>
                <div class="flex items-center justify-between text-sm py-2 border-t">
                  <span class="text-muted-foreground">Email Verified</span>
                  <span class="font-medium">
                    <span v-if="authStore.user?.email_verified_at" class="text-green-600">✓ Verified</span>
                    <span v-else class="text-yellow-600">Not verified</span>
                  </span>
                </div>
                <div class="flex items-center justify-between text-sm py-2 border-t">
                  <span class="text-muted-foreground">Account Type</span>
                  <span class="font-medium">{{ authStore.isAdmin ? 'Administrator' : 'Regular User' }}</span>
                </div>
                <div class="flex items-center justify-between text-sm py-2 border-t">
                  <span class="text-muted-foreground">Joined</span>
                  <span class="font-medium">{{ formattedDate }}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Stats & Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Stats Cards -->
          <div class="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Total Projects</CardTitle>
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

          <!-- Account Info Card -->
          <Card>
            <CardHeader>
              <CardTitle class="text-lg">Account Information</CardTitle>
            </CardHeader>
            <CardContent class="space-y-2">
              <div class="flex justify-between py-2 border-b">
                <span class="text-muted-foreground">Role</span>
                <span class="font-medium">{{ authStore.isAdmin ? 'Administrator' : 'Regular User' }}</span>
              </div>
              <div class="flex justify-between py-2 border-b">
                <span class="text-muted-foreground">Account Status</span>
                <span class="text-green-600 font-medium">Active</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Settings, Folder, Briefcase, GraduationCap } from "lucide-vue-next"

definePageMeta({
  layout: 'admin-layout',
  middleware: 'auth'
})

const authStore = useAuthStore()
const { user, loading } = storeToRefs(authStore)

// Stats
const projectStore = useProjectStore()
const experienceStore = useExperienceStore()
const educationStore = useEducationStore()

const stats = ref({
  projects: 0,
  experience: 0,
  education: 0
})

const formattedDate = computed(() => {
  if (user.value?.created_at) {
    return new Date(user.value.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  return 'Not available'
})

const memberSince = computed(() => {
  if (user.value?.created_at) {
    const date = new Date(user.value.created_at)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }
  return 'Recently'
})

onMounted(async () => {
  try {
    if (!user.value) {
      await authStore.fetchUser()
    }
    
    // Fetch stats
    await Promise.all([
      projectStore.fetchProjects(),
      experienceStore.fetchExperiences(1, true),
      educationStore.fetchEducations(1, true)
    ])
    
    stats.value = {
      projects: projectStore.projects?.length || 0,
      experience: experienceStore.experiences?.length || 0,
      education: educationStore.educations?.length || 0
    }
  } catch (error) {
    console.error('Failed to load profile data:', error)
  }
})
</script>