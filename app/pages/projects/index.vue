<template>
  <div
    class="min-h-screen bg-[#fafafa] py-24 px-4 sm:px-8 md:px-12 font-mono selection:bg-[#131313] selection:text-white">
    <!-- Subtle Grain Overlay -->
    <div
      class="fixed inset-0 pointer-events-none opacity-[0.02] z-50 bg-[radial-gradient(circle,#131313_1px,transparent_1px)] bg-[length:18px_18px]">
    </div>

    <!-- Top fetching progress bar (shown while fetching with data already on screen) -->
    <div v-if="isFetching" class="fixed top-0 inset-x-0 h-1 z-[60] bg-[#e0dddc] overflow-hidden" role="progressbar"
      aria-label="Fetching projects">
      <div class="fetch-bar h-full w-1/3 bg-[#28c840]"></div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10">

      <!-- Section header / System HUD -->
      <header class="reveal-up mb-16 md:mb-24">
        <div class="flex items-center gap-4 mb-6">
          <span
            class="bg-[#131313] text-white text-[10px] px-2 py-1 font-black uppercase tracking-widest">Archive_01</span>
          <div class="flex-1 h-px bg-[#e0dddc]"></div>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 animate-pulse" :class="loading ? 'bg-[#febc2e]' : 'bg-[#28c840]'"></span>
            <span class="text-[9px] font-black text-[#131313] uppercase tracking-[0.2em]">
              {{ loading ? 'Fetching_Data' : 'Server_Active' }}
            </span>
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
              {{ isInitialLoading ? '--' : (pagination.total || projects?.length || 0).toString().padStart(2, '0') }}
            </p>
          </div>
        </div>
      </header>

      <!-- ── SKELETON LOADING STATE (initial load, nothing to show yet) ── -->
      <div v-if="isInitialLoading" class="grid gap-px bg-[#e0dddc] border border-[#e0dddc]" aria-busy="true">
        <div v-for="i in 3" :key="i" class="bg-white">
          <div class="flex flex-col lg:flex-row">

            <!-- Metadata sidebar skeleton -->
            <div
              class="lg:w-20 shrink-0 border-b lg:border-b-0 lg:border-r border-[#e0dddc] flex lg:flex-col justify-between items-center p-4 lg:py-8 bg-[#fcfcfc]">
              <div class="h-3 w-8 bg-[#e0dddc] animate-pulse" />
              <div class="h-3 w-10 bg-[#eeeceb] animate-pulse" />
            </div>

            <!-- Image area skeleton -->
            <div class="lg:w-80 shrink-0 p-6 lg:p-8 flex items-center justify-center bg-[#fafafa]">
              <div class="relative w-full">
                <!-- Static brutalist shadow -->
                <div class="absolute inset-0 bg-[#e0dddc] translate-x-2 translate-y-2" />
                <div
                  class="relative aspect-video lg:aspect-[4/5] border-2 border-[#e0dddc] bg-[#f5f3f2] overflow-hidden">
                  <!-- Shimmer sweep -->
                  <div
                    class="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
              </div>
            </div>

            <!-- Information area skeleton -->
            <div
              class="flex-1 p-6 lg:p-10 flex flex-col justify-center border-t lg:border-t-0 border-[#e0dddc] space-y-6">

              <!-- Status chip -->
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-[#e0dddc]" />
                <div class="h-2.5 w-28 bg-[#eeeceb] animate-pulse" />
              </div>

              <!-- Title skeleton — two lines -->
              <div class="space-y-3">
                <div class="h-9 w-4/5 bg-[#e0dddc] animate-pulse" :style="`animation-delay:${i * 0.1}s`" />
                <div class="h-9 w-2/5 bg-[#eeeceb] animate-pulse" :style="`animation-delay:${i * 0.1 + 0.05}s`" />
                <div class="h-1.5 w-16 bg-[#e0dddc]" />
              </div>

              <!-- Description lines -->
              <div class="space-y-2 max-w-2xl">
                <div class="h-3 w-full bg-[#f0eeec] animate-pulse" :style="`animation-delay:${i * 0.1 + 0.1}s`" />
                <div class="h-3 w-11/12 bg-[#f0eeec] animate-pulse" :style="`animation-delay:${i * 0.1 + 0.15}s`" />
                <div class="h-3 w-3/4 bg-[#f5f3f2] animate-pulse" :style="`animation-delay:${i * 0.1 + 0.2}s`" />
              </div>

              <!-- Tech chip row -->
              <div class="flex gap-2 flex-wrap">
                <div v-for="j in 4" :key="j" class="h-6 bg-[#f0eeec] animate-pulse border border-[#e0dddc]"
                  :style="`width:${48 + j * 10}px; animation-delay:${i * 0.1 + j * 0.05}s`" />
              </div>

              <!-- CTA buttons -->
              <div class="flex gap-4 pt-4">
                <div class="h-11 w-36 bg-[#e0dddc] animate-pulse" />
                <div class="h-11 w-32 bg-[#f0eeec] animate-pulse border-2 border-[#e0dddc]" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ── PROJECT GRID ── -->
      <div v-else-if="projects && projects.length > 0" class="relative" :aria-busy="loading">

        <!-- Fetching badge (page change / re-fetch with data on screen) -->
        <div v-if="isFetching"
          class="absolute inset-x-0 top-0 z-20 flex justify-center pt-8 pointer-events-none">
          <div
            class="bg-[#131313] text-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-[6px_6px_0px_#28c840]">
            <span class="w-3 h-3 border-2 border-white border-t-transparent animate-spin inline-block"></span>
            Fetching_Data...
          </div>
        </div>

        <div class="grid gap-px bg-[#e0dddc] border border-[#e0dddc] transition-opacity duration-200"
          :class="isFetching ? 'opacity-40 pointer-events-none select-none' : 'opacity-100'">
          <div v-for="(item, i) in projects" :key="item.id"
            class="relative bg-white"
            :style="`animation-delay:${i * 0.1}s`">
            <div class="flex flex-col lg:flex-row">

              <!-- 1. Metadata Sidebar -->
              <div
                class="lg:w-20 shrink-0 border-b lg:border-b-0 lg:border-r border-[#e0dddc] flex lg:flex-col justify-between items-center p-4 lg:py-8 bg-[#fcfcfc]">
                <span class="text-[10px] font-black text-[#131313] lg:vertical-text tracking-widest">
                  #{{ String(i + 1).padStart(3, '0') }}
                </span>
                <div class="lg:vertical-text flex items-center gap-2">
                  <span
                    class="text-[8px] font-black text-[#aaa] uppercase tracking-widest">Release:</span>
                  <span class="text-[10px] font-bold text-[#131313]">{{ item.date || '2026' }}</span>
                </div>
              </div>

              <!-- 2. Project Image Area -->
              <div class="lg:w-80 shrink-0 p-6 lg:p-8 flex items-center justify-center bg-[#fafafa]">
                <NuxtLink :to="`/projects/${item.slug}`" class="relative block w-full">
                  <!-- Static Brutalist Shadow -->
                  <div class="absolute inset-0 bg-[#131313] translate-x-2 translate-y-2"></div>
                  <div class="relative aspect-video lg:aspect-[4/5] border-2 border-[#131313] overflow-hidden bg-white">
                    <img :src="projectStore.getFullImageUrl(item.image) || placeholderImage" :alt="`${item.title} project by Meach Senbroseth`"
                      class="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      @error="handleImageError" />
                    <div
                      class="absolute top-2 left-2 bg-[#131313] text-white text-[8px] px-2 py-1 font-black uppercase tracking-widest">
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
                    <!-- Simple static accent line -->
                    <div class="h-1.5 w-16 bg-[#28c840] mt-2"></div>
                  </NuxtLink>
                  <div class="flex flex-wrap items-center gap-y-3 gap-x-6">
                    <div class="flex gap-2">
                      <span v-for="tech in (item.technologies || []).slice(0, 5)" :key="tech"
                        class="text-[9px] font-black text-[#131313] bg-[#f0f0f0] px-2 py-1 uppercase tracking-tighter border border-[#e0dddc]">
                        --{{ tech }}
                      </span>
                    </div>
                  </div>

                  <div class="flex flex-wrap items-center gap-4 pt-4">
                    <a v-if="item.live_demo" :href="item.live_demo" target="_blank" rel="noopener noreferrer"
                      class="bg-[#131313] text-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-[#28c840] hover:text-black transition-colors">
                      <ExternalLink class="h-3 w-3" /> Execute_Live
                    </a>
                    <a v-if="item.github_link" :href="item.github_link" target="_blank" rel="noopener noreferrer"
                      class="border-2 border-[#131313] px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-[#131313] hover:text-white transition-colors">
                      <Github class="h-4 w-4" /> View_Source
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── EMPTY STATE ── -->
      <div v-else class="border-2 border-[#131313] overflow-hidden bg-white shadow-[12px_12px_0px_#e0dddc]">

        <!-- Header bar -->
        <div class="flex items-center justify-between px-4 py-2.5 bg-[#131313]">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 bg-[#ff5f57] inline-block"></span>
            <span class="text-[10px] font-black tracking-[0.2em] uppercase text-white">
              Critical_Error: 404_Archive_Not_Found
            </span>
          </div>
          <span class="text-[9px] font-bold tracking-[0.2em] text-[#555] uppercase">Exit_Code: NULL</span>
        </div>

        <div class="grid lg:grid-cols-2">

          <!-- LEFT: info -->
          <div class="p-10 border-b lg:border-b-0 lg:border-r border-[#e0dddc] flex flex-col gap-5 justify-center">
            <p class="text-[10px] font-black tracking-[0.3em] uppercase text-[#aaa]">// system.error →
              project_repository</p>

            <div>
              <p class="text-[10px] font-black tracking-[0.2em] uppercase text-[#aaa] mb-2">Status</p>
              <div class="text-[52px] font-black leading-none tracking-[-0.04em] uppercase">
                No_Data<span class="text-[#e0dddc]">.</span>
              </div>
            </div>

            <p class="text-xs text-[#5d5f5f] leading-relaxed max-w-[260px]">
              The project directory returned an empty payload. The repository may be uninitialised or data nodes are
              currently offline.
            </p>

            <!-- Meta rows -->
            <div class="border-t border-b border-[#e0dddc] py-4 flex flex-col gap-2">
              <div class="flex items-center gap-2 text-[10px]">
                <span class="text-[#aaa] font-bold uppercase tracking-widest w-20">Records</span>
                <span class="font-bold text-red-500">0x00</span>
              </div>
              <div class="flex items-center gap-2 text-[10px]">
                <span class="text-[#aaa] font-bold uppercase tracking-widest w-20">Node</span>
                <span class="font-bold text-red-500">Offline</span>
              </div>
            </div>

            <!-- Chip row -->
            <div class="flex flex-wrap gap-1.5">
              <span
                class="text-[9px] font-black uppercase tracking-widest px-2 py-1 border border-[#e0dddc] text-[#aaa]">GET
                /api/projects</span>
              <span
                class="text-[9px] font-black uppercase tracking-widest px-2 py-1 border border-[#e0dddc] text-[#aaa]">200
                OK</span>
              <span
                class="text-[9px] font-black uppercase tracking-widest px-2 py-1 border border-[#e0dddc] text-[#aaa]">[
                ]</span>
            </div>

            <button @click="rescan" :disabled="loading"
              class="self-start bg-[#131313] text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#28c840] transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              <span v-if="loading"
                class="w-3 h-3 border-2 border-white border-t-transparent animate-spin inline-block"></span>
              <span v-else>↻</span>
              {{ loading ? 'Scanning...' : 'Re-Scan_Repository' }}
            </button>
          </div>
          <div class="bg-[#fafafa] p-12 overflow-hidden flex items-center justify-center relative min-h-[280px]">
            <div
              class="absolute inset-0 bg-[linear-gradient(to_right,#e0dddc_1px,transparent_1px),linear-gradient(to_bottom,#e0dddc_1px,transparent_1px)] bg-[size:24px_24px] opacity-70"
              aria-hidden="true"></div>
            <div
              class="relative w-full max-w-[280px] border-2 border-[#131313] bg-white shadow-[8px_8px_0px_#e0dddc] p-6 flex flex-col items-center justify-center gap-4 min-h-[170px]">
              <div
                class="w-full flex items-center justify-between border-b border-[#e0dddc] pb-2 text-[9px] font-black uppercase tracking-widest text-[#aaa]"
                aria-hidden="true">
                <span>NODE_01 // IDLE</span>
                <span>0x00</span>
              </div>
              <div class="py-2 flex items-center justify-center">
                <span
                  class="text-[10px] font-black bg-white border border-[#131313] px-4 py-2 uppercase animate-bounce">System_Busy</span>
              </div>
              <div class="w-full flex gap-1.5" aria-hidden="true">
                <span class="h-1.5 flex-1 bg-[#e0dddc]"></span>
                <span class="h-1.5 w-8 bg-[#131313]"></span>
                <span class="h-1.5 w-4 bg-[#ff5f57]"></span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ── PAGINATION ── -->
      <div v-if="projects?.length && pagination.last_page > 1"
        class="flex flex-wrap items-center justify-between gap-4 border-2 border-[#e0dddc] bg-white px-4 py-4 mt-px">
        <div class="flex items-center gap-3">
          <button :disabled="loading || pagination.current_page <= 1" @click="goToPage(pagination.current_page - 1)"
            class="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-[#131313] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#131313] hover:text-white transition-colors">
            ← Prev_Page
          </button>
          <button :disabled="loading || pagination.current_page >= pagination.last_page"
            @click="goToPage(pagination.current_page + 1)"
            class="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-[#131313] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#131313] hover:text-white transition-colors">
            Next_Page →
          </button>
        </div>
        <p class="text-[10px] font-bold text-[#5d5f5f] uppercase tracking-[0.2em] flex items-center gap-2">
          <span v-if="loading"
            class="w-2.5 h-2.5 border-2 border-[#131313] border-t-transparent animate-spin inline-block"></span>
          <span v-if="loading">Fetching_Data...</span>
          <span v-else>Page {{ pagination.current_page }} / {{ pagination.last_page }} — {{ pagination.total }} Modules</span>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ExternalLink, Github } from 'lucide-vue-next'

const projectStore = useProjectStore()
const { projects, loading, pagination } = storeToRefs(projectStore)

// Skeleton only when there is nothing on screen yet.
// Once data exists, further fetches keep the grid visible and show the fetching state.
const isInitialLoading = computed(() => loading.value && !projects.value?.length)
const isFetching = computed(() => loading.value && !!projects.value?.length)

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

// Reveal the header once it scrolls into view. The animation itself lives in
// the global assets/css/main.css.
let observer = null

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return

  observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    }),
    { threshold: 0.08, rootMargin: '60px 0px' }
  )

  document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})

const placeholderImage = '/placeholder-project.svg'

const handleImageError = (event) => {
  if (event.target.dataset.fallbackApplied) return
  event.target.dataset.fallbackApplied = 'true'
  event.target.src = placeholderImage
}

// Jump to another page of the archive. The collection endpoint is paginated,
// so without this the projects past page 1 would be unreachable.
const goToPage = async (page) => {
  if (loading.value) return
  if (!page || page < 1 || page > pagination.value.last_page) return

  try {
    await projectStore.fetchProjects(page)
  } catch {
    // The store already exposes the error; keep the current grid on screen.
    return
  }

  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Retry from the empty state without an unhandled rejection.
const rescan = async () => {
  if (loading.value) return

  try {
    await projectStore.fetchProjects()
  } catch {
    // Error is stored in projectStore.error; the empty state stays visible.
  }
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

/* The reveal animation, .fetch-bar, @keyframes fetch-slide, and @keyframes shimmer
   are defined once in assets/css/main.css so every page shares unhashed keyframes. */
</style>