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
    <div class="card-body flex-row">

      <!--      <div class="flex items-start">-->
      <!--        <div>-->
      <select v-model="search.searchCategory" class="select">
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="writer">작성자</option>
      </select>
      <!--        </div>-->

      <div>
        <label class="input">
          <input v-model="search.keyword" @keyup.enter="sendHandleSearch" type="search" class="grow" placeholder="Search">
        </label>
      </div>

      <div class="card-actions">
        <button class="btn btn-primary btn-md	" @click="sendHandleSearch">검색</button>
      </div>
    </div>
    <!--    </div>-->
  </div>
</template>

<style scoped>

</style>