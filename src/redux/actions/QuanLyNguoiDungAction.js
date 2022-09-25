import { USER_LOGIN } from "common/contants/myContant";
import { ThongTinDangKy } from "core/model/ThongTinDangKy";
import { QLNguoiDungService } from "services/QuanLyNguoiDungService";
import { LoadingHideAction, LoadingShowAction } from "./LoadingAction";
import { HIDE_MODAL_ALERT, SHOW_MODAL, SHOW_MODAL_ALERT } from "./types/LoadingType";
import {
  SET_THONG_TIN_DANG_KY,
  SET_THONG_TIN_NGUOI_DUNG,
  SET_USER,
} from "./types/QuanLyNguoiDungType";
import { DELETE_GHE_DANG_DAT } from "./types/QuanLyPhongVeType";

export const DangNhapAction = (ThongTinDangNhap) => {
  return async (dispatch) => {
    try {
      await dispatch(LoadingShowAction());
      const response = await QLNguoiDungService.dangNhap(ThongTinDangNhap);
      if (response.data.statusCode === 200) {
        dispatch({
          type: SET_USER,
          ThongTinNguoiDung: response.data.content,
        });
      }
      await dispatch(LoadingHideAction());
      await dispatch({
        type: SHOW_MODAL_ALERT,
        thongbao: "Đăng nhập thành công!",
      });
 
    } catch (errs) {
      console.log("errors", errs.response.data.content);
      await dispatch(LoadingHideAction());
      await dispatch({
        type: SHOW_MODAL_ALERT,
        thongbao: `Đăng nhập thất bại! ${errs.response.data.content}`,
      });
    }
  };
};
export const LayThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      await dispatch(LoadingShowAction());
      const response = await QLNguoiDungService.layThongtinnguoidung();
      if (response.data.statusCode === 200) {
        await dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          ThongTinNguoiDung: response.data.content,
        });
      }
      await dispatch(LoadingHideAction());
      
    } catch (errs) {
      console.log("Errors Action LayThongTinNguoiDungAction", errs.response.data.content);
    }
  };
};
export const CapNhatThongTinAction = (ThongTinNguoiDung,ThongTinUserLogin) => {
  return async (dispatch) => {
    try {
      const response = await QLNguoiDungService.updateInfoUser(ThongTinNguoiDung);
      if (response.data.statusCode === 200) {
        await dispatch(LayThongTinNguoiDungAction());
        const userLogin = {...ThongTinUserLogin, hoTen: ThongTinNguoiDung.hoTen, soDT: ThongTinNguoiDung.soDT, email: ThongTinNguoiDung.email}
        await dispatch({
          type: SET_USER,
          ThongTinNguoiDung: userLogin,
        })
      }
      await dispatch({
        type: SHOW_MODAL_ALERT,
        thongbao: "Cập nhật thông tin thành công!",
      });
    } catch (errs) {
      console.log("Errors Action CapNhatThongTinAction", errs.response.data.content);
      await dispatch({
        type: SHOW_MODAL_ALERT,
        thongbao: `Cập nhật thất bại! ${errs.response.data.content}`,
      });
    }
  };
};
export const DangKyAction = (ThongTin) => {
  return async (dispatch) => {
    try {
      await dispatch(LoadingShowAction());
      const response = await QLNguoiDungService.dangKy(ThongTin);
      await dispatch(LoadingHideAction());
      await dispatch({
        type: SHOW_MODAL_ALERT,
        thongbao: "Đăng ký thành công!",
      });
      let ttDangKy = new ThongTinDangKy(
        ThongTin.taiKhoan,
        ThongTin.matKhau,
        ThongTin.email,
        ThongTin.soDt,
        ThongTin.hoTen,
        true,
      );
      await dispatch({
        type: SET_THONG_TIN_DANG_KY,
        ThongTinDangKy: ttDangKy    
      })
    } catch (errs) {
      let ttDangKyTB = new ThongTinDangKy(
        ThongTin.taiKhoan,
        ThongTin.matKhau,
        ThongTin.email,
        ThongTin.soDt,
        ThongTin.hoTen,
        false,
      );
      await dispatch({
        type: SET_THONG_TIN_DANG_KY,
        ThongTinDangKy: ttDangKyTB    
      })
      console.log("errors", errs.response.data.content);
      await dispatch(LoadingHideAction());
      await dispatch({
        type: SHOW_MODAL_ALERT,
        thongbao: `Đăng ký thất bại! ${errs.response.data.content}`,
      });
   
    }
  };
};

