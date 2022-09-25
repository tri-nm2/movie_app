import React, { useEffect,useState } from "react";
import { Tabs, Input, Button, Table, Space, Tag, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CapNhatThongTinAction, LayThongTinNguoiDungAction } from "redux/actions/QuanLyNguoiDungAction";
import Loading from "common/components/Loading";
import _ from "lodash";
import { HIDE_LOADING } from "redux/actions/types/LoadingType";
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import ModalAlert from "features/booking/components/ModalAlert";
import moment from "moment";
import { useWindowSize } from "common/hooks/windowSize";
import { mobileBreakPoint } from "common/contants/myContant";


function InformationUser(props) {
  const { ThongTinNguoiDung, userLogin } = useSelector(
    (state) => state.QuanLyNguoiDungReducer)
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
      render: (_, {danhSachGhe}) => (
        <>
          {danhSachGhe.map((item,index) => {

            return (
              <Tag color={"green"} key={index}>
                {item.tenGhe.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
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
    onSubmit: values => {
      console.log(values);
      dispatch(CapNhatThongTinAction(values,userLogin));
    },
  });
  useEffect(() => {
    if(_.isEmpty(userLogin)){
      history.push("/Signin");
    }else{
      const action = LayThongTinNguoiDungAction();
      dispatch(action);
    }
  },[]);
  const dataThongtinnguoidung = ThongTinNguoiDung.thongTinDatVe.map((item,index) => {
    const seats = _.first(item.danhSachGhe);
      return  {
        key: index,
        tenPhim: item.tenPhim,
        thoiLuongPhim: item.thoiLuongPhim,
        ngayDat: moment(item.ngayDat).format("DD-MM-YYYY") + "-" +moment(item.ngayDat).format("hh:mm A"),
        tenHeThongRap: seats.tenHeThongRap,
        maCumRap: seats.maCumRap,
        maVe: item.maVe,
        danhSachGhe: item.danhSachGhe
      }
  } )
  return (
    <div className={`${windowSize.width > mobileBreakPoint ? 'flex' : 'flex-col'}`}>
      <ModalAlert page="User"/>
      <Loading/>
      <div className={`${windowSize.width > mobileBreakPoint ? 'w-1/4 flex' : 'flex justify-center items-center'}`}>
        <Card
          style={{
            width: 240,
            border: 'none',
          }}
        >
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
      <div className={`${windowSize.width > mobileBreakPoint ? 'w-3/4' : ''}`}>
        <Tabs defaultActiveKey="1" style={{width: "100%"}} className="p-4 flex ">
          <Tabs.TabPane tab={<div className="text-black-500  text-lg">Thông tin người dùng</div>} key="1" className="p-3">
            <div className={`${windowSize.width > mobileBreakPoint ? 'w-1/2' : 'w-full'}`}>
              <form onSubmit={ (e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}>
                <div className="mt-4">
                  <label  className="text-base font-bold">Tên tài khoản</label>
                  <Input value={formik.values.taiKhoan} name="taiKhoan"  disabled />
                </div>
                <div className="mt-4">
                  <label  className="text-base font-bold">Mật Khẩu</label>
                  <Input value={formik.values.matKhau} onChange={formik.handleChange} name="matKhau"  type="password" />
                </div>
                {/* <div className="mt-4">
                  <label>Mật khẩu</label>
                  <Input value= type="password" />
                </div> */}
                <div className="mt-4">
                  <label  className="text-base font-bold">Họ tên</label>
                  <Input id="hoTen" name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen}/>
                </div>
                <div className="mt-4">
                  <label  className="text-base font-bold">Email</label>
                  <Input id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
                </div>
                <div className="mt-4">
                  <label className="text-base font-bold">Số điện thoại</label>
                  <Input id="soDT" name="soDT" onChange={formik.handleChange}  value={formik.values.soDT} />
                </div>
                <Button className="mt-4 font-bold bg-blue-600 text-white rounded" htmlType="submit">Cập nhật</Button>
              </form>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<div className="text-black-500  text-lg">Lịch sử đặt vé</div>} key="2">
            <Table columns={columns} dataSource={dataThongtinnguoidung} scroll={{ y: 300, x:500 }}/>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default InformationUser;
