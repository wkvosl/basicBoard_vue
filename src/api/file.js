import {fileApi} from "@/api/basicApi.js";

export async function fetchFileSave(file){

    const formData = new FormData();
    formData.append("file", file);

    const res = await fileApi.post(`/file/save`, formData);
    return res.data;
}