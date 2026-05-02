import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null,
    initialized: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.is_admin === true,
    userName: (state) => state.user?.name || 'User',
    userEmail: (state) => state.user?.email || '',
    userAvatar: (state) => `https://ui-avatars.com/api/?name=${encodeURIComponent(state.user?.name || 'User')}&background=131313&color=fff`
  },

  actions: {
    async login(email, password, remember = false) {
      this.loading = true
      this.error = null
      
      try {
        const config = useRuntimeConfig()
        
        const res = await $fetch(`${config.public.apiBase}/login`, {
          method: 'POST',
          body: { email, password }
        })

        this.token = res.token
        this.user = res.user

        const storage = remember ? localStorage : sessionStorage
        storage.setItem('auth_token', res.token)
        if (res.user) storage.setItem('auth_user', JSON.stringify(res.user))

        return res
      } catch (error) {
        this.error = error.data?.message || 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Fetch user from /me endpoint
    async fetchUser() {
      try {
        const config = useRuntimeConfig()
        const token = this.token || localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')

        if (!token) {
          this.clearAuth()
          return null
        }

        const user = await $fetch(`${config.public.apiBase}/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        this.user = user
        this.token = token
        
        // Update stored user
        const storage = localStorage.getItem('auth_token') ? localStorage : sessionStorage
        storage.setItem('auth_user', JSON.stringify(user))
        
        return user
      } catch (error) {
        console.error('Failed to fetch user:', error)
        if (error.response?.status === 401) {
          this.clearAuth()
        }
        return null
      }
    },

    async updateProfile(data) {
      this.loading = true
      
      try {
        const config = useRuntimeConfig()
        const token = this.token || localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
        
        const response = await $fetch(`${config.public.apiBase}/user/profile`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: data
        })
        
        this.user = response.user || response
        const storage = localStorage.getItem('auth_token') ? localStorage : sessionStorage
        storage.setItem('auth_user', JSON.stringify(this.user))
        
        return response
      } catch (error) {
        this.error = error.data?.message || 'Failed to update profile'
        throw error
      } finally {
        this.loading = false
      }
    },

    async changePassword(currentPassword, newPassword) {
      this.loading = true
      
      try {
        const config = useRuntimeConfig()
        const token = this.token || localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
        
        const response = await $fetch(`${config.public.apiBase}/change-password`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: {
            current_password: currentPassword,
            password: newPassword
          }
        })
        
        return response
      } catch (error) {
        this.error = error.data?.message || error.message || 'Failed to change password'
        throw error
      } finally {
        this.loading = false
      }
    },

    async uploadAvatar(file) {
      this.loading = true
      
      try {
        const config = useRuntimeConfig()
        const token = this.token || localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
        
        const formData = new FormData()
        formData.append('avatar', file)
        
        const response = await $fetch(`${config.public.apiBase}/user/avatar`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        })
        
        this.user = response.user || response
        const storage = localStorage.getItem('auth_token') ? localStorage : sessionStorage
        storage.setItem('auth_user', JSON.stringify(this.user))
        
        return response
      } catch (error) {
        this.error = error.data?.message || 'Failed to upload avatar'
        throw error
      } finally {
        this.loading = false
      }
    },

    loadFromStorage() {
      if (import.meta.server) return false

      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
      const user = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user')

      if (!token) return false

      this.token = token
      if (user) {
        try { 
          this.user = JSON.parse(user) 
        } catch(e) {}
      }

      return true
    },

    async initAuth() {
      if (this.initialized) return
      
      const hasToken = this.loadFromStorage()
      
      if (hasToken && !this.user) {
        await this.fetchUser()
      }
      
      this.initialized = true
    },

    clearAuth() {
      this.user = null
      this.token = null
      this.initialized = false
      
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      sessionStorage.removeItem('auth_token')
      sessionStorage.removeItem('auth_user')
    },

    async logout() {
      try {
        const config = useRuntimeConfig()
        const token = this.token
        if (token) {
          await $fetch(`${config.public.apiBase}/logout`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
          }).catch(() => {})
        }
      } finally {
        this.clearAuth()
        navigateTo('/admin/login')
      }
    }
  }
})