import {api} from "@/api/basicApi.js";

export async function fetchBoard(){
    const res = await api.get("/board/list");
    return res.data.boardList;
}

export async function fetchBoardById(id){
    const res = await api.get(`/board/${id}`);
    return res.data;
}