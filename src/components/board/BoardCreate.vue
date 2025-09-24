
<template>

  <div class="bg-content-light dark:bg-content-dark p-6 rounded-xl shadow-sm mb-8">
      <textarea class="form-input w-full resize-none bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow min-h-[120px] placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark"
             placeholder="Write your message here...500"
             v-model="board.boardContent" maxlength="500">
      </textarea>
      <div class="flex justify-end mt-4">
        <button class="px-6 py-2.5 text-sm font-bold bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                @click="save">
          Post
        </button>
      </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchBoardSave} from "@/api/board";

//팝업
const emit = defineEmits(['refreshBoardList']);

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
    emit('refreshBoardList');
  }catch (err){
    console.log(err)
    alert("저장 오류");
  }
}
</script>

<style scoped>

</style>