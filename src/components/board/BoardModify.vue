
<template>

  <div class="modalContainer modifyModal" @click.self="emit('close')">
    <div class="card bg-base-100 shadow-md w-4/5 h-2/5 min-h-min">
      <div v-if="board" class="card-body justify-center">
        <span>작성자 : {{board.boardWriter}}</span>
        <table>
          <tbody>
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
          </tbody>
        </table>
      </div>

      <div v-else class="card-body justify-center items-center" >
        <span class="loading loading-spinner text-success"></span>
      </div>

      <div class="flex justify-end pt-6">
        <button class="btn btn-primary btn-sm mr-2 mb-3" @click="save">저장</button>
        <button class="btn btn-neutral btn-sm mr-2 mb-3" @click="emit('close')">닫기</button>
      </div>
    </div>

  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import {fetchBoardById, fetchBoardSave} from "@/api/board";

//팝업
const props = defineProps(['boardNo']);
const emit = defineEmits(['close','modifySaved']);

const board = ref({
  boardNo: null,
  boardTitle: "",
  boardContent: "",
  lastUpdateUser: null,
});

onMounted(async () => {
  const id = props.boardNo;
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
  await fetchBoardSave(payload);
    alert("저장 성공");
    emit('modifySaved', props.boardNo);
  }catch (err){
    alert("저장 오류");
  }
}
</script>

<style scoped>
.modifyModal {
  z-index: 100; /* 수정 모달이 위에 오게 */
}
</style>