<script setup lang="ts">
import {ref, onMounted, computed, watch} from "vue";
import {fetchBoard} from "@/api/board";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();

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
function goPage(pageNumber: number) {
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
  loadBoards(1);
});

const router = useRouter();
function goBoardList() {
  loadBoards(1); // 항상 첫 페이지
  router.push({ name: "boardList" }); // URL 이동 (선택 사항)
}
</script>

<template>
  <div class="card bg-base-100 w-screen shadow-md">
    <div class="card-body">


      <div class="overflow-x-auto">
        <div>
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
            <td><router-link :to="`/board/${board.boardNo}`">{{board.boardTitle}}</router-link></td>
            <td>{{board.boardContent}}</td>
            <td>{{board.boardWriter}}</td>
            <td>{{board.regDate}}</td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>

      <div class="join justify-center pt-6">
        <button class="join-item btn" @click="goFirstPage()">«</button>
        <button class="join-item btn" @click="goPrevPage()">〈</button>
        <button class="join-item btn" v-for="page in totalPagesArray" :key="page" @click="goPage(page)">{{page}}</button>
        <button class="join-item btn" @click="goNextPage()">〉</button>
        <button class="join-item btn" @click="goLastPage()">»</button>
      </div>

      </div>
  </div>
</template>

<style scoped>
</style>