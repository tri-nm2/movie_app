import { ThongTinDatVe } from "core/model/ThongTinDatVe";
import { baseServices } from "./baseServices";

export class QuanLyPhongVeService extends baseServices{
    constructor(){
        super();
    }

    layChitietphongve = (maLichchieu) => {
        return this.get("/api/QuanLyDatVe/LayDanhSachPhongVe",maLichchieu);
    }
    datVe = (thongTinDatVe = new ThongTinDatVe) => {
        return this.post("/api/QuanLyDatVe/DatVe",thongTinDatVe);
    }
}
export const QLPhongVeService = new QuanLyPhongVeService();