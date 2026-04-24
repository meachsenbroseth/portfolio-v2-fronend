<template>
    <p>this is {{ slug }} detail</p>
</template>
<script setup>
const route = useRoute();
const slug = route.params.slug;
</script>