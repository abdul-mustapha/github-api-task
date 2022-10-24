import React from "react";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";

const axiosConfig = {
  headers: {
    Authorization: "Bearer ",
  },
};

const queryString = "q=" + encodeURIComponent("GitHub");

const handleSearch = () => {
  axios
    .get(
      "https://api.github.com/search/repositories?" + queryString,
      axiosConfig
    )
    .then(function (response) {
      console.log(response);
    });
};

const Search = () => {
  const [userInput, setUserInput] = useState("");
  
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="flex items-center space-x-3">
      <input
        type="text"
        placeholder="Search all of Github..."
        className="pr-2 pl-6 py-2 rounded-full w-72"
        onChange={handleChange}
        value={userInput}
      ></input>
      <button
        className="bg-white text-lg p-3 rounded-full"
        onSubmit={handleSearch()}
      >
        <FiSearch className="" />
      </button>
    </div>
  );
};

export default Search;
