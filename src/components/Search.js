import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <div className="flex items-center space-x-3">
      <input
        type="text"
        placeholder="Search all of Github..."
        className="pr-2 pl-6 py-2 rounded-full w-72"
      ></input>
      <button className="bg-white text-lg p-3 rounded-full">
        <FiSearch className=""/>
      </button>
    </div>
  );
};

export default Search;
