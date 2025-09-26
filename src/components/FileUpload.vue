<script setup>
import {fetchFileSave} from '@/api/file'
import {ref} from "vue";

const files = ref([]);
const emit = defineEmits(['fileIds']);

let uploadedFileIds = ref([]);

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
  saveFile();
}

async function saveFile() {
  if (!files.value.length) return
  try{
    const res = await fetchFileSave(files);
    uploadedFileIds = res.map(item => item.fileId);
    emit('fileIds', uploadedFileIds);
  }catch (e) {
    alert('파일업로드 실패');
    console.error(e);
  }
}

</script>

<template>

  <fieldset class="fieldset">
    <legend class="fieldset-legend">Pick a file</legend>
    <input type="file" class="file-input"  @change="onFileChange" multiple/>
    <span v-if="uploadedFileIds">{{files.map(f=>f.raw.name)}}</span>
    <label class="label">Max size 2MB</label>
  </fieldset>

</template>

<style scoped>

</style>