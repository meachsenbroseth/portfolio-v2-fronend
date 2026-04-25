<template>
  <div class="relative min-h-screen isolate selection:bg-black selection:text-white overflow-x-hidden">
    <div class="grid-bg fixed inset-0 -z-10 pointer-events-none"></div>

    <Navbar />
      <slot />

    <FooterComponent/>
  </div>
</template>

<script setup lang="ts">
import FooterComponent from '~/components/FooterComponent.vue';
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