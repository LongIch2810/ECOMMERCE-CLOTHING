import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import ProductCard from "../card/ProductCard";

const ProductSlider = ({ list }) => {
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
              <ProductCard item={item}></ProductCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
