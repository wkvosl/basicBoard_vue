import {api} from "@/api/basicApi.js";

export async function fetchBoard(pageNumber = 1){
    const params = {};

    if(pageNumber){
        params.page = pageNumber;
        params.size = 10;
    }

    const res = await api.get("/board/list",{params});
    return res.data;
}

export async function fetchBoardById(id){
    const res = await api.get(`/board/${id}`);
    return res.data;
}