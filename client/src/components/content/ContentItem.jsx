import React, { useEffect } from "react";
import Title from "../title/Title";
import Button from "../button/Button";
import IconEye from "../icons/IconEye";
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
    <div className="w-full mb-20">
      <div className="mb-5">
        <Title
          className="text-xl"
          text={`Thời Trang ${title}`}
          icon={icon}
        ></Title>
      </div>
      <ProductSlider
        list={title === "Nam" ? menProducts : womenProducts}
      ></ProductSlider>
    </div>
  );
};

export default ContentItem;
