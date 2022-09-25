import React, { Fragment, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from "assets/images/headTixLogo.png";
import { Drawer } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { TOOKEN, USER_LOGIN } from "common/contants/myContant";
import { DELETE_THONG_TIN_USER } from "redux/actions/types/QuanLyNguoiDungType";
import { HIDE_LOADING } from "redux/actions/types/LoadingType";
import { LayThongTinNguoiDungAction } from "redux/actions/QuanLyNguoiDungAction";
import { LoadingHideAction } from "redux/actions/LoadingAction";

function MovieHeader() {
  const [open, setOpen] = useState(false);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const renderNutDangXuat = () => {
    return <NavLink
          className="
               hover:text-red-600 text-black text-lg"
          to="/" onClick={() => {
            dispatch({
              type: DELETE_THONG_TIN_USER,
            })
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOOKEN);

            // window.location.reload();
            dispatch(LoadingHideAction());
     
          }}
        >
          Đăng xuất
        </NavLink>
  }
  const renderDrawerTitle = () => {
    return (
      <div className="flex flex-nowrap justify-center items-center space-x-2">
        <div className="rounded-full bg-sky-500 p-2">
          <UserOutlined className="text-white" style={{ fontSize: 30 }} />
        </div>
        <div>
        {!_.isEmpty(userLogin) ? (<div className="flex-col"><div><NavLink className="text-gray-500 text-xl" to="/Thongtintaikhoan">
            {userLogin.taiKhoan}
          </NavLink></div></div>)
          :(<NavLink className="text-gray-500 text-xl" to="/Signin">
            Đăng nhập
          </NavLink>) }
          
        </div>
      </div>
    );
  };
  // in ra giao diện đăng nhập hoặc đăng xuất khi người dùng  có đăng nhập hoặc không
  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <NavLink
            className="self-center px-5 py-3 mr-2 font-semibold border rounded 
              hover:bg-violet-600 hover:text-white"
            to="/Signin"
          >
            Đăng nhập
          </NavLink>

          {/* <button
              className="self-center px-5 py-3 mr-2 font-semibold border rounded 
              hover:bg-violet-600 hover:text-white"
            >
              Đăng nhập
            </button> */}
          <NavLink
            className="self-center px-5 py-3 font-semibold border rounded
              hover:bg-violet-600 hover:text-white"
            to="/Signup"
          >
            Đăng ký
          </NavLink>
          {/* <button
              className="self-center px-5 py-3 font-semibold border rounded
              hover:bg-violet-600 hover:text-white"
            >
              Đăng ký
            </button> */}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <NavLink
          className="self-center px-5 py-3 mr-2 ml-2 font-semibold border rounded 
              hover:bg-violet-600 hover:text-white"
          to="/Thongtintaikhoan"
          onClick={() => {
           
          }}
        >
          <div className="">
            <UserOutlined /> {userLogin.taiKhoan}
          </div>
        </NavLink>
        <NavLink
          className="self-center px-5 py-3 mr-2 font-semibold border rounded 
              hover:bg-violet-600 hover:text-white"
          to="/" onClick={() => {
            dispatch({
              type: DELETE_THONG_TIN_USER,
            })
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOOKEN);

            // window.location.reload();
            dispatch(LoadingHideAction());
     
          }}
        >
          Đăng xuất
        </NavLink>
      </Fragment>
    );
   
  };
  return (
    <div>
      <header className="p-1 bg-stone-50 text-black w-full z-50">
        <div className="container flex justify-between h-16 mx-auto">
          <NavLink to="/" className="flex items-center p-2">
            <img className="w-14 h-14" src={logo} alt="logo"></img>
          </NavLink>
          <ul className="items-stretch space-x-3 hidden md:flex">
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="/#"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent 
                hover:text-red-600 font-semibold"
              >
                Lịch chiếu
              </a>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="/#"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent 
                hover:text-red-600 font-semibold"
              >
                Cụm rạp
              </a>
            </li>
          </ul>
          <div className="items-center flex-shrink-0 hidden md:flex">
            {renderLogin()}
          </div>
          <button className="p-4 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
              onClick={() => {
                setOpen(true);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <Drawer
        title={renderDrawerTitle()}
        placement="right"
        open={open}
        width={250}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="flex flex-col space-y-4">
          <NavLink className="text-black text-lg" to="/">
            Lịch chiếu
          </NavLink>
          <NavLink className="text-black text-lg" to="/">
            Cụm rạp
          </NavLink>
          {!_.isEmpty(userLogin) ? <Fragment>{renderNutDangXuat()}</Fragment> :<NavLink className="text-black text-lg" to="/Signup">Đăng ký</NavLink> }
          
        </div>
      </Drawer>
    </div>
  );
}

export default MovieHeader;
