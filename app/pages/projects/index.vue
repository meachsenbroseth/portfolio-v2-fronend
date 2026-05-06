<template>
  <div
    class="min-h-screen bg-[#fafafa] py-24 px-4 sm:px-8 md:px-12 font-mono selection:bg-[#131313] selection:text-white">
    <!-- Subtle Grain Overlay -->
    <div
      class="fixed inset-0 pointer-events-none opacity-[0.02] z-50 bg-[radial-gradient(circle,#131313_1px,transparent_1px)] bg-[length:18px_18px]">
    </div>

    <div class="max-w-6xl mx-auto relative z-10">

      <!-- Section header / System HUD -->
      <header class="reveal-up mb-16 md:mb-24">
        <div class="flex items-center gap-4 mb-6">
          <span
            class="bg-[#131313] text-white text-[10px] px-2 py-1 font-black uppercase tracking-widest">Archive_01</span>
          <div class="flex-1 h-px bg-[#e0dddc]"></div>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-[#28c840] rounded-full animate-pulse"></span>
            <span class="text-[9px] font-black text-[#131313] uppercase tracking-[0.2em]">Server_Active</span>
          </div>
        </div>

        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 class="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Project<br /><span class="text-[#aaa]">Repository</span>
            </h1>
          </div>
          <div class="text-right">
            <p class="text-[10px] font-bold text-[#aaa] uppercase tracking-[0.3em] mb-1">Total_Modules</p>
            <p class="text-4xl font-black text-[#131313] leading-none">
              {{ projects?.length?.toString().padStart(2, '0') || '00' }}
            </p>
          </div>
        </div>
      </header>

      <!-- Loading State (Terminal Style) -->
      <div v-if="loading" class="border border-[#e0dddc] p-12 flex flex-col items-center justify-center gap-4 bg-white">
        <div class="w-16 h-1 bg-[#e0dddc] overflow-hidden relative">
          <div class="absolute inset-0 bg-[#131313] animate-[loading_1.5s_infinite]"></div>
        </div>
        <span
          class="text-[9px] font-black uppercase tracking-[0.4em] text-[#131313] animate-pulse">Syncing_Nodes...</span>
      </div>

      <!-- ── PROJECT GRID ── -->
      <div v-else-if="projects && projects.length > 0" class="grid gap-px bg-[#e0dddc] border border-[#e0dddc]">
        <div v-for="(item, i) in projects" :key="item.id"
          class="group relative bg-white transition-all duration-500 overflow-hidden"
          :style="`animation-delay:${i * 0.1}s`">
          <div class="flex flex-col lg:flex-row">
            <!-- 1. Metadata Sidebar -->
            <div
              class="lg:w-20 shrink-0 border-b lg:border-b-0 lg:border-r border-[#e0dddc] flex lg:flex-col justify-between items-center p-4 lg:py-8 bg-[#fcfcfc] group-hover:bg-[#131313] transition-colors duration-500">
              <span
                class="text-[10px] font-black text-[#131313] group-hover:text-white lg:vertical-text tracking-widest">
                #{{ String(i + 1).padStart(3, '0') }}
              </span>
              <div class="lg:vertical-text flex items-center gap-2">
                <span
                  class="text-[8px] font-black text-[#aaa] group-hover:text-[#5d5f5f] uppercase tracking-widest">Release:</span>
                <span class="text-[10px] font-bold text-[#131313] group-hover:text-white">{{ item.date || '2026'
                }}</span>
              </div>
            </div>

            <!-- 2. Project Image Area -->
            <div class="lg:w-80 shrink-0 p-6 lg:p-8 flex items-center justify-center bg-[#fafafa]">
              <NuxtLink :to="`/projects/${item.slug}`" class="relative block w-full group/img">
                <!-- Brutalist Shadow -->
                <div
                  class="absolute inset-0 bg-[#131313] translate-x-2 translate-y-2 group-hover/img:translate-x-1 group-hover/img:translate-y-1 transition-transform duration-300">
                </div>
                <div class="relative aspect-video lg:aspect-[4/5] border-2 border-[#131313] overflow-hidden bg-white">
                  <img :src="getImageUrl(item.image)" :alt="`${item.title} project by Meach Senbroseth`"
                    class="w-full h-full object-cover grayscale group-hover/img:grayscale-0 group-hover/img:scale-110 transition-all duration-700"
                    loading="lazy"
                    decoding="async"
                    @error="handleImageError" />
                  <!-- Overlay Category -->
                  <div
                    class="absolute top-2 left-2 bg-[#131313] text-white text-[8px] px-2 py-1 font-black uppercase tracking-widest opacity-0 group-hover/img:opacity-100 transition-opacity">
                    {{ item.category || 'Web_App' }}
                  </div>
                </div>
              </NuxtLink>
            </div>

            <!-- 3. Information Area -->
            <div class="flex-1 p-6 lg:p-10 flex flex-col justify-center border-t lg:border-t-0 border-[#e0dddc]">
              <div class="space-y-6">
                <div class="flex items-center gap-3">
                  <div class="h-2 w-2 bg-[#28c840]"></div>
                  <span class="text-[9px] font-black uppercase tracking-[0.3em] text-[#aaa]">Module_Active</span>
                </div>

                <NuxtLink :to="`/projects/${item.slug}`" class="inline-block group/title">
                  <h2 class="text-3xl md:text-5xl font-black text-[#131313] uppercase tracking-tighter leading-[0.85]">
                    {{ item.title }}
                  </h2>
                  <div class="h-1.5 w-0 bg-[#131313] group-hover/title:w-full transition-all duration-500 mt-2"></div>
                </NuxtLink>

                <p
                  class="text-sm text-[#5d5f5f] leading-relaxed max-w-2xl line-clamp-3 lg:line-clamp-2 hover:line-clamp-none transition-all cursor-help">
                  {{ item.description || item.desc }}
                </p>

                <!-- Technical Specs Chips -->
                <div class="flex flex-wrap items-center gap-y-3 gap-x-6">
                  <div class="flex gap-2">
                    <span v-for="tech in (item.technologies || []).slice(0, 5)" :key="tech"
                      class="text-[9px] font-black text-[#131313] bg-[#f0f0f0] px-2 py-1 uppercase tracking-tighter border border-transparent hover:border-[#131313] transition-all">
                      --{{ tech }}
                    </span>
                  </div>
                </div>

                <!-- Action Links -->
                <div class="flex flex-wrap items-center gap-4 pt-4">
                  <a v-if="item.live_demo" :href="item.live_demo" target="_blank" rel="noopener noreferrer"
                    class="bg-[#131313] text-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:invert transition-all">
                    <ExternalLink class="h-3 w-3" /> Execute_Live
                  </a>
                  <a v-if="item.github_link" :href="item.github_link" target="_blank" rel="noopener noreferrer"
                    class="border-2 border-[#131313] px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-[#131313] hover:text-white transition-all">
                    <Github class="h-4 w-4" /> View_Source
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Animated Accent on Card Hover -->
          <div
            class="absolute bottom-0 left-0 w-full h-1 bg-[#131313] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left">
          </div>
        </div>
      </div>

      <!-- ── EMPTY STATE (Inherited & Refined) ── -->
      <div v-else class="border-4 border-[#131313] overflow-hidden bg-white shadow-[16px_16px_0px_#e0dddc]">
        <!-- Terminal header remains same but with high contrast -->
        <div class="flex items-center justify-between px-5 py-4 bg-[#131313] border-b border-[#131313]">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-red-500 rounded-full"></span>
            <span class="text-[10px] font-black tracking-widest uppercase text-white">Critical_Error:
              404_Archive_Not_Found</span>
          </div>
        </div>

        <div class="grid lg:grid-cols-2">
          <div class="p-12 border-b lg:border-b-0 lg:border-r border-[#e0dddc] flex flex-col justify-center space-y-6">
            <div class="text-[60px] font-black text-[#131313] leading-none tracking-tighter uppercase">No_Data</div>
            <p class="text-sm text-[#5d5f5f] leading-relaxed max-w-sm">
              The project directory is currently empty or the server is undergoing maintenance. Please initiate a manual
              refresh or check back later.
            </p>
            <div class="pt-6">
              <button @click="projectStore.fetchProjects()"
                class="bg-[#131313] text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-[#28c840] transition-colors">
                Re-Scan_Repository
              </button>
            </div>
          </div>
          <div class="bg-[#fafafa] p-12 overflow-hidden flex items-center justify-center relative">
            <img src="/placeholder-project.svg"
              class="w-full grayscale mix-blend-multiply opacity-50"
              alt="Project repository loading animation"
              loading="lazy" />
            <div class="absolute inset-0 flex items-center justify-center">
              <span
                class="text-[10px] font-black bg-white border border-[#131313] px-4 py-2 uppercase animate-bounce">System_Busy</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ExternalLink, Github } from 'lucide-vue-next'

definePageMeta({
  layout: 'default'
})

// Use project store
const projectStore = useProjectStore()
const { projects, loading } = storeToRefs(projectStore)

useSEO({
  title: 'Projects - Laravel, Nuxt.js and Vue Portfolio by Meach Senbroseth',
  description: 'Explore full-stack web projects by Meach Senbroseth, including Laravel applications, Nuxt.js frontends, Vue dashboards, APIs, and production systems built in Cambodia.',
  path: '/projects',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' }
  ],
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Full-stack developer projects',
    description: 'Laravel, Nuxt.js, Vue.js, and full-stack web development portfolio projects.',
    url: useSiteUrl('/projects')
  }
})

await useAsyncData('projects-index', () => projectStore.fetchProjects())

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

</script>

<style scoped>
*,
*::before,
*::after {
  border-radius: 0 !important;
}

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.reveal-up {
  opacity: 0;
  transform: translateY(30px);
  animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom Grayscale for projects */
.grayscale {
  filter: grayscale(100%) brightness(0.9) contrast(1.1);
}
</style>
