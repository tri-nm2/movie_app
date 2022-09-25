import React from "react";
import { Tabs } from "antd";
import moment from "moment/moment";
import { useHistory } from "react-router-dom";

function CinemasList(props) {
  const { TabPane } = Tabs;
  const history = useHistory();
  //Events
  const handleScheduleClick = (scheduleId) => {
    history.push(`/checkout/${scheduleId}`); 
  };
  //Events

  return (
    <div className="container mx-auto" style={{ maxWidth: 1000 }}>
      <Tabs defaultActiveKey="1" tabPosition="left">
        {props.cinemasList?.map((cinemasSystem, index) => {
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
              <Tabs
                defaultActiveKey="0"
                tabPosition="left"
                style={{ height: 500 }}
              >
                {cinemasSystem.lstCumRap.map((cinemas, index) => {
                  return (
                    <TabPane
                      key={index}
                      style={{ height: 500, overflow: "auto" }}
                      tab={
                        <div className="flex">
                          <img
                            className="w-12 h-12"
                            src={cinemas.hinhAnh}
                            alt="error"
                          ></img>
                          <div
                            className="flex flex-col flex-wrap items-start pl-2"
                            style={{ width: 300 }}
                          >
                            <span>{cinemas.tenCumRap}</span>
                            <p>{cinemas.diaChi}</p>
                          </div>
                        </div>
                      }
                    >
                      {cinemas.danhSachPhim.slice(0, 10).map((movie, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-row mb-10 pr-3"
                          >
                            <div className="w-24 h-28">
                              <img
                                className="w-full h-full"
                                src={movie.hinhAnh}
                                alt="error"
                              ></img>
                            </div>
                            <div className="flex flex-col pl-5">
                              <span className="mb-5">{movie.tenPhim}</span>
                              <div className="grid lg:grid-cols-6 grid-cols-3 gap-2">
                                {movie.lstLichChieuTheoPhim
                                  ?.slice(0, 10)
                                  .map((schedule, index) => {
                                    return (
                                      <button
                                        key={index}
                                        className="px-2 py-1 border rounded 
                                        hover:bg-blue-600 hover:text-white"
                                        onClick={() => {
                                          handleScheduleClick(
                                            schedule.maLichChieu
                                          );
                                        }}
                                      >
                                        {moment(
                                          schedule.ngayChieuGioChieu
                                        ).format("HH:mm")}
                                      </button>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </TabPane>
                  );
                })}
              </Tabs>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}

export default CinemasList;
