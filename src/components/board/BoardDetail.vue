<template>

  <div class="card bg-base-100 shadow-md">
    <div v-if="board" class="card-body">
      <h2 class="card-title"> {{board.boardTitle}}</h2>
      <p>{{board.boardContent}}</p>
      <p>{{board.boardWriter}}</p>
      <p>{{board.regDate}}</p>
    </div>
    <div v-else class="card-body justify-center items-center" >
      <span class="loading loading-spinner text-success"></span>
    </div>



  </div>

    <div class="flex justify-end pt-6">
      <button class="btn btn-primary ml-5" @click="goToModify">수정</button>
      <button class="btn btn-primary ml-5" @click="goToList">목록</button>
    </div>



</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchBoardById } from "@/api/board";

const route = useRoute();
const router = useRouter();

const board = ref(null);

//목록 쿼리
let preParam = {};

onMounted(async () => {
  const id = route.params.id;
  board.value = await fetchBoardById(id);

  if (window.history.state && window.history.state.preParam) {
    preParam = window.history.state.preParam;
  }
});

function goToList(){
  router.push({
        name:'boardList',
        query: preParam
      });
}

function goToModify(){
  router.push({
    name:'boardModify',
    state: {'preParam':preParam}
  })
}

</script>