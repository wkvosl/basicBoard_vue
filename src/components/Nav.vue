<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// RouterLink를 사용하지 않고, 클릭 이벤트 핸들러를 사용하여 페이지 이동 로직을 직접 제어
const refreshBoardList = () => {
  // 현재 경로가 'boardList'이고 쿼리스트링이 없는 상태일 때
  if (route.name === 'boardList' && Object.keys(route.query).length > 0) {
    // 쿼리스트링을 제거하고 기본 경로로 강제 이동
    router.push({ name: 'boardList' });
  } else if (route.name !== 'boardList') {
    // 현재 경로가 'boardList'가 아닐 경우, 'boardList'로 이동
    router.push({ name: 'boardList' });
  }
};
</script>

<template>

  <ul class="menu menu-horizontal bg-base-200 w-screen">
    <li><RouterLink :to="{name:'home'}">Home</RouterLink></li>
<!--    @click.prevent: <a> 태그의 기본 동작인 페이지 리로드를 막습니다.-->
    <li><a href="#" @click.prevent="refreshBoardList">게시판 목록</a></li>
  </ul>

</template>


<style scoped>
@import "@/assets/main.css";
</style>