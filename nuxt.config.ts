// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    exposeConfig: true
  },
  fonts: {
    families: [
      {
        name: 'Google Sans Code',
        provider: 'google',
        weights: [400, 500, 700]
      }
    ]
  }
})