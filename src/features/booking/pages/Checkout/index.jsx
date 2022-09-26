import React, { Fragment, useEffect, useState } from "react";
import { useParams, useHistory, Redirect, NavLink } from "react-router-dom";
import { USER_LOGIN } from "common/contants/myContant";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.css";
import { DatVeAction, LayChiTietPhongVeAction } from "redux/actions/QuanLyPhongVeAction";
import { Ghe } from "core/model/ThongTinPhongVe";
import { CheckOutlined, CheckSquareOutlined, ClockCircleOutlined, CloseOutlined, SketchOutlined, UserOutlined } from "@ant-design/icons";
import { CHUYEN_TAB, CHUYEN_TAB_ACTIVE, DAT_GHE, DELETE_GHE_DANG_DAT, SET_GHE_DA_DAT } from "redux/actions/types/QuanLyPhongVeType";
import _ from "lodash";
import { ThongTinDatVe } from "core/model/ThongTinDatVe";
import { Button, Modal, Tabs } from "antd";
import { LayThongTinNguoiDungAction } from "redux/actions/QuanLyNguoiDungAction";
import moment from "moment";
import Loading from "common/components/Loading";
import ModalCheckout from "features/booking/components/ModalCheckout";
import { HIDE_MODAL, HIDE_MODAL_ALERT, SHOW_MODAL } from "redux/actions/types/LoadingType";
import ModalAlert from "features/booking/components/ModalAlert";
import { LoadingShowAction } from "redux/actions/LoadingAction";
import { DELETE_THONG_TIN_NGUOI_DUNG } from "redux/actions/types/QuanLyNguoiDungType";
import { useWindowSize } from "common/hooks/windowSize";
import { mobileBreakPoint } from "common/contants/myContant";

const { TabPane } = Tabs;

export default function (props) {
  const { tabActive } = useSelector((state) => state.QuanLyPhongVeReducer);
  const dispatch = useDispatch();
  const WindowSize = useWindowSize();
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("tab useEffect");
  }, []);
  const onChange = (key) => {};
  return (
    <div className="p-5">
      <Loading />
      <ModalAlert />
      <Tabs onChange={onChange} defaultActiveKey="1" activeKey={tabActive}>
        <Tabs.TabPane tab="1 Đặt vé" key="1">
          <Checkout {...props} />
        </Tabs.TabPane>
        <Tabs.TabPane tab=" 2 Kết Quả đặt vé" key="2">
          <KetQuaDatVe {...props} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<NavLink to="/">Home</NavLink>} key="3"></Tabs.TabPane>
      </Tabs>
    </div>
  );
}

