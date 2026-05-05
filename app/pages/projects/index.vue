<template>
  <div
    class="min-h-screen bg-[#fafafa] py-24 px-4 sm:px-8 md:px-12 font-mono selection:bg-[#131313] selection:text-white">
    <!-- Subtle Grain Overlay -->
    <div
      class="fixed inset-0 pointer-events-none opacity-[0.02] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
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
              {{ loading ? '--' : projects?.length?.toString().padStart(2, '0') || '00' }}
            </p>
          </div>
        </div>
      </header>

      <!-- ── SKELETON LOADING STATE ── -->
      <div v-if="loading" class="grid gap-px bg-[#e0dddc] border border-[#e0dddc]">
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
                <!-- Brutalist shadow -->
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
                <div class="h-1.5 w-0 bg-[#e0dddc]" />
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

          <!-- Bottom accent bar (inactive state) -->
          <div class="h-1 w-full bg-[#f5f3f2]" />
        </div>
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
                <div
                  class="absolute inset-0 bg-[#131313] translate-x-2 translate-y-2 group-hover/img:translate-x-1 group-hover/img:translate-y-1 transition-transform duration-300">
                </div>
                <div class="relative aspect-video lg:aspect-[4/5] border-2 border-[#131313] overflow-hidden bg-white">
                  <img :src="getImageUrl(item.image)" :alt="item.title"
                    class="w-full h-full object-cover grayscale group-hover/img:grayscale-0 group-hover/img:scale-110 transition-all duration-700"
                    @error="handleImageError" />
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

                <div class="flex flex-wrap items-center gap-y-3 gap-x-6">
                  <div class="flex gap-2">
                    <span v-for="tech in (item.technologies || []).slice(0, 5)" :key="tech"
                      class="text-[9px] font-black text-[#131313] bg-[#f0f0f0] px-2 py-1 uppercase tracking-tighter border border-transparent hover:border-[#131313] transition-all">
                      --{{ tech }}
                    </span>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-4 pt-4">
                  <a v-if="item.live_demo" :href="item.live_demo" target="_blank"
                    class="bg-[#131313] text-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:invert transition-all">
                    <ExternalLink class="h-3 w-3" /> Execute_Live
                  </a>
                  <a v-if="item.github_link" :href="item.github_link" target="_blank"
                    class="border-2 border-[#131313] px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-[#131313] hover:text-white transition-all">
                    <Github class="h-4 w-4" /> View_Source
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            class="absolute bottom-0 left-0 w-full h-1 bg-[#131313] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left">
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

            <button @click="projectStore.fetchProjects()"
              class="self-start bg-[#131313] text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#28c840] transition-colors flex items-center gap-2">
              ↻ Re-Scan_Repository
            </button>
          </div>

          <!-- RIGHT: terminal -->
          <div class="bg-[#fafafa] p-10 flex flex-col gap-5 relative overflow-hidden"
            style="background-image: linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px); background-size: 20px 20px;">

            <div class="border border-[#e0dddc] bg-white flex-1">
              <div class="flex items-center justify-between px-3 py-2 bg-[#f5f3f2] border-b border-[#e0dddc]">
                <div class="flex gap-1.5">
                  <span class="w-2.5 h-2.5 bg-[#ff5f57] inline-block"></span>
                  <span class="w-2.5 h-2.5 bg-[#febc2e] inline-block"></span>
                  <span class="w-2.5 h-2.5 bg-[#e0dddc] inline-block"></span>
                </div>
                <span class="text-[9px] text-[#aaa] tracking-[0.06em]">project_store.ts</span>
              </div>

              <div class="p-4 text-[11px] leading-[2] font-mono">
                <p class="text-[#aaa] italic">// fetchProjects() → response</p>
                <p><span class="text-[#7c3aed] font-bold">const</span> res = <span
                    class="text-[#7c3aed] font-bold">await</span> $fetch(endpoint)</p>
                <!-- Scan bar -->
                <div class="h-0.5 bg-[#e0dddc] overflow-hidden my-1 relative">
                  <div class="absolute inset-0 bg-[#131313] animate-[scan_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
                </div>
                <p class="text-[#aaa] italic">// parsing payload...</p>
                <p><span class="text-[#7c3aed] font-bold">if</span> (res.data.length === <span
                    class="text-amber-600">0</span>) {</p>
                <p class="pl-4"><span class="text-[#7c3aed] font-bold">throw</span> <span
                    class="text-red-500">EmptyRepository</span></p>
                <p>}</p>
                <p class="mt-2">
                  <span class="text-[#28c840] font-bold">✓</span> Request: <span
                    class="text-[#28c840] font-bold">200</span>
                  &nbsp;&nbsp;<span class="text-red-500">✗ Records: 0</span>
                  <span
                    class="inline-block w-[7px] h-[13px] bg-[#131313] ml-1 align-middle animate-[blink_1s_step-end_infinite]"></span>
                </p>
              </div>
            </div>

            <div class="text-[10px] text-[#aaa] font-bold tracking-[0.08em] leading-[1.9] uppercase">
              <p>/** @diagnostic: empty_payload</p>
              <p>&nbsp;&nbsp;* @action: rescan or seed data</p>
              <p>&nbsp;&nbsp;* @status: awaiting_input</p>
              <p>*/</p>
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

const projectStore = useProjectStore()
const { projects, loading } = storeToRefs(projectStore)

const getImageUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/400x300?text=No+Image'
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path.startsWith('data:')) return path
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || 'http://127.0.0.1:8000/api'
  const apiBase = baseUrl.replace('/api', '')
  const cleanPath = path.startsWith('/') ? path.substring(1) : path
  return `${apiBase}/storage/${cleanPath}`
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
}

onMounted(async () => {
  try {
    await projectStore.fetchProjects()
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  }
})
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

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(200%);
  }
}

@keyframes scan {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(200%);
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

.grayscale {
  filter: grayscale(100%) brightness(0.9) contrast(1.1);
}
</style>