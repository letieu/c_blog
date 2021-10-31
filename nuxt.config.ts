import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
    css: [
        '@fortawesome/fontawesome-free/css/all.css',
        'bulma',
        '@/assets/css/main.css'
    ],
    buildModules: [
        '@pinia/nuxt'
    ]
})
