<!-- /admin/settings/index.vue -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Settings</h1>
        <p class="text-sm text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      <Button @click="saveSettings" :disabled="!isDirty">
        <Save class="mr-2 h-4 w-4" />
        Save Changes
      </Button>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Profile Settings -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <User class="h-5 w-5" />
            Profile Settings
          </CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <!-- Avatar Upload -->
          <div class="flex items-center gap-4">
            <div class="relative">
              <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                <img 
                  :src="profile.avatar || 'https://i.pinimg.com/736x/ad/83/26/ad83266f29567835516024bb1fdff3a7.jpg'" 
                  class="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                @click="triggerAvatarUpload"
                class="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-full hover:bg-primary/90 transition-colors"
              >
                <Camera class="h-3 w-3" />
              </button>
              <input
                ref="avatarInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleAvatarUpload"
              />
            </div>
            <div class="flex-1">
              <p class="text-sm text-muted-foreground">Click the camera icon to upload a new avatar</p>
              <p class="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="username">Username</Label>
            <Input id="username" v-model="profile.username" placeholder="username" />
          </div>

          <div class="space-y-2">
            <Label for="fullName">Full Name</Label>
            <Input id="fullName" v-model="profile.fullName" placeholder="Full name" />
          </div>

          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" v-model="profile.email" type="email" placeholder="email@example.com" />
          </div>

          <div class="space-y-2">
            <Label for="location">Location</Label>
            <Input id="location" v-model="profile.location" placeholder="City, Country" />
          </div>

          <div class="space-y-2">
            <Label for="bio">Bio</Label>
            <Textarea id="bio" v-model="profile.bio" rows="4" placeholder="Tell us about yourself..." />
          </div>
        </CardContent>
      </Card>

      <!-- Social Links & Preferences -->
      <div class="space-y-6">
        <!-- Social Links -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Share2 class="h-5 w-5" />
              Social Links
            </CardTitle>
            <CardDescription>Connect your social media profiles</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="github">GitHub</Label>
              <div class="relative">
                <Github class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="github" 
                  v-model="profile.social.github" 
                  class="pl-9"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="linkedin">LinkedIn</Label>
              <div class="relative">
                <Linkedin class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="linkedin" 
                  v-model="profile.social.linkedin" 
                  class="pl-9"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="twitter">Twitter/X</Label>
              <div class="relative">
                <Twitter class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="twitter" 
                  v-model="profile.social.twitter" 
                  class="pl-9"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="instagram">Instagram</Label>
              <div class="relative">
                <Instagram class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="instagram" 
                  v-model="profile.social.instagram" 
                  class="pl-9"
                  placeholder="https://instagram.com/username"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Preferences -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Settings class="h-5 w-5" />
              Preferences
            </CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p class="text-xs text-muted-foreground">Receive email updates</p>
              </div>
              <Switch v-model="preferences.emailNotifications" />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <Label>Dark Mode</Label>
                <p class="text-xs text-muted-foreground">Switch between light and dark theme</p>
              </div>
              <Switch v-model="preferences.darkMode" />
            </div>
          </CardContent>
        </Card>

        <!-- Danger Zone -->
        <Card class="border-red-200">
          <CardHeader class="text-red-600">
            <CardTitle class="flex items-center gap-2">
              <AlertTriangle class="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription class="text-red-400">Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-center justify-between">
              <div>
                <Label>Delete Account</Label>
                <p class="text-xs text-muted-foreground">Permanently delete your account</p>
              </div>
              <Button variant="destructive" size="sm" @click="confirmDeleteAccount">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Success Toast -->
    <div v-if="showToast" class="fixed bottom-4 right-4 z-50 animate-in slide-in-from-right-5">
      <div class="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
        <div class="flex items-center gap-3">
          <CheckCircle class="h-5 w-5 text-green-600" />
          <div>
            <p class="text-sm font-medium text-green-800">Success!</p>
            <p class="text-xs text-green-600">{{ toastMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Account Dialog -->
    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove all your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click="deleteAccount" class="bg-red-600 hover:bg-red-700">
            Yes, delete my account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import {
  Save,
  User,
  Camera,
  Share2,
  Settings,
  AlertTriangle,
  CheckCircle,
  Github,
  Linkedin,
  Twitter,
  Instagram
} from "lucide-vue-next"

definePageMeta({
  layout: 'admin-layout',
  middleware:'auth'
})

// Profile Data (editable)
const profile = ref({
  username: 'seth_dev',
  fullName: 'Meach Senbroseth',
  email: 'seth.dev@example.com',
  location: 'Phnom Penh, Cambodia',
  bio: 'Full-stack developer passionate about building amazing web experiences. Specialized in TALL Stack and Nuxt ecosystem.',
  avatar: '',
  social: {
    github: 'https://github.com/seth-dev',
    linkedin: 'https://linkedin.com/in/seth-dev',
    twitter: 'https://twitter.com/seth_dev',
    instagram: ''
  }
})

// Original profile for tracking changes
const originalProfile = ref(JSON.parse(JSON.stringify(profile.value)))

// Preferences
const preferences = ref({
  emailNotifications: true,
  darkMode: false
})

// UI State
const showToast = ref(false)
const toastMessage = ref('')
const deleteDialogOpen = ref(false)
const avatarInput = ref(null)

// Computed
const isDirty = computed(() => {
  return JSON.stringify(profile.value) !== JSON.stringify(originalProfile.value)
})

// Methods
const triggerAvatarUpload = () => {
  avatarInput.value?.click()
}

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profile.value.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveSettings = () => {
  originalProfile.value = JSON.parse(JSON.stringify(profile.value))
  showToastMessage('Settings saved successfully!')
}

const confirmDeleteAccount = () => {
  deleteDialogOpen.value = true
}

const deleteAccount = () => {
  deleteDialogOpen.value = false
  showToastMessage('Account deleted. Redirecting...')
  setTimeout(() => {
    navigateTo('/')
  }, 2000)
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Watch for dark mode changes
watch(() => preferences.value.darkMode, (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true })
</script>

<style scoped>
.animate-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>