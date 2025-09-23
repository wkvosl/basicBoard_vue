
<template xmlns="http://www.w3.org/1999/html">
  <div class="card bg-base-100 shadow-md">
    <div v-if="gallery" class="card-body">
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
        <tr>
          <th>작성자</th>
          <td>
            <input class="input" v-model="gallery.galleryWriter">
          </td>
        </tr>
        <tr>
          <th>첨부파일</th>
          <td>
            <File
              :galleryNo = "gallery.galleryNo"
              @fileNo = "gallery.attachFileNo"
            />
          </td>
        </tr>
      </table>
    </div>

    <div v-else class="card-body justify-center items-center" >
      <span class="loading loading-spinner text-success"></span>
    </div>

  </div>

  <div class="flex justify-end pt-6">
    <button class="btn btn-primary ml-5" @click="save">저장</button>
    <button class="btn btn-primary ml-5" @click="goToList">목록</button>
  </div>

</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {fetchGallerySave} from "@/api/gallery.js";
import File from "@/components/file.vue";

const router = useRouter();

const gallery = ref({
  galleryNo: null,
  galleryTitle: "",
  galleryContent: "",
  galleryWriter:"",
  attachFileNo:null,
  delYn:"N",
});

//목록 쿼리
let preParam = history.state.preParam;

const save = async () => {
  try{
  const payload = {
    galleryNo: gallery.value.galleryNo,
    galleryTitle: gallery.value.galleryTitle,
    galleryContent: gallery.value.galleryContent,
    regUser: gallery.value.galleryWriter,
    delYn:gallery.value.delYn,
  };
  await fetchGallerySave(payload);
    alert("저장 성공");
    goToList();
  }catch (err){
    alert("저장 오류");
  }
}

function goToList(){
  router.push(
      {
        name:'galleryList',
        query: preParam
      });
}

//파일첨부 1개
const isSaved = false;
// function onFileChange(event) {
//   file.value = event.target.files[0];
//   fileSave(file);
// }
// function fileSave(file){
//   try{
//     const res = fetchFileSave(file);
//     alert("파일이 등록 되었습니다." + res.attachFileNo);
//   }catch (err){
//     alert("파일 등록에 실패");
//     console.log("파일 등록에 실패"+err);
//   }
//
//
// }
</script>
