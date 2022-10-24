import React from "react";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import RepoInformationCard from "./RepoInformationCard";

const axiosConfig = {
  headers: {
    Authorization: "Bearer ",
  },
};

const Header = () => {
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
    <div>
      <div className="bg-rose-900 flex p-5 justify-between items-center">
        <div>
          <p className=" text-white text-lg font-bold">
            GitHub Respository Search Tool
          </p>
        </div>
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
            <FiSearch />
          </button>
        </div>
        <div>
          <p className="text-white ">by Abdul Mustapha</p>
        </div>
      </div>
      <div className="grid grid-cols-2">
        {JSON.stringify(queryData) !== "{}" ? (
          <>
            {queryData.map((repo) => (
              <RepoInformationCard
                key={repo.id}
                full_name={repo.full_name}
				description={repo.description}
				stars={repo.stargazers_count}
                forks={repo.forks_count}
				watchers={repo.watchers_count}
                issues={repo.open_issues}
				author={repo.owner.login}
				url={repo.html_url}
              />
            ))}
          </>
        ) : (
          <>
            <p>No data :(</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
