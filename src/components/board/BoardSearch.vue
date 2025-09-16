<script setup >
import { computed } from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const props = defineProps(['keyword', 'searchCategory']);
const emit = defineEmits(['update:keyword', 'update:searchCategory', 'doSearch']);

const localKeyword = computed({
  get: () => props.keyword,//읽기전용
  set: (value) => emit('update:keyword', value)//쓰기전용
});

const localCategory = computed({
  get: () => props.searchCategory || '',
  set: (value) => emit('update:searchCategory', value)
});

function sendHandleSearch(){
  emit('doSearch');
}

function resetSearch(){
  emit('update:keyword','');
  emit('update:searchCategory','');
  emit('doSearch');
}

</script>

<template>
  <div class="card bg-base-100 w-screen shadow-md">
    <div class="card-body flex-row">

      <!--      <div class="flex items-start">-->
      <!--        <div>-->
      <select v-model="localCategory" class="select">
        <option value="">전체</option>
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="writer">작성자</option>
      </select>
      <!--        </div>-->

      <div>
        <label class="input">
          <input v-model="localKeyword" @keyup.enter="sendHandleSearch" type="search" class="grow" placeholder="Search">
        </label>
      </div>

      <div class="card-actions">
        <button class="btn btn-primary btn-md	" @click="sendHandleSearch">검색</button>
        <button class="btn btn-primary btn-md	" @click="resetSearch">초기화</button>
      </div>
    </div>
    <!--    </div>-->
  </div>
</template>

<style scoped>

</style>