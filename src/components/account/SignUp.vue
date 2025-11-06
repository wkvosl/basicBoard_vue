<script setup>
import {ref} from "vue";
//로그인 정보
const loginInfo = ref({
  connected_at : "",
  nickname:"",
});

const kakaoLogin = () => {

  const currentPath = window.location.pathname;
  localStorage.setItem('redirectPath', currentPath);

  const REST_API_KEY = "b0dc7be9f8e8beb1ae8855aacf7468a8";
  const REDIRECT_URI = "http://localhost:5173/kakao/oauth/callback"; // 프론트 라우트
  window.location.href = 
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
};


</script>

<template>
    <div class="card">
        구글계정
        <div @click="kakaoLogin">카카오</div>
        또는
        일반회원가입
    </div>
</template>