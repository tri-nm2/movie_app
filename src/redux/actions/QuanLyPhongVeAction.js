
import _ from "lodash";
import { QLPhongVeService } from "services/QuanLyPhongVeService";
import { LoadingAction, LoadingHideAction, LoadingShowAction } from "./LoadingAction";
import { HIDE_LOADING, SHOW_LOADING, SHOW_MODAL, SHOW_MODAL_ALERT } from "./types/LoadingType";
import { CHUYEN_TAB, DELETE_GHE, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyPhongVeType";


export const LayChiTietPhongVeAction = (maLichchieu) => {
    return async (dispatch) => {
        try {
            dispatch(LoadingShowAction());
            const response = await QLPhongVeService.layChitietphongve(maLichchieu);
            if (response.data.statusCode === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietphongve: response.data.content,
                });
            }
            dispatch(LoadingHideAction());
        } catch (errs) {
            console.log("errors laychitietphongve", errs.response.data.content)
        }
    }
}

export const DatVeAction = (thongTinDatVe) => {
    return async (dispatch) => {
        try {
            if(thongTinDatVe.danhSachVe.length === 0) {
                 dispatch({
                    type: SHOW_MODAL_ALERT,
                    thongbao: "Chưa chọn vé!"
                });
                return
            }
            const response = await QLPhongVeService.datVe(thongTinDatVe);
          
            await dispatch(LayChiTietPhongVeAction(thongTinDatVe.maLichChieu));
           
            await dispatch({
                type: SHOW_MODAL_ALERT,
                thongbao: "Đặt vé thành công!"
            });
            await dispatch({
                type: DELETE_GHE,
            })
        } catch (errors) {
            console.log("errors DatVeAction", errors.response);
        }
    }
}