<script setup lang="ts">

import Footer from "@/components/layout/Footer.vue";
import Nav from "@/components/layout/Nav.vue";
</script>

<template>
  <div class="main-layout">
    <header class="header">

      <Nav />

    </header>

    <main class="content">
        <div class="flex justify-center">
          <div class="w-4/5 min-w-fit">
            <router-view :key="$route.fullPath"></router-view>
          </div>
        </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.main-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
</style>