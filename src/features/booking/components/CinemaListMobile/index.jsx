import React from "react";
import { Tabs, Collapse } from "antd";
import moment from "moment/moment";

function CinemasListMobile(props) {
  const { TabPane } = Tabs;
  const { Panel } = Collapse;

  //Events
  //   const handleScheduleClick = (scheduleId) => {
  //     console.log(scheduleId);
  //   };
  //Events

  return (
    <div className="container mx-auto" style={{ maxWidth: 1000 }}>
      <Tabs defaultActiveKey="1" tabPosition="top" centered>
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
              <Collapse>
                {cinemasSystem.lstCumRap.map((cinemas, index) => {
                  return (
                    <Panel
                      key={index}
                      header={
                        <div className="flex space-x-3">
                          <img
                            className="w-10 h-10"
                            src={cinemas.hinhAnh}
                            alt="error"
                          ></img>
                          <div>
                            <span className="text-lime-500">
                              {cinemas.tenCumRap}
                            </span>
                            <p>{cinemas.diaChi}</p>
                          </div>
                        </div>
                      }
                    >
                      {cinemas.danhSachPhim.map((movie, index) => {
                        return (
                          <Collapse key={index}>
                            <Panel
                              header={
                                <div className="flex space-x-3">
                                  <img
                                    className="w-10 h-10"
                                    src={movie.hinhAnh}
                                    alt="error"
                                  ></img>
                                  <span className="font-semibold">
                                    {movie.tenPhim}
                                  </span>
                                </div>
                              }
                            >
                              <div className="grid grid-cols-6 gap-3">
                                {movie.lstLichChieuTheoPhim
                                  .slice(0, 10)
                                  .map((schedule, index) => {
                                    return (
                                      <button
                                        key={index}
                                        className="px-2 py-1 border rounded 
                                    hover:bg-blue-600 hover:text-white"
                                        // onClick={() => {
                                        //   handleScheduleClick(schedule.maLichChieu);
                                        // }}
                                      >
                                        {moment(
                                          schedule.ngayChieuGioChieu
                                        ).format("HH:mm")}
                                      </button>
                                    );
                                  })}
                              </div>
                            </Panel>
                          </Collapse>
                        );
                      })}
                    </Panel>
                  );
                })}
              </Collapse>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}

export default CinemasListMobile;
