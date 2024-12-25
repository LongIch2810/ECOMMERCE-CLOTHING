import React, { useEffect } from "react";
import Title from "../title/Title";
import Button from "../button/Button";
import IconShirt from "../icons/IconShirt";
import IconTrousers from "../icons/IconTrousers";
import IconEye from "../icons/IconEye";
import ProductCard from "../card/ProductCard";
import IconDress from "../icons/IconDress";
import ProductSlider from "../slider/ProductSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  getMenProducts,
  getWomenProducts,
} from "@/store/features/product/productThunk";

const ContentItem = ({ title = "", icon = "" }) => {
  const dispatch = useDispatch();
  const { menProducts, womenProducts } = useSelector((state) => state.product);
  useEffect(() => {
    if (title === "Nam") {
      dispatch(getMenProducts());
    } else {
      dispatch(getWomenProducts());
    }
  }, []);
  return (
    <div className="mb-20">
      <div className="mb-5">
        <Title
          className="text-xl"
          text={`Thời Trang ${title}`}
          icon={icon}
        ></Title>
        <div className="flex flex-col justify-end gap-5 md:flex-row">
          <Button className="flex items-center gap-3 p-3 bg-primary">
            <span className="text-main">Xem tất cả</span>
            <span>
              <IconEye className="size-6 text-main"></IconEye>
            </span>
          </Button>
        </div>
      </div>
      <ProductSlider
        list={title === "Nam" ? menProducts : womenProducts}
      ></ProductSlider>
    </div>
  );
};

export default ContentItem;
