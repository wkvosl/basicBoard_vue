
<template>

  <GallerySearch
      v-model:keyword="search"
      v-model:searchCategory="category"
      @doSearch="loadGallery(1)"/>

  <div class="card bg-base-100 shadow-md">
    <div class="card-body">
      <div class="overflow-x-auto">
        <p v-if="isSearched" class="mb-3">
          검색한 게시물
          <span class="text-blue-700 text-lg font-bold">{{ pageInfo.totalElements }}</span>
          /
          <span class="text-blue-700 text-lg font-bold">{{ pageInfo.boardTotal }}</span>
          건
        </p>
        <p v-else class="mb-5">
          총 게시물
          <span class="text-blue-700 text-lg font-bold">{{ pageInfo.boardTotal }}</span>
          건
        </p>

        <div class="flex justify-end mb-4">
          <button class="btn btn-neutral btn-md" @click="goToCreate">등록</button>
        </div>

        <!-- 갤러리 영역 -->
        <div
            class="grid gap-4"
            :class="{
      'grid-cols-1': true,
      'sm:grid-cols-2': true,
      'md:grid-cols-2': true,
      'lg:grid-cols-3': true,
      'xl:grid-cols-4': true
    }"
        >
          <div
              v-for="gallery in gallerys"
              :key="gallery.galleryNo"
              class="card bg-base-100 shadow-md hover:shadow-xl transition cursor-pointer"
              @click="goToDetail(gallery.galleryNo)"
          >
            <div class="card-body">
              <img :src="gallery.files?.[0]?.resourcePathName || '/images/no-image.png'"
                   :alt="gallery.files?.[0]?.originalFileName">
                {{gallery.files?.[0]?.originalFileName}}
              <h2 class="card-title line-clamp-1">{{ gallery.galleryTitle }}</h2>
              <p class="line-clamp-2 text-sm text-gray-600">{{ gallery.galleryContent }}</p>
              <div class="mt-2 text-xs text-gray-500">
                <span class="mr-2">{{ gallery.galleryWriter }}</span>
                <span>{{ gallery.regDate }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="join justify-center pt-6">
        <button class="join-item btn" :disabled="pageInfo.first" @click="goFirstPage()">«</button>
        <button class="join-item btn" :disabled="pageInfo.first" @click="goPrevPage()">〈</button>
        <button
            class="join-item btn"
            v-for="page in totalPagesArray"
            :key="page"
            @click="goPage(page)"
            :class="{ 'btn-active': page === currentPage }">
          {{page}}
        </button>
        <button class="join-item btn" :disabled="pageInfo.last" @click="goNextPage()">〉</button>
        <button class="join-item btn" :disabled="pageInfo.last" @click="goLastPage()">»</button>
      </div>

    </div>
  </div>

</template>


<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import GallerySearch from "@/components/gallery/GallerySearch.vue";
import {fetchGallery} from "@/api/gallery.js";

const route = useRoute();
const router = useRouter();

const search = ref(route.query.search || "");
const category = ref(route.query.category || "");

// 게시글 목록
const gallerys = ref([]);
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
async function loadGallery(pageNumber) {
  // 쿼리 파라미터를 업데이트하여 URL에 페이지 번호를 반영합니다.
  await router.push({
    name: "galleryList",
    query: {
      page: pageNumber !== 1 ? pageNumber : undefined,
      search: search.value || undefined,
      category: category.value || undefined
    }
  });

  const res = await fetchGallery(pageNumber, search.value, category.value);
  isSearched.value = !!search.value || (category.value && category.value !== '전체');
  gallerys.value = res.content;
  pageInfo.value = res.page;
}
function goPage(pageNumber) {
  loadGallery(pageNumber);
}

function goFirstPage() {
  if (!pageInfo.value.first) loadGallery(1);
}

function goPrevPage() {
  if (!pageInfo.value.first) loadGallery(pageInfo.value.number -1);
}

function goNextPage() {
  if (!pageInfo.value.last) loadGallery(pageInfo.value.number + 1);
}

function goLastPage() {
  if (!pageInfo.value.last) loadGallery(pageInfo.value.totalPages);
}

// 최초 로드 시, URL의 페이지 번호에 따라 데이터를 가져옵니다.
onMounted(() => {
  loadGallery(currentPage.value);
});

// URL의 쿼리 파라미터가 변경될 때마다 데이터를 다시 불러옵니다.
watch(
    () => route.query.page,
    (newPage) => {
      // 쿼리가 변경되면, 새 페이지 번호로 데이터를 다시 로드합니다.
      loadGallery(Number(newPage) || 1);
    },
);

function goToCreate(){
  router.push({
    name:'galleryCreate'
  })
}

//상세페이지 이동
function goToDetail(galleryId) {
  router.push({
    name: 'galleryDetail',
    params: { id: galleryId },
    state: { preParam: route.query }
  });
}

</script>



