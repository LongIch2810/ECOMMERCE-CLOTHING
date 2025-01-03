import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconCart from "../icons/IconCart";
import Button from "../button/Button";
import InputQuantity from "../input/InputQuantity";
import { addProductToCart } from "@/store/features/cart/cartThunk";
import { getProductDetail } from "@/store/features/product/productThunk";
import { formatCurrency } from "@/utils/format";
import { toast } from "react-toastify";
import StarRating from "../star/StarRating";
import Loading from "../loading/Loading";

const ProductInfo = ({ id }) => {
  const dispatch = useDispatch();
  const { productInfo, loadingDetail } = useSelector((state) => state.product);
  const [image, setImage] = useState("");
  const [zoomScale, setZoomScale] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [size, setSize] = useState("default");
  const handleChooseSize = (e) => {
    const newSize = e.target.value;
    const index = productInfo.sizes.findIndex((item) => item.size === newSize);
    if (index === -1) {
      toast.error("Size not found !");
    } else {
      setSize(newSize);
      setMaxQuantity(productInfo.sizes[index].quantity);
    }
  };
  const handleMoveZoomImage = (e) => {
    const rect = e.target.getBoundingClientRect();
    const offsetXPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const offsetYPercent = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomScale(3);
    setTransformOrigin(`${offsetXPercent}% ${offsetYPercent}%`);
  };

  const handleAddProductToCart = ({ product_id, size, quantity }) => {
    if (size === "default") {
      toast.error("Please choose size");
      return;
    }
    dispatch(addProductToCart({ product_id, size, quantity }));
  };

  const handleLeaveZoomImage = () => {
    setZoomScale(1);
    setTransformOrigin("center center");
  };
  useEffect(() => {
    dispatch(getProductDetail({ id }));
  }, [id]);

  useEffect(() => {
    if (productInfo) {
      setImage(productInfo.product.images[0]);
    }
  }, [productInfo]);

  return (
    <>
      {productInfo && !loadingDetail ? (
        <div className="container ">
          <div className="flex">
            <div className="flex flex-col flex-1 w-full gap-5">
              <div
                className="w-full h-full overflow-hidden cursor-zoom-in"
                onMouseMove={handleMoveZoomImage}
                onMouseLeave={handleLeaveZoomImage}
              >
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full zoomImage"
                  src={image}
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: transformOrigin,
                    imageRendering: "pixelated",
                  }}
                />
              </div>
              <div className="grid grid-cols-4 gap-5">
                {productInfo.product.images.map((item) => (
                  <img
                    key={item}
                    alt="ecommerce"
                    src={item}
                    onClick={() => setImage(item)}
                    className="object-cover cursor-pointer hover:opacity-60"
                  />
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
              <h2 className="text-sm tracking-widest text-gray-500 title-font">
                {productInfo.product.type_product.name}
              </h2>
              <h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">
                {productInfo.product.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <StarRating
                    rating={productInfo.product.averageReview}
                  ></StarRating>
                  <span className="ml-3 text-gray-600">
                    {productInfo.product.averageReview}
                  </span>
                </span>
              </div>
              <p className="leading-relaxed">
                {productInfo.product.description}
              </p>
              <div className="flex flex-col pb-5 mt-6 mb-5 border-b-2 border-gray-100 gap-y-5">
                <div className="flex items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      onChange={handleChooseSize}
                      className="py-2 pl-3 pr-10 text-base border border-gray-300 rounded appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    >
                      <option value="default">Chọn size</option>
                      {productInfo.sizes.map((item) => (
                        <option key={item._id}>{item.size}</option>
                      ))}
                    </select>
                    <span className="absolute top-0 right-0 flex items-center justify-center w-10 h-full text-center text-gray-600 pointer-events-none">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
                {maxQuantity !== 0 && (
                  <p className="text-sm text-secondary">{`Số lượng còn lại: ${maxQuantity}`}</p>
                )}
                <div className="flex items-center">
                  <span className="mr-3">Số lượng</span>
                  <div className="relative">
                    <InputQuantity
                      value={quantity}
                      setValue={setQuantity}
                      maxValue={maxQuantity}
                    ></InputQuantity>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-2xl font-medium text-secondary title-font">
                  {formatCurrency(productInfo.product.price)}
                </span>
                <Button
                  className="flex px-3 py-2 bg-primary text-main"
                  onClick={() =>
                    handleAddProductToCart({
                      product_id: productInfo.product._id,
                      size,
                      quantity: Number(quantity),
                    })
                  }
                >
                  <span>Thêm giỏ hàng</span>
                  <span>
                    <IconCart></IconCart>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProductInfo;
