import {api} from "@/api/basicApi.js";

export async function fetchBoard(pageNumber){
    const res = await api.get("/board/list",{
        params:{
            page: pageNumber,
            size: 10
        }
    });
    return res.data;
}

export async function fetchBoardById(id){
    const res = await api.get(`/board/${id}`);
    return res.data;
}