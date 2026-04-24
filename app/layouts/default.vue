<template>
  <div class="relative min-h-screen isolate selection:bg-black selection:text-white overflow-x-hidden">
    <div class="grid-bg fixed inset-0 -z-10 pointer-events-none"></div>

    <Navbar />

    <main class="relative z-10 max-w-6xl mx-auto px-6 py-12">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';
</script>

<style>
/* Global resets to ensure the "White" primary theme feels consistent */
html, body {
  background-color: #ffffff;
  margin: 0;
  padding: 0;
}
</style>