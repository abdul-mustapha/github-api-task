import React from "react";
import Search from "./Search";

const Header = () => {
  return (
    <div className="bg-rose-900 flex p-5 justify-between items-center">
      <div>
        <p className=" text-white text-lg font-bold">
          GitHub Respository Search Tool
        </p>
      </div>
	  <div>
		<Search/>
	  </div>
      <div>
        <p className="text-white ">by Abdul Mustapha</p>
      </div>
    </div>
  );
};

export default Header;
