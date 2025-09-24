
<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {fetchBoard} from "@/api/board";
import {useRoute, useRouter} from "vue-router";
import BoardSearch from "@/components/board/BoardSearch.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";
import BoardModify from "@/components/board/BoardModify.vue";
import BoardCreate from "@/components/board/BoardCreate.vue";

const route = useRoute();
const router = useRouter();


const search = ref(route.query.search || "");
const category = ref(route.query.category || "");

// 게시글 목록
const boards = ref([]);
const isSearched = ref();

// 페이지 정보
const pageInfo = ref({
  number: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,
  numberOfElements: 0,
  first: true,
  last: false,
  empty: true,
  boardTotal:0
});

// totalPages 만큼 배열 생성 (v-for용)
const totalPagesArray = computed(() => {
  return Array.from({ length: pageInfo.value.totalPages }, (_, i) => i + 1);
});

// 현재 페이지 번호 (쿼리스트링에서 가져오거나 기본값 1)
const currentPage = computed(() => {
  return Number(route.query.page) || 1;
});

// 페이지 이동// 데이터 호출 및 라우터 쿼리 동기화
async function loadBoards(pageNumber) {
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
  isSearched.value = !!search.value || (category.value && category.value !== '전체');
  boards.value = res.content;
  pageInfo.value = res.page;
}

function goPage(pageNumber) {
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

// 팝업
const selectBoardNo = ref(0);
const showDetail = ref(false);
const showModify = ref(false);

function showDetailPopup(boardNo){
  selectBoardNo.value = boardNo
  showDetail.value = true;
}
function closeDetail() {
  showDetail.value = false;
}
function showModifyPopup(boardNo){
  showDetail.value=false;
  selectBoardNo.value = boardNo
  showModify.value = true;
}
function closeModify(){
  showModify.value = false;
}
function afterSaved(boardNo) {
  showModify.value = false;
  showDetail.value = true;
  selectBoardNo.value = boardNo;
}

</script>

<template>

    <BoardDetail
        v-if="showDetail"
        :boardNo="selectBoardNo"
        @close="closeDetail"
        @openModify = "showModifyPopup"
        @refreshBoardList="loadBoards"
    />

    <BoardModify
        v-if="showModify"
        :boardNo = selectBoardNo
        @close="closeModify"
        @modifySaved="afterSaved"
    />


  <body class="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
  <div class="flex flex-col min-h-screen">

    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="mb-8">
          <h2 class="text-3xl font-bold tracking-tight">Guest Book</h2>
          <p class="mt-2 text-text-muted-light dark:text-text-muted-dark">Share your thoughts and connect with others.</p>
        </div>
          <BoardCreate @refreshBoardList="loadBoards"/>

        <h3 class="text-2xl font-bold tracking-tight mb-6">Recent Posts</h3>
        <div class="space-y-6" v-for="board in boards">
          <div class="flex items-start gap-4 bg-content-light dark:bg-content-dark p-5 rounded-xl shadow-sm hover:bg-gray-100 transition-colors"
               @click="showDetailPopup(board.boardNo)">
            <img alt="Alex's avatar" class="h-12 w-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkj_VVDARP5hbes1IDYxIvDk_wIm_t9N8KPAbKC_WCDBrTCXY2y4hVVpUqUe2rXJpTIei7jgB_Ys1Vzvpu5CJ8xoXIOv16BNN5FJJQuF9ODJv-PfyYylqfNfuz1OVKxYOCpv3jPLU-vnKePEBJxIuC6hWGpkh6ZffBFJXo5JXbhJWkYLFhD4CdVsFA85cPNYZ91H0GPljMNQcbSsGteahwmEaTSc4hdqnFeYOdboiJ3yec_dh44uBX6b1xVk0G5bocHLs5u-eC95c"/>
            <div class="flex-1">
              <p class="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
                {{board.boardContent}}
              </p>
              <p class="text-xs text-text-muted-light dark:text-text-muted-dark mt-2">Posted by {{board.regUser}} on {{board.regDate}}</p>
            </div>
          </div>

        </div>
        <nav aria-label="Pagination" class="flex items-center justify-center gap-2 mt-8">
          <button class="flex items-center justify-center h-9 w-9 rounded-lg text-text-muted-light
          dark:text-text-muted-dark hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors
          disabled:opacity-50 "
                  :disabled="pageInfo.first" @click="goFirstPage">
            <span class="material-symbols-outlined">first_page</span>
          </button>
          <button class="flex items-center justify-center h-9 w-9 rounded-lg text-text-muted-light
          dark:text-text-muted-dark hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors
          disabled:opacity-50 "
                  :disabled="pageInfo.first" @click="goPrevPage">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button
              class="join-item btn"
              v-for="page in totalPagesArray"
              :key="page"
              @click="goPage(page)"
              :class="page === currentPage ? 'pageBntAct': 'pageBnt'">
            {{page}}
          </button>
          <button class="flex items-center justify-center h-9 w-9 rounded-lg text-text-muted-light
            dark:text-text-muted-dark hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors
            disabled:opacity-50 "
                  :disabled="pageInfo.last" @click="goNextPage">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
          <button class="flex items-center justify-center h-9 w-9 rounded-lg text-text-muted-light
            dark:text-text-muted-dark hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors
            disabled:opacity-50 "
                  :disabled="pageInfo.last" @click="goLastPage">
            <span class="material-symbols-outlined">last_page</span>
          </button>
        </nav>
      </div>
    </main>
  </div>

  </body>
  <BoardSearch
      v-model:keyword="search"
      v-model:searchCategory="category"
      @doSearch="loadBoards(1)"
  />

</template>

<style scoped>
.pageBntAct {
  font-weight: 700;
  background-color: var(--color-primary);
  color: white;
}
.pageBnt{
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

