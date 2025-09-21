<script setup>

import Footer from "@/components/layout/Footer.vue";
import Nav from "@/components/layout/Nav.vue";
</script>

<template>
  <div class="main-layout">
    <header class="header">

      <Nav />

    </header>

    <main class="content">
      <RouterView />
    </main>

    <footer class="footer">
      <Footer />
    </footer>

  </div>
</template>

<style scoped>
.main-layout {
  display: grid;
  grid-template-rows: auto 1fr auto; /* 헤더 - 본문 - 푸터 */
  min-height: 100vh;                 /* 화면 전체 채우기 */
}

/* 영역 지정 */
.header {
  grid-row: 1;
}

.content {
  grid-row: 2;
}

.footer {
  grid-row: 3;
}
</style>