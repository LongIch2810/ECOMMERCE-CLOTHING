import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

import ProductCard from "../card/ProductCard";
import { useNavigate } from "react-router-dom";

const ProductSlider = ({ list }) => {
  const navigate = useNavigate();
  return (
    <div className="product-list">
      <Swiper
        grabCursor={true}
        spaceBetween={40}
        navigation={true} // Enable navigation
        slidesPerView={"auto"}
        modules={[Navigation]}
      >
        {list &&
          list.length > 0 &&
          list.map((item) => (
            <SwiperSlide key={item._id}>
              <ProductCard
                item={item}
                onClick={() => navigate(`/product-detail/${item._id}`)}
              ></ProductCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
