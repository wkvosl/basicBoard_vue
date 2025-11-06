
<template xmlns="http://www.w3.org/1999/html">
  <div class="card bg-base-100 shadow-md">
    <div v-if="gallery" class="card-body">
      <p>작성자 : {{gallery.galleryWriter}}</p>
      <table>
        <tbody>
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
            <th>첨부파일</th>
            <td>
            <p>업로드 가능 : {{modifyUploadFilesCnt}}</p>
            <div class="flex">
              <template v-if="gallery.files && gallery.files.length > 0">
                <span v-for="(file, index) in gallery.files" :key="index" class="mr-2">
                  {{ file.originalFileName }}
                  <img :src="file.resourcePathName" class="w-[100px]" />
                </span>
              </template>
            </div>

            <FileUpload 
              v-if="!gallery.files || gallery.files.length < 5"
              @fileIds="handleFileIds"
              :modifyGalleryId="gallery.galleryNo"
              :uploadedFileTotalCnt="uploadedFileTotalCnt"
              :fileCnt="modifyUploadFilesCnt"
            />
            </td>
          </tr>
        </tbody>
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
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {fetchGalleryById, fetchGallerySave} from "@/api/gallery.js";
import FileUpload from "@/components/FileUpload.vue";

const route = useRoute();
const router = useRouter();

const gallery = ref({
  galleryNo: null,
  galleryTitle: "",
  galleryContent: "",
  galleryWriter: "",
  files: [],
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
    attachFileNo: gallery.value.attachFileNo,
    lastUpdateUser: "testUser",
  };
console.log("업로드 할거야!!!!!!!!!",payload)
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

//파일첨부
//파일 업로드 가능한 총 갯수
const uploadedFileTotalCnt = 5;
//기존 파일 갯수
const uploadedFilesCnt = computed(()=>gallery.value.files?.length || 0);


//현재 업로드 파일 갯수 제한
const modifyUploadFilesCnt = computed(()=>{
  const limitCnt =  uploadedFileTotalCnt - uploadedFilesCnt.value;
  console.log("제한된 파일 업로드 갯수", limitCnt);
   return limitCnt;
});

//파일첨부에서 업로드된 fileIds를 받아서 attachFileNo에 값 넣기
function handleFileIds(fileIds){
  const existingFileIds = gallery.value.files?.map(file => file.attachFileNo).filter(no => no)||[];
  const allFileIds = [...existingFileIds, ...fileIds];
  gallery.value.attachFileNo = allFileIds.join(",");
  console.log("@@@ 부모한테 보내준 파일 아이디 잘 들어옴", gallery.value.attachFileNo);
}
</script>
