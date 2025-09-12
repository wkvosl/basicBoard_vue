<script>

import Home from "@/components/Home.vue";
import BoardList3 from "@/components/board/BoardList3.vue";
import Nav from "@/components/Nav.vue";


export default {
  components:{
    Nav,
    Home,
    BoardList: BoardList3
  }
}

</script>

<template>

  <Nav></Nav>
  <RouterView :key="$route.fullPath"></RouterView>

</template>

<style scoped>

</style>
