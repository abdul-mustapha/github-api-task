import React from "react";
import { FaUser, FaLink } from "react-icons/fa";

const RepoInformationCard = ({
  full_name,
  description,
  stars,
  forks,
  watchers,
  issues,
  author,
  url,
}) => {
  return (
    <div>
      <div className="bg-rose-100 m-3 p-5 flex space-x-3 justify-between h-40 items-center">
        <div className="overflow-hidden space-y-1">
          <p className="font-bold text-xl">{full_name}</p>
          <p className="text-gray-600 text-md text-ellipsis">{description}</p>
          <div className="flex items-center space-x-2 text-sm">
            <FaUser />
            <p>{author}</p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <FaLink />
            <a href={url} target="_blank" rel="noreferrer">
              <p>Visit Repo</p>
            </a>
          </div>
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
