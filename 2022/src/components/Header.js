import React from "react";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import RepoInformationCard from "./RepoInformationCard";

const axiosConfig = {
  headers: {
    Authorization: "Bearer  ",
  },
};

const Header = () => {
  const [userInput, setUserInput] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [queryData, setQueryData] = useState({});

  const handleSearch = (event) => {
    console.log("Search API Called");

    let queryString = `q=${userInput}+language:${searchFilter}`;

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
  console.log(searchFilter);

  return (
    <div>
      <div className="bg-rose-900 flex p-5 justify-between items-center drop-shadow-xl">
        <div>
          <p className=" text-white text-lg font-bold">
            GitHub Respository Search Tool
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search all of Github..."
            className="pr-2 pl-6 py-2 rounded-full w-72 shadow-lg"
            onChange={(e) => setUserInput(e.target.value)}
          />

          <select
            className="px-3 py-2 rounded-full"
            defaultValue=""
            onChange={(e) => setSearchFilter(e.target.value)}
          >
            <option value="" hidden>Language</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
          </select>
          <button
            className="bg-white text-lg p-3 rounded-full hover:bg-gray-200 hover:rotate-45 transition-all shadow-lg"
            onClick={(e) => handleSearch(e)}
          >
            <FiSearch />
          </button>
        </div>
        <p className="text-white ">by Abdul Mustapha</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                readmore={repo.created_at}
              />
            ))}
          </>
        ) : (
          <>
            <div className="col-span-full h-screen bg-rose-100 p-5">
              <p className="bg-white p-5 rounded-lg text-center shadow-lg">
                Search all of Github using the searchbar above!
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
