// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user?.name || 'Admin',
    userEmail: (state) => state.user?.email || 'admin@example.com'
  },

  actions: {
    // Login method
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
        this.user = res.user || null

        if (remember) {
          localStorage.setItem('token', res.token)
          if (res.user) localStorage.setItem('user', JSON.stringify(res.user))
        } else {
          sessionStorage.setItem('token', res.token)
          if (res.user) sessionStorage.setItem('user', JSON.stringify(res.user))
        }

        return res
      } catch (error) {
        this.error = error.message || 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Fetch user data
    async fetchUser() {
      try {
        const config = useRuntimeConfig()
        
        const token = this.token || localStorage.getItem('token') || sessionStorage.getItem('token')

        if (!token) {
          this.clearAuth()
          return
        }

        // Try to restore user from storage first (for speed)
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user')
        if (storedUser && !this.user) {
          this.user = JSON.parse(storedUser)
        }

        // Verify with server
        const user = await $fetch(`${config.public.apiBase}/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.user = user
        this.token = token
        
        // Update stored user
        const storage = localStorage.getItem('token') ? localStorage : sessionStorage
        storage.setItem('user', JSON.stringify(user))
        
      } catch (error) {
        console.error('Failed to fetch user:', error)
        if (error.response?.status === 401) {
          this.clearAuth()
        }
      }
    },

    // Load token from storage - THIS IS THE METHOD YOU NEED
    loadToken() {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      
      if (token) {
        this.token = token
        return true
      }
      
      return false
    },

    // Initialize auth (load token and fetch user)
    async initAuth() {
      const hasToken = this.loadToken()
      
      if (hasToken) {
        await this.fetchUser()
        return true
      }
      
      return false
    },

    // Clear auth data
    clearAuth() {
      this.user = null
      this.token = null
      
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
    },

    // Logout
    logout() {
      this.clearAuth()
      navigateTo('/admin/login')
    }
  }
})