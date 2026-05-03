// stores/project.js
import { defineStore } from 'pinia'

const PROJECT_FIELDS = ['title', 'date', 'status', 'desc', 'live_demo', 'github_link']

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

        getHeaders() {
            const token = this.getToken()
            const headers = {
                Accept: 'application/json',
            }

            if (token) {
                headers.Authorization = `Bearer ${token}`
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
            if (typeof path !== 'string') return null
            if (path.startsWith('http')) return path

            const config = useRuntimeConfig()
            const apiBase = config.public.apiBase || ''
            const host = new URL(apiBase).origin

            if (path.startsWith('/storage/')) {
                return `${host}${path}`
            }

            return `${host}/storage/${path.replace(/^\/+/, '')}`
        },

        parseArray(value) {
            if (Array.isArray(value)) return value
            if (!value) return []

            if (typeof value === 'string') {
                try {
                    const parsed = JSON.parse(value)
                    return Array.isArray(parsed) ? parsed : []
                } catch {
                    return []
                }
            }

            return []
        },

        processProject(project) {
            const gallery = this.parseArray(project?.gallery)
            const technologies = this.parseArray(project?.technologies)

            return {
                ...project,
                desc: project.desc ?? '',
                live_demo: project.live_demo ?? '',
                github_link: project.github_link ?? '',
                image: this.getFullImageUrl(project.image),
                raw_gallery: gallery,
                gallery: gallery.map((image) => this.getFullImageUrl(image)),
                technologies,
            }
        },

        extractProjectsResponse(response) {
            const payload = response?.data ?? response
            const paginator = payload?.data?.data ? payload.data : payload
            const items = paginator?.data ?? (Array.isArray(payload) ? payload : [])

            if (paginator?.current_page) {
                this.pagination = {
                    current_page: paginator.current_page,
                    last_page: paginator.last_page,
                    per_page: paginator.per_page,
                    total: paginator.total,
                }
            }

            return Array.isArray(items) ? items : []
        },

        buildProjectFormData(project, method = 'POST') {
            const submitData = new FormData()
            const append = (key, value) => {
                if (value !== null && value !== undefined && value !== '') {
                    submitData.append(key, value)
                }
            }

            PROJECT_FIELDS.forEach((field) => append(field, project[field]))

            this.parseArray(project.technologies).forEach((technology, index) => {
                append(`technologies[${index}]`, technology)
            })

            if (typeof File !== 'undefined' && project.image instanceof File) {
                submitData.append('image', project.image)
            }

            this.parseArray(project.gallery).forEach((image) => {
                if (typeof File !== 'undefined' && image instanceof File) {
                    submitData.append('gallery[]', image)
                }
            })

            if (method === 'PUT') {
                submitData.append('_method', 'PUT')
            }

            return submitData
        },

        handleRequestError(err, fallbackMessage) {
            const status = err?.status || err?.statusCode

            if (status === 422 && err?.data?.errors) {
                this.validationErrors = err.data.errors
                this.error = err?.data?.message || 'Validation failed. Please check your input.'
            } else {
                this.error = err?.data?.message || err.message || fallbackMessage
            }

            if (status === 401) this.handle401()
        },

        async fetchProjects(page = 1) {
            this.loading = true
            this.error = null

            try {
                const config = useRuntimeConfig()
                const response = await $fetch(`${config.public.apiBase}/projects?page=${page}`, {
                    headers: this.getHeaders(),
                })

                this.projects = this.extractProjectsResponse(response).map((project) =>
                    this.processProject(project)
                )

                return this.projects
            } catch (err) {
                this.handleRequestError(err, 'Failed to fetch projects')
                throw err
            } finally {
                this.loading = false
            }
        },

        async createProject(project) {
            this.loading = true
            this.error = null
            this.validationErrors = null

            try {
                const config = useRuntimeConfig()
                const submitData = this.buildProjectFormData(project)

                const response = await $fetch(`${config.public.apiBase}/projects`, {
                    method: 'POST',
                    headers: this.getHeaders(),
                    body: submitData,
                })

                if (response?.data) {
                    this.projects.unshift(this.processProject(response.data))
                }

                return response
            } catch (err) {
                this.handleRequestError(err, 'Failed to create project')
                throw err
            } finally {
                this.loading = false
            }
        },

        async updateProject(id, project) {
            this.loading = true
            this.error = null
            this.validationErrors = null

            try {
                const config = useRuntimeConfig()
                const submitData = this.buildProjectFormData(project, 'PUT')

                const response = await $fetch(`${config.public.apiBase}/projects/${id}`, {
                    method: 'POST',
                    headers: this.getHeaders(),
                    body: submitData,
                })

                if (response?.data) {
                    const updated = this.processProject(response.data)
                    const index = this.projects.findIndex((project) => String(project.id) === String(id))

                    if (index !== -1) {
                        this.projects[index] = updated
                    }
                }

                return response
            } catch (err) {
                this.handleRequestError(err, 'Failed to update project')
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
                    headers: this.getHeaders(),
                })

                this.projects = this.projects.filter((project) => project.id !== id)

                return response
            } catch (err) {
                this.handleRequestError(err, 'Failed to delete project')
                throw err
            } finally {
                this.loading = false
            }
        }
    },
})
