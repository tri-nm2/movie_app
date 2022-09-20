import React from "react";
import Style from "./style.module.css";
import backTopIcon from "assets/images/headTixLogo.png";
import { useScrollPosition } from "common/hooks/scrollPostion";

function BackToTop() {
  const scrollPostion = useScrollPosition();
  //Events
  const handleBackToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };
  //Events

  return (
    <div>
      <button
        className={`bg-violet-600 rounded-full ${
          scrollPostion > 300 ? "block" : "hidden"
        } ${Style.backToTop}`}
        onClick={() => {
          handleBackToTop();
        }}
      >
        <img className="rotate-180" src={backTopIcon} alt="error"></img>
      </button>
    </div>
  );
}

export default BackToTop;
