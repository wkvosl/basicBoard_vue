<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();


const goToBoardList = () => {
  router.replace({ path: '/board/list' });
};

</script>

<template>

  <ul class="menu menu-horizontal bg-base-200 w-screen mb-5">
    <li><RouterLink :to="{name:'home'}">Home</RouterLink></li>
        <li><a href="#" @click.prevent="goToBoardList">게시판 목록</a></li>
  </ul>

</template>


<style scoped>
@import "@/assets/main.css";
</style>