<template>
  <section class="relative px-4 sm:px-6 md:px-10 py-24 sm:py-32">
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
                  <span
                    class="text-[10px] font-black bg-[#131313] text-white px-2 py-0.5 tracking-widest">{{ item.date }}</span>
                  <span
                    class="text-[10px] font-bold text-[#aaa] uppercase tracking-tighter">@{{ item.institution }}</span>
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
</template>

<script setup>
// top-level await — triggers <Suspense> in the parent to wait here
// while the hero above is already visible and interactive
const experienceStore = useExperienceStore()
const educationStore  = useEducationStore()

await Promise.all([
  experienceStore.fetchExperiences(),
  educationStore.fetchEducations(),
])
</script>