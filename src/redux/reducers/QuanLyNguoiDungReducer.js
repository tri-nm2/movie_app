import { TOOKEN, USER_LOGIN } from "common/contants/myContant";
import { ThongTinDangKy } from "core/model/ThongTinDangKy";
import { ThongTinNguoiDung } from "core/model/ThongTinNguoiDung";
import { DELETE_THONG_TIN_DANG_KY, DELETE_THONG_TIN_NGUOI_DUNG, DELETE_THONG_TIN_USER, SET_THONG_TIN_DANG_KY, SET_THONG_TIN_NGUOI_DUNG, SET_USER } from "redux/actions/types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initState = {
  userLogin: user,
  ThongTinNguoiDung: new ThongTinNguoiDung(),
  // ThongTinNguoiDung: {
  //   taiKhoan: "",
  //   matKhau: "",
  //   hoTen: "",
  //   email: "",
  //   soDT: "",
  //   maNhom: "",
  //   maLoaiNguoiDung: "",
  //   loaiNguoiDung: {},
  //   thongTinDatVe: [{
  //     maVe: "",
  //     ngayDat: "",
  //     tenPhim: "",
  //     hinhAnh: "",
  //     giaVe: "",
  //     thoiLuongPhim: "",
  //     danhSachGhe: [
  //       {
  //         maHeThongRap: "",
  //         tenHeThongRap: "",
  //         maCumRap: "",
  //         tenCumRap: "",
  //         maRap: "",
  //         tenRap: "",
  //         maGhe: "",
  //         tenGhe: "",
  //       }
  //     ]
  //   }]
  // },
  ThongTinDangKy: new ThongTinDangKy(),
};
export const QuanLyNguoiDungReducer = (state = initState, action) => {
  let user = new ThongTinNguoiDung();
  let ttDangKy = new ThongTinDangKy();
  switch (action.type) {
    case SET_USER:
      const { ThongTinNguoiDung } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(ThongTinNguoiDung));
      localStorage.setItem(TOOKEN, ThongTinNguoiDung.accessToken);
      return { ...state, userLogin: ThongTinNguoiDung };
    case SET_THONG_TIN_NGUOI_DUNG:
      return { ...state, ThongTinNguoiDung: { ...(state.ThongTinNguoiDung = action.ThongTinNguoiDung) } };
    case DELETE_THONG_TIN_USER:
      state.userLogin = {};
      state.ThongTinNguoiDung = user;
    case DELETE_THONG_TIN_NGUOI_DUNG:
      state.ThongTinNguoiDung = user;
      return { ...state };
    case SET_THONG_TIN_DANG_KY:
      state.ThongTinDangKy = action.ThongTinDangKy;
      return { ...state }
    case DELETE_THONG_TIN_DANG_KY:
      state.ThongTinDangKy = ttDangKy;
      return { ...state }
    default:
      return { ...state };
  }
};
