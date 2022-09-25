import { instance } from "api/instance";
import { TOOKEN } from "common/contants/myContant";

export class baseServices{
    post = (url,model) => {
        return instance.request({
            url: url,
            method: "POST",
            headers:{
                Authorization: "Bearer " + localStorage.getItem(TOOKEN),
            },
            data: model
        })
    }
    put = (url,model) => {
        return instance.request({
            url: url,
            method: "PUT",
            headers:{
                Authorization: "Bearer " + localStorage.getItem(TOOKEN),
            },
            data: model
        })
    }
    get = (url,model) => {
        return instance.request({
            url: url,
            method: "GET",
            headers:{
                Authorization: "Bearer " + localStorage.getItem(TOOKEN),
            },
            params: {
                MaLichChieu: model
            }
        })
    }
}