import ModalAlert from 'features/booking/components/ModalAlert';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import { DangKyAction } from 'redux/actions/QuanLyNguoiDungAction';
import * as Yup from 'yup';

function Signup(props) {
    const {ThongTinDangKy} = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: "GP00",
            hoTen: ""
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required("*Không được để trống tài khoản!"),
            matKhau: Yup.string().required("*Không được để trống mật khẩu!"),
            email: Yup.string().email("*Phải nhập đúng định dạng email abc@gmail.com").required("*Không được để trống email!"),
            soDt: Yup.string().required("*Không được để trống số điện thoại!"),
            hoTen: Yup.string().required("*Không được để trống họ tên!"),
        })
        ,
        onSubmit: values => {
            const dangKyForm = DangKyAction(values);
            dispatch(dangKyForm);
          
        }
    });
    useEffect(() =>{
        if( ThongTinDangKy.statusSignUp){
            formik.resetForm({
                taiKhoan: "",
                matKhau: "",
                email: "",
                soDt: "",
                maNhom: "GP00",
                hoTen: ""
            });
          
        }
    },[ThongTinDangKy.statusSignUp])

    return (
        <div className="h-full flex py-5">
                 <ModalAlert page="SignUp"/>
                <div className="hidden lg:flex w-full lg:w-1/2 signup_img_section
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
                        <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                            
                        }}>
                            <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center mb-8">Đăng ký tài khoản</h1>
                            <div className="mb-4 md:flex md:justify-center">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="taiKhoan">
                                        Tài khoản
                                    </label>
                                    <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="taiKhoan" type="text" placeholder="Nhập tài khoản" onChange={formik.handleChange} value={formik.values.taiKhoan}/>
                                    {formik.errors.taiKhoan && formik.touched.taiKhoan && (<span className="text-xs italic text-red-500">{formik.errors.taiKhoan}</span>)}
                                </div>
                                <div className="md:ml-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="hoTen">
                                        Họ tên
                                    </label>
                                    <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="hoTen" type="text" placeholder="Nhập họ tên"  onChange={formik.handleChange} value={formik.values.hoTen}/>
                                    {formik.errors.hoTen && formik.touched.hoTen && (<span className="text-xs italic text-red-500">{formik.errors.hoTen}</span>)}
                                </div>
                            </div>
                            <div className="mb-4 md:flex md:justify-center">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="soDt">
                                        Số điện thoại
                                    </label>
                                    <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="soDt" type="text" placeholder="Nhập số điện thoại"  onChange={formik.handleChange} value={formik.values.soDt}/>
                                    {formik.errors.soDt && formik.touched.soDt && (<span className="text-xs italic text-red-500">{formik.errors.soDt}</span>)}
                                </div>
                                <div className="md:ml-2">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                    Email
                                </label>
                                <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" onChange={formik.handleChange} value={formik.values.email}/>
                                {formik.errors.email && formik.touched.email && (<span className="text-xs italic text-red-500">{formik.errors.email}</span>)}
                                </div>
                            </div>
                            <div className="mb-4 md:flex md:justify-center">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                    <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="matKhau" type="password" placeholder="******************"  onChange={formik.handleChange} value={formik.values.matKhau}/>
                                    {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
                                    {formik.errors.matKhau && formik.touched.matKhau && (<span className="text-xs italic text-red-500">{formik.errors.matKhau}</span>)}
                                </div>
                                {/* <div className="md:ml-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                                        Confirm Password
                                    </label>
                                    <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="c_password" type="password" placeholder="******************" />
                                </div> */}
                            </div>
                            <div className="mb-6 text-center">
                                <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
                                    Đăng ký
                                </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            {/* <div className="text-center">
                                    <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">
                                        Forgot Password?
                                    </a>
                                </div> */}
                            <div className="text-center">
                                {/* <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="./index.html">
                                       Bạn đã có tài khoản? Đăng nhập!
                                    </a> */}
                                <NavLink to="/Signin" className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">   Bạn đã có tài khoản? Đăng nhập!</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    );
}

export default Signup;