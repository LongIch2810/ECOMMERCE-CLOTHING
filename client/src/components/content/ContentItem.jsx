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
  getProducts,
  getWomenProducts,
} from "@/store/features/product/productThunk";
import generateSlug from "@/utils/generateSlug";
import {
  setMenProducts,
  setWomenProducts,
} from "@/store/features/product/productSlice";

const ContentItem = ({ title = "", icon = "" }) => {
  const dispatch = useDispatch();
  const { menProducts, womenProducts } = useSelector((state) => state.product);
  console.log(title);
  console.log(menProducts);
  console.log(womenProducts);
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
            <span>Xem tất cả</span>
            <span>
              <IconEye></IconEye>
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
