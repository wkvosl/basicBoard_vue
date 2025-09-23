import {api} from "@/api/basicApi.js";

export async function fetchGallery(pageNumber = 1, keyword, category){
    const params = {};

    if(pageNumber){
        params.page = pageNumber;
        params.size = 10;
        params.search = keyword;
        params.category = category
    }

    const res = await api.get("/gallery/list",{params});
    return res.data;
}

export async function fetchGalleryById(id){
    const res = await api.get(`/gallery/${id}`);
    return res.data;
}

export async function fetchGallerySave(payload){
    const res = await api.post("/gallery/save", payload);
    return res.data;
}

export async function fetchDeleteById(payload){
    const res = await api.post("/gallery/delete", payload);
    return res.status;
}