import { useState } from "react";
import NavBar from "./navBar";
import DateSelector from "./DateSelector";

function formatDate(d) {
  // weekday: full name
  // month: short name
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(d);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d);
  const day = d.getDate();
  return `${weekday}, ${month} ${day}`;
}

function Header(){
    const [userName, setUserName] = useState("Sophie");
    const date = new Date();

    return (
      <div className="bg-gradient-to-r from-[#6e74ee] via-[#717eee] to-[#7b86ff] px-4 pt-6 pb-12">
        <NavBar />

        <div className="text-xl ml-3 text-white">
          Hello,{" "}
          <span className="text-[#A1E3D8] font-semibold">{userName}</span>
        </div>

        <div className="text-sm text-[#E0E0E0] font-extralight ml-3">
          {formatDate(date)}
        </div>

        <div className="mt-4 ml-2">
          {/* date selector */}
          <DateSelector date={date} />
        </div>
      </div>
    );
}

export default Header;