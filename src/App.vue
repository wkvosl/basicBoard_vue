<script>

import Home from "@/components/Home.vue";
import BoardList from "@/components/board/BoardList.vue";
import Nav from "@/components/Nav.vue";

export default {
  components:{
    Nav,
    Home,
    BoardList
  }
}

</script>

<template>

  <Nav></Nav>
  <RouterView></RouterView>

</template>

<style scoped>

</style>
