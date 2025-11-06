<script setup>


import {useRouter} from "vue-router";
import { useUserStore } from '@/stores/user'
import SignUp from "../account/SignUp.vue";


const router = useRouter();
const userStore = useUserStore()

function goToHome(){
  router.push({ name:'home' });
}

const logout = () => {
  userStore.logout()
}
</script>

<template>

  <header class="flex items-center justify-between whitespace-nowrap border-b border-primary/20 px-10 py-4">
    <div class="flex items-center gap-3 text-slate-800 dark:text-white">
      <svg class="h-8 w-8 text-primary" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor"></path>
      </svg>
      <h2 class="text-xl font-bold"><RouterLink :to="{name:'home'}">Vue &amp; Spring Boot</RouterLink></h2>
    </div>
    <div class="flex items-center gap-8">
      <nav class="hidden md:flex items-center gap-8 text-slate-600 dark:text-slate-300">
        <a class="font-medium hover:text-primary transition-colors" href="#"><RouterLink :to="{name:'home'}">Home</RouterLink></a>
        <a class="font-medium hover:text-primary transition-colors" href="#"><RouterLink :to="{name:'galleryList'}">Gallery</RouterLink></a>
        <a class="font-medium hover:text-primary transition-colors" href="#"><RouterLink :to="{name:'boardList'}">Guestbook</RouterLink></a>
      </nav>
      <div class="flex items-center gap-2">
        <button class="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-slate-500 hover:bg-primary/10 hover:text-primary dark:text-slate-400 dark:hover:bg-primary/20 dark:hover:text-primary transition-colors">
          <span class="material-symbols-outlined">search</span>
        </button>
        <button class="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-slate-500 hover:bg-primary/10 hover:text-primary dark:text-slate-400 dark:hover:bg-primary/20 dark:hover:text-primary transition-colors">
          <span class="material-symbols-outlined">account_circle</span>
        </button>
      </div>
      <!--todo: 로그인 안하고 boardList일경우-->
      <div class="flex items-center gap-2">
        <button v-if="!userStore.isLoggedIn" class="px-4 py-2 text-sm font-bold bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
          <RouterLink :to="{name:'signUp'}">Sign Up</RouterLink>
        </button>
        <button v-if="!userStore.isLoggedIn" class="px-4 py-2 text-sm font-bold bg-primary/10 dark:bg-primary/20 text-primary rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
          Login
        </button>
        <button v-if="userStore.isLoggedIn" @click="logout" class="btn">
          로그아웃 ({{ userStore.nickname }})
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>