<script>

import Nav from "@/components/Nav.vue";
import Footer from "@/components/layout/Footer.vue";


export default {
  components:{
    Footer,
    Nav,
  }
}

</script>

<template>

  <Nav></Nav>
  <div class="flex justify-center">
    <div class="w-4/5 min-w-fit">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>

  <Footer />

</template>

<style scoped>

</style>
