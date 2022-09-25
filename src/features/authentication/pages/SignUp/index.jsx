import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
function Signup(props) {
    return (
        <div className="h-full flex py-5">
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
                        <form className="bg-white rounded-md shadow-2xl p-5">
                            <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center mb-8">Đăng ký tài khoản</h1>
                            <div className="mb-4 md:flex md:justify-center">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="taiKhoan">
                                        Tài khoản
                                    </label>
                                    <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="taiKhoan" type="text" placeholder="Nhập tài khoản" />
                                </div>
                                <div className="md:ml-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="hoTen">
                                        Họ tên
                                    </label>
                                    <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="hoTen" type="text" placeholder="Nhập họ tên" />
                                </div>
                            </div>
                            <div className="mb-4 md:flex md:justify-center">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="soDt">
                                        Số điện thoại
                                    </label>
                                    <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="soDt" type="text" placeholder="Nhập số điện thoại" />
                                </div>
                                <div className="md:ml-2">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                    Email
                                </label>
                                <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                                </div>
                            </div>
                            <div className="mb-4 md:flex md:justify-center">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                    <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                                    {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
                                </div>
                                <div className="md:ml-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                                        Confirm Password
                                    </label>
                                    <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="c_password" type="password" placeholder="******************" />
                                </div>
                            </div>
                            <div className="mb-6 text-center">
                                <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
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