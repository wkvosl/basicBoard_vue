import {fileApi} from "@/api/basicApi.js";

export async function fetchFileSave(fileList){

    if (!fileList?.length) return [];

    const formData = new FormData();
    fileList.forEach( f => formData.append('files', f.raw));

    const res = await fileApi.post(`/file/save`, formData);

    const data = res.data || [];
    console.log(data)

    return data;
}
//    /file/update
export async function fetchDeletUploadFiles(fileId) {
        
    const res = await fileApi.post(`/file/delete/${fileId}`);

    return res.data;
}