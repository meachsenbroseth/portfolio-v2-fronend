<template>
  <div
    class="min-h-screen bg-[#fafafa] text-[#131313] font-mono overflow-x-hidden selection:bg-[#131313] selection:text-white">
    <!-- Subtle CRT/Grain Overlay -->
    <div
      class="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[radial-gradient(circle,#131313_1px,transparent_1px)] bg-[length:18px_18px]">
    </div>

    <!-- ── HERO SECTION — no data dependency, renders immediately ── -->
    <section class="relative px-4 sm:px-8 md:px-12 pt-16 pb-20 md:py-32 overflow-hidden border-b border-[#e0dddc]">
      <!-- Decorative Corner Accents with technical coordinates -->
      <div class="absolute inset-4 pointer-events-none">
        <div class="absolute top-0 left-0 space-y-1">
          <span class="block w-6 h-6 border-t-2 border-l-2 border-[#131313]"></span>
          <span class="text-[7px] text-[#aaa] font-bold">LAT: 11.5564° N</span>
        </div>
        <div class="absolute top-0 right-0 text-right space-y-1">
          <span class="block w-6 h-6 border-t-2 border-r-2 border-[#131313] ml-auto"></span>
          <span class="text-[7px] text-[#aaa] font-bold">LNG: 104.9282° E</span>
        </div>
        <span class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#131313]"></span>
        <span class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#131313]"></span>
      </div>

      <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <div class="order-2 lg:order-1 space-y-10 reveal-left">
          <div class="inline-flex items-center gap-3">
            <span
              class="text-[10px] tracking-[0.4em] uppercase text-[#131313] font-black bg-[#e0dddc] px-2 py-1">System_Profile</span>
            <div class="h-px w-12 bg-[#e0dddc]"></div>
            <span class="text-[9px] text-[#aaa] font-bold">V_2.0.4</span>
          </div>

          <h1
            class="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black leading-[1.05] tracking-tighter whitespace-pre-line min-h-[2.2em] uppercase">
            <span>{{ typedText }}</span>
            <span class="inline-block w-[4px] h-[0.9em] bg-[#131313] align-middle ml-1"
              :class="cursorVisible ? 'opacity-100' : 'opacity-0'"></span>
          </h1>

          <div class="max-w-md space-y-8">
            <div class="relative">
              <p class="text-[#5d5f5f] leading-relaxed text-sm sm:text-base border-l-4 border-[#131313] pl-6 py-2">
                A passionate <span class="text-[#131313] font-bold">Web Developer</span> based in Cambodia.
                I craft clean, performant digital experiences — from backend logic to pixel-perfect UIs.
              </p>
            </div>

            <!-- Terminal Component -->
            <div class="pt-4">
              <div
                class="group relative bg-white border border-[#e0dddc] p-1 shadow-[4px_4px_0px_#e0dddc] transition-all hover:shadow-[6px_6px_0px_#131313] hover:-translate-x-1 hover:-translate-y-1">
                <div class="bg-[#f5f3f2] px-3 py-1.5 border-b border-[#e0dddc] flex justify-between items-center">
                  <span class="text-[8px] font-black uppercase tracking-widest text-[#aaa]">Terminal_Session</span>
                  <div class="flex gap-1">
                    <span class="w-1.5 h-1.5 bg-[#e0dddc]"></span>
                    <span class="w-1.5 h-1.5 bg-[#e0dddc]"></span>
                  </div>
                </div>

                <div class="relative pl-5 py-4 bg-white">
                  <p class="text-[9px] tracking-[0.3em] uppercase text-[#aaa] mb-3 font-bold italic">// status.output
                  </p>
                  <div class="flex items-start gap-3">
                    <span class="text-[#28c840] text-sm mt-0.5 font-bold">➜</span>
                    <div class="flex-1">
                      <div class="text-sm font-mono text-[#131313] leading-relaxed">
                        <span class="font-black">$</span>
                        <span class="text-[#aaa] ml-2">echo</span>
                        <span class="ml-2 text-[#131313] font-bold">
                          "{{ typedBio }}"
                          <span class="inline-block w-[2px] h-[1.1em] bg-[#28c840] align-middle ml-1"
                            :class="bioCursorVisible ? 'opacity-100' : 'opacity-0'"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-3 pt-2">
              <div
                class="bg-[#131313] text-white px-5 py-3 text-[10px] font-black tracking-[0.2em] uppercase flex items-center gap-3 hover:invert transition-all duration-300 cursor-pointer">
                <span class="relative flex h-2 w-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28c840] opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-[#28c840]"></span>
                </span>
                Active_Now
              </div>
              <div
                class="border-2 border-[#131313] px-5 py-3 text-[10px] font-black tracking-[0.2em] uppercase text-[#131313] bg-transparent hover:bg-[#131313] hover:text-white transition-all duration-300 cursor-pointer">
                PHNOM PENH, KH
              </div>
            </div>
          </div>
        </div>

        <!-- Image Component: Brutalist Frame -->
        <div class="order-1 lg:order-2 reveal-right relative group">
          <div
            class="absolute inset-0 bg-[#131313] translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2">
          </div>

          <div class="relative border-2 border-[#131313] overflow-hidden bg-[#f5f3f2]">
            <img src="~/assets/images/profile.webp"
              class="w-full aspect-[4/5] object-cover transition-all duration-700 group-hover:scale-105"
              alt="Meach Senbroseth, full-stack developer in Phnom Penh, Cambodia"
              loading="eager"
              fetchpriority="high" />

            <!-- Tech Overlays -->
            <div class="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="text-[10px] text-white bg-[#131313] px-2 py-1 font-bold">SCAN_LOCK_88%</div>
            </div>

            <div class="absolute bottom-4 left-4 bg-[#131313] text-white p-4 hidden md:block">
              <div class="text-[8px] tracking-[0.3em] font-bold mb-1 uppercase">Object_Ref:</div>
              <div class="text-[14px] font-black">MEACH_SENBROSETH</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ClientOnly>
      <Suspense>
        <BackgroundLogsSection />
        <template #fallback>
          <Backgroundlogsskeleton />
        </template>
      </Suspense>
    </ClientOnly>

  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';

// Use stores
const experienceStore = useExperienceStore()
const educationStore = useEducationStore()

const { experiences } = storeToRefs(experienceStore)
const { educations } = storeToRefs(educationStore)

// Swiper ref for controlling autoplay
const swiperRef = ref(null)

// Header Typing Animation
const words = ['HELLO WORLD!', "I'M \n MEACH SENBROSETH!"]
const typedText = ref(words[1])
const cursorVisible = ref(true)
let wordIndex = 0
let charIndex = 0
let deleting = false

const typeLoop = () => {
  const current = words[wordIndex]
  if (!deleting) {
    typedText.value = current.slice(0, charIndex + 1)
    charIndex++
    if (charIndex === current.length) {
      deleting = true
      setTimeout(typeLoop, 2000)
      return
    }
  } else {
    typedText.value = current.slice(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      deleting = false
      wordIndex = (wordIndex + 1) % words.length
      setTimeout(typeLoop, 500)
      return
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80)
}

const bioPhrases = [
  "Building scalable E-commerce solutions...",
  "Integrating KHQR & ABA PayWay gateways...",
  "Developing AI-driven recommendation engines...",
  "Available for full-stack collaborations →"
]

const typedBio = ref('')
const bioCursorVisible = ref(true)
let bioWordIndex = 0
let bioCharIndex = 0
let deletingBio = false

const typeBioLoop = () => {
  const current = bioPhrases[bioWordIndex]
  if (!deletingBio) {
    typedBio.value = current.slice(0, bioCharIndex + 1)
    bioCharIndex++
    if (bioCharIndex === current.length) {
      deletingBio = true
      setTimeout(typeBioLoop, 3000)
      return
    }
  } else {
    typedBio.value = current.slice(0, bioCharIndex - 1)
    bioCharIndex--
    if (bioCharIndex === 0) {
      deletingBio = false
      bioWordIndex = (bioWordIndex + 1) % bioPhrases.length
      setTimeout(typeBioLoop, 500)
      return
    }
  }
  setTimeout(typeBioLoop, deletingBio ? 40 : 80)
}

onMounted(() => {
  // Start hero animations immediately — no API calls here
  typeLoop()
  typeBioLoop()

  setInterval(() => {
    cursorVisible.value = !cursorVisible.value
    bioCursorVisible.value = !bioCursorVisible.value
  }, 530)

  // Intersection Observer for reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
})
</script>

<style scoped>
*,
*::before,
*::after {
  border-radius: 0 !important;
}

@keyframes loading {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.reveal-up,
.reveal-left,
.reveal-right {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
}

.reveal-up    { transform: translateY(40px); }
.reveal-left  { transform: translateX(-40px); }
.reveal-right { transform: translateX(40px); }

.visible {
  opacity: 1;
  transform: translate(0);
}
</style>
