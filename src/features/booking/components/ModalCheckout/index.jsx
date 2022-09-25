import { CloseOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { LayThongTinNguoiDungAction } from "redux/actions/QuanLyNguoiDungAction";
import { HIDE_MODAL, HIDE_MODAL_ALERT } from "redux/actions/types/LoadingType";
import { DELETE_THONG_TIN_NGUOI_DUNG, DELETE_THONG_TIN_USER } from "redux/actions/types/QuanLyNguoiDungType";
import { CHUYEN_TAB, CHUYEN_TAB_ACTIVE, DELETE_GHE, DELETE_GHE_DANG_DAT } from "redux/actions/types/QuanLyPhongVeType";
import style from "./style.module.css";
function ModalCheckout(props) {
    const {addDatGheThanhCong} = props
    const { chiTietphongve, danhSachGheDaDat } = useSelector(state => state.QuanLyPhongVeReducer);
    const { isModal } = useSelector(state => state.LoadingReducer);
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    function goBackHome() {
        dispatch({
            type: HIDE_MODAL,
        });
    }
    function closeButton() {
        dispatch({
            type: DELETE_GHE,
        });
        dispatch({
            type: HIDE_MODAL,
        });
        addDatGheThanhCong();

    }
    // function addMovieButton() {
    //     dispatch({
    //         type: CHUYEN_TAB_ACTIVE,
    //     });
    //     dispatch({
    //         type: HIDE_MODAL,
    //     });
    //     dispatch({
    //         type: DELETE_GHE,
    //     });
    //     dispatch({
    //         type: HIDE_MODAL_ALERT,
    //         thongbao: "",
    //       });
    //     dispatch({
    //         type:  DELETE_THONG_TIN_NGUOI_DUNG,
    //     })
    // }
    return (
        // <div>
          <div style={!isModal ? { display: 'none' } : { display: 'flex' }} className={`${style.modalMain}`}>
            <div className={`${props.size === "mobile" ? "fixed top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto": " relative w-2/5 p-3 bg-white rounded-lg" }`}>
                 <h3 className="text-center text-2xl font-bold text-red-600 mt-3">Đặt vé thành công</h3>
                {/* <button className="absolute top-0 right-0 bg-green-600 w-5 h-5" onClick={closeButton}>X</button> */}
                <Button shape="circle" icon={<CloseOutlined />} className="absolute top-3 right-3" onClick={closeButton}>
                
                </Button>
                <div className="flex p-6 ">

                    <div className="w-1/4 rounded-lg overflow-hidden">
                        <img
                            src={chiTietphongve.thongTinPhim.hinhAnh}
                            alt=""
                            className="w-screen"
                        />
                    </div>
                    <div className="w-3/4 ml-7">
                        <h2 className="border-b text-2xl border-dashed border-b-neutral-500">{chiTietphongve.thongTinPhim.tenPhim}</h2>
                        <p className="font-bold	 text-lg">
                            <span className="text-green-600 ">{chiTietphongve.thongTinPhim.tenCumRap}</span><span></span>
                        </p>
                        <p className="text-lg text-gray-400">{chiTietphongve.thongTinPhim.diaChi}</p>
                        <table className="text-lg">
                            <tbody>
                                <tr>
                                    <td>Xuất Chiếu:</td>
                                    <td className="pl-6">{chiTietphongve.thongTinPhim.gioChieu}-<span>{chiTietphongve.thongTinPhim.ngayChieu}</span></td>
                                </tr>
                                <tr>
                                    <td>Phòng:</td>
                                    <td className="pl-6">{chiTietphongve.thongTinPhim.tenRap}</td>
                                </tr>
                                <tr>
                                    <td>Ghế: </td>
                                    <td className="pl-6">{danhSachGheDaDat.map((item, index) => <span key={index}>[ {item.tenGhe} ]</span>)}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="border-b border-solid	border-b-gray-600 p-2 ml-7 mr-7">
                        <p className="text-2xl font-bold">Thông tin đặt vé</p>
                    </div>
                    <div className="flex border-b border-solid	border-b-gray-600 p-2 ml-7 mr-7">
                        <p className="text-lg ml-2 w-1/4">Họ tên:</p>
                        <span className="ml-5 text-lg w-3/4">{userLogin.hoTen}</span>
                    </div>
                    <div className=" flex border-b border-solid	border-b-gray-600 p-2 ml-7 mr-7">
                        <p className="text-lg ml-2 w-1/4">Điện thoại:</p>
                        <span className="ml-5 text-lg w-3/4">{userLogin.soDT}</span>

                    </div>
                    <div className="flex border-b border-solid	border-b-gray-600 p-2 ml-7 mr-7">
                        <p className="text-lg ml-2 w-1/4 ">Email:</p>
                        <span className="ml-5 text-lg w-3/4">{userLogin.email}</span>

                    </div>
                    <div className="flex border-b border-solid	border-b-gray-600 p-2 ml-7 mr-7">
                        <p className="text-lg ml-2 w-1/4">Trạng thái:</p>
                        <span className="ml-5 text-lg w-3/4 text-green-600">Đặt Thành Công</span>
                    </div>
                    <div className="flex border-b border-solid	border-b-gray-600 p-2 ml-7 mr-7">
                        <p className="text-lg ml-2 w-1/4">Tổng tiền:</p>
                        <span className="ml-5 text-lg w-3/4">
                        <span className='text-green-600 text-2xl'>{danhSachGheDaDat.reduce((tongTien, ghe, index) => {
                                return tongTien += ghe.giaVe;
                            }, 0)}</span>
                        </span>
                    </div>
                    <p className="text-center text-lg italic mt-2">Kiểm tra lại vé đã mua trong thông tin tài khoản của bạn !</p>
                </div>
                <div className="flex justify-center">
                    {/* <button className="mr-2 text-lg text-white font-bold bg-emerald-600	rounded-lg p-2" onClick={addMovieButton}>Mua Thêm Vé Phim Này</button> */}
                    <NavLink className="ml-2 text-lg  text-white font-bold bg-emerald-600	rounded-lg p-2" to="/" onClick={goBackHome}>Quay về trang chủ</NavLink>
                </div>
            </div>
        </div>
    );
}

export default ModalCheckout;
