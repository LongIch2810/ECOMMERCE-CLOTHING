import Button from "@/components/button/Button";
import IconCart from "@/components/icons/IconCart";
import InputQuantity from "@/components/input/InputQuantity";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import { getProductDetail } from "@/store/features/product/productThunk";
import { formatCurrency } from "@/utils/format";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  if (!id) return <>404 Page Not Found !</>;
  const dispatch = useDispatch();
  const { productInfo, loading } = useSelector((state) => state.product);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [size, setSize] = useState("default");
  const handleAddProductToCart = ({ product_id, size, quantity }) => {};
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
  useEffect(() => {
    dispatch(getProductDetail({ id }));
  }, [id]);
  return (
    <Layout>
      {loading ? <p>Loading ...</p> : ""}
      {productInfo && !loading && (
        <section className="flex flex-col items-center mt-20 overflow-hidden body-font">
          <Title
            className="text-4xl font-bold"
            text="Chi tiết sản phẩm"
          ></Title>
          {/*-------------------------------------product detail---------------------------------------------- */}
          <div className="container py-24 max-w-[800px]">
            <div className="flex">
              <div className="flex flex-col flex-1 w-full gap-5">
                <div>
                  <img
                    alt="ecommerce"
                    className="object-cover w-full"
                    src={productInfo.product.images[0]}
                  />
                </div>
                <div className="grid grid-cols-4 gap-5">
                  {productInfo.product.images.map((item) => (
                    <img
                      key={item}
                      alt="ecommerce"
                      src={item}
                      className="object-cover"
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
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="ml-3 text-gray-600">4 Reviews</span>
                  </span>
                  <span className="flex py-2 pl-3 ml-3 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                    </a>
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
                        className="py-2 pl-3 pr-10 text-base border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
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
                  <Button className="flex px-6 py-2 bg-primary text-main">
                    <span>Add to cart</span>
                    <span>
                      <IconCart></IconCart>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/*----------------------------------------------end product detail-----------------------------------*/}

          <div className="flex flex-col items-center justify-center w-full max-h-[600px]">
            <Title text="Đánh giá" className="text-2xl font-medium"></Title>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
