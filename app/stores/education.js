// stores/education.js
import { defineStore } from 'pinia'

export const useEducationStore = defineStore('education', {
  state: () => ({
    educations: [],
    loading: false,
    error: null,
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0
    }
  }),

  getters: {
    orderedEducations: (state) => {
      return [...state.educations].sort((a, b) => b.id - a.id)
    }
  },

  actions: {
    // Helper to get token from auth store or storage
    getToken() {
      const authStore = useAuthStore()
      
      // Try to get from auth store first
      if (authStore.token) {
        return authStore.token
      }
      
      // Fallback to storage with correct key
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
      
      // Sync back to auth store if found
      if (token && !authStore.token) {
        authStore.token = token
      }
      
      return token
    },

    async fetchEducations(page = 1) {
      this.loading = true
      this.error = null
      
      try {
        const config = useRuntimeConfig()
        const token = this.getToken()
        
        if (!token) {
          throw new Error('No authentication token found')
        }
        
        const response = await $fetch(`${config.public.apiBase}/education?page=${page}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })
        
        if (response.data) {
          this.educations = response.data
          this.pagination = {
            current_page: response.current_page,
            last_page: response.last_page,
            per_page: response.per_page,
            total: response.total
          }
        } else {
          this.educations = response
        }
        
        return this.educations
      } catch (error) {
        this.error = error.message || 'Failed to fetch education'
        console.error('Fetch education error:', error)
        
        // If unauthorized, clear auth and redirect
        if (error.status === 401) {
          const authStore = useAuthStore()
          authStore.clearAuth()
          navigateTo('/admin/login')
        }
        
        throw error
      } finally {
        this.loading = false
      }
    },

    async createEducation(data) {
      this.loading = true
      
      try {
        const config = useRuntimeConfig()
        const token = this.getToken()
        
        if (!token) {
          throw new Error('No authentication token found')
        }
        
        const response = await $fetch(`${config.public.apiBase}/education`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: data
        })
        
        return response
      } catch (error) {
        this.error = error.message || 'Failed to create education'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateEducation(id, data) {
      this.loading = true
      
      try {
        const config = useRuntimeConfig()
        const token = this.getToken()
        
        if (!token) {
          throw new Error('No authentication token found')
        }
        
        const response = await $fetch(`${config.public.apiBase}/education/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: data
        })
        
        return response
      } catch (error) {
        this.error = error.message || 'Failed to update education'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteEducation(id) {
      this.loading = true
      
      try {
        const config = useRuntimeConfig()
        const token = this.getToken()
        
        if (!token) {
          throw new Error('No authentication token found')
        }
        
        await $fetch(`${config.public.apiBase}/education/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        this.educations = this.educations.filter(edu => edu.id !== id)
        
        return true
      } catch (error) {
        this.error = error.message || 'Failed to delete education'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})