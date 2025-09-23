import {fileApi} from "@/api/basicApi.js";

export async function fetchFileSave(files){

    const formData = new FormData();
    for (let i = 0; i < files.value.length; i++) {
        formData.append("files", files.value[i].raw)
    }

    const res = await fileApi.post(`/file/save`, formData);

    const data = res.data;
    console.log(data)

    data.forEach((item, idx) => {
        files.value[idx].fileId = item.fileId;
    });

    return data;
}