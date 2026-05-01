<template>
  <div class="min-h-screen text-[#131313] font-mono overflow-x-hidden">

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-screen gap-4">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#131313]"></div>
      <p class="text-[11px] text-[#aaa] tracking-wide">Loading project...</p>
    </div>

    <!-- 404 -->
    <div v-else-if="!project" class="flex flex-col items-center justify-center min-h-screen gap-6 px-6">
      <p class="text-[9px] tracking-[0.3em] uppercase text-[#aaa]">// error.404</p>
      <h1 class="text-6xl sm:text-8xl font-black tracking-tight">
        NOT<br /><span class="text-outline">FOUND</span>
      </h1>
      <p class="text-[11px] text-[#5d5f5f] tracking-wide">→ project module not found in archive</p>
      <NuxtLink to="/projects"
        class="border border-[#131313] px-5 py-2.5 text-[9px] tracking-[0.2em] uppercase font-bold hover:bg-[#131313] hover:text-white transition-all duration-200 group">
        <span class="group-hover:-translate-x-0.5 inline-block transition-transform">←</span>
        back to projects
      </NuxtLink>
    </div>

    <div v-else>
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
        style="background-size:32px 32px; background-image: linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px);">
      </div>
      
      <section class="relative overflow-hidden">

        <!-- Back -->
        <div class="relative z-10 px-4 sm:px-8 md:px-12 pt-6 sm:pt-8">
          <NuxtLink to="/projects"
            class="inline-flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-bold text-[#aaa] hover:text-[#131313] transition-colors duration-200 group">
            <span class="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            back to projects
          </NuxtLink>
        </div>

        <div class="relative z-10 px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16">
          <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">

            <!-- LEFT -->
            <div class="space-y-5 sm:space-y-7 reveal-left order-2 lg:order-1">
              <!-- Meta row -->
              <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                <span
                  class="text-[8px] font-black uppercase tracking-[0.3em] px-2 py-1 border border-[#131313] bg-[#131313] text-white">
                  {{ project.category || 'Project' }}
                </span>
                <span class="text-[8px] sm:text-[9px] text-[#aaa] tracking-widest">ID_{{
                  String(project.id).padStart(3,'0') }}</span>
                <div class="flex-1 h-px bg-[#e0dddc] hidden md:block"></div>
                <span class="text-[8px] sm:text-[9px] text-[#aaa] tracking-widest">{{ project.date }}</span>
              </div>

              <!-- Title -->
              <h1
                class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight uppercase">
                {{ project.title }}
              </h1>

              <!-- Status Badge -->
              <div class="inline-flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full animate-pulse"
                  :class="project.status === 'completed' ? 'bg-[#28c840]' : 'bg-[#febc2e]'"></span>
                <span class="text-[8px] tracking-[0.2em] uppercase text-[#aaa]">{{ project.status === 'completed' ? 'Production Ready' : 'Active Development' }}</span>
              </div>

              <!-- Description -->
              <p class="text-[#5d5f5f] text-xs sm:text-sm leading-relaxed max-w-lg border-l-2 border-[#131313] pl-4">
                {{ project.description || project.desc }}
              </p>

              <!-- Tech stack -->
              <div class="space-y-3 pt-2">
                <p class="text-[9px] tracking-[0.25em] uppercase text-[#aaa] flex items-center gap-2">
                  <span class="w-4 h-px bg-[#e0dddc]"></span>
                  // tech_stack
                </p>
                <div class="flex flex-wrap gap-1.5 sm:gap-2">
                  <span v-for="tech in (project.technologies || [])" :key="tech"
                    class="text-[8px] sm:text-[9px] font-bold border border-[#e0dddc] px-2 sm:px-3 py-1 sm:py-1.5 text-[#5d5f5f] uppercase tracking-widest hover:border-[#131313] hover:text-[#131313] hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Gallery Section -->
              <div v-if="project.gallery && project.gallery.length > 0" class="space-y-3 pt-2">
                <p class="text-[9px] tracking-[0.25em] uppercase text-[#aaa] flex items-center gap-2">
                  <span class="w-4 h-px bg-[#e0dddc]"></span>
                  // gallery
                </p>
                <div class="grid grid-cols-3 gap-2 sm:gap-3">
                  <div v-for="(img, idx) in project.gallery.slice(0, 3)" :key="idx"
                    class="relative aspect-square overflow-hidden border border-[#e0dddc] cursor-pointer group/gallery hover:border-[#131313] transition-all duration-300"
                    @click="openLightbox(idx)">
                    <img :src="getImageUrl(img)" :alt="`${project.title} screenshot ${idx + 1}`"
                      class="w-full h-full object-cover transition-transform duration-500 group-hover/gallery:scale-110" />
                    <div class="absolute inset-0 bg-[#131313]/0 group-hover/gallery:bg-[#131313]/20 transition-all duration-300"></div>
                  </div>
                </div>
              </div>

              <!-- Links -->
              <div class="flex flex-wrap gap-3 pt-4" v-if="project.live_url || project.github_url">
                <a v-if="project.live_url" :href="project.live_url" target="_blank" rel="noopener noreferrer"
                  class="flex items-center gap-2 bg-[#131313] text-white px-4 sm:px-5 py-2.5 text-[9px] tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-[#131313] border border-[#131313] transition-all duration-200 group">
                  <Icon name="ph:arrow-square-out-bold" size="13" class="group-hover:rotate-45 transition-transform" />
                  Live Demo
                </a>
                <a v-if="project.github_url" :href="project.github_url" target="_blank" rel="noopener noreferrer"
                  class="flex items-center gap-2 border border-[#e0dddc] px-4 sm:px-5 py-2.5 text-[9px] tracking-[0.2em] uppercase font-bold text-[#5d5f5f] hover:border-[#131313] hover:text-[#131313] transition-all duration-200">
                  <Icon name="simple-icons:github" size="13" />
                  Source Code
                </a>
              </div>

              <!-- JSDoc -->
              <div class="text-[9px] sm:text-[10px] italic text-[#bbb] leading-[1.7] sm:leading-[1.9] border-l border-[#e0dddc] pl-4 pt-2">
                <p>/**</p>
                <p>&nbsp;* @project &nbsp;{{ project.title }}</p>
                <p>&nbsp;* @category {{ project.category || 'Project' }}</p>
                <p>&nbsp;* @year &nbsp;&nbsp;&nbsp;&nbsp;{{ project.date }}</p>
                <p>&nbsp;* @status &nbsp;&nbsp;{{ project.status === 'completed' ? '✅ stable' : '🚧 wip' }}</p>
                <p>*/</p>
              </div>
            </div>

            <!-- RIGHT: Main image -->
            <div class="reveal-right relative group order-1 lg:order-2">
              <div class="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-full h-full border border-[#e0dddc] transition-all duration-500 group-hover:-top-1 group-hover:-left-1"
                aria-hidden="true"></div>
              <div class="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 w-full h-full border border-[#e0dddc] transition-all duration-500 group-hover:-bottom-1 group-hover:-right-1"
                aria-hidden="true"></div>
              <div class="relative border border-[#131313] overflow-hidden cursor-pointer"
                @click="openLightbox(0)">
                <img :src="getImageUrl(project.image)" :alt="project.title"
                  class="w-full aspect-[4/3] sm:aspect-[16/12] object-cover transition-transform duration-700 group-hover:scale-105"
                  @error="handleImageError" />
                <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.1)_100%)]"></div>
                <div class="absolute top-3 left-3 bg-white/90 border border-[#e0dddc] px-2 py-1 backdrop-blur-sm">
                  <span class="text-[7px] sm:text-[8px] tracking-widest text-[#9e9a98] uppercase">{{ project.slug }}.jpg</span>
                </div>
                <div class="absolute inset-0 bg-[#131313]/0 hover:bg-[#131313]/10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <span class="text-white text-[10px] tracking-[0.2em] uppercase bg-[#131313]/80 px-3 py-1.5">Click to enlarge</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Next Project Preview -->
        <div v-if="nextProject" class="border-t border-[#e0dddc] mt-8">
          <div class="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-12">
            <p class="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[#aaa] text-center mb-4">// next_project</p>
            <NuxtLink :to="`/projects/${nextProject.slug}`"
              class="group flex flex-col md:flex-row items-center justify-between gap-4 p-4 sm:p-6 border border-[#e0dddc] hover:border-[#131313] transition-all duration-300 hover:-translate-y-1">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 sm:w-16 sm:h-16 overflow-hidden border border-[#e0dddc]">
                  <img :src="getImageUrl(nextProject.image)" :alt="nextProject.title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div>
                  <p class="text-[8px] tracking-[0.2em] uppercase text-[#aaa]">{{ nextProject.category || 'Project' }}</p>
                  <h3 class="text-sm sm:text-base font-black uppercase tracking-tight group-hover:text-[#28c840] transition-colors">
                    {{ nextProject.title }}
                  </h3>
                </div>
              </div>
              <div class="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-bold text-[#aaa] group-hover:text-[#131313] group-hover:gap-3 transition-all">
                View Project
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </NuxtLink>
          </div>
        </div>

      </section>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="lightboxIndex !== null" class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          @click="closeLightbox">
          <div class="relative max-w-5xl w-full mx-4" @click.stop>
            <img :src="getImageUrl(project?.gallery?.[lightboxIndex])" alt="Gallery image"
              class="w-full h-auto max-h-[85vh] object-contain border border-white/20" 
              @error="handleImageError" />
            
            <button @click="closeLightbox"
              class="absolute top-4 right-4 w-10 h-10 border border-white/20 hover:border-white/50 text-white flex items-center justify-center transition-all duration-200 hover:rotate-90">
              <Icon name="ph:x-bold" size="20" />
            </button>
            
            <button v-if="project?.gallery?.length > 1" @click="prevImage"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 hover:border-white/50 text-white flex items-center justify-center transition-all duration-200 hover:-translate-x-1">
              <Icon name="ph:caret-left-bold" size="20" />
            </button>
            
            <button v-if="project?.gallery?.length > 1" @click="nextImage"
              class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 hover:border-white/50 text-white flex items-center justify-center transition-all duration-200 hover:translate-x-1">
              <Icon name="ph:caret-right-bold" size="20" />
            </button>
            
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <div v-for="(_, idx) in project?.gallery" :key="idx"
                class="w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer"
                :class="idx === lightboxIndex ? 'bg-white w-3' : 'bg-white/40 hover:bg-white/60'"
                @click="lightboxIndex = idx"></div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Use project store
const projectStore = useProjectStore()
const { projects, loading } = storeToRefs(projectStore)

// Current project
const project = computed(() => {
  if (!projects.value || projects.value.length === 0) return null
  return projects.value.find(p => p.slug === route.params.slug) ?? null
})

// Next project
const nextProject = computed(() => {
  if (!project.value || !projects.value || projects.value.length === 0) return null
  const idx = projects.value.findIndex(p => p.slug === project.value.slug)
  return projects.value[(idx + 1) % projects.value.length]
})

// Helper to get full image URL
const getImageUrl = (path) => {
  if (!path) return null
  
  // If it's already a full URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  // If it's a data URL (base64)
  if (path.startsWith('data:')) {
    return path
  }
  
  // Otherwise, construct the full URL from API
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || 'http://127.0.0.1:8000/api'
  const apiBase = baseUrl.replace('/api', '')
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path
  
  return `${apiBase}/storage/${cleanPath}`
}

// Handle image loading errors
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found'
}

// ── Lightbox ──────────────────────────────────────
const lightboxIndex = ref(null)
const openLightbox = (i) => { 
  if (project.value?.gallery && project.value.gallery.length > 0) {
    lightboxIndex.value = i 
  }
}
const closeLightbox = () => { lightboxIndex.value = null }
const nextImage = () => {
  if (lightboxIndex.value === null || !project.value?.gallery) return
  lightboxIndex.value = (lightboxIndex.value + 1) % project.value.gallery.length
}
const prevImage = () => {
  if (lightboxIndex.value === null || !project.value?.gallery) return
  lightboxIndex.value = (lightboxIndex.value - 1 + project.value.gallery.length) % project.value.gallery.length
}

// ── Keyboard support ──────────────────────────────
const handleKey = (e) => {
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

// Fetch projects on mount
onMounted(async () => {
  window.addEventListener('keydown', handleKey)
  
  try {
    await projectStore.fetchProjects()
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08 }
  )
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
})

// ── SEO ───────────────────────────────────────────
useHead({
  title: computed(() => project.value ? `${project.value.title} — MSB Seth` : 'Project — MSB Seth'),
  meta: computed(() => project.value ? [
    { name: 'description', content: project.value.description || project.value.desc || 'Project details' }
  ] : [])
})
</script>

<style scoped>
*,
*::before,
*::after {
    border-radius: 0 !important;
}

.text-outline {
    -webkit-text-stroke: 2px #131313;
    color: transparent;
}

.reveal-up {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-left {
    opacity: 0;
    transform: translateX(-28px);
    transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-right {
    opacity: 0;
    transform: translateX(28px);
    transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-up.visible,
.reveal-left.visible,
.reveal-right.visible {
    opacity: 1;
    transform: translate(0);
}

.lightbox-enter-active,
.lightbox-leave-active {
    transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
    opacity: 0;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
    .reveal-left,
    .reveal-right {
        transform: translateX(-20px);
    }
    .reveal-right {
        transform: translateX(20px);
    }
}

@media (max-width: 768px) {
    .reveal-left,
    .reveal-right,
    .reveal-up {
        transform: translateY(20px);
    }
    .reveal-left.visible,
    .reveal-right.visible,
    .reveal-up.visible {
        transform: translateY(0);
    }
}

/* Touch-friendly buttons */
@media (max-width: 640px) {
    button, 
    a,
    [role="button"] {
        min-height: 44px;
    }
}
</style>