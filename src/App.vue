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
  <div class="flex justify-center ">
    <div class="w-4/5 min-w-fit">
      <RouterView :key="$route.fullPath"></RouterView>
    </div>
  </div>


</template>

<style scoped>

</style>
