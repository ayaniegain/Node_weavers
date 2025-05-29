import React from "react";
import phoneLogo from "../../../src/assets/img/phone_icon.svg";
import downArrowLogo from "../../../src/assets/img/down_arrow_icon.svg";

function Promotion() {
  return (
    <section className="bg-teal-900 text-white text-sm md:text-md flex flex-wrap justify-between items-center h-auto md:h-10 w-full px-4 sm:px-10 py-2 md:py-0">
      {/* Phone Section */}
      <div className="flex items-center gap-2 mb-2 md:mb-0">
        <img src={phoneLogo} alt="phone-logo" className="h-5 w-5" />
        <span className="text-xs sm:text-sm">+9066783678</span>
      </div>

      {/* Promotion Section */}
      <div className="flex items-center gap-3 text-xs sm:text-sm md:text-md text-center md:text-left">
        <h4 className="cursor-pointer hover:underline">Get 50% off on Selected Items</h4>
        <span className="hidden md:inline">|</span>
        <h4 className="cursor-pointer text-yellow-300 hover:underline">Shop Now</h4>
      </div>

      {/* Language & Location */}
      <div className="flex items-center gap-4 mt-2 md:mt-0">
        <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
          <h4 className="text-xs sm:text-sm">Eng</h4>
          <img src={downArrowLogo} alt="dropdown" className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
          <h4 className="text-xs sm:text-sm">Location</h4>
          <img src={downArrowLogo} alt="dropdown" className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
}

export default Promotion;