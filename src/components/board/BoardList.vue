<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import {fetchBoard} from "@/api/board";

// 게시글 목록
const boards = ref([]);

// 페이지 정보
const pageInfo = ref({
  number: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,
  numberOfElements: 0,
  first: true,
  last: false,
  empty: true
});

// totalPages 만큼 배열 생성 (v-for용)
const totalPagesArray = computed(() => {
  return Array.from({ length: pageInfo.value.totalPages }, (_, i) => i + 1);
});

// 데이터 호출
async function loadBoards(pageNumber = 1) {
  const res = await fetchBoard(pageNumber); // 서버 API에서 pageNumber 전송
  boards.value = res.content;
  pageInfo.value = res.page;
}

// 페이지 이동
function goPage(pageNumber) {
  loadBoards(pageNumber);
}

function goFirstPage() {
  if (!pageInfo.value.first) loadBoards(1);
}

function goPrevPage() {
  if (!pageInfo.value.first) loadBoards(pageInfo.value.number - 1);
}

function goNextPage() {
  if (!pageInfo.value.last) loadBoards(pageInfo.value.number + 1);
}

function goLastPage() {
  if (!pageInfo.value.last) loadBoards(pageInfo.value.totalPages);
}

// 최초 호출
onMounted(() => {
  loadBoards();
});
</script>

<template>

<div class="overflow-x-auto">
  <table class="table table-zebra">
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
    <tr v-for="(board,i) in boards" :key="board.boardNo">
      <td>{{i + 1 + (pageInfo.number -1 ) * pageInfo.size }}</td>
      <td><router-link :to="`/board/${board.board_no}`">{{board.boardTitle}}</router-link></td>
      <td>{{board.boardContent}}</td>
      <td>{{board.boardWriter}}</td>
      <td>{{board.regDate}}</td>
    </tr>
    </tbody>
  </table>
</div>

  <div class="join">
    <button class="join-item btn" @click="goFirstPage()">«</button>
    <button class="join-item btn" @click="goPrevPage()">〈</button>
    <button class="join-item btn" v-for="page in totalPagesArray" :key="page" @click="goPage(page)">{{page}}</button>
    <button class="join-item btn" @click="goNextPage()">〉</button>
    <button class="join-item btn" @click="goLastPage()">»</button>
  </div>

</template>

<style scoped>
</style>