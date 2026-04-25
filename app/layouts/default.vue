<template>
  <div class="relative min-h-screen isolate selection:bg-[#131313] selection:text-white overflow-x-hidden font-mono">

    <!-- Grid background -->
    <div
      class="fixed inset-0 -z-10 pointer-events-none"
      style="background-size:24px 24px; background-image: linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px);"
      aria-hidden="true"
    ></div>

    <!-- Route loading bar -->
    <NuxtLoadingIndicator color="#131313" :height="1" :duration="3000" :throttle="200" />

    <!-- Page transition -->
    <Transition name="page" mode="out-in" appear>
      <div :key="route.path" class="flex flex-col min-h-screen">
        <Navbar />
        <main id="main-content" class="flex-1">
          <slot />
        </main>
        <FooterComponent />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import FooterComponent from '~/components/FooterComponent.vue'
import Navbar from '~/components/Navbar.vue'

const route = useRoute()
</script>

<style>
*, *::before, *::after {
  border-radius: 0 !important;
}

html, body {
  background-color: #ffffff;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Skip to content — accessibility */
#main-content:focus {
  outline: 2px solid #131313;
  outline-offset: 2px;
}

/* Page transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>