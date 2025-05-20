import React from "react";
import banner from "../../assets/img/banner.svg";
import { AnimationText } from "../Effect/AnimationText";

function Banner() {
  return (
    <div className="bg-yellow-100 w-full h-64 flex items-center justify-between px-10 relative z-0">
      <div className="max-w-lg">
        <h2 className="text-teal-900 text-3xl font-semibold break-words leading-tight">
          {/* Grab Upto 50% Off On Selected Products */}
          <AnimationText/>
        </h2>
        <button className="text-white text-sm bg-teal-900 px-5 py-2.5 rounded-full mt-4 hover:bg-teal-700 transition-all">
          Buy Now
        </button>
      </div>

      <img
        src={banner}
        alt="banner"
        className="absolute top-1/2 right-10 transform -translate-y-1/2 h-[250px] object-cover"
      />
    </div>
  );
}

export default Banner;
