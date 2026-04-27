<template>
  <footer class="w-full border-t border-zinc-200 bg-white py-12 font-mono relative overflow-hidden">
    <div
      class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]">
    </div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <div class="grid md:grid-cols-2 gap-12 items-end">

        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span class="text-zinc-300 font-bold tracking-tighter">01</span>
            <h2 class="text-lg font-black tracking-[0.3em] uppercase text-black">
              msbseth<span class="inline-block w-2 h-4 bg-black ml-1 animate-pulse"></span>
            </h2>
          </div>

          <div class="text-[10px] leading-relaxed text-zinc-400 uppercase tracking-widest">
            <p>/**</p>
            <p class="pl-4">* @status: available_for_hire</p>
            <p class="pl-4">* @engine: nuxt_3_tailwind</p>
            <p class="pl-4">* @copyright: © 2026_portfolio</p>
            <p>*/</p>
          </div>
        </div>

        <div class="flex flex-col md:items-end gap-6">
          <span class="text-[10px] font-bold text-zinc-300 tracking-[0.2em] uppercase">-- social_links</span>

          <div class="flex gap-3">
            <a v-for="social in socials" :key="social.label" :href="social.url" target="_blank"
              rel="noopener noreferrer"
              class="group relative w-10 h-10 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-black hover:border-black transition-all duration-300"
              :aria-label="social.label">
              <span
                class="absolute -left-2 text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-200 text-zinc-300">[</span>
              <Icon :name="social.icon" size="18" />
              <span
                class="absolute -right-2 text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-200 text-zinc-300">]</span>
            </a>
          </div>
        </div>
      </div>

      <div
        class="mt-12 pt-6 border-t border-zinc-50 flex flex-col md:flex-row justify-between gap-4 text-[9px] font-bold text-zinc-300 tracking-widest uppercase">
        <div class="flex gap-4">
          <span>built_with: tall_stack</span>
          <span class="hidden md:inline text-zinc-100">|</span>
          <span>region: cambodia</span>
        </div>
        <div class="flex gap-2 items-center">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>system_active</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socials = [
  { label: 'GitHub', icon: 'mdi:github', url: 'https://github.com/meachsenbroseth' },
  { label: 'YouTube', icon: 'mdi:youtube', url: 'https://youtube.com/@msbseth' },
  { label: 'LinkedIn', icon: 'mdi:linkedin', url: 'https://www.linkedin.com/in/meach-senbroseth-69130326b' }
]
</script>