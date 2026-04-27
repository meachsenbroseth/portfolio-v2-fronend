<template>
  <div class="relative min-h-screen isolate selection:bg-[#131313] selection:text-white font-mono">
    <!-- Route loading bar -->
    <NuxtLoadingIndicator color="#131313" :height="2" :duration="3000" :throttle="200" />

    <!-- Navbar - outside transition to prevent re-mounting -->
    <Navbar />

    <!-- Page content with transition -->
    <Transition name="page" mode="out-in" appear>
      <main :key="route.path" class="flex-1 focus:outline-none focus:ring-2 focus:ring-[#131313] focus:ring-offset-2">
        <slot />
      </main>
    </Transition>

    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import FooterComponent from '~/components/FooterComponent.vue'
import Navbar from '~/components/Navbar.vue'

const route = useRoute()
</script>

<style>
/* Reset all border radius to 0 (sharp corners) */
*,
*::before,
*::after {
  border-radius: 0 !important;
}

/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Ensure smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Base body styles */
body {
  background-color: #ffffff;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Focus styles for accessibility */
:focus-visible {
  outline: 2px solid #131313;
  outline-offset: 2px;
}
</style>