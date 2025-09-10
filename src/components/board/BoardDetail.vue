<template>

  <div v-if="board">
    <h1>{{ board.board_title }}</h1>
    <p>{{ board.board_content }}</p>
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