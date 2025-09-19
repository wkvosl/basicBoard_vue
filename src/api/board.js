import {api} from "@/api/basicApi.js";

export async function fetchBoard(pageNumber = 1, keyword, category){
    const params = {};

    if(pageNumber){
        params.page = pageNumber;
        params.size = 10;
        params.search = keyword;
        params.category = category
    }

    const res = await api.get("/board/list",{params});
    return res.data;
}

export async function fetchBoardById(id){
    const res = await api.get(`/board/${id}`);
    return res.data;
}

export async function fetchBoardSave(payload){
    const res = await api.post("/board/save", payload);
    return res.data;
}

export async function fetchDeleteById(boards){
    const res = await api.post("/board/delete", boards);
    console.log(boards)
    return res.status;
}