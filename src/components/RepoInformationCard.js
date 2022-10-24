import React from "react";

const RepoInformationCard = ({ full_name, description, stars, forks, watchers, issues,  }) => {
  return (
    <div>
      <div className="bg-rose-100 m-3 p-5 flex space-x-3 justify-between h-40 items-center">
        <div className="overflow-hidden">
          <p className="font-bold text-lg">{full_name}</p>
          <p className="text-gray-600 text-sm text-ellipsis">{description}</p>
        </div>

        <div className="flex flex-col border-l-2 border-black pl-5 ">
          <p>Stars: {stars}</p>
          <p>Forks: {forks}</p>
		  <p>Watchers: {watchers}</p>
          <p>Issues: {issues}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default RepoInformationCard;
