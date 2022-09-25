import { ThongTinPhongVe } from "core/model/ThongTinPhongVe";
import {
  CHUYEN_TAB,
  CHUYEN_TAB_ACTIVE,
  DAT_GHE,
  DELETE_GHE,
  DELETE_GHE_DANG_DAT,
  SET_CHI_TIET_PHONG_VE,
  SET_GHE_DA_DAT,
} from "redux/actions/types/QuanLyPhongVeType";

const initState = {
  chiTietphongve: new ThongTinPhongVe(),
  danhSachGheDangDat: [],
  tabActive: "1",
  danhSachGheDaDat: [],
};
export const QuanLyPhongVeReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CHI_TIET_PHONG_VE:
      // state.chiTietphongve = action.chiTietphongve;
      return { ...state, chiTietphongve: action.chiTietphongve };
    case DAT_GHE:
      //Cập nhật danh sách ghế đang đặt
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];
      let index = danhSachGheCapNhat.findIndex(
        (gheDD) => gheDD.maGhe === action.gheDuocChon.maGhe
      );
      if (index != -1) {
        danhSachGheCapNhat.splice(index, 1);
      } else {
        danhSachGheCapNhat.push(action.gheDuocChon);
      }
      return { ...state, danhSachGheDangDat: danhSachGheCapNhat};
    case DELETE_GHE:
      state.danhSachGheDangDat = [];
      return { ...state };
    case CHUYEN_TAB:
      state.tabActive = "2";
      return { ...state };
    case CHUYEN_TAB_ACTIVE:
      state.tabActive = "1";
      return { ...state };
    case SET_GHE_DA_DAT:
      state.danhSachGheDaDat = action.gheDaDat;
      return {...state}
      case DELETE_GHE_DANG_DAT:
        state.danhSachGheDaDat = [];
        return { ...state };
    default:
      return { ...state };
  }
};
