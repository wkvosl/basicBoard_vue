<script setup>
import {ref, onMounted} from "vue";
import {fetchBoard} from "@/api/board";

const boards=ref([]);
const search = ref('');
const headers = ref([
  { title: '글 번호', value: 'board_no' },
  { title: '제목', value: 'board_title' },
  { title: '작성자', value: 'board_writer' },
  { title: '작성일', value: 'reg_date' },

]);

function getBoardDetailPath(boardNo){
  return {
    name: 'boardDetail',
    params: {id: boardNo}
  };
}

onMounted(async ()=>{
  boards.value = await fetchBoard();
});

</script>

<template>
  <v-card title="게시판" flat>

    <template v-slot:text>
      <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
      />
    </template>

  <v-data-table
      :headers="headers"
      :items="boards"
      :search="search"
      hide-default-footer
  >

    <template v-slot:item.board_title="{ item }">
      <router-link :to="getBoardDetailPath(item.board_no)"
          class="text-blue-600 hover:underline"
      >
        {{ item.board_title }}
      </router-link>
    </template>


    <!--todo 페이지네이션-->
  </v-data-table>
  </v-card>
</template>
