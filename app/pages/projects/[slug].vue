<template>
  <div class="min-h-screen bg-[#fcfcfc] text-[#131313] font-mono selection:bg-[#28c840] selection:text-black">

    <!-- ── TOP NAVIGATION ── -->
    <nav class="hidden sm:flex sticky top-0 z-50 bg-white border-b-4 border-[#131313] px-4 sm:px-6 py-3 sm:py-4 justify-between items-center">
      <!-- Left Side: Navigation & Breadcrumb -->
      <div class="flex items-center gap-3 sm:gap-6">
        <NuxtLink to="/projects"
          class="group flex items-center px-2 sm:px-3 py-1.5 hover:bg-[#131313] hover:text-white transition-all duration-200">
          <span
            class="text-[#131313] group-hover:text-white text-sm sm:text-base group-hover:-translate-x-1 transition-transform">←</span>
          <span class="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] ml-1 sm:ml-0">Exit_Archive</span>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-2 text-[#aaa]">
          <span class="text-[10px]">/</span>
          <span class="text-[10px] font-black uppercase tracking-widest text-[#131313]">
            Project_{{ loading ? '...' : project?.slug }}
          </span>
        </div>
      </div>
    </nav>

    <!-- ── SKELETON ── -->
    <div v-if="loading" class="max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-52px)]">

      <!-- Rail skeleton -->
      <aside class="lg:w-80 border-r-2 border-[#e0dddc] p-6 sm:p-8 bg-[#fafafa] flex flex-col gap-8 sm:gap-10">
        <!-- ID -->
        <div class="flex flex-col gap-3">
          <div class="h-2.5 w-16 bg-[#e0dddc] animate-pulse" />
          <div class="h-8 sm:h-10 w-20 sm:w-24 bg-[#e0dddc] animate-pulse" />
        </div>
        <!-- Status -->
        <div class="flex flex-col gap-3">
          <div class="h-2.5 w-28 bg-[#e0dddc] animate-pulse" />
          <div class="border-2 border-[#e0dddc] p-4 flex flex-col gap-2">
            <div class="h-2.5 w-16 bg-[#e0dddc] animate-pulse" />
            <div class="h-2.5 w-36 bg-[#eeeceb] animate-pulse" />
          </div>
        </div>
        <!-- Tech -->
        <div class="flex flex-col gap-3">
          <div class="h-2.5 w-32 bg-[#e0dddc] animate-pulse" />
          <div v-for="i in 4" :key="i" class="flex justify-between border-b border-[#e0dddc] pb-2">
            <div class="h-2.5 bg-[#eeeceb] animate-pulse" :style="`width:${60 + i * 12}px`" />
            <div class="h-2.5 w-12 bg-[#f0eeec] animate-pulse" />
          </div>
        </div>
        <!-- Buttons -->
        <div class="flex flex-col gap-2 pt-4">
          <div class="h-11 bg-[#e0dddc] animate-pulse" />
          <div class="h-11 border-2 border-[#e0dddc]" />
        </div>
      </aside>

      <!-- Main skeleton -->
      <main class="flex-1 p-6 sm:p-8 md:p-12 lg:p-20 bg-white flex flex-col gap-10 sm:gap-14">
        <!-- Title block -->
        <div class="flex flex-col gap-3 sm:gap-4">
          <div class="h-3 w-36 sm:w-44 bg-[#e0dddc] animate-pulse" />
          <div class="h-10 sm:h-14 w-4/5 bg-[#e0dddc] animate-pulse" />
          <div class="h-10 sm:h-14 w-2/5 bg-[#eeeceb] animate-pulse" />
          <div class="h-1 w-16 sm:w-20 bg-[#28c840] opacity-30" />
          <div class="h-3 w-80 sm:w-96 bg-[#eeeceb] animate-pulse" style="animation-delay:0.1s" />
          <div class="h-3 w-64 sm:w-80 bg-[#f0eeec] animate-pulse" style="animation-delay:0.15s" />
          <div class="h-3 w-48 sm:w-64 bg-[#f5f3f2] animate-pulse" style="animation-delay:0.2s" />
        </div>

        <!-- Image skeleton with shimmer -->
        <div class="border-2 border-[#e0dddc] overflow-hidden relative">
          <div class="aspect-video bg-[#eeeceb] relative overflow-hidden">
            <div
              class="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>

        <!-- Two-col skeleton -->
        <div class="grid md:grid-cols-2 gap-8 sm:gap-10 border-t-2 border-[#e0dddc] pt-10 sm:pt-12">
          <div class="flex flex-col gap-4">
            <div class="h-2.5 w-20 sm:w-24 bg-[#e0dddc] animate-pulse" />
            <div class="border-l-4 border-[#e0dddc] bg-[#f9f9f9] p-4 sm:p-5 flex flex-col gap-3">
              <div v-for="i in 5" :key="i" class="h-2.5 bg-[#eeeceb] animate-pulse" :style="`width:${70 + i * 5}%`" />
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <div class="h-2.5 w-16 sm:w-20 bg-[#e0dddc] animate-pulse" />
            <div class="grid grid-cols-3 gap-2">
              <div v-for="i in 3" :key="i" class="aspect-square bg-[#eeeceb] animate-pulse border border-[#e0dddc]" />
            </div>
          </div>
        </div>

        <!-- EOF skeleton -->
        <div class="pt-8 flex flex-col gap-4 border-t border-[#e8e6e4]">
          <div class="flex justify-between">
            <div class="h-2.5 w-16 sm:w-20 bg-[#e0dddc] animate-pulse" />
            <div class="h-2.5 w-20 sm:w-24 bg-[#e0dddc] animate-pulse" />
          </div>
          <div class="h-8 w-48 sm:w-64 bg-[#e0dddc] animate-pulse" />
        </div>
      </main>
    </div>

    <!-- ── PROJECT DETAIL ── -->
    <div v-else-if="project" class="max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-52px)]">

      <!-- ── LEFT RAIL ── -->
      <aside
        class="hidden lg:block lg:w-80 border-r-2 border-[#131313] p-6 sm:p-8 lg:sticky lg:top-[52px] lg:h-[calc(100vh-52px)] overflow-y-auto bg-[#fafafa]">
        <div class="space-y-8 sm:space-y-10">

          <!-- Project ID -->
          <div class="space-y-2">
            <p class="text-[9px] font-black text-[#aaa] uppercase tracking-[0.3em]">// REF_ID</p>
            <div class="text-4xl sm:text-5xl font-black italic tracking-tighter">#{{ String(project.id).padStart(3, '0') }}</div>
          </div>

          <!-- Status -->
          <div class="space-y-3">
            <p class="text-[9px] font-black text-[#aaa] uppercase tracking-[0.3em]">// DEPLOYMENT_STATUS</p>
            <div class="border-2 border-[#131313] p-4 bg-white shadow-[4px_4px_0px_#131313]">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-2 h-2 bg-[#28c840] animate-pulse"></div>
                <span class="text-[9px] font-black uppercase tracking-widest">{{ project.status || 'STABLE' }}</span>
              </div>
              <p class="text-[9px] text-[#5d5f5f] leading-relaxed">
                Live production environment active in {{ project.date }}.
              </p>
            </div>
          </div>

          <!-- Category + Year chips -->
          <div class="space-y-3">
            <p class="text-[9px] font-black text-[#aaa] uppercase tracking-[0.3em]">// METADATA</p>
            <div class="flex flex-wrap gap-2">
              <span v-if="project.category"
                class="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-[#131313] text-white">
                {{ project.category }}
              </span>
              <span v-if="project.date"
                class="text-[9px] font-black uppercase tracking-widest px-2 py-1 border border-[#e0dddc] text-[#5d5f5f]">
                {{ project.date }}
              </span>
            </div>
          </div>

          <!-- Tech Stack -->
          <div class="space-y-3">
            <p class="text-[9px] font-black text-[#aaa] uppercase tracking-[0.3em]">// CORE_DEPENDENCIES</p>
            <div class="flex flex-col gap-0">
              <div v-for="tech in project.technologies" :key="tech"
                class="flex items-center justify-between text-[9px] font-bold border-b border-[#e0dddc] py-2 group hover:border-[#131313] transition-colors">
                <span class="text-[#5d5f5f] group-hover:text-[#131313] transition-colors">{{ tech }}</span>
                <span class="text-[#aaa] text-[8px]">v.latest</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-8 space-y-3">
            <a v-if="project.live_url" :href="project.live_url" target="_blank"
              class="block w-full bg-[#131313] text-white text-center py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#28c840] hover:text-black transition-all">
              Execute_Live_Preview
            </a>
            <a v-if="project.github_url" :href="project.github_url" target="_blank"
              class="block w-full border-2 border-[#131313] text-center py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#f0f0f0] transition-all">
              View_Source_Tree
            </a>
          </div>

        </div>
      </aside>

      <!-- ── MAIN CONTENT ── -->
      <main class="flex-1 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-white relative">

        <!-- Crosshairs - hidden on mobile, visible on larger screens -->
        <span class="hidden sm:block absolute top-6 left-6 text-[#e0dddc] text-xs select-none">+</span>
        <span class="hidden sm:block absolute top-6 right-6 text-[#e0dddc] text-xs select-none">+</span>
        <span class="hidden sm:block absolute bottom-6 left-6 text-[#e0dddc] text-xs select-none">+</span>
        <span class="hidden sm:block absolute bottom-6 right-6 text-[#e0dddc] text-xs select-none">+</span>

        <div class="max-w-4xl space-y-12 sm:space-y-16">

          <!-- ── Header ── -->
          <section class="space-y-4 sm:space-y-6 reveal-up">
            <p class="text-[9px] font-black text-[#aaa] uppercase tracking-[0.3em]">
              // PROJECT_MODULE → {{ String(project.id).padStart(3, '0') }}
            </p>
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.82]">
              {{ project.title }}
            </h1>
            <div class="h-1 w-16 sm:w-20 bg-[#28c840]" style="animation-delay:0.1s" />
            <p class="text-sm sm:text-base md:text-lg font-bold text-[#5d5f5f] leading-relaxed max-w-2xl"
              style="animation-delay:0.2s">
              {{ project.description || project.desc }}
            </p>
          </section>

          <!-- ── Main Image ── -->
          <section class="reveal-up" style="animation-delay:0.25s">
            <div class="relative border-2 border-[#131313] bg-[#f0f0f0] group">
              <div
                class="absolute -top-px left-4 sm:left-6 bg-white px-2 sm:px-3 py-1 border border-[#131313] text-[7px] sm:text-[8px] font-black uppercase tracking-widest z-10 -translate-y-1/2 whitespace-nowrap">
                Primary_Interface_Capture
              </div>
              <div class="overflow-hidden p-2">
                <img :src="getImageUrl(project.image)"
                  class="w-full grayscale hover:grayscale-0 transition-all duration-1000 cursor-zoom-in"
                  @click="openLightbox(0)">
              </div>
            </div>
          </section>

          <!-- ── Overview + Gallery ── -->
          <section class="grid md:grid-cols-2 gap-8 sm:gap-12 border-t-2 border-[#131313] pt-10 sm:pt-14 reveal-up"
            style="animation-delay:0.3s">

            <!-- JSDoc overview -->
            <div class="space-y-4 sm:space-y-5">
              <h3 class="text-[9px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <span class="w-6 sm:w-8 h-px bg-[#131313]"></span> 01_OVERVIEW
              </h3>
              <div
                class="font-mono text-[10px] sm:text-[11px] leading-[1.7] sm:leading-[1.9] text-[#5d5f5f] bg-[#f9f9f9] p-4 sm:p-5 border-l-4 border-[#28c840]">
                <p>/**</p>
                <p>&nbsp;* @project {{ project.title }}</p>
                <p>&nbsp;* @built_with {{ project.technologies?.join(', ') }}</p>
                <p>&nbsp;* @year {{ project.date }}</p>
                <p>&nbsp;* @status {{ project.status || 'live' }}</p>
                <p>*/</p>
              </div>
            </div>

            <!-- Gallery grid -->
            <div class="space-y-4 sm:space-y-5">
              <h3 class="text-[9px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <span class="w-6 sm:w-8 h-px bg-[#131313]"></span> 02_GALLERY
              </h3>
              <div v-if="project.gallery?.length" class="grid grid-cols-3 gap-2">
                <div v-for="(img, idx) in project.gallery.slice(0, 6)" :key="idx"
                  class="aspect-square border border-[#e0dddc] overflow-hidden transition-all duration-500 cursor-pointer group relative"
                  @click="openLightbox(idx)">
                  <img :src="getImageUrl(img)" class="w-full h-full object-cover">
                </div>
              </div>
              <div v-else class="border border-dashed border-[#e0dddc] aspect-video flex items-center justify-center">
                <span class="text-[9px] text-[#aaa] font-black uppercase tracking-widest">No_Gallery_Data</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>

    <!-- ── NOT FOUND ── -->
    <div v-else class="flex items-center justify-center min-h-[calc(100vh-52px)] px-4">
      <div class="text-center space-y-4">
        <p class="text-[9px] font-black text-[#aaa] uppercase tracking-[0.3em]">// ERROR_404</p>
        <div class="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter">Not_Found</div>
        <NuxtLink to="/projects"
          class="inline-block mt-6 bg-[#131313] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-[9px] font-black uppercase tracking-widest hover:bg-[#28c840] hover:text-black transition-all">
          ← Back_to_Archive
        </NuxtLink>
      </div>
    </div>

    <!-- ── LIGHTBOX ── -->
    <Teleport to="body">
      <div v-if="lightboxIndex !== null" class="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
        @click.self="closeLightbox">
        <div class="relative max-w-5xl w-full">
          <button @click="closeLightbox"
            class="absolute -top-8 sm:-top-10 right-0 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:text-[#28c840] transition-colors">
            ✕ Close_Viewer
          </button>
          <img :src="getImageUrl(project.gallery?.[lightboxIndex] ?? project.image)"
            class="w-full border-2 border-white" @error="handleImageError" />
          <div class="flex items-center justify-between mt-4">
            <button @click="prevImage"
              class="text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:text-[#28c840] transition-colors">
              ← Prev
            </button>
            <span class="text-[9px] text-[#aaa] font-black uppercase tracking-widest">
              {{ lightboxIndex + 1 }} / {{ project.gallery?.length ?? 1 }}
            </span>
            <button @click="nextImage"
              class="text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:text-[#28c840] transition-colors">
              Next →
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

const route = useRoute()
const siteUrl = useSiteUrl('/')

const projectStore = useProjectStore()
const { projects, loading } = storeToRefs(projectStore)

await useAsyncData(`project-${route.params.slug}`, () => projectStore.fetchProjects())

const project = computed(() =>
  projects.value?.find(p => p.slug === route.params.slug) ?? null
)

const nextProject = computed(() => {
  if (!project.value || !projects.value?.length) return null
  const idx = projects.value.findIndex(p => p.slug === project.value.slug)
  return projects.value[(idx + 1) % projects.value.length]
})

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

// Lightbox
const lightboxIndex = ref(null)
const openLightbox = (i) => { lightboxIndex.value = i }
const closeLightbox = () => { lightboxIndex.value = null }
const nextImage = () => {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value + 1) % (project.value?.gallery?.length ?? 1)
}
const prevImage = () => {
  if (lightboxIndex.value === null) return
  const len = project.value?.gallery?.length ?? 1
  lightboxIndex.value = (lightboxIndex.value - 1 + len) % len
}

const handleKey = (e) => {
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(async () => {
  window.addEventListener('keydown', handleKey)

  try {
    await projectStore.fetchProjects()
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  }

  const observer = new IntersectionObserver(
    (entries) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }),
    { threshold: 0.08 }
  )
  document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el))
})

onUnmounted(() => window.removeEventListener('keydown', handleKey))

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

.reveal-up {
  opacity: 0;
  transform: translateY(24px);
  animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(200%);
  }
}
</style>
