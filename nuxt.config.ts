import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  css: [
    "@fortawesome/fontawesome-free/css/all.css",
    "bulma",
    "@/assets/css/main.css",
  ],
  buildModules: [
    "@pinia/nuxt",
    [
      "@nuxtclub/supabase",
      {
        url: "https://ahzvcfyzjcbyheehtbtw.supabase.co",
        key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjE2NzQ2MiwiZXhwIjoxOTUxNzQzNDYyfQ.zl1gHCDeXk_hSUBMdLDnHn8ih-_l6YIShoKZxoBMUhQ",
      },
    ],
  ],
});
