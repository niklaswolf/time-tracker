// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-05',
  css: ['~/assets/css/global.css'],
  runtimeConfig: {
    public: {
      jiraEndpoint: '', // Set via environment variable NUXT_PUBLIC_JIRA_ENDPOINT
      jiraUser: '', // Set via environment variable NUXT_JIRA_USER
      jiraPassword: '' // Set via environment variable NUXT_JIRA_PASSWORD
    }
  },
  devtools: { enabled: false },
  ssr: false,
  vite: {
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      strictPort: true,
    },
  },
  ignore: ['**/src-tauri/**'],
  modules: [
    '@unocss/nuxt','@vueuse/nuxt',
  ],
})
