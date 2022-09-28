import React, { useEffect, useState } from "react";
import { Tabs, Input, Button, Table, Space, Tag, Card, Anchor } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CapNhatThongTinAction, LayThongTinNguoiDungAction } from "redux/actions/QuanLyNguoiDungAction";
import Loading from "common/components/Loading";
import _ from "lodash";
import { HIDE_LOADING } from "redux/actions/types/LoadingType";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import ModalAlert from "features/booking/components/ModalAlert";
import moment from "moment";
import { useWindowSize } from "common/hooks/windowSize";
import { mobileBreakPoint } from "common/contants/myContant";
import { ClockCircleOutlined, SketchOutlined } from "@ant-design/icons";

function InformationUser(props) {
  const { ThongTinNguoiDung, userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [modal, setModal] = useState(false);
  const [listSeats, setlistSeats] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const windowSize = useWindowSize();

  const columns = [
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
    },
    {
      title: "Thời Lượng Phim",
      dataIndex: "thoiLuongPhim",
    },
    {
      title: "Ngày Đặt",
      dataIndex: "ngayDat",
    },
    {
      title: "Hệ thống rạp",
      dataIndex: "tenHeThongRap",
    },
    {
      title: "Rạp",
      dataIndex: "maCumRap",
    },
    {
      title: "Mã vé",
      dataIndex: "maVe",
    },
    {
      title: "Danh sách ghế",
      dataIndex: "danhSachGhe",
      render: (_, { danhSachGhe }) => {
       
        return <>
            {danhSachGhe.length > 3 ? (
              <>
              {renderMobileSeatTable(danhSachGhe)}
              <Button type="link"  onClick={() => {
                  setModal(!modal);
                  setlistSeats(danhSachGhe);
              }}>
                 Còn nữa...
              </Button>
              </>
            ) : (
              danhSachGhe.map((item, index) => {
                return (
                  <Tag color={"green"} key={index}>
                    {item.tenGhe.toUpperCase()}
                  </Tag>
                );
              })
            )}
          </>
      }
    },
  ];
  function closeModal(){
    setModal(!modal);
    setlistSeats([]);
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: ThongTinNguoiDung.taiKhoan,
      matKhau: ThongTinNguoiDung.matKhau,
      email: ThongTinNguoiDung.email,
      soDT: ThongTinNguoiDung.soDT,
      maNhom: ThongTinNguoiDung.maNhom,
      maLoaiNguoiDung: ThongTinNguoiDung.maLoaiNguoiDung,
      hoTen: ThongTinNguoiDung.hoTen,
    },
    onSubmit: (values) => {
      dispatch(CapNhatThongTinAction(values, userLogin));
    },
  });
  console.log("Infor render");
  console.log("listSEat", listSeats);
  useEffect(() => {
    if (_.isEmpty(userLogin)) {
      history.push("/Signin");
    } else {
      const action = LayThongTinNguoiDungAction();
      dispatch(action);
    }
  }, []); 
  const dataThongtinnguoidung = ThongTinNguoiDung.thongTinDatVe.map((item, index) => {
    const seats = _.first(item.danhSachGhe);
    return {
      key: index,
      tenPhim: item.tenPhim,
      thoiLuongPhim: item.thoiLuongPhim,
      ngayDat: moment(item.ngayDat).format("DD-MM-YYYY") + "-" + moment(item.ngayDat).format("hh:mm A"),
      tenHeThongRap: seats.tenHeThongRap,
      maCumRap: seats.maCumRap,
      maVe: item.maVe,
      danhSachGhe: item.danhSachGhe,
    };
  });

  //Render 5 ghe dau tien trong danh sach co nhieu ghe
  function renderMobileSeat(item) {
    // console.log(item)
    const dsGhe = _.slice(item.danhSachGhe, 0, 3);
    return dsGhe.map((ghe, index) => {
      if (item.loaiGhe === "Vip") {
        return (
          <div key={index} className="w-9 h-9 text-center relative text-md font-bold font-medium uppercase text-yellow-800 bg-yellow-200	 rounded shadow">
            <span className="inline-block translate-y-1	">{ghe.tenGhe}</span>
            <span className="w-2 h-2 inline-block absolute right-1" style={{ top: "-5px" }}>
              <SketchOutlined className="absolute" style={{ fontSize: 12 }} />
            </span>
          </div>
        );
      } else {
        return (
          <div key={index} className="w-9 text-center  text-md font-bold font-medium uppercase text-sky-800 bg-sky-200 rounded shadow">
            <span className="inline-block translate-y-1	">{ghe.tenGhe}</span>
          </div>
        );
      }
    });
  }
  //Render 5 ghe dau tien trong danh sach co nhieu ghe
  function renderMobileSeatTable(item) {
    // console.log(item)
    const dsGhe = _.slice(item, 0, 3);
    return dsGhe.map((ghe, index) => {
        return (
          <Tag color={"green"} key={index}>
          {ghe.tenGhe.toUpperCase()}
          </Tag>
        );
    });
  }
  //Render mobile Lịch sử đặt vé
  function renderMobileLichSuDatVe() {
    return ThongTinNguoiDung.thongTinDatVe.map((item, index) => {
      const seats = _.first(item.danhSachGhe);
      return (
        <div key={index} className="bg-orange-100	 p-4 rounded-lg shadow my-3 overflow-scroll	w-full">
          <div className="flex items-center">
            <div className=" pr-2 w-1/4">
              <img className="w-16 h-16 rounded-full shadow" src={item.hinhAnh} alt={"hinhAnh"} />
            </div>
            <div className="w-3/4">
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
              <div className="flex w-full  ">
                <div className="w-36 pt-2">
                  <span className="text-red-500 font-bold text-md">Danh sách ghế:</span>
                </div>
                <div className="flex w-full bg-white-200 space-x-2 ">
                  {renderMobileSeat(item)}
                  {item.danhSachGhe.length > 3 ? (
                    <Button className="bg-green-400" onClick={() => {
                      setModal(!modal);
                      setlistSeats(item.danhSachGhe);
                    }}>
                      Xem tiếp...
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className={`${windowSize.width > mobileBreakPoint ? "flex" : "flex-col"}`}>
      <ModalAlert page="User" />
      <Loading />
      {modal ? <ModalDanhSachGhe danhSachGhe={listSeats} closeModal={closeModal}/> : ""}
      <div className={`${windowSize.width > mobileBreakPoint ? "w-1/4 flex" : "flex justify-center items-center"}`}>
        <Card
          style={{
            width: 240,
            border: "none",
          }}>
          <img
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
            }}
            alt="example"
            src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
          />

          <p className="text-center text-2xl font-bold mt-5">{ThongTinNguoiDung.hoTen}</p>
        </Card>
      </div>
      <div className={`${windowSize.width > mobileBreakPoint ? "w-3/4" : ""}`}>
        <Tabs defaultActiveKey="1" style={{ width: "100%" }} className="p-4 flex ">
          <Tabs.TabPane tab={<div className="text-black-500  text-lg">Thông tin người dùng</div>} key="1" className="p-3">
            <div className={`${windowSize.width > mobileBreakPoint ? "w-1/2" : "w-full"}`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit(e);
                }}>
                <div className="mt-4">
                  <label className="text-base font-bold">Tên tài khoản</label>
                  <Input value={formik.values.taiKhoan} name="taiKhoan" disabled />
                </div>
                <div className="mt-4">
                  <label className="text-base font-bold">Mật Khẩu</label>
                  <Input value={formik.values.matKhau} onChange={formik.handleChange} name="matKhau" type="password" />
                </div>
                <div className="mt-4">
                  <label className="text-base font-bold">Họ tên</label>
                  <Input id="hoTen" name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
                </div>
                <div className="mt-4">
                  <label className="text-base font-bold">Email</label>
                  <Input id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
                </div>
                <div className="mt-4">
                  <label className="text-base font-bold">Số điện thoại</label>
                  <Input id="soDT" name="soDT" onChange={formik.handleChange} value={formik.values.soDT} />
                </div>
                <Button className="mt-4 font-bold bg-blue-600 text-white rounded" htmlType="submit">
                  Cập nhật
                </Button>
              </form>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<div className="text-black-500  text-lg">Lịch sử đặt vé</div>} key="2">
            <div className="md:block hidden">
              <Table columns={columns} dataSource={dataThongtinnguoidung} scroll={{ y: 300, x: 500 }} />
            </div>
            <div className="md:hidden ">{renderMobileLichSuDatVe()}</div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
function ModalDanhSachGhe({danhSachGhe, closeModal}){
  let soLuongGheDaTa = danhSachGhe.length;
  let soLuongGheDefaut = 10;
  let soLuongDong = 0;
  let soGhe = [];
  let widthGhe = "30";
  if(danhSachGhe.length <= 10){
    soLuongDong = 1;
    soGhe = danhSachGhe;
  }else{
    soLuongDong = Math.round(soLuongGheDaTa /10 +1);
    soGhe = _.chunk(danhSachGhe, 10);
  }
  console.log("sl ghe tu danh sach",soLuongGheDaTa);
  console.log("sl dong",soLuongDong);
  console.log("sl ghe tu mang chunk",soGhe);
  function renderListGhe() {
    if(soLuongDong === 1){
      return <div  className="flex items-center p-1  ">
        {soGhe.map( (seats,key) =>{
         return <div key={key} style={{ width: `150px`, height: `35px`}} className="text-center p-1 relative  ">
           <span className=" inline-block w-full h-full text-md font-bold font-medium uppercase text-blue-800 bg-blue-200 rounded shadow">{seats.tenGhe}</span>
          </div>})}
      </div>
    }else{
      return soGhe.map((item,index) =>{
          return <div key={index} className="flex items-center p-1  ">
              {item.map((seats,key) => {
                 return <div key={key} style={{ width: `20%`, height: `35px`}} className="text-center relative m-1">
                   <div className="flex items-center justify-center p-1">
                   <span className=" inline-block w-full h-full text-md font-bold font-medium uppercase text-blue-800 bg-blue-200 rounded shadow">{seats.tenGhe}</span>
                   </div>
                  </div>
              })}
          </div>
      })
    }
    
  //  return soDong.map( (item, index) => {
  //   return <div key={index} className="flex items-center p-1 justify-between ">
  //     { danhSachGhe.map( (seats, key ) =>{
  //       return <div key={key} style={{ width: `${widthGhe}%`, height: `${widthGhe}%`}} className="text-center p-1 relative  ">
  //       <span className=" inline-block w-full h-full text-md font-bold font-medium uppercase text-blue-800 bg-blue-200 rounded shadow">{seats.tenGhe}</span>
  //     </div>
  //     })}
  // </div>
  //  })
  
  }
  return <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center">
     
      <div className="w-1/2 p-5 flex-col justify-center items-center bg-white shadow rounded-lg">
      <div>
        <h3 className="text-center font-bold text-xl">Tổng số ghế bạn đặt: <span className="text-red-600"> {danhSachGhe.length}</span></h3>
      </div>
      <div className="bg-red-400 w-full h-full rounded-lg overflow-scroll">
        {renderListGhe()}
      </div> 
      <div className="text-center p-1.5">
      <Button className="bg-blue-600" onClick={closeModal}>Đóng</Button> 
      </div>
      </div> 
      
  </div>
}

export default InformationUser;
