import MovieCarousel from "features/booking/components/MovieCarousel";
import MovieList from "features/booking/components/MovieList";
import React, { useEffect, useState } from "react";
import { groupId } from "common/contants/myContant";
import { instance } from "api/instance";
import { Pagination } from "antd";
import CinemasList from "features/booking/components/CinemasList";
import CinemasListMobile from "features/booking/components/CinemaListMobile";
import { useWindowSize } from "common/hooks/windowSize";
import { mobileBreakPoint } from "common/contants/myContant";
import { useLocation } from "react-router-dom";

function Home() {
  const [movieList, setMovieList] = useState([]);
  const [banner, setBanner] = useState([]);
  const [cinemasList, setCinemasList] = useState();
  const [paginationConfig, setPaginationConfig] = useState({
    currentPage: 1,
    pageSize: 8,
    totalData: 0,
  });
  const windowSize = useWindowSize();
  const location = useLocation();

  //Hooks
  useEffect(() => {
    fetchBanner();
    fetchCinemasList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationConfig.currentPage]);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const target = document.getElementById(hash.substring(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }

    return () => window.scroll({ top: 0, left: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash, location.key]);
  //Hooks

  //Api function
  const fetchMovieList = async () => {
    try {
      const response = await instance.request({
        url: "/api/QuanLyPhim/LayDanhSachPhimPhanTrang",
        method: "GET",
        params: {
          maNhom: groupId,
          soTrang: paginationConfig.currentPage,
          soPhanTuTrenTrang: paginationConfig.pageSize,
        },
      });

      setMovieList(response.data.content.items);
      setPaginationConfig({
        ...paginationConfig,
        totalData: response.data.content.totalCount,
      });
    } catch (error) {
      console.log(error.response.data.content);
    }
  };

  const fetchBanner = async () => {
    try {
      const response = await instance.request({
        url: "/api/QuanLyPhim/LayDanhSachBanner",
        method: "GET",
      });

      setBanner(response.data.content);
    } catch (error) {
      console.log(error.response.data.content);
    }
  };

  const fetchCinemasList = async () => {
    try {
      const response = await instance.request({
        url: "/api/QuanLyRap/LayThongTinLichChieuHeThongRap",
        method: "GET",
        params: {
          maNhom: groupId,
        },
      });

      setCinemasList(response.data.content);
    } catch (error) {
      console.log(error.response.data.content);
    }
  };
  //Api function

  //Events
  const handlePageChange = (page) => {
    setPaginationConfig({ ...paginationConfig, currentPage: page });
  };
  //Events

  return (
    <div>
      <MovieCarousel banner={banner} />
      <div id="movieListTag">
        <MovieList movieList={movieList} />
        <div className="text-center mt-5">
          <Pagination
            className="mb-20"
            defaultCurrent={paginationConfig.currentPage}
            pageSize={paginationConfig.pageSize}
            total={paginationConfig.totalData}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <div id="cinemasListTag">
        {windowSize.width > mobileBreakPoint ? (
          <CinemasList cinemasList={cinemasList} />
        ) : (
          <CinemasListMobile cinemasList={cinemasList} />
        )}
      </div>
    </div>
  );
}

export default Home;
