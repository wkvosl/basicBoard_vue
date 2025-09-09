<script setup lang="ts">

</script>

<template>

  <div class="nav">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/board/list">게시판 목록</RouterLink>
  </div>

</template>

<style scoped>
.nav{
  display: flex;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background: darkslateblue;
  align-items: center;
}
.nav a{
  color: white;
  text-decoration: none;
  padding-left: 30px;
}
</style>