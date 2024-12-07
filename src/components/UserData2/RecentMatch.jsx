import { useState } from "react";

export const RecentMatch = ({ match, matchMe, status }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (status === "pending") {
    return (
      <div className="my-10">
        <div className="flex justify-center items-center h-96 bg-slate-300">
          <div className="text-2xl text-gray-400">로딩중입니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5">
      {matchMe.map((data, index) => {
        const matchData = data[0];
        return (
          <div
            key={index}
            className={`${
              matchData.win ? "bg-[#2E3D59]" : "bg-[#59343B]"
            } pl-3 p-2 my-2 rounded-md relative flex gap-2`}
          >
            <div
              className={`absolute left-0 top-0 h-full w-2 rounded-l-md ${
                matchData.win ? "bg-[#5C8EF2]" : "bg-[#F24464]"
              }`}
            ></div>
            <div
              className={`absolute right-0 top-0 h-full w-8 rounded-r-md cursor-pointer ${
                matchData.win
                  ? "bg-[#476096] group hover:bg-[#5C8EF2]"
                  : "bg-[#8d4d5b] group hover:bg-[#F24464]"
              }`}
            >
              <img
                src="/images/arrow.svg"
                alt=""
                className={`absolute right-2.5 bottom-1 w-3 ${
                  matchData.win
                    ? "bg-[#476096] group-hover:bg-[#5C8EF2]"
                    : "bg-[#8d4d5b] group-hover:bg-[#F24464]"
                }`}
              />
            </div>
            <div>
              {matchData.win ? (
                <p className="text-[#5C8EF2] font-semibold">승리</p>
              ) : (
                <p className="text-[#F24464] font-semibold">패배</p>
              )}
            </div>
            <div className="flex gap-5 items-center">
              <img
                src="/images/placeholder.svg"
                alt=""
                className={`w-12 h-12 ${imageLoaded ? "hidden" : "block"}`}
              />
              <img
                src={`${matchData.small}.jpg`}
                alt={matchData.champion_kr}
                className={`w-12 ${
                  imageLoaded ? "block" : "hidden"
                } rounded-full`}
                onLoad={() => setImageLoaded(true)}
              />
              <p className="font-semibold flex gap-1">
                <span className="text-white">{matchData.kills}</span>
                <span className="text-[#7B706B]">/</span>
                <span className="text-[#E83F51]">{matchData.deaths}</span>
                <span className="text-[#7B706B]">/</span>
                <span className="text-white">{matchData.assists}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
