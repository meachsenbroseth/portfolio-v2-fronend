<template>
  <div class="min-h-screen flex bg-gray-50">
    <AdminSidebar />
    <main class="ml-56 flex-1 p-8">
      <slot />
    </main>
  </div>
</template>
<script setup>
import AdminSidebar from '~/components/AdminSidebar.vue';

</script>