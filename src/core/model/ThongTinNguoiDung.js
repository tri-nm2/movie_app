export class ThongTinNguoiDung{
    taiKhoan = "";
    matKhau = "";
    hoTen = "";
    email = "";
    soDT = "";
    maNhom = "";
    maLoaiNguoiDung = "";
    loaiNguoiDung ={};
    thongTinDatVe = [{
      maVe: "",
      ngayDat: "",
      tenPhim: "",
      hinhAnh: "",
      giaVe: "",
      thoiLuongPhim: "",
      danhSachGhe: [
        {
          maHeThongRap: "",
          tenHeThongRap: "",
          maCumRap: "",
          tenCumRap: "",
          maRap: "",
          tenRap: "",
          maGhe: "",
          tenGhe: "",
        }
      ]
    }]
}