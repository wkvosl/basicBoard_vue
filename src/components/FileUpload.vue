<script setup>
import {fetchFileSave, fetchDeletUploadFiles} from '@/api/file'
import {ref, computed} from "vue";

const files = ref([]);
const fileInput = ref(null);

const emit = defineEmits(['fileIds']);

let uploadedFileIds = ref([]);
const hasFiles = computed(()=> uploadedFileIds.value.length > 0);

function onFileChange(event) {
  const selectedFiles = Array.from(event.target.files || []);
  console.log(selectedFiles);

  if(!selectedFiles.length) return;

  if (files.value.length + selectedFiles.length > 5) {
    alert("파일은 최대 5개까지 첨부할 수 있습니다.");
    clearFiles();
    return;
  }

  const newFiles = selectedFiles.map(f => ({
    raw: f,
    fileId: null,
    galleryId: null
  }));

  files.value.push(...newFiles);

  console.log("선택된 파일들: " + files.value.map(f => f.raw.name));
  saveFile(newFiles);
}

const clearFiles = () => {
 if (fileInput.value) {
    fileInput.value.value = ''
  } 
}

async function saveFile(fileList) {
  if (!files.value.length) return
  try{

    console.log("파일보내기~", fileList );
    const res = await fetchFileSave(fileList);

    res.forEach((item, idx) => {
      fileList[idx].fileId = item.fileId;
    });

    //uploadFileIds 업뎃
    uploadedFileIds.value = files.value.map(f => f.fileId).filter(id => id != null);
    emit('fileIds', uploadedFileIds.value);
  }catch (e) {
    alert('파일업로드 실패');
    console.error(e);
  }
}

//파일첨부 -> 1개 삭제 
async function deleteUploadFile(fileId) {
  if(!fileId) return;
  try{
  
  //파일 삭제 (물리 삭제)
  await fetchDeletUploadFiles(fileId);
  
  //files 배열, uploadFileIds 업뎃, 부모에게 전달
  files.value = files.value.filter(f => f.fileId !== fileId);
  uploadedFileIds.value = uploadedFileIds.value.filter(id => id !== fileId);
  emit('fileIds', uploadedFileIds.value);

  }catch(e){
    alert('파일 삭제 실패');
    console.error(e);
  }
}

</script>

<template>

  <fieldset class="fieldset">
    <legend class="fieldset-legend">Pick a file</legend>
    <input type="file" class="file-input" ref="fileInput"  @change="onFileChange" multiple/>
    
    <span v-if="hasFiles">
      <div v-for="f in files" :key="f.raw.name" class="flex">{{ f.raw.name }}
        <div class="items-center">
          <button class="btn btn-xs ml-5" @click="deleteUploadFile(f.fileId)">
            <span class="material-symbols-outlined">
              delete
            </span>
          </button>
        </div>
      </div>
    </span>

    <label class="label">Max size 2MB</label>
  </fieldset>

</template>

<style scoped>

</style>