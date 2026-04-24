<template>
  <header class="sticky top-0 z-50 bg-white border-b border-zinc-200 font-mono">
    
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      
      <nuxt-link to="/" class="flex items-center gap-1.5 text-sm font-bold tracking-widest text-black uppercase">
        <span class="text-zinc-400">~/</span>msbseth
        <span class="w-1.5 h-4 bg-black animate-pulse"></span>
      </nuxt-link>

      <button @click="open = !open" class="md:hidden flex flex-col gap-1.5 p-2">
        <span :class="['h-0.5 w-6 bg-black transition-all', open ? 'rotate-45 translate-y-2' : '']" />
        <span :class="['h-0.5 w-4 bg-black transition-all', open ? 'opacity-0' : '']" />
        <span :class="['h-0.5 w-5 bg-black transition-all', open ? '-rotate-45 -translate-y-2' : '']" />
      </button>

      <nav class="hidden md:flex gap-8">
        <nuxt-link 
          v-for="link in links" 
          :key="link.path" 
          :to="link.path"
          class="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition relative group"
        >
          {{ link.label }}
          <span class="absolute -bottom-[25px] left-0 w-full h-[2px] bg-black scale-x-0 group-[.router-link-exact-active]:scale-x-100 transition-transform"></span>
        </nuxt-link>
      </nav>
    </div>

    <transition name="menu">
      <div 
        v-if="open" 
        class="fixed inset-0 top-16 z-40 bg-white border-t border-zinc-100 flex flex-col md:hidden"
      >
        <nav class="relative flex flex-col">
          <nuxt-link
            v-for="(link, index) in links"
            :key="link.path"
            :to="link.path"
            @click="open = false"
            class="flex items-center px-8 py-6 border-b border-zinc-100 bg-white"
          >
            <span class="w-12 text-[10px] text-zinc-300 font-bold">0{{ index + 1 }}</span>
            <span class="text-xs font-bold tracking-[.3em] uppercase text-zinc-500 group-[.router-link-exact-active]:text-black">
              {{ link.label }}
            </span>
          </nuxt-link>
          
          <div class="px-8 py-10 opacity-40 text-[10px] bg-white">
            <p>/** @status: active */</p>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
const open = ref(false)
const links = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
]

// Automatically close menu when route changes
const route = useRoute()
watch(() => route.fullPath, () => {
  open.value = false
})
</script>

<style scoped>
/* Mobile Menu Animation */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-5px); /* Minimal slide for a clean console look */
}

/* Nuxt Active Link styling */
:deep(.router-link-exact-active) {
  background-color: #fafafa;
}
</style>