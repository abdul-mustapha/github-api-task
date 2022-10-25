import React, { useState } from "react";
import { FaUser, FaLink, FaStar, FaEye, FaPlus, FaMinus } from "react-icons/fa";
import { VscRepoForked, VscIssues } from "react-icons/vsc";

const iconStyling = "flex items-center space-x-2";

const RepoInformationCard = ({
  full_name,
  description,
  stars,
  forks,
  watchers,
  issues,
  author,
  url,
  readmore,
}) => {
  const [readMe, showReadme] = useState(false);
  const toggleReadMe = () => showReadme(!readMe);

  return (
    <div>
      <div className="bg-rose-100 mt-3 mx-3 p-5 flex space-x-3 justify-between h-40 items-center">
        <div className="overflow-hidden space-y-1">
          <p className="font-bold text-xl">{full_name}</p>
          <p className="text-gray-700 text-md text-ellipsis truncate ">
            {description}
          </p>
          <div className={`${iconStyling} text-sm`}>
            <FaUser />
            <p>{author}</p>
          </div>
          <div className={`${iconStyling} text-sm`}>
            <FaLink />
            <a href={url} target="_blank" rel="noreferrer">
              <p>Visit Repo</p>
            </a>
          </div>
        </div>

        <div className="border-l-2 border-black px-5 py-3 space-y-1">
          <div className={iconStyling}>
            <FaStar />
            <p>{stars}</p>
          </div>
          <div className={iconStyling}>
            <VscRepoForked />
            <p>{forks}</p>
          </div>
          <div className={iconStyling}>
            <FaEye />
            <p>{watchers}</p>
          </div>
          <div className={iconStyling}>
            <VscIssues />
            <p>{issues}</p>
          </div>
        </div>
      </div>
      <div className="p-3 mx-3 bg-rose-50">
        <div className="text-sm">
          {readMe ? (
            <button className="flex  items-center space-x-2" onClick={toggleReadMe} >
              <FaMinus className="hover:text-xs transition-all"/>
              <p className="text-left">{readmore}</p>
            </button>
          ) : (
            <button className="flex items-center space-x-2 " onClick={toggleReadMe} >
              <FaPlus className="hover:text-xs transition-all"/>
              <p>Read More</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepoInformationCard;
