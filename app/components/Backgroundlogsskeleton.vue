<template>
  <section class="relative px-4 sm:px-6 md:px-10 py-24 sm:py-32">
    <div class="max-w-6xl mx-auto">

      <!-- Section header skeleton -->
      <div class="flex items-center gap-6 mb-20">
        <div class="w-10 h-8 bg-[#e0dddc] animate-pulse" />
        <div class="h-3 w-40 bg-[#e0dddc] animate-pulse" />
        <div class="flex-1 h-px bg-[#e0dddc]" />
      </div>

      <div class="grid md:grid-cols-2 gap-16 lg:gap-24">

        <!-- Experience skeleton column -->
        <div class="space-y-12">
          <div class="flex items-center justify-between border-b-2 border-[#e0dddc] pb-4">
            <div class="h-3 w-24 bg-[#e0dddc] animate-pulse" />
            <div class="h-2 w-16 bg-[#f0eeec] animate-pulse" />
          </div>
          <div class="space-y-0 relative">
            <div class="absolute left-0 top-0 bottom-0 w-px bg-[#e0dddc]" />
            <div v-for="i in 3" :key="i" class="relative pl-8 pb-16 last:pb-0">
              <div class="absolute left-[-4.5px] top-0 w-2.5 h-2.5 bg-[#e0dddc]" />
              <div class="space-y-3">
                <div class="h-2.5 w-20 bg-[#f0eeec] animate-pulse" />
                <div class="h-5 w-48 bg-[#e0dddc] animate-pulse" />
                <div class="h-3 w-64 bg-[#f0eeec] animate-pulse" />
                <div class="h-3 w-56 bg-[#f5f3f2] animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <!-- Education skeleton column -->
        <div class="space-y-12">
          <div class="flex items-center justify-between border-b-2 border-[#e0dddc] pb-4">
            <div class="h-3 w-28 bg-[#e0dddc] animate-pulse" />
            <div class="h-2 w-16 bg-[#f0eeec] animate-pulse" />
          </div>
          <div class="space-y-0 relative">
            <div class="absolute left-0 top-0 bottom-0 w-px bg-[#e0dddc]" />
            <div v-for="i in 3" :key="i" class="relative pl-8 pb-16 last:pb-0">
              <div class="absolute left-[-4.5px] top-0 w-2.5 h-2.5 bg-[#e0dddc]" />
              <div class="space-y-3">
                <div class="flex gap-2">
                  <div class="h-4 w-16 bg-[#e0dddc] animate-pulse" />
                  <div class="h-4 w-24 bg-[#f0eeec] animate-pulse" />
                </div>
                <div class="h-5 w-48 bg-[#e0dddc] animate-pulse" />
                <div class="h-3 w-60 bg-[#f0eeec] animate-pulse" />
                <div class="h-3 w-52 bg-[#f5f3f2] animate-pulse" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>