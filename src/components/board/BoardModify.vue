
<template xmlns="http://www.w3.org/1999/html">
  <div class="card bg-base-100 shadow-md">
    <div v-if="board" class="card-body">
      <p>작성자 : {{board.boardWriter}}</p>
      <table>
        <tr>
          <th>제목</th>
          <td>
            <input class="input" v-model="board.boardTitle">
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td>
            <input class="input" v-model="board.boardContent">
          </td>
        </tr>
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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {fetchBoardById, fetchBoardSave} from "@/api/board";

const route = useRoute();
const router = useRouter();

const board = ref({
  boardNo: null,
  boardTitle: "",
  boardContent: "",
  lastUpdateUser: null,
});

//목록 쿼리
let preParam = history.state.preParam;

onMounted(async () => {
  const id = route.params.id;
  board.value = await fetchBoardById(id);
});

const save = async () => {
  try{


  const payload = {
    boardNo: board.value.boardNo,
    boardTitle: board.value.boardTitle,
    boardContent: board.value.boardContent,
    regUser: board.value.regUser,
    regDate: board.value.regDate,
    delYn:board.value.delYn,
    lastUpdateUser: "testUser",
  };
console.log(payload)
  await fetchBoardSave(payload);
    alert("저장 성공");
  }catch (err){
    alert("저장 오류");
  }
}

function goToBack(){
  router.push({
    name:'boardDetail',
    state: {'preParam' : preParam}
  })
}

function goToList(){
  router.push(
      {
        name:'boardList',
        query: preParam
      });
}
</script>
