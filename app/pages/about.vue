<template>
  <div
    class="min-h-screen bg-[#fafafa] text-[#131313] font-mono overflow-x-hidden selection:bg-[#131313] selection:text-white">
    <!-- Subtle CRT/Grain Overlay -->
    <div
      class="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[radial-gradient(circle,#131313_1px,transparent_1px)] bg-[length:18px_18px]">
    </div>

    <!-- Hero Section -->
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

    <!-- Loading State: Minimal Terminal Style -->
    <div v-if="experienceStore.loading || educationStore.loading"
      class="flex flex-col items-center justify-center py-32 gap-4">
      <div class="h-1 w-24 bg-[#e0dddc] relative overflow-hidden">
        <div class="absolute inset-0 bg-[#131313] animate-[loading_1.5s_infinite]"></div>
      </div>
      <span class="text-[9px] font-black uppercase tracking-widest animate-pulse">Syncing_Data_Nodes...</span>
    </div>

    <!-- Background Logs Section -->
    <section v-else class="relative px-4 sm:px-6 md:px-10 py-24 sm:py-32">
      <div class="max-w-6xl mx-auto">
        <div class="reveal-up flex items-center gap-6 mb-20">
          <div class="bg-[#131313] text-white p-2 text-xs font-black">002</div>
          <h2 class="text-xs font-black tracking-[0.5em] uppercase text-[#131313]">Archive_Module</h2>
          <div class="flex-1 h-px bg-[#131313]"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-16 lg:gap-24">
          <!-- Experience Column -->
          <div class="space-y-12">
            <div class="flex items-center justify-between border-b-2 border-[#131313] pb-4">
              <div class="flex items-center gap-3">
                <Icon name="ph:terminal-window-bold" size="24" class="text-[#131313]" />
                <h2 class="text-sm font-black uppercase tracking-[0.2em]">Exp_Log</h2>
              </div>
              <span class="text-[9px] text-[#aaa] font-bold">TOTAL: {{ experienceStore.experiences?.length }}</span>
            </div>

            <div v-if="experienceStore.experiences?.length === 0"
              class="border border-dashed border-[#e0dddc] py-20 text-center text-[10px] uppercase tracking-widest text-[#aaa]">
              Directory_Empty
            </div>

            <div v-else class="space-y-0 relative">
              <div
                class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#131313] via-[#e0dddc] to-transparent">
              </div>

              <div v-for="(item, i) in experienceStore.experiences" :key="item.id"
                class="relative pl-8 pb-16 group last:pb-0">
                <div
                  class="absolute left-[-4.5px] top-0 w-2.5 h-2.5 bg-white border-2 border-[#131313] group-hover:bg-[#131313] transition-all duration-300">
                </div>

                <div class="reveal-up" :style="`animation-delay:${i * 0.1}s`">
                  <div class="inline-block bg-[#f5f3f2] px-2 py-1 mb-4">
                    <span class="text-[10px] font-black text-[#131313] tracking-widest">{{ item.date }}</span>
                  </div>

                  <h3
                    class="text-xl sm:text-2xl font-black text-[#131313] tracking-tighter mb-3 uppercase group-hover:pl-2 transition-all duration-300">
                    {{ item.title }}
                  </h3>

                  <p
                    class="text-xs sm:text-sm text-[#5d5f5f] leading-relaxed max-w-md italic border-l-2 border-[#e0dddc] pl-4">
                    {{ item.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Education Column -->
          <div class="space-y-12">
            <div class="flex items-center justify-between border-b-2 border-[#131313] pb-4">
              <div class="flex items-center gap-3">
                <Icon name="ph:graduation-cap-bold" size="24" class="text-[#131313]" />
                <h2 class="text-sm font-black uppercase tracking-[0.2em]">Edu_Archive</h2>
              </div>
              <span class="text-[9px] text-[#aaa] font-bold">TOTAL: {{ educationStore.educations?.length }}</span>
            </div>

            <div v-if="educationStore.educations?.length === 0"
              class="border border-dashed border-[#e0dddc] py-20 text-center text-[10px] uppercase tracking-widest text-[#aaa]">
              Directory_Empty
            </div>

            <div v-else class="space-y-0 relative">
              <div
                class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#131313] via-[#e0dddc] to-transparent">
              </div>

              <div v-for="(item, i) in educationStore.educations" :key="item.id"
                class="relative pl-8 pb-16 group last:pb-0">
                <div
                  class="absolute left-[-4.5px] top-0 w-2.5 h-2.5 bg-white border-2 border-[#131313] group-hover:bg-[#131313] transition-all duration-300">
                </div>

                <div class="reveal-up" :style="`animation-delay:${0.2 + i * 0.1}s`">
                  <div class="flex flex-wrap items-center gap-3 mb-4">
                    <span class="text-[10px] font-black bg-[#131313] text-white px-2 py-0.5 tracking-widest">{{
                      item.date }}</span>
                    <span class="text-[10px] font-bold text-[#aaa] uppercase tracking-tighter">@{{ item.institution
                    }}</span>
                  </div>

                  <h3
                    class="text-xl sm:text-2xl font-black text-[#131313] tracking-tighter mb-3 uppercase group-hover:pl-2 transition-all duration-300">
                    {{ item.title }}
                  </h3>

                  <p
                    class="text-xs sm:text-sm text-[#5d5f5f] leading-relaxed max-w-md italic border-l-2 border-[#e0dddc] pl-4">
                    {{ item.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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

useSEO({
  title: 'About Meach Senbroseth - Laravel and Nuxt.js Developer in Cambodia',
  description: 'Learn about Meach Senbroseth, a full-stack developer in Phnom Penh focused on Laravel, Nuxt.js, Vue.js, payment integrations, APIs, and scalable web systems.',
  path: '/about',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' }
  ]
})

// Swiper ref for controlling autoplay
const swiperRef = ref(null)

// Header Typing Animation
const words = ['HELLO WORLD!', "I'M \n MEACH SENBROSETH!"]
const typedText = ref(words[1])
const cursorVisible = ref(true)
let wordIndex = 0
let charIndex = 0
let deleting = false
const SwiperAutoplay = Autoplay;
const SwiperFreeMode = FreeMode;

const skills = [
  { name: 'Vue.js',     icon: 'simple-icons:vuedotjs' },
  { name: 'Nuxt.js',    icon: 'simple-icons:nuxtdotjs' },
  { name: 'Laravel',    icon: 'simple-icons:laravel' },
  { name: 'Tailwind',   icon: 'simple-icons:tailwindcss' },
  { name: 'TypeScript', icon: 'simple-icons:typescript' },
  { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
  { name: 'PHP',        icon: 'simple-icons:php' },
  { name: 'Docker',     icon: 'simple-icons:docker' },
  { name: 'Git',        icon: 'simple-icons:git' },
  { name: 'Figma',      icon: 'simple-icons:figma' },
  { name: 'Node.js',    icon: 'simple-icons:nodedotjs' },
  { name: 'MongoDB',    icon: 'simple-icons:mongodb' },
];

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

// Bio Typing Animation
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

// Swiper mouse enter/leave handlers for better UX
const handleSwiperMouseEnter = () => {
  // Pause autoplay on hover
  if (swiperRef.value && swiperRef.value.autoplay) {
    swiperRef.value.autoplay.stop()
  }
}

const handleSwiperMouseLeave = () => {
  // Resume autoplay when mouse leaves
  if (swiperRef.value && swiperRef.value.autoplay) {
    swiperRef.value.autoplay.start()
  }
}

// Fetch data on mount
onMounted(async () => {
  // Start animations
  typeLoop()
  typeBioLoop()

  // Start cursor blink
  setInterval(() => {
    cursorVisible.value = !cursorVisible.value
    bioCursorVisible.value = !bioCursorVisible.value
  }, 530)

  // Fetch data from API
  try {
    await Promise.all([
      experienceStore.fetchExperiences(),
      educationStore.fetchEducations()
    ])
  } catch (error) {
    console.error('Failed to fetch data for about page:', error)
  }

  // Intersection Observer for Reveal Animations
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
/* Force non-rounded edges for the brutalist look */
*,
*::before,
*::after {
  border-radius: 0 !important;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.skills-swiper :deep(.swiper-wrapper) {
  transition-timing-function: linear !important;
  cursor: grab;
}

.skills-swiper :deep(.swiper-wrapper:active) {
  cursor: grabbing;
}

/* Smooth gradient fade on edges */
.skills-swiper-container {
  position: relative;
}

.reveal-up,
.reveal-left,
.reveal-right {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
}

.reveal-up {
  transform: translateY(40px);
}

.reveal-left {
  transform: translateX(-40px);
}

.reveal-right {
  transform: translateX(40px);
}

.visible {
  opacity: 1;
  transform: translate(0);
}

/* Custom Grayscale Hover for Image */
.grayscale {
  filter: grayscale(100%) contrast(110%);
}

.grayscale:hover {
  filter: grayscale(0%) contrast(100%);
}
</style>
