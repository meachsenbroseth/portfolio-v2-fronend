<template>
  <div class="bg-white font-mono text-[#131313] overflow-x-hidden">
    <main class="relative w-full h-svh flex flex-col md:flex-row overflow-hidden">

      <!-- Grid background -->
      <div class="fixed inset-0 pointer-events-none z-0"
        style="background-size:24px 24px; background-image: linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px);"
        aria-hidden="true"></div>

      <!-- ── LEFT: Image Panel ── -->
      <section class="relative z-10 w-full h-[42svh] md:w-[46%] md:h-svh flex-shrink-0 overflow-hidden">
        <img src="~/assets/images/homeimg.jpg" class="w-full h-full object-cover grayscale contrast-110 brightness-90"
          alt="Portfolio Hero" />

        <!-- Scanlines -->
        <div class="absolute inset-0 pointer-events-none"
          style="background: repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px);"
          aria-hidden="true"></div>

        <!-- Ghost number -->
        <div
          class="absolute bottom-4 left-5 text-[clamp(3rem,8vw,6rem)] font-bold tracking-[-0.04em] text-black/[0.06] leading-none select-none pointer-events-none"
          aria-hidden="true">
          {{ String(currentIndex + 1).padStart(2, '0') }}
        </div>
      </section>

      <!-- ── RIGHT: Content Panel ── -->
      <section
        class="relative z-10 w-full h-[58svh] md:w-[54%] md:h-svh flex flex-col bg-[#fafafa] border-t border-[#e0dddc] md:border-t-0 md:border-l md:border-[#e0dddc] overflow-hidden">

        <!-- Corner marks -->
        <span class="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#aaa] pointer-events-none"
          aria-hidden="true"></span>
        <span class="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#aaa] pointer-events-none"
          aria-hidden="true"></span>

        <!-- Content -->
        <div class="flex-1 flex flex-col justify-center overflow-hidden px-6 py-4 md:px-12 lg:px-16">
          <p class="text-[9px] tracking-[0.22em] uppercase text-[#aaa] mb-1">[ MANIFESTO ]</p>
          <h2 class="text-[clamp(1.3rem,3vw,2.4rem)] font-bold tracking-[-0.03em] text-[#131313] leading-[1.1] mb-5">
            {{ current.author }}
          </h2>

          <!-- Code block -->
          <div class="border border-[#e0dddc] overflow-hidden bg-white">
            <!-- Mac dots header -->
            <div class="flex items-center gap-1.5 px-3.5 py-2 bg-[#f5f3f2] border-b border-[#e0dddc]">
              <span class="w-2.5 h-2.5 bg-[#ff5f57] inline-block"></span>
              <span class="w-2.5 h-2.5 bg-[#febc2e] inline-block"></span>
              <span class="w-2.5 h-2.5 bg-[#28c840] inline-block"></span>
              <span class="ml-1 text-[10px] text-[#aaa] tracking-wide">manifesto.java</span>
            </div>
            <!-- Code body -->
            <div class="px-4 py-3.5 overflow-auto text-[clamp(11px,1.3vw,13px)] leading-[1.8]">
              <p class="text-[#aaa] italic whitespace-pre">// {{ current.author.split(' ')[1] || 'Global' }}.manifesto
              </p>
              <p class="text-[#444748] whitespace-pre"><span class="text-[#8b43c4] font-semibold">public class</span>
                Manifesto {</p>
              <p class="text-[#444748] whitespace-pre pl-[1.5em]"><span class="text-[#8b43c4] font-semibold">public
                  static
                  void</span> main(String[] args) {</p>
              <p class="text-[#aaa] italic whitespace-pre pl-[3em]">// Core Principle</p>
              <p class="text-[#444748] whitespace-pre pl-[3em]"><span class="text-[#8b43c4] font-semibold">String</span>
                <span class="text-[#1a6fb5]">quote</span> =
              </p>
              <p class="text-[#2e7d32] break-words whitespace-pre-wrap pl-[4.5em]">
                "<span>{{ displayedText }}</span><span
                  :class="isTyping ? '' : 'animate-[blink_1s_step-start_infinite]'">|</span>";
              </p>
              <p class="text-[#444748] whitespace-pre pl-[1.5em]">}</p>
              <p class="text-[#444748] whitespace-pre">}</p>
            </div>
          </div>
        </div>

        <!-- Footer / Controls -->
        <footer
          class="flex flex-wrap items-center justify-between px-6 pb-5 pt-3 border-t border-[#e0dddc] flex-shrink-0 gap-3 md:px-12 lg:px-16">
          <div class="text-[10px] italic text-[#bbb] leading-[1.7] tracking-wide">
            <p>/**</p>
            <p>&nbsp;&nbsp;* @author {{ current.author.toLowerCase().replace(' ', '_') }}</p>
            <p>&nbsp;&nbsp;* @status active</p>
            <p>*/</p>
          </div>

          <div class="flex items-center gap-2.5 flex-shrink-0">
            <button @click="prev"
              class="w-9 h-9 border border-[#d4d1d0] bg-transparent text-[#313030] flex items-center justify-center text-sm cursor-pointer transition-all duration-150 hover:bg-[#131313] hover:border-[#131313] hover:text-white"
              aria-label="Previous">&#8592;</button>

            <!-- Progress ring -->
            <div class="relative w-10 h-10 flex items-center justify-center">
              <svg class="absolute inset-0 -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#e0dddc" stroke-width="2" />
                <circle cx="20" cy="20" r="16" fill="none" stroke="#131313" stroke-width="2" stroke-dasharray="100.53"
                  :stroke-dashoffset="ringOffset" class="transition-[stroke-dashoffset] duration-100 ease-linear" />
              </svg>
              <span class="relative z-10 text-[11px] font-bold text-[#131313]">{{ currentIndex + 1 }}</span>
            </div>

            <button @click="next"
              class="w-9 h-9 border border-[#d4d1d0] bg-transparent text-[#313030] flex items-center justify-center text-sm cursor-pointer transition-all duration-150 hover:bg-[#131313] hover:border-[#131313] hover:text-white"
              aria-label="Next">&#8594;</button>
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
/* Sharp corners everywhere */
*,
*::before,
*::after {
  border-radius: 0 !important;
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
</style>