import React from "react";
import Title from "../title/Title";
import Button from "../button/Button";
import IconShirt from "../icons/IconShirt";
import IconTrousers from "../icons/IconTrousers";
import IconEye from "../icons/IconEye";
import ProductCard from "../card/ProductCard";
import IconDress from "../icons/IconDress";
import ProductSlider from "../slider/ProductSlider";

const ContentItem = ({ title = "", icon = "" }) => {
  return (
    <div className="mb-20">
      <div className="mb-5">
        <Title className="text-xl" text={title} icon={icon}></Title>
        <div className="flex flex-col justify-end gap-5 md:flex-row">
          <Button className="flex items-center gap-3 p-3 bg-primary">
            <span>Xem tất cả</span>
            <span>
              <IconEye></IconEye>
            </span>
          </Button>
        </div>
      </div>
      <ProductSlider></ProductSlider>
    </div>
  );
};

export default ContentItem;
