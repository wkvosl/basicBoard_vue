<script>

import Nav from "@/components/Nav.vue";


export default {
  components:{
    Nav,
  }
}

</script>

<template>

  <Nav></Nav>
  <div class="flex justify-center">
    <div class="w-4/5 min-w-fit">
      <RouterView :key="$route.fullPath"></RouterView>
    </div>
  </div>


</template>

<style scoped>

</style>
