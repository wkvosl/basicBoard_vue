<script setup >

import {ref} from "vue";

const search = ref({
      keyword:"",
      searchCategory:""
  }
);

const emit = defineEmits(["search", "category", "doSearch"]);

function sendHandleSearch(){
  emit('search', search.value.keyword);
  emit('category', search.value.searchCategory);
  emit('doSearch');
}

</script>

<template>
  <div class="card bg-base-100 w-screen shadow-md">
    <div class="card-body">
      <select v-model="search.searchCategory">
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="writer">글쓴이</option>
      </select>
      <label class="input">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input v-model="search.keyword" @keyup.enter="sendHandleSearch" type="search" class="grow" placeholder="Search">
      </label>

      <button class="btn btn-primary" @click="sendHandleSearch">검색</button>
    </div>
  </div>
</template>

<style scoped>

</style>