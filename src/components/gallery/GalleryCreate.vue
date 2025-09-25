
<template xmlns="http://www.w3.org/1999/html">
  <div class="card bg-base-100 shadow-md">
    <p>갤러리 등록</p>
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
              @fileIds = "handleFileIds"
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

//파일첨부에서 업로드된 fileIds를 받아서 attachFileNo에 값 넣기
function handleFileIds(fileIds){
  gallery.value.attachFileNo = fileIds.join(",");
  console.log("@@@ 부모한테 보내준 파일 아이디 잘 들어옴", gallery.value.attachFileNo);
}

//갤러리 저장
const save = async () => {
  try{
  const payload = {
    galleryNo: gallery.value.galleryNo,
    galleryTitle: gallery.value.galleryTitle,
    galleryContent: gallery.value.galleryContent,
    galleryWriter: gallery.value.galleryWriter,
    regUser: gallery.value.galleryWriter,
    attachFileNo: gallery.value.attachFileNo,
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

</script>
