<script setup>

import {useRoute} from "vue-router";
import {computed} from "vue";
import MainLayout from "@/components/layout/MainLayout.vue";

const route = useRoute()
const layout = computed(()=>{
  return route.meta.layout || MainLayout
})

</script>

<template>

  <component :is="layout">
    <RouterView/>
  </component>


</template>

<style scoped>

</style>
