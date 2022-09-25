import React, { useEffect } from "react";
import style from "./style.module.css";
import {NavLink, useHistory} from "react-router-dom";
import { useFormik } from 'formik';
import {useDispatch, useSelector} from "react-redux";
import { DangNhapAction } from "redux/actions/QuanLyNguoiDungAction";
import ModalAlert from "features/booking/components/ModalAlert";
import Loading from "common/components/Loading";
import { LoadingHideAction } from "redux/actions/LoadingAction";



function Signin(props) {
  const {ThongTinDangKy, userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: values => {
      const action = DangNhapAction(values);
      dispatch(action);
    },
  });
  useEffect(() => {
    dispatch(LoadingHideAction());
  },[]);


  return (
    <div className="h-screen flex">
     <ModalAlert page="Login"/>
     <Loading/>
    <div className="hidden lg:flex w-full lg:w-1/2  login_img_section
          justify-around items-center">
      <div className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0">
      </div>
      <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
        <h1 className="text-white font-bold text-4xl font-sans">Movie Booking Ticket</h1>
        <p className="text-white mt-1">Trang đặt vé trực tuyến</p>
        <div className="flex justify-center lg:justify-start mt-6">
          <NavLink to="/" className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">Về trang chủ</NavLink>
        </div>
      </div>
    </div>
    <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
      <div className="w-full px-8 md:px-32 lg:px-24">
      <form onSubmit={ (e) => {
          e.preventDefault();
          formik.handleSubmit(e);
      }} className="bg-white rounded-md shadow-2xl p-5">
          <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center mb-8">Đăng nhập tài khoản</h1>
          <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokelinecap="round" strokelinejoin="round" strokewidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg> */}
            
            <input id="taiKhoan" onChange={formik.handleChange} className=" pl-2 w-full outline-none border-none" type="input" name="taiKhoan" placeholder="Nhập vào tài khoản" />
          </div>
          <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillrule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" cliprule="evenodd" />
            </svg> */}
          
            <input className="pl-2 w-full outline-none border-none" onChange={formik.handleChange} type="password" name="matKhau" id="matKhau" placeholder="Nhập vào mật khẩu" />
          </div>
          <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Đăng nhập</button>
          <div className="flex justify-between mt-4">
            {/* <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Lấy lại mật khẩu</span> */}
            {/* <a href="#" className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Đăng ký tại đây</a> */}
              <NavLink  className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all" to="/Signup">Đăng ký tại đây</NavLink>
          </div>
      </form>
      </div>
    </div>
     </div>

  );
}

export default Signin;
