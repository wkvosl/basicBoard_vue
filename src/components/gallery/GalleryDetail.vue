<template>

  <div class="card bg-base-100 shadow-md">
    <div v-if="gallery" class="card-body">
      <h2 class="card-title"> {{gallery.galleryTitle}}</h2>
      <p>{{gallery.galleryContent}}</p>
      <p>{{gallery.galleryWriter}}</p>
      <p>{{gallery.regDate}}</p>
      <img v-for="file in gallery.files" 
        :src="file.resourcePathName" 
        :alt="file.originalFileName"/>
    </div>
    <div v-else class="card-body justify-center items-center" >
      <span class="loading loading-spinner text-success"></span>
    </div>



  </div>

    <div class="flex justify-end pt-6">
      <button class="btn btn-secondary ml-5" @click="goToDelete">삭제</button>
      <button class="btn btn-primary ml-5" @click="goToModify">수정</button>
      <button class="btn btn-primary ml-5" @click="goToList">목록</button>
    </div>



</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {fetchGalleryById, fetchDeleteById} from "@/api/gallery.js";

const route = useRoute();
const router = useRouter();

const gallery = ref(null);

//목록 쿼리
let preParam = {};

onMounted(async () => {
  const id = route.params.id;
  gallery.value = await fetchGalleryById(id);

  if (window.history.state && window.history.state.preParam) {
    preParam = window.history.state.preParam;
  }
});

function goToList(){
  router.push({
        name:'galleryList',
        query: preParam
      });
}

function goToModify(){
  router.push({
    name:'galleryModify',
    state: {'preParam':preParam}
  })
}

async function goToDelete() {

  try {
    const status = await fetchDeleteById(gallery.value);

    if(status === 200){
      alert("게시물이 삭제되었습니다.");
      await router.push({
        name: 'galleryList',
        query: preParam
      });
    }else{
      alert("삭제할 게시물이 없습니다.");
    }

  }catch (err){
    alert("삭제 중 오류가 발생했습니다.");
  }
}

</script>