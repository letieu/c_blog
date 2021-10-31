import { initializeApp } from "firebase/app";
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  const firebaseConfig = {
    apiKey: "AIzaSyB6EeIl8nGGZJ_-ti7p-ZirJ1eIgvbdC0g",
    authDomain: "chuong-blog.firebaseapp.com",
    projectId: "chuong-blog",
    storageBucket: "chuong-blog.appspot.com",
    messagingSenderId: "158341018733",
    appId: "1:158341018733:web:a5a50baf23ac8046bbfb64",
    measurementId: "G-JTQB7FP0MQ"
  };

  const app = initializeApp(firebaseConfig);
})
