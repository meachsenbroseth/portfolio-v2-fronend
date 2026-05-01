<template>
  <div class="min-h-screen py-24 px-6 font-mono selection:bg-[#131313] selection:text-white">
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
      style="background-size:32px 32px; background-image: linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px);">
    </div>

    <div class="max-w-5xl mx-auto">

      <!-- Section header -->
      <div class="reveal-up flex items-center gap-4 mb-12 sm:mb-16 md:mb-20">
        <span class="text-[9px] tracking-[0.22em] uppercase text-[#aaa]">[ 001 ]</span>
        <div class="flex-1 h-px bg-[#e0dddc]"></div>
        <span class="text-[9px] tracking-[0.22em] uppercase text-[#aaa]">ALL_PROJECTS</span>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#131313]"></div>
      </div>

      <!-- ── PROJECT LIST ── -->
      <div v-else-if="projects && projects.length > 0" class="divide-y divide-[#e0dddc] border-t border-[#e0dddc]">
        <NuxtLink
          v-for="(item, i) in projects"
          :key="item.id"
          :to="`/projects/${item.slug}`"
          class="group block relative hover:bg-[#fafafa] transition-all duration-500 overflow-hidden"
          :style="`animation-delay:${i * 0.05}s`"
        >
          <div class="flex flex-col md:flex-row md:items-stretch">

            <!-- Vertical ID sidebar -->
            <div class="hidden md:flex flex-col justify-between p-6 border-r border-[#e0dddc] w-24 shrink-0 bg-[#fcfcfc] group-hover:bg-[#131313] group-hover:border-[#131313] transition-colors duration-500">
              <span class="text-[10px] font-black text-[#131313] group-hover:text-white vertical-text tracking-widest">
                ID_{{ String(item.id).padStart(3, '0') }}
              </span>
              <span class="text-[10px] font-bold text-[#aaa] group-hover:text-[#5d5f5f] vertical-text tracking-widest">
                {{ item.date }}
              </span>
            </div>

            <div class="flex-1 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">

              <!-- Image with offset frame -->
              <div class="relative shrink-0 w-full md:w-56 aspect-4/3 group-hover:-translate-y-1 transition-transform duration-500">
                <div class="absolute inset-0 border border-[#e0dddc] translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500"></div>
                <div class="relative h-full w-full border border-[#131313] overflow-hidden">
                  <img :src="getImageUrl(item.image)" :alt="item.title"
                    class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    @error="handleImageError" />
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 space-y-4">
                <div class="flex items-center gap-4">
                  <span class="text-[8px] font-black uppercase tracking-[0.3em] px-2 py-1 border border-[#131313] text-[#131313]">
                    {{ item.category || 'Project' }}
                  </span>
                  <div class="h-px w-8 bg-[#e0dddc]"></div>
                </div>
                <h2 class="text-2xl md:text-3xl font-black text-[#131313] uppercase tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-300">
                  {{ item.title }}
                </h2>
                <p class="text-sm text-[#5d5f5f] leading-relaxed max-w-xl line-clamp-2">
                  {{ item.description || item.desc }}
                </p>
                <div class="flex flex-wrap gap-2 pt-2">
                  <span v-for="tech in (item.technologies || []).slice(0, 4)" :key="tech"
                    class="text-[9px] font-bold text-[#aaa] uppercase tracking-widest group-hover:text-[#131313] transition-colors">
                    [{{ tech }}]
                  </span>
                </div>
              </div>

              <!-- Arrow -->
              <div class="hidden lg:flex items-center justify-center p-4">
                <div class="w-12 h-12 border border-[#e0dddc] flex items-center justify-center group-hover:bg-[#131313] group-hover:border-[#131313] transition-all duration-500">
                  <span class="text-xl group-hover:text-white group-hover:translate-x-1 transition-all duration-300">→</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Green underline on hover -->
          <div class="absolute bottom-0 left-0 h-0.5 bg-[#28c840] w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
        </NuxtLink>
      </div>

      <!-- ── EMPTY STATE ── -->
      <div v-else class="border border-[#e0dddc] overflow-hidden">

        <!-- Terminal header -->
        <div class="flex items-center justify-between px-5 py-3 bg-[#f5f3f2] border-b border-[#e0dddc]">
          <div class="flex items-center gap-1.5">
            <span class="w-3 h-3 bg-[#ff5f57]"></span>
            <span class="w-3 h-3 bg-[#febc2e]"></span>
            <span class="w-3 h-3 bg-[#28c840]"></span>
          </div>
          <span class="text-[9px] tracking-[0.15em] uppercase text-[#aaa]">projects.exe — zsh</span>
          <span class="text-[9px] text-[#ddd]">●</span>
        </div>

        <!-- GIF + terminal body -->
        <div class="grid md:grid-cols-2">

          <!-- Left: GIF -->
          <div class="relative aspect-square md:aspect-auto overflow-hidden border-b md:border-b-0 md:border-r border-[#e0dddc]">
            <img
              src="https://c.tenor.com/YQ-r_mFzlm0AAAAd/tenor.gif"
              alt="Still cooking"
              class="w-full h-full object-cover"
              @error="e => e.target.src = 'https://media.tenor.com/DdpSGDqGTGwAAAAd/cat-typing.gif'"
            />
            <!-- Scanlines -->
            <div class="absolute inset-0 pointer-events-none"
              style="background: repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px);">
            </div>
            <!-- Overlay label -->
            <div class="absolute bottom-0 left-0 right-0 bg-[#131313]/90 backdrop-blur-sm py-3 px-4 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-[#28c840] animate-pulse"></span>
                <span class="text-[9px] font-black tracking-[0.22em] uppercase text-white">STILL COOKING</span>
              </div>
            </div>
          </div>

          <!-- Right: Terminal output -->
          <div class="p-8 flex flex-col justify-center gap-5">

            <!-- Fake terminal lines -->
            <div class="space-y-2 text-[11px]">
              <div class="flex gap-2 opacity-30">
                <span class="text-[#28c840] select-none">❯</span>
                <span class="text-[#5d5f5f]">ls ~/projects</span>
              </div>
              <div class="flex gap-2 opacity-30">
                <span class="text-[#28c840] select-none">❯</span>
                <span class="text-red-400">Error: directory is empty</span>
              </div>
              <div class="border-t border-dashed border-[#e0dddc] my-3"></div>
              <div class="flex gap-2">
                <span class="text-[#28c840] select-none">❯</span>
                <span class="text-[#8b43c4] font-bold">echo</span>
                <span class="text-[#2e7d32]">"</span>
                <span class="text-[#131313] font-bold">NULL_PTR — no projects found</span>
                <span class="text-[#2e7d32]">"</span>
              </div>
              <div class="pl-5 text-[#5d5f5f] italic">
                → system_status: cooking_in_progress
              </div>
            </div>

            <!-- Status label -->
            <div class="space-y-1.5 pt-2 border-t border-[#e0dddc]">
              <p class="text-[9px] tracking-[0.28em] uppercase text-[#aaa]">System_Status: Empty_Archive</p>
              <p class="text-[11px] text-[#5d5f5f] leading-relaxed max-w-xs">
                No active project modules found. Check back soon — things are being built.
              </p>
            </div>

            <!-- Animated progress bar -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-[8px] tracking-widest uppercase text-[#aaa]">build progress</span>
                <span class="text-[8px] tracking-widest uppercase text-[#28c840]">running...</span>
              </div>
              <div class="w-full border border-[#e0dddc] h-5 overflow-hidden">
                <div
                  class="h-full"
                  style="background: repeating-linear-gradient(45deg, #131313 0px, #131313 10px, #facc15 10px, #facc15 20px); animation: progress 3s ease-in-out infinite;"
                ></div>
              </div>
            </div>

          </div>
        </div>

        <!-- Bottom status bar -->
        <div class="flex items-center justify-between px-5 py-2 bg-[#131313] border-t border-[#131313]">
          <div class="flex items-center gap-3 text-[8px] tracking-widest uppercase">
            <span class="text-[#555]">zsh</span>
            <span class="text-[#333]">|</span>
            <span class="text-[#555]">utf-8</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-1 h-1 bg-[#facc15]"></span>
            <span class="text-[8px] tracking-widest text-[#facc15] uppercase">building</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'default'
})

// Use project store
const projectStore = useProjectStore()
const { projects, loading } = storeToRefs(projectStore)

// Helper to get full image URL
const getImageUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/400x300?text=No+Image'
  
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
  event.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
}

// Fetch projects on mount
onMounted(async () => {
  try {
    await projectStore.fetchProjects()
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  }
})
</script>

<style scoped>
*, *::before, *::after { border-radius: 0 !important; }

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
}

.reveal-up {
  opacity: 0;
  transform: translateY(20px);
  animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes reveal {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes progress {
  0%   { width: 0%; }
  50%  { width: 75%; }
  100% { width: 0%; }
}

.group:hover .line-clamp-2 {
  line-clamp: initial;
  color: #131313;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>