<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import {fetchBoard} from "@/api/board";

// 게시글 목록
const boards = ref([]);

// 페이지 정보
const page = ref({
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
  return Array.from({ length: page.value.totalPages }, (_, i) => i);
});

// 데이터 호출
async function loadBoards(pageNumber = 0) {
  const res = await fetchBoard(pageNumber); // 서버 API에서 pageNumber 전송
  boards.value = res.content;
  page.value = res.page;
}

// 페이지 이동
function goPage(pageNumber) {
  loadBoards(pageNumber);
}

function goPrevPage() {
  if (!page.value.first) loadBoards(page.value.number - 1);
}

function goNextPage() {
  if (!page.value.last) loadBoards(page.value.number + 1);
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
    <tr v-for="(board,i) in boards" :key="board.board_no">
      <td>{{i + 1 + page.number * page.size }}</td>
      <td><router-link :to="`/board/${board.board_no}`">{{board.board_title}}</router-link></td>
      <td>{{board.board_content}}</td>
      <td>{{board.board_writer}}</td>
      <td>{{board.reg_date}}</td>
    </tr>
    </tbody>
  </table>
</div>

  <div class="join">
    <input class="join-item btn btn-square" type="radio" name="options"
           v-for="page in totalPagesArray" :key="page"
           :value="page"
           :aria-label="String(page)"
           @click="goPage(page)"
    />
  </div>
</template>

<style scoped>
</style>