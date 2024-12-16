import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import ProductCard from "../card/ProductCard";

const ProductSlider = () => {
  return (
    <div className="product-list">
      <Swiper
        grabCursor={true}
        spaceBetween={40}
        navigation={true} // Enable navigation
        slidesPerView={"auto"}
        modules={[Navigation]}
      >
        <SwiperSlide>
          <ProductCard></ProductCard>
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard></ProductCard>
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard></ProductCard>
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard></ProductCard>
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard></ProductCard>
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard></ProductCard>
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard></ProductCard>
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard></ProductCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductSlider;
