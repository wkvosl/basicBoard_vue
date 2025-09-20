<script setup lang="ts">
import {useRouter} from 'vue-router';

const router = useRouter();

const goToBoardList = () => {
  router.push({ name : 'boardList' });
};

const goToGalleryList = () => {
  router.push({ name : 'galleryList'})
}
</script>

<template>
  <div class="flex flex-row bg-base-200 w-screen h-20 items-center">
    <div class="menu basis-1/3">
      <ul class="menu-horizontal justify-start">
        <li class="">
          <RouterLink :to="{name:'home'}">Home</RouterLink>
        </li>
      </ul>
    </div>

    <div class="grow"></div>

    <div class="menu basis-1/3">
      <ul class="menu-horizontal justify-end">
        <li class="">
          <RouterLink :to="{name:'home'}">Home</RouterLink>
        </li>
        <li class="">
          <RouterLink :to="{name:'boardList'}">게시판</RouterLink>
        </li>
        <li class="mr-5">
          <RouterLink :to="{name:'galleryList'}">갤러리</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>