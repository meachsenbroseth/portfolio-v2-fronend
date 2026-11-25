<template>
  <div class="min-h-screen bg-[#fcfcfc] text-[#131313] font-mono selection:bg-[#28c840] selection:text-black">

    <!-- Top fetching progress bar -->
    <div v-if="loading" class="fixed top-0 inset-x-0 h-1 z-[60] bg-[#e0dddc] overflow-hidden" role="progressbar"
      aria-label="Fetching project">
      <div class="fetch-bar h-full w-1/3 bg-[#28c840]"></div>
    </div>

    <!-- ── TOP NAVIGATION ── -->
    <nav class="flex sticky top-0 z-50 bg-white border-b-4 border-[#131313] px-4 sm:px-6 py-3 sm:py-4 justify-between items-center">
      <div class="flex items-center gap-3 sm:gap-6">
        <NuxtLink to="/projects"
          class="group flex items-center px-2 sm:px-3 py-1.5 hover:bg-[#131313] hover:text-white transition-all duration-200">
          <span class="text-sm sm:text-base group-hover:-translate-x-1 transition-transform">←</span>
          <span class="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] ml-1">Exit_Archive</span>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-2 text-[#aaa]">
          <span class="text-[10px]">/</span>
          <span class="text-[10px] font-black uppercase tracking-widest text-[#131313]">
            Project_{{ loading ? '...' : project?.slug }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 animate-pulse" :class="loading ? 'bg-[#febc2e]' : 'bg-[#28c840]'"></span>
        <span class="text-[9px] font-black uppercase tracking-[0.2em]">
          {{ loading ? 'Fetching_Data' : 'Server_Active' }}
        </span>
      </div>
    </nav>

    <!-- ── SKELETON ── -->
    <div v-if="loading" class="max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-52px)]" aria-busy="true">
      <aside class="lg:w-80 border-r-2 border-[#e0dddc] p-6 sm:p-8 bg-[#fafafa] flex flex-col gap-8 sm:gap-10">
        <div class="flex flex-col gap-3">
          <div class="h-2.5 w-16 bg-[#e0dddc] animate-pulse" />
          <div class="h-8 sm:h-10 w-24 bg-[#e0dddc] animate-pulse" />
        </div>
        <div class="flex flex-col gap-3">
          <div class="h-2.5 w-28 bg-[#e0dddc] animate-pulse" />
          <div class="border-2 border-[#e0dddc] p-4 flex flex-col gap-2">
            <div class="h-2.5 w-16 bg-[#e0dddc] animate-pulse" />
            <div class="h-2.5 w-36 bg-[#eeeceb] animate-pulse" />
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div class="h-2.5 w-32 bg-[#e0dddc] animate-pulse" />
          <div v-for="i in 4" :key="i" class="flex justify-between border-b border-[#e0dddc] pb-2">
            <div class="h-2.5 bg-[#eeeceb] animate-pulse" :style="`width:${60 + i * 12}px`" />
            <div class="h-2.5 w-12 bg-[#f0eeec] animate-pulse" />
          </div>
        </div>
        <div class="flex flex-col gap-2 pt-4">
          <div class="h-11 bg-[#e0dddc] animate-pulse" />
          <div class="h-11 border-2 border-[#e0dddc]" />
        </div>
      </aside>

      <main class="flex-1 p-6 sm:p-8 md:p-12 lg:p-20 bg-white flex flex-col gap-10 sm:gap-14">
        <div class="flex flex-col gap-3 sm:gap-4">
          <div class="h-3 w-44 bg-[#e0dddc] animate-pulse" />
          <div class="h-10 sm:h-14 w-4/5 bg-[#e0dddc] animate-pulse" />
          <div class="h-10 sm:h-14 w-2/5 bg-[#eeeceb] animate-pulse" />
          <div class="h-1 w-20 bg-[#28c840] opacity-30" />
        </div>

        <div class="border-2 border-[#e0dddc] aspect-video bg-[#eeeceb] animate-pulse" />

        <div class="flex flex-col gap-3">
          <div class="h-3 w-full max-w-xl bg-[#eeeceb] animate-pulse" />
          <div class="h-3 w-2/3 max-w-lg bg-[#f0eeec] animate-pulse" />
        </div>

        <div class="grid md:grid-cols-2 gap-8 sm:gap-10 border-t-2 border-[#e0dddc] pt-10 sm:pt-12">
          <div class="flex flex-col gap-4">
            <div class="h-2.5 w-24 bg-[#e0dddc] animate-pulse" />
            <div class="border-l-4 border-[#e0dddc] bg-[#f9f9f9] p-4 sm:p-5 flex flex-col gap-3">
              <div v-for="i in 5" :key="i" class="h-2.5 bg-[#eeeceb] animate-pulse" :style="`width:${70 + i * 5}%`" />
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <div class="h-2.5 w-20 bg-[#e0dddc] animate-pulse" />
            <div class="grid grid-cols-3 gap-2">
              <div v-for="i in 3" :key="i" class="aspect-square bg-[#eeeceb] animate-pulse border border-[#e0dddc]" />
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- ── PROJECT DETAIL ── -->
    <div v-else-if="project" class="max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-52px)]">

      <!-- ── LEFT RAIL ── -->
      <aside
        class="hidden lg:block lg:w-80 border-r-2 border-[#131313] p-8 lg:sticky lg:top-[52px] lg:h-[calc(100vh-52px)] overflow-y-auto bg-[#fafafa]">
        <div class="space-y-10">

          <div class="space-y-2">
            <p class="text-[9px] font-black text-[#aaa] uppercase tracking-[0.3em]">// REF_ID</p>
            <div class="text-5xl font-black italic tracking-tighter">#{{ String(project.id).padStart(3, '0') }}</div>
          </div>

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

          <div v-if="project.category || project.date" class="space-y-3">
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

          <div v-if="project.technologies?.length" class="space-y-3">
            <p class="text-[9px] font-black text-[#aaa] uppercase tracking-[0.3em]">// CORE_DEPENDENCIES</p>
            <div v-for="tech in project.technologies" :key="tech"
              class="flex items-center justify-between text-[9px] font-bold border-b border-[#e0dddc] py-2 group hover:border-[#131313] transition-colors">
              <span class="text-[#5d5f5f] group-hover:text-[#131313] transition-colors">{{ tech }}</span>
              <span class="text-[#aaa] text-[8px]">v.latest</span>
            </div>
          </div>

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

      <!-- ── MAIN CONTENT ── -->
      <main class="flex-1 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-white relative">
        <span class="hidden sm:block absolute top-6 left-6 text-[#e0dddc] text-xs select-none">+</span>
        <span class="hidden sm:block absolute top-6 right-6 text-[#e0dddc] text-xs select-none">+</span>
        <span class="hidden sm:block absolute bottom-6 left-6 text-[#e0dddc] text-xs select-none">+</span>
        <span class="hidden sm:block absolute bottom-6 right-6 text-[#e0dddc] text-xs select-none">+</span>

        <div class="max-w-4xl space-y-12 sm:space-y-16">

          <!-- Title -->
          <section class="space-y-4 sm:space-y-6 reveal-up">
            <p class="text-[9px] font-black text-[#aaa] uppercase tracking-[0.3em]">
              // PROJECT_MODULE → {{ String(project.id).padStart(3, '0') }}
            </p>
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.82]">
              {{ project.title }}
            </h1>
            <div class="h-1 w-20 bg-[#28c840]" />
          </section>

          <!-- Main image (full color, before description) -->
          <section class="reveal-up" style="animation-delay:0.1s">
            <div class="relative border-2 border-[#131313] bg-[#f0f0f0]">
              <div
                class="absolute -top-px left-4 sm:left-6 bg-white px-2 sm:px-3 py-1 border border-[#131313] text-[7px] sm:text-[8px] font-black uppercase tracking-widest z-10 -translate-y-1/2 whitespace-nowrap">
                Primary_Interface_Capture
              </div>
              <div class="relative overflow-hidden p-2"
                :class="isLoaded('main') ? '' : 'min-h-[240px] sm:min-h-[360px]'">
                <img :src="getImageUrl(project.image) || placeholderImage" :alt="`${project.title} — main screenshot`"
                  data-img-key="main"
                  class="w-full cursor-zoom-in" loading="eager" decoding="async"
                  @click="openLightbox(0)" @load="markLoaded('main')" @error="onImgError($event, 'main')">

                <!-- Image loading placeholder -->
                <div v-if="!isLoaded('main')"
                  class="absolute inset-2 z-10 bg-[#eeeceb] animate-pulse flex items-center justify-center pointer-events-none">
                  <span class="text-[9px] font-black uppercase tracking-[0.3em] text-[#aaa] flex items-center gap-3">
                    <span class="w-3 h-3 border-2 border-[#131313] border-t-transparent animate-spin inline-block"></span>
                    Loading_Asset...
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- Description -->
          <section class="reveal-up" style="animation-delay:0.15s">
            <p class="text-sm sm:text-base md:text-lg font-bold text-[#5d5f5f] leading-relaxed max-w-2xl">
              {{ project.description || project.desc }}
            </p>
          </section>

          <!-- Overview + Gallery -->
          <section class="grid md:grid-cols-2 gap-8 sm:gap-12 border-t-2 border-[#131313] pt-10 sm:pt-14 reveal-up"
            style="animation-delay:0.2s">
            <div class="space-y-4 sm:space-y-5">
              <h3 class="text-[9px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <span class="w-8 h-px bg-[#131313]"></span> 01_OVERVIEW
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

            <div class="space-y-4 sm:space-y-5">
              <h3 class="text-[9px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <span class="w-8 h-px bg-[#131313]"></span> 02_GALLERY
              </h3>
              <div v-if="project.gallery?.length" class="grid grid-cols-3 gap-2">
                <div v-for="(img, idx) in project.gallery.slice(0, 6)" :key="idx"
                  class="relative aspect-square border border-[#e0dddc] overflow-hidden cursor-pointer hover:border-[#131313] transition-colors"
                  @click="openLightbox(idx + 1)">
                  <img :src="getImageUrl(img) || placeholderImage" :alt="`${project.title} — gallery image ${idx + 1}`"
                    :data-img-key="`g-${idx}`"
                    class="w-full h-full object-cover" loading="lazy" decoding="async"
                    @load="markLoaded(`g-${idx}`)" @error="onImgError($event, `g-${idx}`)">
                  <div v-if="!isLoaded(`g-${idx}`)"
                    class="absolute inset-0 bg-[#eeeceb] animate-pulse pointer-events-none" />
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

    <!-- ── FETCH FAILED (network / server error, not a 404) ── -->
    <div v-else-if="error" class="flex items-center justify-center min-h-[calc(100vh-52px)] px-4">
      <div class="text-center space-y-4">
        <p class="text-[9px] font-black text-[#aaa] uppercase tracking-[0.3em]">// ERROR_FETCH</p>
        <div class="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter">Fetch_Failed</div>
        <p class="text-xs text-[#5d5f5f] max-w-xs mx-auto leading-relaxed">
          The project node did not respond. Check the connection and try again.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button @click="retry" :disabled="loading"
            class="bg-[#131313] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-[9px] font-black uppercase tracking-widest hover:bg-[#28c840] hover:text-black transition-all disabled:opacity-60 disabled:cursor-not-allowed">
            ↻ Retry_Fetch
          </button>
          <NuxtLink to="/projects"
            class="border-2 border-[#131313] px-6 sm:px-8 py-2.5 sm:py-3 text-[9px] font-black uppercase tracking-widest hover:bg-[#131313] hover:text-white transition-all">
            ← Back_to_Archive
          </NuxtLink>
        </div>
      </div>
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
      <div v-if="lightboxIndex !== null"
        role="dialog" aria-modal="true" aria-label="Image viewer"
        class="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
        @click.self="closeLightbox">
        <div class="relative max-w-5xl w-full">
          <button @click="closeLightbox"
            class="absolute -top-8 sm:-top-10 right-0 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:text-[#28c840] transition-colors">
            ✕ Close_Viewer
          </button>

          <div class="relative" :class="lightboxLoading ? 'min-h-[40vh]' : ''">
            <img :src="getImageUrl(images[lightboxIndex]) || placeholderImage" :alt="`${project.title} — image ${lightboxIndex + 1}`"
              class="w-full border-2 border-white transition-opacity duration-200"
              :class="lightboxLoading ? 'opacity-0' : 'opacity-100'"
              @load="lightboxLoading = false" @error="onLightboxError" />

            <div v-if="lightboxLoading" class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span class="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                <span class="w-4 h-4 border-2 border-white border-t-transparent animate-spin inline-block"></span>
                Loading_Asset...
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between mt-4">
            <button @click="prevImage"
              class="text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:text-[#28c840] transition-colors">
              ← Prev
            </button>
            <span class="text-[9px] text-[#aaa] font-black uppercase tracking-widest">
              {{ lightboxIndex + 1 }} / {{ images.length }}
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
const route = useRoute()
const config = useRuntimeConfig()
const projectStore = useProjectStore()

// Fetch a single project directly — the collection endpoint is paginated and
// would 404 for anything past page 1.
const { data: project, status, error, refresh } = await useAsyncData(
  `project-${route.params.slug}`,
  async () => {
    try {
      return await $fetch(`${config.public.apiBase}/projects/${route.params.slug}`)
    } catch (err) {
      // A missing slug is a normal "not found" screen (data = null).
      // Anything else is a real failure: rethrow so `error` is set and the retry state shows.
      if ((err?.status || err?.statusCode) === 404) return null
      throw err
    }
  }
)

const loading = computed(() => status.value === 'pending')

// A slug that does not exist has to answer with a real 404 status so search
// engines do not index the "not found" screen. No-op on the client.
if (!project.value && !error.value) {
  setResponseStatus(404)
}

const retry = () => {
  if (loading.value) return
  return refresh()
}

// Main image first, then gallery — one source of truth for the lightbox
const images = computed(() =>
  project.value ? [project.value.image, ...(project.value.gallery ?? [])].filter(Boolean) : []
)

// Prefer the store helper; fall back only for absolute/data URLs
const getImageUrl = (path) => {
  if (!path) return null
  if (path.startsWith('http') || path.startsWith('data:')) return path
  return projectStore.getFullImageUrl(path)
}

const placeholderImage = '/placeholder-project.svg'

const handleImageError = (event) => {
  if (event.target.dataset.fallbackApplied) return
  event.target.dataset.fallbackApplied = 'true'
  event.target.src = placeholderImage
}

// ── Image loading state ──────────────────────────────
const loadedImages = reactive({})
const markLoaded = (key) => { loadedImages[key] = true }
const isLoaded = (key) => !!loadedImages[key]

// Mark as loaded on error too, otherwise the placeholder would pulse forever.
const onImgError = (event, key) => {
  markLoaded(key)
  handleImageError(event)
}

// ── Lightbox ─────────────────────────────────────────
const lightboxIndex = ref(null)
const lightboxLoading = ref(false)

const setLightbox = (i) => {
  const prevUrl = lightboxIndex.value !== null ? getImageUrl(images.value[lightboxIndex.value]) : null
  const nextUrl = getImageUrl(images.value[i])
  // Same URL means no load event will fire, so don't start a spinner for it.
  lightboxLoading.value = prevUrl !== nextUrl
  lightboxIndex.value = i
}

const openLightbox = (i) => setLightbox(i)
const closeLightbox = () => {
  lightboxIndex.value = null
  lightboxLoading.value = false
}
const nextImage = () => {
  if (lightboxIndex.value === null || !images.value.length) return
  setLightbox((lightboxIndex.value + 1) % images.value.length)
}
const prevImage = () => {
  if (lightboxIndex.value === null || !images.value.length) return
  setLightbox((lightboxIndex.value - 1 + images.value.length) % images.value.length)
}
const onLightboxError = (event) => {
  lightboxLoading.value = false
  handleImageError(event)
}

const handleKey = (e) => {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

let observer = null

onMounted(() => {
  window.addEventListener('keydown', handleKey)

  // SSR-rendered images can finish loading before hydration, so their @load
  // never fires. Pick those up here.
  document.querySelectorAll('img[data-img-key]').forEach((img) => {
    if (img.complete) markLoaded(img.dataset.imgKey)
  })

  if (typeof IntersectionObserver === 'undefined') return

  observer = new IntersectionObserver(
    (entries) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }),
    { threshold: 0.08, rootMargin: '60px 0px' }
  )
  document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
  observer?.disconnect()
  observer = null
})

// ── SEO ──────────────────────────────────────────────
const seoProject = computed(() => {
  if (!project.value) return null

  return {
    ...project.value,
    description: project.value.description || project.value.desc || '',
    image: getImageUrl(project.value.image),
  }
})

useSEO({
  title: computed(() => (project.value ? `${project.value.title} — MSB Seth` : 'Project — MSB Seth')),
  description: computed(() => seoProject.value?.description || 'Project details'),
  path: computed(() => `/projects/${route.params.slug}`),
  image: computed(() => seoProject.value?.image || undefined),
  type: 'article',
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: project.value?.title || 'Project', path: `/projects/${route.params.slug}` },
  ]),
  jsonLd: computed(() => (seoProject.value ? createProjectSchema(seoProject.value) : undefined)),
})
</script>

<style scoped>
*,
*::before,
*::after {
  border-radius: 0 !important;
}

/* The reveal animation, .fetch-bar, and @keyframes fetch-slide live in global main.css
   so every page behaves the same way. Only the page specific bits stay scoped. */
</style>