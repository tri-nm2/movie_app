import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "api/instance";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import { Rate, Tabs } from "antd";
import moment from "moment/moment";

function Detail() {
  const { TabPane } = Tabs;

  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState({});

  const imagePath = movieInfo?.hinhAnh;
  const backgroundStyle = {
    backgroundImage: `url(${imagePath})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  //Hooks
  useEffect(() => {
    fetchMovieDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //Hooks

  //Api function
  const fetchMovieDetail = async () => {
    try {
      const response = await instance.request({
        url: "/api/QuanLyRap/LayThongTinLichChieuPhim",
        method: "GET",
        params: {
          MaPhim: movieId,
        },
      });

      setMovieInfo(response.data.content);
    } catch (error) {
      console.log(error.response.data.content);
    }
  };
  //Api function

  //Other function
  const renderSchedule = () => {
    const tag = movieInfo.heThongRapChieu?.map((cinemasSystem, index) => {
      return (
        <TabPane
          key={index}
          tab={
            <img
              className="w-12 h-12 rounded-full"
              src={cinemasSystem.logo}
              alt="error"
            ></img>
          }
        >
          {cinemasSystem.cumRapChieu.map((cinemas, index) => {
            return (
              <div key={index} className="flex flex-wrap mb-5">
                <img
                  className="w-10 h-16 rounded-md"
                  src={cinemas.hinhAnh}
                  alt="error"
                ></img>
                <div className="flex flex-col font-semibold ml-3">
                  <p className="text-lime-500">{cinemas.tenCumRap}</p>
                  <p className="text-gray-400">{cinemas.diaChi}</p>
                </div>
                
                <div className="grid grid-cols-10 gap-2 mt-2 pr-2">
                  {cinemas.lichChieuPhim.map((schedule, index) => {
                    return (
                      <button
                        key={index}
                        className="px-2 py-1 border rounded 
                        hover:bg-blue-600 hover:text-white"
                        // onClick={() => {
                        //   handleScheduleClick(schedule.maLichChieu);
                        // }}
                      >
                        {moment(schedule.ngayChieuGioChieu).format("HH:mm")}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </TabPane>
      );
    });

    return tag;
  };
  //Other function

  return (
    <div className="container mx-auto" style={backgroundStyle}>
      <CustomCard
        effectColor="rgb(10, 32, 41)"
        color="rgb(10, 32, 41)"
        blur={20}
        borderRadius={0}
      >
        <div className="grid grid-cols-12 mb-20">
          <div className="col-span-4 col-start-1 lg:col-start-4">
            <div className="grid grid-cols-2">
              <img src={movieInfo.hinhAnh} alt="error"></img>
              <h1 className="text-white ml-6">{movieInfo.tenPhim}</h1>
            </div>
          </div>

          <div className="col-span-2 col-start-9 flex flex-col items-center">
            <div className="c100 p100">
              <span>10</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
            <Rate className="mb-3" allowHalf defaultValue={5} />
            <p className="text-white text-xl">14 tỉ người đánh giá</p>
          </div>
        </div>

        <Tabs
          className="mx-auto"
          defaultActiveKey="1"
          tabPosition="top"
          centered
          type="card"
          style={{ maxWidth: 800 }}
        >
          <TabPane tab="Lịch chiếu" key="1">
            <div
              className="bg-stone-50 mx-auto rounded-lg py-10"
              style={{ maxWidth: 700 }}
            >
              <Tabs defaultActiveKey="1" tabPosition="left">
                {renderSchedule()}
              </Tabs>
            </div>
          </TabPane>

          <TabPane tab="Thông tin" key="2">
            <div className="grid grid-cols-8 text-white gap-2">
              <div className="col-span-4 font-semibold">
                <div className="grid grid-cols-3 mb-2">
                  <p>Ngày công chiếu</p>
                  <p className="col-span-2">2022.05.10</p>
                </div>

                <div className="grid grid-cols-3 mb-2">
                  <p>Đạo diễn</p>
                  <p className="col-span-2">Tokuda</p>
                </div>

                <div className="grid grid-cols-3 mb-2">
                  <p>Diễn viên</p>
                  <p className="col-span-2">
                    Yua Mikami, Eimi Fukada, Melody Mark
                  </p>
                </div>

                <div className="grid grid-cols-3 mb-2">
                  <p>Thể Loại</p>
                  <p className="col-span-2">
                    Hành động, Giả tưởng, Ly kỳ, Thần thoại
                  </p>
                </div>

                <div className="grid grid-cols-3 mb-2">
                  <p>Định dạng</p>
                  <p className="col-span-2">3D/8K UltraHD</p>
                </div>

                <div className="grid grid-cols-3">
                  <p>Quốc Gia SX</p>
                  <p className="col-span-2">Nhật bản</p>
                </div>
              </div>

              <div className="col-span-4">
                <p className="font-bold">Nội dung</p>
                <p>{movieInfo.moTa}</p>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </CustomCard>
    </div>
  );
}

export default Detail;
