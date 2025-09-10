<script setup lang="ts">
import {ref, onMounted} from "vue";
import {fetchBoard} from "@/api/board";

const boards = ref([]);

onMounted(async ()=>{
  boards.value = await fetchBoard();
});

function detail(){

}
</script>

<template>

  <table>
    <thead>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
        <th>작성일</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(board,i) in boards" :key="board.board_no">
        <td>{{i + 1 }}</td>
        <td><router-link :to="`/board/${board.board_no}`">{{board.board_title}}</router-link></td>
        <td>{{board.board_content}}</td>
        <td>{{board.board_writer}}</td>
        <td>{{board.reg_date}}</td>
      </tr>
    </tbody>
  </table>

</template>

<style scoped>

</style>