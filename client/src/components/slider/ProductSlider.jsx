import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ProductCard from "../card/ProductCard";
import { useNavigate } from "react-router-dom";

const ProductSlider = ({ list, isDisplayButton = true, height = 560 }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full product-list">
      <Swiper
        grabCursor={true}
        spaceBetween={40}
        navigation={true}
        autoplay={{
          delay: 3000, // Thời gian giữa các lần trượt (ms)
          disableOnInteraction: false, // Tiếp tục chạy ngay cả khi người dùng tương tác
        }}
        slidesPerView={"auto"}
        modules={[Navigation, Autoplay]}
      >
        {list?.length > 0 &&
          list.map((item) => (
            <SwiperSlide key={item._id} style={{ height: `${height}px` }}>
              <ProductCard
                item={item}
                onClick={() => navigate(`/product-detail/${item._id}`)}
                isDisplayButton={isDisplayButton}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
