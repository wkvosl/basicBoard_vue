<template>

  <div v-if="board">
    <h1>{{ board.board_title }}</h1>
    <p>{{ board.board_content }}</p>
  </div>

  <div class="p-4">
    <button class="btn btn-primary">DaisyUI 버튼</button>
    <div class="card w-96 bg-base-100 shadow-xl mt-4">
      <div class="card-body">
        <h2 class="card-title">DaisyUI 카드</h2>
        <p>Vue + DaisyUI 잘 적용되는지 확인</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchBoardById } from "@/api/board";

const route = useRoute();
const board = ref(null);

onMounted(async () => {
  const id = route.params.id;
  board.value = await fetchBoardById(id);
});

</script>

<style scoped>
@import "@/assets/main.css";
</style>