
<template xmlns="http://www.w3.org/1999/html">
  <div class="card bg-base-100 shadow-md">
    <div v-if="gallery" class="card-body">
      <p>작성자 : {{gallery.galleryWriter}}</p>
      <table>
        <tr>
          <th>제목</th>
          <td>
            <input class="input" v-model="gallery.galleryTitle">
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td>
            <input class="input" v-model="gallery.galleryContent">
          </td>
        </tr>
      </table>
    </div>

    <div v-else class="card-body justify-center items-center" >
      <span class="loading loading-spinner text-success"></span>
    </div>


  </div>

  <div class="flex justify-end pt-6">
    <button class="btn btn-primary ml-5" @click="goToBack">취소</button>
    <button class="btn btn-primary ml-5" @click="save">저장</button>
    <button class="btn btn-primary ml-5" @click="goToList">목록</button>
  </div>

</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {fetchGalleryById, fetchGallerySave} from "@/api/gallery.js";

const route = useRoute();
const router = useRouter();

const gallery = ref({
  galleryNo: null,
  galleryTitle: "",
  galleryContent: "",
  galleryWriter: "",
  lastUpdateUser: null,
});

//목록 쿼리
let preParam = history.state.preParam;

onMounted(async () => {
  const id = route.params.id;
  gallery.value = await fetchGalleryById(id);
});

const save = async () => {
  try{


  const payload = {
    galleryNo: gallery.value.galleryNo,
    galleryTitle: gallery.value.galleryTitle,
    galleryContent: gallery.value.galleryContent,
    regUser: gallery.value.regUser,
    regDate: gallery.value.regDate,
    delYn:gallery.value.delYn,
    lastUpdateUser: "testUser",
  };
console.log(payload)
  await fetchGallerySave(payload);
    goToBack();
    alert("저장 성공");
  }catch (err){
    alert("저장 오류");
  }
}

function goToBack(){
  router.push({
    name:'galleryDetail',
    state: {'preParam' : preParam}
  })
}

function goToList(){
  router.push(
      {
        name:'galleryList',
        query: preParam
      });
}
</script>
