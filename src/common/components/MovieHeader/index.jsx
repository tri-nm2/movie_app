import React from "react";
import { NavLink } from "react-router-dom";
import logo from "assets/images/headTixLogo.png";

function MovieHeader() {
  return (
    <div>
      <header className="p-1 bg-stone-50 text-black w-full z-50">
        <div className="container flex justify-between h-16 mx-auto">
          <NavLink to="/" className="flex items-center p-2">
            <img className="w-14 h-14" src={logo} alt="logo"></img>
          </NavLink>
          <ul className="items-stretch hidden space-x-3 lg:flex">
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
          <div className="items-center flex-shrink-0 hidden lg:flex">
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
          <button className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
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
    </div>
  );
}

export default MovieHeader;
