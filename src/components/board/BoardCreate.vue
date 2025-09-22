
<template>

  <div class="modalContainer modifyModal" @click.self="emit('close')">
    <div class="card bg-base-100 shadow-md w-4/5 h-2/5 min-h-min">
      <div v-if="board" class="card-body justify-center">
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
          <tr>
            <th>작성자</th>
            <td>
              <input class="input" v-model="board.boardWriter">
            </td>
          </tr>
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
import { fetchBoardSave} from "@/api/board";

//팝업
const emit = defineEmits(['close','createSaved','refreshBoardList']);

const board = ref({
  boardNo: null,
  boardTitle: "",
  boardContent: "",
  boardWriter: "",
  delYn:"N"
});

onMounted(async () => {
});

const save = async () => {
  try{
  const payload = {
    boardNo:board.value.boardNo,
    boardTitle: board.value.boardTitle,
    boardContent: board.value.boardContent,
    boardWriter: board.value.boardWriter,
    regUser: board.value.boardWriter,
    delYn:board.value.delYn,
  };
  await fetchBoardSave(payload);
    emit('createSaved');
    emit('refreshBoardList');
    alert("저장 성공");
  }catch (err){
    console.log(err)
    alert("저장 오류");
  }
}
</script>

<style scoped>
.modifyModal {
  z-index: 100; /* 수정 모달이 위에 오게 */
}
</style>