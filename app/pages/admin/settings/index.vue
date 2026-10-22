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
            <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
              <img
                :src="authStore.userAvatar"
                class="w-full h-full object-cover"
                alt="Account avatar"
              />
            </div>
            <div class="flex-1">
              <p class="text-sm text-muted-foreground">Signed in as {{ authStore.userName }}</p>
              <p class="text-xs text-muted-foreground">Your avatar is generated from your profile name</p>
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
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Save, User, Lock, CheckCircle } from "lucide-vue-next"

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
const saving = ref(false)
const changingPassword = ref(false)
const passwordError = ref('')
const showToast = ref(false)
const toastMessage = ref('')

// Password Form
const passwordForm = ref({
  current_password: '',
  password: '',
  password_confirmation: ''
})

// Computed
const isDirty = computed(() => {
  return profile.value.name !== originalProfile.value.name || 
         profile.value.email !== originalProfile.value.email
})

const isPasswordValid = computed(() => {
  return passwordForm.value.current_password && 
         passwordForm.value.password && 
         passwordForm.value.password === passwordForm.value.password_confirmation &&
         passwordForm.value.password.length >= 6
})

// Methods
const saveProfile = async () => {
  saving.value = true
  try {
    await authStore.updateProfile({
      name: profile.value.name,
      email: profile.value.email
    })

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
