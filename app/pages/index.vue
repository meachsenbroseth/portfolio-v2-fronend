<template>
  <div
    class="min-h-svh bg-[#fafafa] font-mono text-[#131313] overflow-x-hidden selection:bg-[#131313] selection:text-white">
    <!-- CRT Scanline Global Overlay -->
    <div
      class="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]">
    </div>

    <!-- Layout Container -->
    <main class="relative w-full min-h-svh flex flex-col md:flex-row overflow-x-hidden">
      <!-- Grid background -->
      <div class="fixed inset-0 pointer-events-none z-0 opacity-30"
        style="background-size:24px 24px; background-image: radial-gradient(circle, #000 1px, transparent 1px);"
        aria-hidden="true"></div>

      <!-- ── LEFT: Image Panel ── -->
      <section
        class="relative z-10 w-full h-[40svh] md:w-[45%] md:h-svh flex-shrink-0 overflow-hidden group border-b md:border-b-0 md:border-r border-[#e0dddc]">
        <!-- Glitch Image -->
        <div class="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
          <img src="~/assets/images/homeimg.jpg"
            class="w-full h-full object-cover grayscale contrast-[1.1] brightness-75 animate-[glitch-flicker_6s_infinite]"
            alt="Portfolio Hero" />
        </div>

        <!-- HUD Layer -->
        <div class="absolute inset-0 p-4 md:p-6 flex flex-col justify-between pointer-events-none">
          <div class="flex justify-between items-start opacity-60">
            <div class="text-[7px] md:text-[8px] font-black leading-none uppercase space-y-1">
              <p class="bg-[#131313] text-white px-1 py-0.5 inline-block">MODE: {{ isTyping ? 'BUFFERING' : 'READY' }}
              </p>
              <p>SENS: 800_ISO</p>
            </div>
            <div class="text-[7px] md:text-[8px] font-black text-right uppercase leading-none">
              <p>COORD_LAT: 11.55°N</p>
              <p>COORD_LNG: 104.92°E</p>
            </div>
          </div>

          <!-- Central Aim -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 opacity-30">
            <div class="absolute top-1/2 w-full h-px bg-white"></div>
            <div class="absolute left-1/2 h-full w-px bg-white"></div>
          </div>

          <div class="flex justify-between items-end">
            <div class="bg-white/90 text-[#131313] px-2 py-1 text-[9px] font-black uppercase tracking-tighter">
              SYS_UID_{{ String(currentIndex + 1).padStart(3, '0') }}
            </div>
            <div class="text-[7px] text-white/50 font-bold uppercase tracking-widest">
              {{ new Date().getFullYear() }} © MSB_SETH
            </div>
          </div>
        </div>
      </section>

      <!-- ── RIGHT: Content Panel ── -->
      <section class="relative z-10 w-full min-h-[60svh] md:w-[55%] md:h-svh flex flex-col bg-[#fafafa]">

        <!-- Status Nav -->
        <nav
          class="h-12 md:h-14 border-b border-[#e0dddc] flex items-center justify-between px-6 md:px-12 bg-white/50 backdrop-blur-sm">
          <div class="flex items-center gap-3">
            <div class="w-1.5 h-1.5 bg-[#28c840] rounded-full animate-pulse"></div>
            <span class="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">Live_Environment</span>
          </div>
          <span class="text-[8px] md:text-[9px] font-bold text-[#aaa] uppercase tracking-widest">{{ new
            Date().toLocaleDateString() }}</span>
        </nav>

        <!-- Body -->
        <div class="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 py-12">
          <div class="mb-6 md:mb-10 space-y-1">
            <span class="text-[8px] font-black uppercase text-[#aaa] tracking-[0.4em] block">Data_Origin // {{
              current.author }}</span>
            <h2
              class="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter text-[#131313] leading-[0.9] uppercase">
              Core_Principles
            </h2>
          </div>

          <!-- Terminal Mockup -->
          <div class="border-2 border-[#131313] bg-white shadow-[6px_6px_0px_#e0dddc] relative overflow-hidden">
            <div class="flex items-center justify-between px-3 py-1.5 bg-[#131313] border-b border-[#131313]">
              <div class="flex items-center gap-2">
                <div class="flex gap-1">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#ff5f56]"></div>
                  <div class="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]"></div>
                </div>
                <span class="text-[8px] text-white/50 font-black uppercase tracking-[0.2em]">stdout.log</span>
              </div>
            </div>

            <div class="p-5 md:p-8 min-h-[180px] md:min-h-[220px] font-mono">
              <div class="flex gap-3 md:gap-5">
                <div class="hidden xs:block text-right select-none opacity-10 text-[10px] font-bold leading-[1.8]">
                  <p v-for="n in 5" :key="n">{{ n.toString().padStart(2, '0') }}</p>
                </div>
                <div class="flex-1 text-[13px] sm:text-[15px] md:text-[17px] leading-relaxed">
                  <p class="text-[#28c840] font-black mb-1 text-[10px] uppercase opacity-70 tracking-widest">>>
                    Executing_Output</p>
                  <p class="font-bold text-[#131313]">
                    <span class="text-[#aaa] font-normal mr-2">val:</span>
                    <span class="italic">"</span>{{ displayedText }}<span class="italic">"</span>
                    <span
                      class="inline-block w-1.5 h-[1.1em] bg-[#131313] align-middle ml-1 shadow-[2px_2px_0px_#28c840]"
                      :class="isTyping ? '' : 'animate-[blink_1s_step-start_infinite]'"></span>
                  </p>
                </div>
              </div>
            </div>

            <div class="border-t border-[#e0dddc] px-3 py-1 flex justify-between items-center bg-[#fafafa]">
              <span class="text-[7px] font-bold text-[#aaa] uppercase">Enc: UTF-8 | Status: 200_OK</span>
              <span class="text-[7px] font-black uppercase text-[#131313]">0x8FD2_SECURE</span>
            </div>
          </div>
        </div>

        <!-- Desktop/Mobile Unified Footer -->
        <footer class="h-20 border-t border-[#e0dddc] flex items-center justify-between px-6 md:px-12 bg-white">
          <div class="hidden lg:block">
            <p class="text-[8px] font-black uppercase tracking-widest leading-none">Access_Point: Secondary</p>
            <p class="text-[7px] text-[#aaa] font-bold uppercase mt-1">Status: Monitoring_Active</p>
          </div>

          <div class="flex items-center gap-4 md:gap-8 w-full lg:w-auto justify-between lg:justify-end">
            <!-- Nav Controls -->
            <div class="flex border-2 border-[#131313]">
              <button @click="prev"
                class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-[#131313] hover:text-white transition-all active:scale-95 border-r-2 border-[#131313]">
                <span class="text-sm md:text-lg">PREV</span>
              </button>
              <button @click="next"
                class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-[#131313] hover:text-white transition-all active:scale-95">
                <span class="text-sm md:text-lg">NEXT</span>
              </button>
            </div>

            <!-- Loader / Counter -->
            <div
              class="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2 border-[#131313] bg-[#fdfdfd]">
              <svg class="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#f0f0f0" stroke-width="2" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="#131313" stroke-width="2" stroke-dasharray="100.5"
                  :stroke-dashoffset="ringOffset" class="transition-[stroke-dashoffset] duration-100 ease-linear" />
              </svg>
              <div class="text-center z-10">
                <span class="block text-[10px] font-black leading-none">{{ currentIndex + 1 }}</span>
                <div class="w-4 h-px bg-[#e0dddc] mx-auto my-0.5"></div>
                <span class="block text-[7px] font-bold text-[#aaa]">{{ quotes.length }}</span>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </main>
  </div>
</template>

<script setup>
const quotes = [
  { id: 1, quote: "One must imagine Sisyphus happy, for the struggle itself is enough to fill a man's heart.", author: "Albert Camus" },
  { id: 2, quote: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { id: 3, quote: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { id: 4, quote: "Act as if what you do makes a difference. It does.", author: "William James" },
  { id: 5, quote: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { id: 6, quote: "Well done is better than well said.", author: "Benjamin Franklin" },
  { id: 7, quote: "The best revenge is massive success.", author: "Frank Sinatra" },
  { id: 8, quote: "What we think, we become.", author: "Buddha" },
]

const INTERVAL = 10000
const CIRCUMFERENCE = 2 * Math.PI * 16

const currentIndex = ref(0)
const progress = ref(0)
const displayedText = ref('')
const isTyping = ref(false)
const current = computed(() => quotes[currentIndex.value])
const ringOffset = computed(() => CIRCUMFERENCE - (progress.value / 100) * CIRCUMFERENCE)

let timer = null, typeTimer = null

const typeEffect = () => {
  displayedText.value = ''
  isTyping.value = true
  let i = 0
  clearInterval(typeTimer)
  typeTimer = setInterval(() => {
    if (i < current.value.quote.length) {
      displayedText.value += current.value.quote.charAt(i++)
    } else {
      clearInterval(typeTimer)
      isTyping.value = false
    }
  }, 35)
}

const startTimer = () => {
  progress.value = 0
  clearInterval(timer)
  typeEffect()
  timer = setInterval(() => {
    progress.value += 100 / (INTERVAL / 100)
    if (progress.value >= 100) next()
  }, 100)
}

const next = () => { currentIndex.value = (currentIndex.value + 1) % quotes.length; startTimer() }
const prev = () => { currentIndex.value = (currentIndex.value - 1 + quotes.length) % quotes.length; startTimer() }

onMounted(startTimer)
onUnmounted(() => { clearInterval(timer); clearInterval(typeTimer) })
</script>

<style scoped>
*,
*::before,
*::after {
  border-radius: 0 !important;
}

@keyframes glitch-flicker {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  2% {
    opacity: 0.8;
    transform: skewX(1deg);
    filter: hue-rotate(90deg);
  }

  4% {
    opacity: 1;
    transform: scale(1);
    filter: none;
  }

  40% {
    opacity: 1;
  }

  41% {
    opacity: 0.9;
    transform: translateX(2px);
  }

  42% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    opacity: 1;
  }
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

/* Hide scrollbars but keep functionality */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

@media (max-width: 400px) {
  .xs\:block {
    display: none;
  }
}
</style>