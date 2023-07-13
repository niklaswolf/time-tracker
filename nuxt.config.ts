// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/global.css'],
  devtools: { enabled: false },
  ssr: false,
  modules: [
    '@unocss/nuxt',
  ],
})
