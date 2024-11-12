import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useMediaQuery } from "@mui/material";

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

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-full max-w-full">
        <Swiper
          className="w-full"
          modules={[Navigation, Autoplay, Pagination]}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          centeredSlides={isMobile ? true : false}
          spaceBetween={30}
          slidesPerView={isMobile ? 1 : 3}
        >
          {mostChampionData.map((data, index) => {
            const championData = championList.find(
              (champion) => champion._id === data._id
            );

            if (!championData) return null;

            const championName = championData.name;
            const championImage = championData.image;

            return (
              <SwiperSlide key={index} className={`flex flex-col items-center`}>
                <div className="relative">
                  <img
                    src={rankImages[index]}
                    alt=""
                    className="w-10 absolute top-2 left-2"
                  />
                  <img
                    src={`${championImage}.jpg`}
                    alt=""
                    className={`object-contain rounded-lg ${
                      isMobile ? "w-56" : "w-full"
                    }`}
                  />
                </div>
                <div className="flex justify-around md:justify-between items-center px-3 mt-2 w-full">
                  <p className="text-lg font-bold">{championName}</p>
                  <p className="text-slate-500">{data.count} 게임</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* Next button */}
        <div className="custom-next absolute top-1/2 -right-5 transform -translate-y-12 z-10 w-10 h-10 md:flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 transition border bg-white shadow-md hidden">
          <img
            src="/images/arrow.jpg"
            alt=""
            className="rotate-180 rounded-full"
          />
        </div>
        {/* Previous button */}
        <div className="custom-prev absolute top-1/2 -left-5 transform -translate-y-12 z-10 w-10 h-10 md:flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 transition border bg-white shadow-md hidden">
          <img src="/images/arrow.jpg" alt="" className="rounded-full" />
        </div>
        {/* Pagination */}
        <div className="custom-pagination flex justify-center mt-4 space-x-2"></div>
      </div>
    </div>
  );
};
