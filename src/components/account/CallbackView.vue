<script setup>
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

onMounted(async () => {
  const code = route.query.code
  if (!code) return

  try {
    const res = await axios.get(`http://localhost:8080/kakao/oauth?code=${code}`)
    const { access_token, nickname } = res.data

    // ✅ 로그인 상태 반영 (페이지 이동 없이 Navbar 반응)
    userStore.login(access_token, nickname)

    const redirectPath = localStorage.getItem('redirectPath') || '/';
    localStorage.removeItem('redirectPath'); // 정리
    router.replace(redirectPath);

  } catch (err) {
    console.error('카카오 로그인 실패:', err)
  }
})
</script>

<template>
  <div class="text-center p-10">
    <h2 class="text-xl font-semibold">로그인 처리 중입니다...</h2>
  </div>
</template>
