import _ from "lodash";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LayThongTinNguoiDungAction } from "redux/actions/QuanLyNguoiDungAction";
import { HIDE_MODAL_ALERT, SHOW_MODAL } from "redux/actions/types/LoadingType";
import { DELETE_THONG_TIN_DANG_KY } from "redux/actions/types/QuanLyNguoiDungType";
import { CHUYEN_TAB, DELETE_GHE } from "redux/actions/types/QuanLyPhongVeType";
import style from "./style.module.css";

function ModalAlert(props) {

  const { chiTietphongve, danhSachGheDaDat } = useSelector(
    (state) => state.QuanLyPhongVeReducer
  );
  const { isModalAlert } = useSelector((state) => state.LoadingReducer);
  const { userLogin, ThongTinNguoiDung } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div
      className={` ${style.modalAlertMain} ${
        isModalAlert.status ? "block" : "hidden"
      }`}
    >
      <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-sky-400">
        <div>
          <div className="text-center p-5 flex-auto justify-center">
            <h2 className="text-xl font-bold py-4 text-white ">
              {isModalAlert.thongbao}
            </h2>
          </div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button
              onClick={() => {
                if (props.page === "Login") {
                  dispatch({
                    type: HIDE_MODAL_ALERT,
                    thongbao: "",
                  });
                  if (!_.isEmpty(userLogin)) {
                    history.goBack();
                  }else{
                    // history.push("/");
                    console.log("LOGIN");
                  }
                } else if (props.page === "User") {
                  dispatch({
                    type: HIDE_MODAL_ALERT,
                    thongbao: "",
                  });
               
                } else if (props.page === "SignUp"){
                    dispatch({
                      type:DELETE_THONG_TIN_DANG_KY,
                    });
                    dispatch({
                      type: HIDE_MODAL_ALERT,
                      thongbao: "",
                    });
                    console.log("SIGNUP");
                }else {
                  if (danhSachGheDaDat.length != 0) {
                    dispatch({
                      type: HIDE_MODAL_ALERT,
                      thongbao: "",
                    });
                    dispatch({
                      type: SHOW_MODAL,
                    });
                    dispatch({
                      type: CHUYEN_TAB,
                    })
                    // if(ThongTinNguoiDung.taiKhoan !== ""){
                    //   dispatch(LayThongTinNguoiDungAction());
                    //   console.log("Dispatch");
                    // }
                    // dispatch(LayThongTinNguoiDungAction());
                  }else{
                    //Nếu chưa chọn vé, bấm đóng để ẩn thông báo
                    dispatch({
                      type: HIDE_MODAL_ALERT,
                      thongbao: "",
                    });
                  }
                }
              }}
              className="mb-2 md:mb-0 bg-green-500 border border-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAlert;