function Checkout(props) {
  const [dwerThongtinDatVe, setdwerThongtinDatVe] = useState(false);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { movieId } = useParams();
  const { chiTietphongve, danhSachGheDangDat, danhSachGheDaDat } = useSelector((state) => state.QuanLyPhongVeReducer);
  const { thongTinPhim, danhSachGhe } = chiTietphongve;

  const windowSize = useWindowSize();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const action = LayChiTietPhongVeAction(movieId);
    dispatch(action);
    dispatch({
      type: DELETE_GHE_DANG_DAT,
    });
    console.log("checkout useEffect");
  }, []);

  //  Check user login
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/Signin" />;
  }

  //Render danh sách ghế
  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDadat" : "";
      let classGheDangDat = "";
      let classGheVipDangDat = "";

      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheUserDat";
        if (ghe.loaiGhe === "Vip") {
          classGheVipDangDat = "gheVipDaDat";
        }
      }
      let indexgheDD = danhSachGheDangDat.findIndex((gheDD) => {
        return gheDD.maGhe === ghe.maGhe;
      });
      if (indexgheDD != -1) {
        classGheDangDat = "gheDangDat";
        if (ghe.loaiGhe === "Vip") {
          classGheVip = "";
        }
      }
      return (
        <Fragment key={index}>
          <button
            disabled={ghe.daDat}
            className={`ghe ${classGheVip} ${classGheDangDat} ${classGheDaDat} ${classGheDaDuocDat} ${classGheVipDangDat}`}
            onClick={() => {
              dispatch({
                type: DAT_GHE,
                gheDuocChon: ghe,
              });
            }}>
            {ghe.daDat ? (
              classGheDaDuocDat != "" ? (
                classGheVipDangDat != "" ? (
                  <SketchOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />
                ) : (
                  <UserOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />
                )
              ) : (
                <CloseOutlined style={{ marginBottom: 7.5, fontWeight: "bold" }} />
              )
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  //Render thông tin đặt vé
  const renderThongtinDatve = () => {
    return (
      <div className="">
        <h3 className="text-green-600 text-center font-bold text-2xl border-b border-dashed border-b-neutral-300 py-3">
          {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
            return (tongTien += ghe.giaVe);
          }, 0)}
        </h3>

        <div className=" border-b border-dashed border-b-neutral-300 py-3">
          <h3 className="text-2xl font-bold">{thongTinPhim.tenPhim}</h3>
          <p className="text-lg">
            <span className="font-bold">Địa điểm:</span> {thongTinPhim.tenCumRap}
          </p>
          <p className="text-lg">
            <span className="font-bold">Ngày chiếu:</span> {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} {thongTinPhim.tenRap}
          </p>
        </div>
        <div className="flex flex-row my-5 flex-wrap justify-between border-b border-dashed border-b-neutral-300 py-2">
          <div className="w-2/3 ">
            <div className="flex flex-wrap w-full items-center">
              <span className="text-red-600 font-bold text-lg mr-2">Ghế: </span>{" "}
              {_.sortBy(danhSachGheDangDat, ["stt"]).map((item, index) => (
                <span key={index} className="text-green-600 text-2xl mr-2">
                  {item.stt}
                  {item.loaiGhe === "Vip" ? "v" : ""}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right 1/3">
            <span className="text-green-600 text-2xl">
              {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                return (tongTien += ghe.giaVe);
              }, 0)}
            </span>
          </div>
        </div>

        <div className="my-5  border-b border-dashed border-b-neutral-300 py-2">
          <span className="text-md text-gray-400">E-mail</span>
          <br />
          <p className="text-lg"> {userLogin.email} </p>
        </div>

        <div className="my-5  border-b border-dashed border-b-neutral-300 py-2">
          <span className="text-md text-gray-400">Phone</span>
          <p className="text-lg">{userLogin.soDT}</p>
        </div>

        <button
          className={`mb-0 text-white w-full font-bold py-5 text-2xl text-center ${danhSachGheDangDat.length != 0 ? "bg-green-500" : "bg-gray-300"}`}
          onClick={() => {
            const ttDatVe = new ThongTinDatVe();
            ttDatVe.maLichChieu = movieId;
            ttDatVe.danhSachVe = danhSachGheDangDat;
            dispatch(DatVeAction(ttDatVe));
            dispatch({
              type: SET_GHE_DA_DAT,
              gheDaDat: danhSachGheDangDat,
            });
            setdwerThongtinDatVe(false);
          }}>
          Đặt vé
        </button>
      </div>
    );
  };
  //Render hàng ghê
  const renderHangGhe = () => {
    const hangGhe = _.chunk(renderSeats(), 16);
    return hangGhe.map((item, index) => {
      return (
        <div key={index} className="flex justify-center items-center box-border">
          {item.map((seats, seatIndex) => {
            return (
              <div key={seatIndex} style={{ width: "5%", height: "5%" }} className=" p-1">
                <div className="rounded">{seats}</div>
              </div>
            );
          })}
        </div>
      );
    });
  };
  //Render nút đặt vé mobile
  const renderMobileNutDatVe = () => {
    return (
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-6">
          <button className={`w-full text-white bg-red-600 font-bold h-full ${!dwerThongtinDatVe ? "hidden" : "block"}`} onClick={handleClickQuayLai}>
            Quay Lại
          </button>
          <div className={`flex flex-wrap w-full h-full items-center justify-center ${dwerThongtinDatVe ? "hidden" : "block"}`}>
            <span className="text-red-600 font-bold text-lg mr-2">Ghế: </span>{" "}
            {_.sortBy(danhSachGheDangDat, ["stt"]).map((item, index) => (
              <span key={index} className="text-green-600 text-2xl mr-2">
                {item.stt}
                {item.loaiGhe === "Vip" ? "v" : ""}
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-6 bg-green-600">
          <button className={`w-full text-white font-bold h-full ${dwerThongtinDatVe ? "hidden" : "block"}`} onClick={handleClickTiepTuc}>
            TIẾP TỤC
          </button>
          <button
            className={`mb-0 text-white w-full h-full font-bold py-5 text-2xl text-center ${dwerThongtinDatVe ? "block" : "hidden"} ${
              danhSachGheDangDat.length != 0 ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => {
              const ttDatVe = new ThongTinDatVe();
              ttDatVe.maLichChieu = movieId;
              ttDatVe.danhSachVe = danhSachGheDangDat;
              dispatch(DatVeAction(ttDatVe));
              dispatch({
                type: SET_GHE_DA_DAT,
                gheDaDat: danhSachGheDangDat,
              });
              setdwerThongtinDatVe(false);
            }}>
            Đặt vé
          </button>
        </div>
      </div>
    );
  };
  //Render thông tin đặt vé kich thuoc mobile
  const renderMobileThongTinDatVe = () => {
    return (
      <div className="">
        <div className="bg-white w-full p-5 h-1/6">
          <h3 className="text-red-600 text-center font-bold text-2xl">2 . Thanh Toán</h3>
        </div>
        <h3 className="text-green-600 text-center font-bold text-2xl border-b border-dashed border-b-neutral-300 py-3">
          {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
            return (tongTien += ghe.giaVe);
          }, 0)}
        </h3>

        <div className=" border-b border-dashed border-b-neutral-300 py-3">
          <h3 className="text-2xl font-bold">{thongTinPhim.tenPhim}</h3>
          <p className="text-lg">
            <span className="font-bold">Địa điểm:</span> {thongTinPhim.tenCumRap}
          </p>
          <p className="text-lg">
            <span className="font-bold">Ngày chiếu:</span> {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} {thongTinPhim.tenRap}
          </p>
        </div>
        <div className="flex flex-row my-5 flex-wrap justify-between border-b border-dashed border-b-neutral-300 py-2">
          <div className="w-2/3 ">
            <div className="flex flex-wrap w-full items-center">
              <span className="text-red-600 font-bold text-lg mr-2">Ghế: </span>{" "}
              {_.sortBy(danhSachGheDangDat, ["stt"]).map((item, index) => (
                <span key={index} className="text-green-600 text-2xl mr-2">
                  {item.stt}
                  {item.loaiGhe === "Vip" ? "v" : ""}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right 1/3">
            <span className="text-green-600 text-2xl">
              {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                return (tongTien += ghe.giaVe);
              }, 0)}
            </span>
          </div>
        </div>

        <div className="my-5  border-b border-dashed border-b-neutral-300 py-2">
          <span className="text-md text-gray-400">E-mail</span>
          <br />
          <p className="text-lg"> {userLogin.email} </p>
        </div>

        <div className="my-5  border-b border-dashed border-b-neutral-300 py-2">
          <span className="text-md text-gray-400">Phone</span>
          <p className="text-lg">{userLogin.soDT}</p>
        </div>
      </div>
    );
  };
  //Handle Button Tiếp tục o kich thuoc mobile
  function handleClickTiepTuc() {
    setdwerThongtinDatVe(true);
  }
  //Handle Button Quay lại o kich thuoc mobile
  function handleClickQuayLai() {
    setdwerThongtinDatVe(false);
  }
  return (
    <div className="container">
      <div className="grid grid-cols-12 	">
        <div className={`${windowSize.width > mobileBreakPoint ? " col-span-8" : " col-span-12"}`}>
          <div className="flex justify-center mt-5">
            <div className=""></div>
            <div id={style.trapezoid} className="flex justify-center items-center" style={{ textAlign: "center" }}></div>
          </div>
          <div className="flex-col">
            {/* {renderSeats()} */}
            {renderHangGhe()}
          </div>
          <div className="mt-5 flex justify-center">
            <table className="divide-y divide-gray-200  w-2/3 ">
              <thead className="bg-gray-50">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang chọn</th>
                  <th>Ghế đã được đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế Thường Bạn đặt</th>
                  <th>Ghế Vip của Bạn đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                <tr>
                  <td>
                    <button className="ghe text-center gheNote">
                      <CheckOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDangDat  text-center gheNote">
                      <CheckOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="ghe  gheDadat text-center gheNote">
                      <CheckOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheVip text-center gheNote">
                      <CheckOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="  gheDadat gheUserDat text-center gheNote">
                      {" "}
                      <UserOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="  gheVipDaDat text-center gheNote">
                      {" "}
                      <SketchOutlined />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${windowSize.width > mobileBreakPoint ? "block col-span-4 shadow-lg shadow-gray-300 p-7" : "hidden"}`}>{renderThongtinDatve()}</div>
        <div className={`${windowSize.width > mobileBreakPoint ? "hidden" : "block"}`}>
          <div className={`${dwerThongtinDatVe ? "fixed top-0 left-0 botom-0 w-full h-full overflow-y-auto" : ""}`}>
            <div className="flex-col h-full">
              <div className={`${dwerThongtinDatVe ? "bg-white w-full p-5 h-full" : "hidden"}`}>{renderMobileThongTinDatVe()}</div>
              <div className={`${dwerThongtinDatVe ? "h-1/6 w-full bg-white" : "fixed bottom-0 left-0 h-1/6 w-full bg-white"}`}>{renderMobileNutDatVe()}</div>
            </div>

            {/* {dwerThongtinDatVe ? renderMobileThongTinDatVe() : ""}
          <div className={`${!dwerThongtinDatVe ? "fixed w-full h-1/6 left-0 bottom-0 bg-white border-t-4" : "w-full h-1/6 bg-white border-t-4 "}`}>
           
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function KetQuaDatVe(props) {
  const dispatch = useDispatch();
  const { ThongTinNguoiDung } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { danhSachGheDaDat } = useSelector((state) => state.QuanLyPhongVeReducer);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [stateDsGheDatThanhCong, setstateDsGheDatThanhCong] = useState(false);

  const WindowSize = useWindowSize();

  useEffect(() => {
    const action = LayThongTinNguoiDungAction();
    dispatch(action);
  }, []);
  //Khi người dùng nhấn nút close trên modal
  const addDatGheThanhCong = () => {};
  const renderTicket = () => {
    if (ThongTinNguoiDung.taiKhoan === "") {
      return <></>;
    }
    return ThongTinNguoiDung.thongTinDatVe.map((item, index) => {
      const seats = _.first(item.danhSachGhe);
      return (
        <div className=" p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="bg-orange-100	 h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={item.hinhAnh} />
            <div className="flex-grow overflow-hidden">
              <div className="flex items-center space-x-2 text-sm">
                <div className="p-1.5 text-xs font-medium uppercase tracking-wider text-fuchsia-800	 bg-fuchsia-200 rounded-lg bg-opacity-50 font-bold">Mã vé: {item.maVe}</div>
                <div className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                  Giờ chiếu: {moment(item.ngayDat).format("hh:mm A")}
                </div>
                <div className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">Rạp: {seats.maCumRap}</div>
                <div className=" p-1.5 text-xs font-medium uppercase tracking-wider text-rose-800 bg-rose-200 rounded-lg bg-opacity-50">
                  Ngày chiếu: {moment(item.ngayDat).format("DD-MM-YYYY")}
                </div>
              </div>
              <div className="text-md font-bold flex items-start py-2">
                <div className="flex items-start">
                  <span className="text-red-500 block w-20">Tên phim:</span>
                  <span className="text-lg px-1 block w-2/3"> {item.tenPhim}</span>
                </div>
                <div className="flex items-center w-1/3">
                  <span className="text-red-500 px-1">
                    <ClockCircleOutlined className="text-gray-400 text-lg" />
                  </span>
                  <span className="">{item.thoiLuongPhim}</span>
                </div>
              </div>
              <div className="flex">
                <div className="w-36 pt-2">
                  <span className="text-red-500 font-bold text-md">Danh sách ghế:</span>
                </div>
                <div className="flex w-full bg-white-200 space-x-2 overflow-x-scroll py-3 ">
                  {item.danhSachGhe.map((seats, index) => {
                    if (seats.loaiGhe === "Vip") {
                      return (
                        <div key={index} className=" text-center relative text-md font-bold font-medium uppercase text-yellow-800 bg-yellow-200	 rounded shadow">
                          <span className="inline-block translate-y-1	">{seats.tenGhe}</span>
                          <span className=" inline-block absolute right-1" style={{ top: "-5px" }}>
                            <SketchOutlined className="absolute" style={{ fontSize: 12 }} />
                          </span>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className=" text-center  text-md font-bold font-medium uppercase text-sky-800 bg-sky-200 rounded shadow">
                          <span className="inline-block translate-y-1	">{seats.tenGhe}</span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="p-5">
      {WindowSize.width > mobileBreakPoint ? (
        <ModalCheckout size="Lagre" addDatGheThanhCong={addDatGheThanhCong} />
      ) : (
        <ModalCheckout size="mobile" addDatGheThanhCong={addDatGheThanhCong} />
      )}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 text-purple-600 text-2xl">Lịch sử đặt vé</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Danh sách các phim mà bạn đã đặt</p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicket()}</div>
        </div>
      </section>
    </div>
  );
}
