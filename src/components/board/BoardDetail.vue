<script setup>
import { ref, onMounted } from "vue";
import { fetchBoardById, fetchDeleteById} from "@/api/board";


const board = ref(null);
const props = defineProps(['boardNo']);
const emit = defineEmits(['close', 'openModify', 'refreshBoardList']);


onMounted(async () => {
  const id = props.boardNo;
  board.value = await fetchBoardById(id);
});

async function goToDelete() {

  try {
    const status = await fetchDeleteById(board.value);

    if(status === 200){
      alert("게시물이 삭제되었습니다.");
      emit('close');
      emit('refreshBoardList');
    }else{
      alert("삭제할 게시물이 없습니다.");
    }

  }catch (err){
    alert("삭제 중 오류가 발생했습니다.");
  }
}

</script>

<template>

<div class="modalContainer" @click.self="emit('close')">
    <div class="card bg-base-100 shadow-md w-4/5 h-2/5 min-h-min">
      <div v-if="board" class="card-body">
        <h2 class="card-title"> {{board.boardTitle}}</h2>
        <p>{{board.boardContent}}</p>
        <p>{{board.boardWriter}}</p>
        <p>{{board.regDate}}</p>
      </div>
      <div v-else class="card-body justify-center items-center" >
        <span class="loading loading-spinner text-success"></span>
      </div>

      <div class="flex justify-end pt-6">
        <button class="btn btn-secondary btn-sm mr-2 mb-3" @click="goToDelete">삭제</button>
        <button class="btn btn-primary btn-sm mr-2 mb-3" @click="emit('openModify', boardNo)">수정</button>
        <button class="btn btn-neutral btn-sm mr-2 mb-3" @click="emit('close')">닫기</button>
      </div>
  </div>
</div>


</template>

