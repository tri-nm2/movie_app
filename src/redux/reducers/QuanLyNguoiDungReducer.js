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
  //   taiKhoan: "ABC",
  //   matKhau: "123",
  //   hoTen: "123",
  //   email: "123",
  //   soDT: "123",
  //   maNhom: "123",
  //   maLoaiNguoiDung: "",
  //   loaiNguoiDung: {},
  //   thongTinDatVe: [{
  //     maVe: "213",
  //     ngayDat: "321321",
  //     tenPhim: "NGƯỜI ANH HÙNG THỜI TIỀN SỬ HY LẠP TẠI VIỆT NAM ĐANG CHIẾN ĐẤU VỚI QUÁI VẬT",
  //     hinhAnh: "123",
  //     giaVe: "123",
  //     thoiLuongPhim: "1313",
  //     danhSachGhe: [
  //       {
  //         maHeThongRap: "321",
  //         tenHeThongRap: "321312",
  //         maCumRap: "3131",
  //         tenCumRap: "31",
  //         maRap: "31",
  //         tenRap: "31",
  //         maGhe: "111",
  //         tenGhe: "111",
  //       },
  //       {
  //                 maHeThongRap: "321",
  //                 tenHeThongRap: "321312",
  //                 maCumRap: "3131",
  //                 tenCumRap: "31",
  //                 maRap: "31",
  //                 tenRap: "31",
  //                 maGhe: "111",
  //                 tenGhe: "111",
  //               }
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
