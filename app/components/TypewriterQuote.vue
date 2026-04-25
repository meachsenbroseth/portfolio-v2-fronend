<template>
  <div class="font-mono text-sm md:text-base leading-relaxed">
    <div class="text-[#8e9192] mb-4">
      // Global Sisyphus.manifesto<br />
      public class Manifesto {
    </div>
    <div class="pl-4">
      <span class="text-[#ffffff]">public static void</span> main(String[] args) {
      <div class="pl-4 mt-2">
        <span class="text-[#8e9192]">// Core Principle</span><br />
        <span class="text-[#ffffff]">String</span> primaryQuote = "<span class="text-[#c6c6c7]">{{ displayedText }}</span><span class="animate-pulse">|</span>";
      </div>
      <span class="text-[#ffffff] pl-4">}</span>
    </div>
    <div class="text-[#8e9192] mt-4">}</div>
  </div>
</template>

<script setup>
const props = defineProps(['text']);
const displayedText = ref('');
let index = 0;

const typeEffect = () => {
  if (index < props.text.length) {
    displayedText.value += props.text.charAt(index);
    index++;
    setTimeout(typeEffect, 50); // Speed of "coding"
  }
};

watch(() => props.text, () => {
  displayedText.value = '';
  index = 0;
  typeEffect();
}, { immediate: true });
</script>