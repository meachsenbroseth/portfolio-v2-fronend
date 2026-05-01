// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null,
    initialized: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user?.name || 'Admin',
    userEmail: (state) => state.user?.email || '',
    // Add this getter to safely get token
    authToken: (state) => state.token,
  },

  actions: {
    async login(email, password, remember = false) {
      this.loading = true
      this.error = null

      try {
        const config = useRuntimeConfig()

        const res = await $fetch(`${config.public.apiBase}/login`, {
          method: 'POST',
          body: { email, password },
        })

        this.token = res.token
        this.user = res.user ?? null

        const storage = remember ? localStorage : sessionStorage
        storage.setItem('auth_token', res.token)
        if (res.user) storage.setItem('auth_user', JSON.stringify(res.user))

        return res
      } catch (err) {
        this.error = err?.data?.message || 'Login failed'
        throw err
      } finally {
        this.loading = false
      }
    },

    loadFromStorage() {
      if (import.meta.server) return false

      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')

      if (!token) return false

      this.token = token

      const raw = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user')
      if (raw) {
        try { this.user = JSON.parse(raw) } catch {}
      }

      return true
    },

    async fetchUser() {
      if (!this.token) return

      try {
        const config = useRuntimeConfig()

        const user = await $fetch(`${config.public.apiBase}/me`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })

        this.user = user

        const storage = localStorage.getItem('auth_token') ? localStorage : sessionStorage
        storage.setItem('auth_user', JSON.stringify(user))
      } catch (err) {
        if (err?.status === 401) {
          this.clearAuth()
        }
      }
    },

    async initAuth() {
      if (this.initialized) return

      const hasToken = this.loadFromStorage()

      if (hasToken && this.token) {
        await this.fetchUser()
      }

      this.initialized = true
    },

    // Add this method to ensure token is always available
    getValidToken() {
      if (this.token) return this.token
      
      // Try to reload from storage
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
      if (token) {
        this.token = token
        return token
      }
      
      return null
    },

    clearAuth() {
      this.user = null
      this.token = null
      this.initialized = false

      if (import.meta.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        sessionStorage.removeItem('auth_token')
        sessionStorage.removeItem('auth_user')
      }
    },

    async logout() {
      try {
        const config = useRuntimeConfig()
        if (this.token) {
          await $fetch(`${config.public.apiBase}/logout`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${this.token}` },
          }).catch(() => {})
        }
      } finally {
        this.clearAuth()
        await navigateTo('/admin/login')
      }
    },
  },
})