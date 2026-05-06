<template>
  <div class="min-h-screen bg-[#fcfcfc] text-[#131313] font-mono selection:bg-[#28c840] selection:text-black">

    <!-- ── TOP NAVIGATION ── -->
    <nav class="sticky top-0 z-50 bg-white border-b-2 border-[#131313] px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-6">
        <NuxtLink to="/projects" class="group flex items-center gap-2">
          <span class="text-lg group-hover:-translate-x-1 transition-transform">←</span>
          <span class="text-[10px] font-black uppercase tracking-[0.2em]">Exit_Archive</span>
        </NuxtLink>
        <div class="hidden md:flex items-center gap-2 text-[#aaa]">
          <span class="text-[10px]">/</span>
          <span class="text-[10px] font-bold uppercase tracking-widest">Project_{{ project?.slug }}</span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="hidden sm:block h-2 w-32 bg-[#e0dddc] relative overflow-hidden">
          <div class="absolute inset-y-0 left-0 bg-[#28c840] w-2/3"></div>
        </div>
        <span class="text-[9px] font-black uppercase tracking-widest">System_Integrity: 100%</span>
      </div>
    </nav>

    <div v-if="project" class="max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-[calc(100-68px)]">

      <!-- ── LEFT RAIL: METADATA (Sticky) ── -->
      <aside
        class="lg:w-80 border-r-2 border-[#131313] p-8 lg:sticky lg:top-[68px] lg:h-[calc(100vh-68px)] overflow-y-auto bg-[#fafafa]">
        <div class="space-y-12">
          <!-- Project ID Module -->
          <div class="space-y-4">
            <p class="text-[10px] font-black text-[#aaa] uppercase tracking-[0.3em]">// REF_ID</p>
            <div class="text-4xl font-black italic tracking-tighter">#{{ String(project.id).padStart(3, '0') }}</div>
          </div>

          <!-- Status Indicator -->
          <div class="space-y-4">
            <p class="text-[10px] font-black text-[#aaa] uppercase tracking-[0.3em]">// DEPLOYMENT_STATUS</p>
            <div class="border-2 border-[#131313] p-4 bg-white shadow-[4px_4px_0px_#131313]">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-2 h-2 rounded-full bg-[#28c840] animate-pulse"></div>
                <span class="text-[10px] font-black uppercase">{{ project.status || 'STABLE' }}</span>
              </div>
              <p class="text-[9px] text-[#5d5f5f] leading-tight">Live production environment active in {{ project.date
                }}.</p>
            </div>
          </div>

          <!-- Technology Stack -->
          <div class="space-y-4">
            <p class="text-[10px] font-black text-[#aaa] uppercase tracking-[0.3em]">// CORE_DEPENDENCIES</p>
            <div class="flex flex-col gap-2">
              <div v-for="tech in project.technologies" :key="tech"
                class="flex items-center justify-between text-[10px] font-bold border-b border-[#e0dddc] pb-2 group hover:border-[#131313] transition-colors">
                <span class="text-[#5d5f5f] group-hover:text-[#131313]">{{ tech }}</span>
                <span class="text-[#aaa] text-[8px]">v.latest</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-8 space-y-3">
            <a v-if="project.live_demo" :href="project.live_demo" target="_blank" rel="noopener noreferrer"
              class="block w-full bg-[#131313] text-white text-center py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#28c840] hover:text-black transition-all">
              Execute_Live_Preview
            </a>
            <a v-if="project.github_link" :href="project.github_link" target="_blank" rel="noopener noreferrer"
              class="block w-full border-2 border-[#131313] text-center py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#f0f0f0] transition-all">
              View_Source_Tree
            </a>
          </div>
        </div>
      </aside>

      <!-- ── MAIN CONTENT: THE SCHEMATIC ── -->
      <main class="flex-1 p-6 sm:p-12 md:p-20 lg:p-24 bg-white relative">
        <!-- Background Cross-hairs -->
        <div class="absolute top-10 left-10 text-[#e0dddc] text-xs">+</div>
        <div class="absolute top-10 right-10 text-[#e0dddc] text-xs">+</div>
        <div class="absolute bottom-10 left-10 text-[#e0dddc] text-xs">+</div>
        <div class="absolute bottom-10 right-10 text-[#e0dddc] text-xs">+</div>

        <div class="max-w-4xl space-y-20">

          <!-- Header -->
          <section class="space-y-8">
            <h1 class="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] reveal-up">
              {{ project.title }}
            </h1>
            <div class="h-1 w-32 bg-[#28c840] reveal-up" style="animation-delay: 0.1s"></div>
            <p class="text-xl md:text-2xl font-bold text-[#5d5f5f] leading-relaxed max-w-2xl reveal-up"
              style="animation-delay: 0.2s">
              {{ project.description || project.desc }}
            </p>
          </section>

          <!-- Main Visual Block -->
          <section class="reveal-up" style="animation-delay: 0.3s">
            <div class="relative border-2 border-[#131313] bg-[#f0f0f0] group">
              <div
                class="absolute -top-3 left-6 bg-white px-3 py-1 border border-[#131313] text-[9px] font-black uppercase tracking-widest z-10">
                Primary_Interface_Capture
              </div>
              <div class="overflow-hidden p-2">
                <img :src="getImageUrl(project.image)"
                  class="w-full grayscale hover:grayscale-0 transition-all duration-1000 cursor-zoom-in"
                  :alt="`${project.title} full-stack web project screenshot`"
                  loading="eager"
                  fetchpriority="high"
                  @click="openLightbox(0)">
              </div>
            </div>
          </section>

          <!-- System Overview (JSDoc Style) -->
          <section class="grid md:grid-cols-2 gap-12 border-t-2 border-[#131313] pt-16">
            <div class="space-y-6">
              <h3 class="text-xs font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <span class="w-8 h-px bg-[#131313]"></span> 01_OVERVIEW
              </h3>
              <div
                class="font-mono text-sm leading-relaxed text-[#5d5f5f] bg-[#f9f9f9] p-6 border-l-4 border-[#28c840]">
                <p>/**</p>
                <p>&nbsp;* Built with: {{ project.technologies?.join(', ') }}</p>
                <p>&nbsp;* Environment: Production/Linux</p>
                <p>&nbsp;* Architecture: MVC / Microservices</p>
                <p>&nbsp;*/</p>
              </div>
            </div>

            <div class="space-y-6">
              <h3 class="text-xs font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <span class="w-8 h-px bg-[#131313]"></span> 02_GALLERY
              </h3>
              <div class="grid grid-cols-3 gap-2">
                <div v-for="(img, idx) in project.gallery?.slice(0, 3)" :key="idx"
                  class="aspect-square border border-[#e0dddc] overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer"
                  @click="openLightbox(idx)">
                  <img :src="getImageUrl(img)" class="w-full h-full object-cover"
                    :alt="`${project.title} gallery screenshot ${idx + 1}`"
                    loading="lazy"
                    decoding="async">
                </div>
              </div>
            </div>
          </section>

          <!-- Footer: Sequence -->
          <section class="pt-20">
            <div class="flex items-center justify-between border-b border-[#e0dddc] pb-4 mb-8">
              <span class="text-[9px] font-black uppercase tracking-widest text-[#aaa]">End_of_File</span>
              <span class="text-[9px] font-black uppercase tracking-widest text-[#aaa]">Next_Module</span>
            </div>
            <NuxtLink :to="`/projects/${nextProject.slug}`" class="group flex items-center justify-between">
              <h4 class="text-3xl font-black uppercase tracking-tighter group-hover:text-[#28c840] transition-colors">
                {{ nextProject.title }}
              </h4>
              <span class="text-2xl group-hover:translate-x-2 transition-transform">→</span>
            </NuxtLink>
          </section>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const siteUrl = useSiteUrl('/')

// Use project store
const projectStore = useProjectStore()
const { projects, loading } = storeToRefs(projectStore)

await useAsyncData(`project-${route.params.slug}`, () => projectStore.fetchProjects())

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
  if (!path) return '/placeholder-project.svg'

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
  if (!config.public.apiBase) return '/placeholder-project.svg'

  const baseUrl = config.public.apiBase
  const apiBase = baseUrl.replace('/api', '')

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path

  return `${apiBase}/storage/${cleanPath}`
}

// Handle image loading errors
const handleImageError = (event) => {
  event.target.src = '/placeholder-project.svg'
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

onMounted(async () => {
  window.addEventListener('keydown', handleKey)

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
useSEO({
  title: computed(() => project.value
    ? `${project.value.title} - Laravel, Nuxt.js and Full-Stack Project`
    : 'Project - Full-Stack Developer Portfolio by Meach Senbroseth'
  ),
  description: computed(() => project.value
    ? `${project.value.description || project.value.desc || 'Full-stack web development project by Meach Senbroseth.'}`.slice(0, 155)
    : 'Full-stack portfolio project by Meach Senbroseth, Laravel and Nuxt.js developer in Phnom Penh, Cambodia.'
  ),
  path: computed(() => `/projects/${route.params.slug}`),
  image: computed(() => project.value?.image),
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: project.value?.title || 'Project', path: `/projects/${route.params.slug}` }
  ]),
  jsonLd: computed(() => project.value ? createProjectSchema(project.value, siteUrl) : null)
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
  transform: translateY(20px);
  animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
