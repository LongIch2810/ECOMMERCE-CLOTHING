import Button from "@/components/button/Button";
import IconCart from "@/components/icons/IconCart";
import IconStar from "@/components/icons/iconStar";
import InputQuantity from "@/components/input/InputQuantity";
import ProductInfo from "@/components/productInfo/ProductInfo";
import ProductSlider from "@/components/slider/ProductSlider";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import { addProductToCart } from "@/store/features/cart/cartThunk";
import { getProductDetail } from "@/store/features/product/productThunk";
import { setSuccess } from "@/store/features/review/reviewSlice";
import { addReview, getReviews } from "@/store/features/review/reviewThunk";
import { formatCurrency, formatDate } from "@/utils/format";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const stars = [
  {
    star: 1,
    values: [true, false, false, false, false],
  },
  {
    star: 2,
    values: [true, true, false, false, false],
  },
  {
    star: 3,
    values: [true, true, true, false, false],
  },
  {
    star: 4,
    values: [true, true, true, true, false],
  },
  {
    star: 5,
    values: [true, true, true, true, true],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  if (!id) return <>404 Page Not Found !</>;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { productInfo, relatedProducts, loading } = useSelector(
    (state) => state.product
  );
  const { reviews, success } = useSelector((state) => state.review);
  const [checks, setChecks] = useState([false, false, false, false, false]);
  const [comment, setComment] = useState("");
  const handleReview = () => {
    const count = checks.reduce((acc, item) => {
      return item ? acc + 1 : acc;
    }, 0);
    if (!count) {
      toast.error(
        "Vui lòng đánh giá chất lượng sản phẩm để shop cải thiện hơn !"
      );
    } else if (!comment) {
      toast.error(
        "Vui lòng cho lời nhận xét về sản phẩm để shop cải thiện hơn !"
      );
    } else {
      dispatch(addReview({ star: count, content: comment, product_id: id }));
      setComment("");
    }
  };

  useEffect(() => {
    dispatch(getProductDetail({ id }));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (success) {
      setComment("");
      setSuccess(false);
    }
  }, [success]);

  return (
    <Layout>
      {loading ? <p>Loading ...</p> : ""}
      {productInfo && !loading && (
        <section>
          <div className="flex flex-col items-center mt-20 overflow-hidden body-font">
            <Title
              className="text-2xl font-bold md:text-3xl lg:text-4xl"
              text="Chi tiết sản phẩm"
            ></Title>
            {/*-------------------------------------product detail---------------------------------------------- */}
            <ProductInfo id={id}></ProductInfo>

            <div className="flex flex-col items-center mt-5 md:flex-row md:justify-center gap-y-3">
              <img src="/table-size1.png" alt="" className="w-[500px]" />
              <img src="/table-size2.jpg" alt="" className="w-[500px]" />
            </div>

            {/*----------------------------------------------Review product-----------------------------------*/}

            <div className="flex flex-col  w-full bg-gray-100 max-w-[800px] p-3 m-20">
              <div className="flex items-center justify-center">
                <Title
                  text="Đánh giá"
                  className="text-xl font-medium md:text-2xl"
                ></Title>
              </div>
              <div>
                <div className="mb-10">
                  {reviews?.length > 0 &&
                    reviews.map((review) => (
                      <div
                        key={review._id}
                        className="flex items-center p-2 rounded-lg gap-x-3 bg-main"
                      >
                        <img
                          src={user.avatar}
                          alt=""
                          className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] object-cover rounded-full"
                        />
                        <div className="flex flex-col gap-y-1">
                          <span className="text-sm font-medium md:text-base">
                            {review.user?.name}
                          </span>
                          <div className="flex item-center gap-x-3">
                            {stars
                              .filter((item) => item.star === review.star)[0]
                              .values.map((item, index) => (
                                <IconStar key={index} checked={item}></IconStar>
                              ))}
                          </div>
                          <span className="text-primary">{review.content}</span>
                          <span className="md:text-xs text-[10px] italic text-gray-400">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
                <div
                  className="p-3 rounded-lg bg-main"
                  onMouseLeave={() => {
                    setChecks([false, false, false, false, false]);
                  }}
                >
                  <div className="inline-flex items-center p-1 mb-5 rounded-lg md:p-2 gap-x-5 bg-primary">
                    <div
                      onClick={() => {
                        setChecks([true, false, false, false, false]);
                      }}
                    >
                      <IconStar checked={checks[0]}></IconStar>
                    </div>
                    <div
                      onClick={() => {
                        setChecks([true, true, false, false, false]);
                      }}
                    >
                      <IconStar checked={checks[1]}></IconStar>
                    </div>
                    <div
                      onClick={() => {
                        setChecks([true, true, true, false, false]);
                      }}
                    >
                      <IconStar checked={checks[2]}></IconStar>
                    </div>
                    <div
                      onClick={() => {
                        setChecks([true, true, true, true, false]);
                      }}
                    >
                      <IconStar checked={checks[3]}></IconStar>
                    </div>
                    <div
                      onClick={() => {
                        setChecks([true, true, true, true, true]);
                      }}
                    >
                      <IconStar checked={checks[4]}></IconStar>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-5 ">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="flex-1 p-1 text-sm border-2 rounded-lg md:p-2 border-primary md:text-base"
                      placeholder="Lời nhận xét sản phẩm ..."
                    />
                    <Button
                      className="px-5 py-1 text-sm md:py-2 bg-primary text-main md:text-base"
                      onClick={handleReview}
                    >
                      Gửi
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*------------------------------------------Related Products---------------------------------------------*/}
          <div className="flex flex-col">
            <Title text="Sản phẩm liên quan" className="text-xl"></Title>

            <ProductSlider
              list={relatedProducts}
              isDisplayButton={false}
              height={500}
            ></ProductSlider>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
