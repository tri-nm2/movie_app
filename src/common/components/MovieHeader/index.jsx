import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "assets/images/headTixLogo.png";
import { Drawer } from "antd";
import { UserOutlined } from "@ant-design/icons";

function MovieHeader() {
  const [open, setOpen] = useState(false);

  const renderDrawerTitle = () => {
    return (
      <div className="flex flex-nowrap justify-center items-center space-x-2">
        <div className="rounded-full bg-sky-500 p-2">
          <UserOutlined className="text-white" style={{ fontSize: 30 }} />
        </div>
        <div>
          <NavLink className="text-gray-500 text-xl" to="/">
            Đăng nhập
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <div>
      <header className="p-1 text-black w-full z-50 bg-stone-50">
        <div className="container flex justify-between h-16 mx-auto">
          <NavLink to="/" className="flex items-center p-2">
            <img className="w-14 h-14" src={logo} alt="logo"></img>
          </NavLink>
          <ul className="items-stretch space-x-3 hidden md:flex">
            <li className="flex">
              <Link
                to={{ pathname: "/", hash: "#movieListTag" }}
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent 
                hover:text-red-600 font-semibold"
              >
                Lịch chiếu
              </Link>
            </li>
            <li className="flex">
              <Link
                to={{ pathname: "/", hash: "#cinemasListTag" }}
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent 
                hover:text-red-600 font-semibold"
              >
                Cụm rạp
              </Link>
            </li>
          </ul>
          <div className="items-center flex-shrink-0 hidden md:flex">
            <button
              className="self-center px-5 py-3 mr-2 font-semibold border rounded 
              hover:bg-violet-600 hover:text-white"
            >
              Đăng nhập
            </button>
            <button
              className="self-center px-5 py-3 font-semibold border rounded
              hover:bg-violet-600 hover:text-white"
            >
              Đăng ký
            </button>
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
          <NavLink
            className="text-black text-lg"
            to={{ pathname: "/", hash: "#movieListTag" }}
          >
            Lịch chiếu
          </NavLink>
          <NavLink
            className="text-black text-lg"
            to={{ pathname: "/", hash: "#cinemasListTag" }}
          >
            Cụm rạp
          </NavLink>
          <NavLink className="text-black text-lg" to="/">
            Đăng ký
          </NavLink>
        </div>
      </Drawer>
    </div>
  );
}

export default MovieHeader;
