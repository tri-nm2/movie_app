import { baseServices } from "./baseServices";

export class QuanLyNguoiDungService extends baseServices{
    constructor(){
        super();
    }

    dangNhap = (ThongTinDangNhap) => {
        return this.post("api/QuanLyNguoiDung/DangNhap",ThongTinDangNhap);
        // return this.post(ThongTinDangNhap);
    }
    layThongtinnguoidung = () =>{
        return this.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
    }
    updateInfoUser = (ThongTinNguoiDung) => {
        return this.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",ThongTinNguoiDung);
    }
    dangKy = (ThongTinDangKy) => {
        return this.post("api/QuanLyNguoiDung/DangKy",ThongTinDangKy);
    }
}
export const QLNguoiDungService = new QuanLyNguoiDungService();