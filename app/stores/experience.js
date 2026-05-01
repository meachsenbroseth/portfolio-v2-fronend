// stores/experience.js
import { defineStore } from 'pinia'

export const useExperienceStore = defineStore('experience', {
  state: () => ({
    experiences: [],
    loading: false,
    error: null,
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0
    }
  }),

  actions: {
    // PUBLIC method - no auth required for fetching
    async fetchExperiences(page = 1, requireAuth = false) {
      this.loading = true
      this.error = null
      
      try {
        const config = useRuntimeConfig()
        const headers = {
          'Accept': 'application/json'
        }
        
        // Only add auth if explicitly required
        if (requireAuth) {
          const authStore = useAuthStore()
          let token = authStore.token || localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
          
          if (!token) {
            throw new Error('No authentication token found')
          }
          
          headers['Authorization'] = `Bearer ${token}`
        }
        
        const response = await $fetch(`${config.public.apiBase}/experience?page=${page}`, {
          headers
        })
        
        if (response && response.data) {
          this.experiences = Array.isArray(response.data) ? response.data : []
          this.pagination = {
            current_page: response.current_page || page,
            last_page: response.last_page || 1,
            per_page: response.per_page || 10,
            total: response.total || 0
          }
        } else if (Array.isArray(response)) {
          this.experiences = response
        } else {
          this.experiences = []
        }
        
        return this.experiences
      } catch (error) {
        this.error = error.message || 'Failed to fetch experiences'
        console.error('Fetch experiences error:', error)
        this.experiences = []
        throw error
      } finally {
        this.loading = false
      }
    },

    // PRIVATE methods - require auth
    async createExperience(data) {
      this.loading = true
      
      try {
        const config = useRuntimeConfig()
        const authStore = useAuthStore()
        
        let token = authStore.token || localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
        
        if (!token) {
          throw new Error('Authentication required')
        }
        
        const response = await $fetch(`${config.public.apiBase}/experience`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: data
        })
        
        return response
      } catch (error) {
        this.error = error.message || 'Failed to create experience'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateExperience(id, data) {
      this.loading = true
      
      try {
        const config = useRuntimeConfig()
        const authStore = useAuthStore()
        
        let token = authStore.token || localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
        
        if (!token) {
          throw new Error('Authentication required')
        }
        
        const response = await $fetch(`${config.public.apiBase}/experience/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: data
        })
        
        return response
      } catch (error) {
        this.error = error.message || 'Failed to update experience'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteExperience(id) {
      this.loading = true
      
      try {
        const config = useRuntimeConfig()
        const authStore = useAuthStore()
        
        let token = authStore.token || localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
        
        if (!token) {
          throw new Error('Authentication required')
        }
        
        await $fetch(`${config.public.apiBase}/experience/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        this.experiences = this.experiences.filter(exp => exp.id !== id)
        
        return true
      } catch (error) {
        this.error = error.message || 'Failed to delete experience'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})