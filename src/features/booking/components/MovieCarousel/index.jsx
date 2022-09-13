import React from "react";
import { Carousel } from "antd";

function MovieCarousel(props) {
  const contentStyle = {
    height: "400px",
    backgroundColor: "black",
  };

  //Other function
  const renderBanner = () => {
    const banner = props.banner;
    const tag = banner.map((banner, index) => {
      return (
        <div key={index}>
          <div style={contentStyle}>
            <img
              className="w-full h-full"
              src={banner.hinhAnh}
              alt="error"
            ></img>
          </div>
        </div>
      );
    });

    return tag;
  };
  //Other function

  return (
    <div className="mb-10">
      <Carousel effect="fade" autoplay>
        {renderBanner()}
      </Carousel>
    </div>
  );
}

export default MovieCarousel;
