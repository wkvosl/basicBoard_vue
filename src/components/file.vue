<script setup lang="ts">
import {fetchFileSave} from '@/api/file'
import {ref} from "vue";

const file = ref(null);

function onFileChange(event) {
  file.value = event.target.files[0];
  console.log("selectFile : " + file.value.name);
}

function saveFile(){
  if(!file.value) return;
  console.log(file.value);
  const res = fetchFileSave(file.value);
  console.log(res);
}



</script>

<template>

  <input type="file" @change="onFileChange" />
  <button @click="saveFile">저장</button>

</template>

<style scoped>

</style>