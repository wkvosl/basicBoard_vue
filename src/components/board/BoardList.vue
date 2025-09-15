<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {fetchBoard} from "@/api/board";
import {useRoute, useRouter} from "vue-router";
import BoardSearch from "@/components/board/BoardSearch.vue";

const route = useRoute();
const router = useRouter();


const search = ref(route.query.search || "");
const category = ref(route.query.category || "");

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

// 현재 페이지 번호 (쿼리스트링에서 가져오거나 기본값 1)
const currentPage = computed(() => {
  return Number(route.query.page) || 1;
});

function handleSearch(value){
  search.value = value;
}

function handleCategory(value){
  category.value = value;
}

// 페이지 이동// 데이터 호출 및 라우터 쿼리 동기화
async function loadBoards(pageNumber: number) {
  // 쿼리 파라미터를 업데이트하여 URL에 페이지 번호를 반영합니다.
  await router.push({
    name: "boardList",
    query: {
      page: pageNumber !== 1 ? pageNumber : undefined,
      search: search.value || undefined,
      category: category.value || undefined
    }
  });

  const res = await fetchBoard(pageNumber, search.value, category.value);
  boards.value = res.content;
  pageInfo.value = res.page;
}
function goPage(pageNumber: number) {
  loadBoards(pageNumber);
}

function goFirstPage() {
  if (!pageInfo.value.first) loadBoards(1);
}

function goPrevPage() {
  if (!pageInfo.value.first) loadBoards(pageInfo.value.number -1);
}

function goNextPage() {
  if (!pageInfo.value.last) loadBoards(pageInfo.value.number + 1);
}

function goLastPage() {
  if (!pageInfo.value.last) loadBoards(pageInfo.value.totalPages);
}

// 최초 로드 시, URL의 페이지 번호에 따라 데이터를 가져옵니다.
onMounted(() => {
  loadBoards(currentPage.value);
});

// URL의 쿼리 파라미터가 변경될 때마다 데이터를 다시 불러옵니다.
watch(
    () => route.query.page,
    (newPage) => {
      // 쿼리가 변경되면, 새 페이지 번호로 데이터를 다시 로드합니다.
      loadBoards(Number(newPage) || 1);
    },
);


</script>

<template>

<BoardSearch
    @search="handleSearch"
    @category="handleCategory"
    @doSearch="loadBoards(1)"/>

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
        <button
            class="join-item btn"
            v-for="page in totalPagesArray"
            :key="page"
            @click="goPage(page)"
            :class="{ 'btn-active': page === currentPage }">
          {{page}}
        </button>
        <button class="join-item btn" @click="goNextPage()">〉</button>
        <button class="join-item btn" @click="goLastPage()">»</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>
