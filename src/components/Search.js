import React from "react";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";

const axiosConfig = {
  headers: {
    Authorization: "Bearer",
  },
};

const Search = () => {
  const [userInput, setUserInput] = useState("");
  const [queryData, setQueryData] = useState({});

  const handleSearch = (event) => {
    console.log("Search API Called");

    let queryString = `q=${userInput}`;

    axios
      .get(
        "https://api.github.com/search/repositories?" + queryString,
        axiosConfig
      )
      .then(function (response) {
        setQueryData(response.data.items);
        
      });
	 
  };

  console.log(queryData);

  return (
    <div className="flex items-center space-x-3">
      <input
        type="text"
        placeholder="Search all of Github..."
        className="pr-2 pl-6 py-2 rounded-full w-72"
        onChange={(e) => setUserInput(e.target.value)}
      ></input>
      <button
        className="bg-white text-lg p-3 rounded-full"
        onClick={(e) => handleSearch(e)}
      >
        <FiSearch className="" />
      </button>
    </div>
  );
};

export default Search;
