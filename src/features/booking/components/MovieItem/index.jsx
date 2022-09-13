import React from "react";

function MovieItem(props) {
  return (
    <div>
      <div className="rounded-md shadow-md bg-gray-50 text-gray-800 w-full">
        <img
          src={props.movie.hinhAnh}
          alt="error"
          className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold tracking-wide">
              {props.movie.tenPhim}
            </h2>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-600 text-gray-50"
          >
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieItem;
