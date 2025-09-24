<script setup>

import router from "@/router/index.js";
import Footer from "@/components/layout/Footer.vue";

function goToBoard(){
  router.push({
    name:'boardList'
  })
}

</script>

<template>

  <body class="font-display">
  <div class="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
    <div class="layout-container flex h-full grow flex-col">

      <main class="flex-1 px-4 py-8 sm:px-6 md:px-8 lg:px-16">
        <div class="mx-auto max-w-5xl">
          <div class="relative mb-12 flex min-h-[480px] items-center justify-center overflow-hidden rounded-xl bg-cover bg-center p-8 text-center text-white" style='background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAEtH72m6r4ypTth4TxLb5xetNsI9iV2QhgqoIe8RdAhR5l_2exT9ytwJQDwEmuFjTePEak8eg7YUTO0SzgfM9fHFYDvSofFyroYw4TwECbA6bUO2aIlHAp7zD8BxHbT8SM6CWHi0hlL6p6pNgHZsTBlV0guqgFcLtT2FWcs7EIPGeYsmzJFqQ8kan2jrh75dbcqBAEHmyGxDhZOTaZF_ZobbBg9fbfDlkGnwuv6lf-hhDZqy5W04enFNyqe1BqDJPKzPTAxLYWzI");'>
            <div class="flex flex-col items-center gap-6">
              <h1 class="text-4xl font-black md:text-6xl">Welcome to My Website</h1>
              <p class="max-w-2xl text-lg text-white/90">Explore my work and leave a message in the guestbook.</p>
              <button class="flex h-12 min-w-[84px] items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-white shadow-lg transition-transform hover:scale-105"
              @click="goToBoard">
                Explore
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div class="md:col-span-2">
              <h2 class="mb-4 text-3xl font-bold text-slate-800 dark:text-white">About Me</h2>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                Vue.js와 Spring Boot Rest Api로 웹 애플리케이션.
                SI개발 기업에서 2년8개월 근무 경력이 있었으나, Vue.js와 Rest Api로
                유지보수 및 개발건은 다루지 못해 이 참에 만들어 보려고 한다.
                생소하기 때문에 AI의 도움을 받으며 작업을 진행했다.
              </p>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                사이드프로젝트로 웹개발 핵심이라고 하는 CRUD를 잘 표현할 수 있는
                게시판을 만들었고, 갤러리와 방문록의 형태로 구현하였다.
              </p>
            </div>
            <div class="flex flex-col items-start gap-4">
              <h2 class="mb-2 text-3xl font-bold text-slate-800 dark:text-white">Quick Links</h2>
              <div class="flex w-full flex-col gap-3">
                <button class="flex h-11 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-white transition-opacity hover:opacity-90">
                  <RouterLink :to="{name:'galleryList'}">Go to Gallery</RouterLink>
                </button>
                <button class="flex h-11 w-full items-center justify-center rounded-lg bg-primary/10 px-6 text-base font-bold text-primary transition-colors hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30">
                  <RouterLink :to="{name:'boardList'}">View Guestbook</RouterLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
<!--      <footer class="mt-auto border-t border-primary/20 py-6 px-10 text-center text-sm text-slate-500 dark:text-slate-400">-->
<!--        <p>© 2025 Vue &amp; Spring Boot Project. All rights reserved.</p>-->
<!--      </footer>-->
      <Footer/>
    </div>
  </div>

  </body>
</template>

<style scoped>
</style>