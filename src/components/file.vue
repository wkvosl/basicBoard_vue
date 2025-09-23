<script setup>
import {fetchFileSave} from '@/api/file'
import {ref} from "vue";

const files = ref([]);

function onFileChange(event) {
  const selectedFiles = event.target.files
  console.log(selectedFiles)

  if(!selectedFiles) return;

  files.value = Array.from(selectedFiles).map(f=>({
    raw: f,
    fileId: null,
    galleryId: null
  }))

  console.log("선택된 파일들: " + files.value.map(f => f.raw.name));
}

async function saveFile() {

  if (!files.value.length) return

  console.log("업로드할 파일들:", files.value)

  // fetchFileSave 함수는 FormData에 files 배열을 넣을 수 있도록 수정 필요
  const res = await fetchFileSave(files);
  //array로 받아오는데
  console.log("@@@결과"+res);
  console.log("@@@결과 JSON", JSON.stringify(res));
/*@@@결과[object Object],[object Object]
  file.vue:32 @@@결과 JSON [{"fileId":48,"success":true},{"fileId":49,"success":true}]*/


}

</script>

<template>

  <input type="file" @change="onFileChange" multiple>
  <ul>
    <li v-for="f in files" :key="f.name">{{ f.name }}</li>
  </ul>
  <button @click="saveFile">저장</button>

</template>

<style scoped>

</style>