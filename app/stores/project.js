// stores/project.js
import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
    state: () => ({
        projects: [],
        loading: false,
        error: null,
        validationErrors: null,
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
        },
    }),

    getters: {
        orderedProjects: (state) => [...state.projects].sort((a, b) => b.id - a.id),
    },

    actions: {
        getToken() {
            const authStore = useAuthStore()
            return (
                authStore.token ||
                localStorage.getItem('auth_token') ||
                sessionStorage.getItem('auth_token')
            )
        },

        getHeaders(isFormData = false) {
            const token = this.getToken()
            const headers = {
                Accept: 'application/json',
            }

            if (token) {
                headers.Authorization = `Bearer ${token}`
            }

            if (!isFormData) {
                headers['Content-Type'] = 'application/json'
            }

            return headers
        },

        handle401() {
            const authStore = useAuthStore()
            authStore.clearAuth()
            navigateTo('/admin/login')
        },

        getFullImageUrl(path) {
            if (!path) return null
            if (path.startsWith('http://') || path.startsWith('https://')) return path
            if (path.startsWith('data:')) return path

            const config = useRuntimeConfig()
            const apiBase = config.public.apiBase
            const host = new URL(apiBase).origin

            if (path.startsWith('/storage/')) {
                return `${host}${path}`
            }

            return `${host}/storage/${path.replace(/^\/+/, '')}`
        },

        processProject(project) {
            const gallery = Array.isArray(project.gallery) ? project.gallery : []
            const technologies = Array.isArray(project.technologies) ? project.technologies : []
            const liveDemo = project.live_demo ?? project.live_url ?? ''

            return {
                ...project,
                desc: project.desc ?? project.description ?? '',
                live_demo: liveDemo,
                live_url: liveDemo,
                github_url: project.github_url ?? '',
                image: this.getFullImageUrl(project.image),
                raw_gallery: gallery,
                gallery: gallery.map((image) => this.getFullImageUrl(image)),
                technologies,
            }
        },

        normalizeProjectFormData(formData) {
            if (!(formData instanceof FormData)) return formData

            const liveUrl = formData.get('live_url')
            if (liveUrl !== null && !formData.has('live_demo')) {
                formData.set('live_demo', liveUrl)
            }
            formData.delete('live_url')

            for (const key of ['technologies', 'existing_gallery']) {
                if (formData.get(key) === '[]') {
                    formData.delete(key)
                }
            }

            return formData
        },

        extractProjectsResponse(response) {
            const payload = response?.data ?? response
            const items = payload?.data ?? (Array.isArray(payload) ? payload : [])

            if (payload?.current_page) {
                this.pagination = {
                    current_page: payload.current_page,
                    last_page: payload.last_page,
                    per_page: payload.per_page,
                    total: payload.total,
                }
            }

            return Array.isArray(items) ? items : []
        },

        async fetchProjects(page = 1) {
            this.loading = true
            this.error = null

            try {
                const config = useRuntimeConfig()
                const response = await $fetch(`${config.public.apiBase}/projects?page=${page}`, {
                    headers: this.getHeaders(false),
                })

                this.projects = this.extractProjectsResponse(response).map((project) =>
                    this.processProject(project)
                )

                return this.projects
            } catch (err) {
                this.error = err?.data?.message || err.message || 'Failed to fetch projects'
                if (err?.status === 401) this.handle401()
                throw err
            } finally {
                this.loading = false
            }
        },

        async createProject(formData) {
            this.loading = true
            this.error = null
            this.validationErrors = null

            try {
                const config = useRuntimeConfig()
                const payload = this.normalizeProjectFormData(formData)
                
                // Log what we're sending for debugging
                console.log('Creating project with FormData:')
                for (let pair of payload.entries()) {
                    console.log(pair[0], pair[1])
                }
                
                const response = await $fetch(`${config.public.apiBase}/projects`, {
                    method: 'POST',
                    headers: this.getHeaders(true),
                    body: payload,
                })

                if (response?.data) {
                    this.projects.unshift(this.processProject(response.data))
                }

                return response
            } catch (err) {
                console.error('Create project error:', err)
                
                // Capture validation errors
                if (err?.status === 422 && err?.data?.errors) {
                    this.validationErrors = err.data.errors
                    this.error = 'Validation failed. Please check your input.'
                } else {
                    this.error = err?.data?.message || err.message || 'Failed to create project'
                }
                
                if (err?.status === 401) this.handle401()
                throw err
            } finally {
                this.loading = false
            }
        },

        async updateProject(id, formData) {
            this.loading = true
            this.error = null
            this.validationErrors = null

            try {
                const config = useRuntimeConfig()
                const payload = this.normalizeProjectFormData(formData)
                
                // Add _method field for Laravel to interpret as PUT
                payload.set('_method', 'PUT')
                
                // Log what we're sending for debugging
                console.log(`Updating project ${id} with FormData:`)
                for (let pair of payload.entries()) {
                    console.log(pair[0], pair[1])
                }
                
                const response = await $fetch(`${config.public.apiBase}/projects/${id}`, {
                    method: 'POST', // Use POST with _method=PUT
                    headers: this.getHeaders(true),
                    body: payload,
                })

                if (response?.data) {
                    const updated = this.processProject(response.data)
                    const index = this.projects.findIndex((project) => project.id === id)

                    if (index !== -1) {
                        this.projects[index] = updated
                    }
                }

                return response
            } catch (err) {
                console.error('Update project error:', err)
                
                // Capture validation errors
                if (err?.status === 422 && err?.data?.errors) {
                    this.validationErrors = err.data.errors
                    this.error = 'Validation failed. Please check your input.'
                } else {
                    this.error = err?.data?.message || err.message || 'Failed to update project'
                }
                
                if (err?.status === 401) this.handle401()
                throw err
            } finally {
                this.loading = false
            }
        },

        async deleteProject(id) {
            this.loading = true
            this.error = null

            try {
                const config = useRuntimeConfig()
                const response = await $fetch(`${config.public.apiBase}/projects/${id}`, {
                    method: 'DELETE',
                    headers: this.getHeaders(false),
                })

                this.projects = this.projects.filter((project) => project.id !== id)

                return response
            } catch (err) {
                this.error = err?.data?.message || err.message || 'Failed to delete project'
                if (err?.status === 401) this.handle401()
                throw err
            } finally {
                this.loading = false
            }
        }
    },
})
