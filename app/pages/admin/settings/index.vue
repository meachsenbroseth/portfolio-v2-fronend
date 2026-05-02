<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Settings</h1>
        <p class="text-sm text-muted-foreground">Manage your account settings</p>
      </div>
      <Button @click="saveProfile" :disabled="!isDirty || saving">
        <Save class="mr-2 h-4 w-4" />
        {{ saving ? 'Saving...' : 'Save Changes' }}
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
          <!-- Avatar -->
          <div class="flex items-center gap-4">
            <div class="relative">
              <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                <img 
                  :src="avatarPreview || authStore.userAvatar" 
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
            <Label for="name">Name</Label>
            <Input id="name" v-model="profile.name" placeholder="Your name" />
          </div>

          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" v-model="profile.email" type="email" placeholder="email@example.com" />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label>Email Verification</Label>
              <span v-if="authStore.user?.email_verified_at" class="text-xs text-green-600">✓ Verified</span>
              <Button v-else variant="link" size="sm" class="text-xs" @click="sendVerificationEmail">
                Verify Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Change Password -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Lock class="h-5 w-5" />
            Change Password
          </CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="current_password">Current Password</Label>
            <Input 
              id="current_password" 
              v-model="passwordForm.current_password" 
              type="password"
              placeholder="Enter current password"
            />
          </div>
          <div class="space-y-2">
            <Label for="new_password">New Password</Label>
            <Input 
              id="new_password" 
              v-model="passwordForm.password" 
              type="password"
              placeholder="Enter new password"
            />
          </div>
          <div class="space-y-2">
            <Label for="password_confirmation">Confirm New Password</Label>
            <Input 
              id="password_confirmation" 
              v-model="passwordForm.password_confirmation" 
              type="password"
              placeholder="Confirm new password"
            />
          </div>
          <Button 
            @click="changePassword" 
            :disabled="!isPasswordValid || changingPassword"
            class="w-full"
          >
            {{ changingPassword ? 'Updating...' : 'Update Password' }}
          </Button>
          <p v-if="passwordError" class="text-xs text-red-500">{{ passwordError }}</p>
        </CardContent>
      </Card>
    </div>

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
import { Save, User, Camera, Lock, AlertTriangle, CheckCircle } from "lucide-vue-next"

definePageMeta({
  layout: 'admin-layout',
  middleware: 'auth'
})

const authStore = useAuthStore()

// Profile Form
const profile = ref({
  name: '',
  email: ''
})

const originalProfile = ref({})
const avatarPreview = ref('')
const avatarFile = ref(null)
const saving = ref(false)
const changingPassword = ref(false)
const passwordError = ref('')
const showToast = ref(false)
const toastMessage = ref('')
const deleteDialogOpen = ref(false)
const avatarInput = ref(null)

// Password Form
const passwordForm = ref({
  current_password: '',
  password: '',
  password_confirmation: ''
})

// Computed
const isDirty = computed(() => {
  return profile.value.name !== originalProfile.value.name || 
         profile.value.email !== originalProfile.value.email ||
         avatarFile.value !== null
})

const isPasswordValid = computed(() => {
  return passwordForm.value.current_password && 
         passwordForm.value.password && 
         passwordForm.value.password === passwordForm.value.password_confirmation &&
         passwordForm.value.password.length >= 6
})

// Methods
const triggerAvatarUpload = () => {
  avatarInput.value?.click()
}

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    avatarFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveProfile = async () => {
  saving.value = true
  try {
    // Update profile
    if (profile.value.name !== originalProfile.value.name || profile.value.email !== originalProfile.value.email) {
      await authStore.updateProfile({
        name: profile.value.name,
        email: profile.value.email
      })
    }
    
    // Upload avatar if changed
    if (avatarFile.value) {
      await authStore.uploadAvatar(avatarFile.value)
      avatarFile.value = null
    }
    
    originalProfile.value = { ...profile.value }
    showToastMessage('Profile updated successfully!')
  } catch (error) {
    showToastMessage(error.message || 'Failed to update profile')
  } finally {
    saving.value = false
  }
}

const changePassword = async () => {
  changingPassword.value = true
  passwordError.value = ''
  
  try {
    await authStore.changePassword(
      passwordForm.value.current_password,
      passwordForm.value.password
    )
    
    passwordForm.value = {
      current_password: '',
      password: '',
      password_confirmation: ''
    }
    
    showToastMessage('Password changed successfully!')
  } catch (error) {
    passwordError.value = error.message || 'Failed to change password'
  } finally {
    changingPassword.value = false
  }
}

const sendVerificationEmail = async () => {
  try {
    const config = useRuntimeConfig()
    const token = authStore.token
    
    await $fetch(`${config.public.apiBase}/email/verification-notification`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    showToastMessage('Verification email sent!')
  } catch (error) {
    showToastMessage('Failed to send verification email')
  }
}

const confirmDeleteAccount = () => {
  deleteDialogOpen.value = true
}

const deleteAccount = async () => {
  try {
    const config = useRuntimeConfig()
    const token = authStore.token
    
    await $fetch(`${config.public.apiBase}/user`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    await authStore.logout()
    showToastMessage('Account deleted. Redirecting...')
    setTimeout(() => {
      navigateTo('/')
    }, 2000)
  } catch (error) {
    showToastMessage('Failed to delete account')
    deleteDialogOpen.value = false
  }
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Initialize form with user data
watch(() => authStore.user, (user) => {
  if (user) {
    profile.value = {
      name: user.name || '',
      email: user.email || ''
    }
    originalProfile.value = { ...profile.value }
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