import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const SwiperChampionMost = ({ mostChampionData, championList }) => {
  const rankImages = [
    "/images/1st.png",
    "/images/2nd.png",
    "/images/3rd.png",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-full max-w-screen-statsmd">
        <Swiper
          style={{ width: "100%", maxWidth: "100%" }}
          modules={[Navigation, Autoplay, Pagination]}
          pagination={{ clickable: true }}
          navigation={{ nextEl: ".custom-next", prevEl: null }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          spaceBetween={30}
          slidesPerView={3}
        >
          {mostChampionData.map((data, index) => {
            const championData = championList.find(
              (champion) => champion._id === data._id
            );

            if (!championData) return null;

            const championName = championData.name;
            const championImage = championData.image;

            return (
              <SwiperSlide key={index} className="">
                <div className="relative">
                  <img
                    src={rankImages[index]}
                    alt=""
                    className="w-10 absolute top-2 left-2"
                  />
                  <img
                    src={`${championImage}.jpg`}
                    alt=""
                    className="object-contain rounded-lg w-full"
                  />
                </div>
                <div className="flex justify-between items-center px-3 mt-2">
                  <p className="text-lg font-bold">{championName}</p>
                  <p className="text-slate-500">{data.count} 게임</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* Next button */}
        <div className="custom-next absolute top-1/2 -right-5 transform -translate-y-9 z-10 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 transition border bg-white drop-shadow-lg">
          <img
            src="/images/arrow.jpg"
            alt=""
            className="rotate-180 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
