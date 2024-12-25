import ProductCard from "@/components/card/ProductCard";
import IconTrousers from "@/components/icons/IconTrousers";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import { getProducts } from "@/store/features/product/productThunk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "rc-pagination";

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, total_products, current_page } = useSelector(
    (state) => state.product
  );

  const [currentPage, setCurrentPage] = useState(current_page);
  const [limit, setLimit] = useState(9);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, limit }));
  }, [currentPage, limit]);
  return (
    <Layout>
      <section>
        <div className="flex items-center justify-center my-8">
          <Title className="text-4xl font-bold" text="Sản phẩm"></Title>
        </div>
        <div>
          <div className="flex justify-center gap-10 mb-10">
            <div className="flex flex-col p-2 gap-y-5">
              <div className="flex flex-col gap-y-5">
                <span className="font-semibold">Gới tính</span>
                <div className="flex flex-col gap-y-5">
                  <span>Nam</span>
                  <span>Nữ</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-5">
                <span className="font-semibold">Áo</span>
                <div className="flex flex-col gap-y-5">
                  <span>Áo sơ mi</span>
                  <span>Áo sweater</span>
                  <span>Áo khoác</span>
                  <span>Áo phông</span>
                  <span>Áo polo</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-5">
                <span className="font-semibold">Quần</span>
                <div className="flex flex-col gap-y-5">
                  <span>Quần jean</span>
                  <span>Quần kaki</span>
                  <span>Quần gió</span>
                  <span>Quần short</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-5">
                <span className="font-semibold">Váy</span>
                <div className="flex flex-col gap-y-5">
                  <span>Chân váy</span>
                  <span>Váy liền thân</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-5">
                <span className="font-semibold">Giá</span>
                <div className="flex flex-col gap-y-5">
                  <span>100k - 200K</span>
                  <span>200K - 300K</span>
                  <span>300K - 400K</span>
                  <span>400K - 500K</span>
                  <span>500K trở lên</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-5">
                <span className="font-semibold">Đánh giá</span>
                <div className="flex flex-col gap-y-5">
                  <span>5 sao</span>
                  <span>4 sao trở lên</span>
                  <span>3 sao trở lên</span>
                  <span>2 sao trở lên</span>
                  <span>1 sao trở lên</span>
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {products &&
                  products.length > 0 &&
                  products.map((item) => (
                    <ProductCard
                      key={item._id}
                      item={item}
                      onClick={() => navigate(`/product-detail/${item._id}`)}
                    ></ProductCard>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Pagination
            current={currentPage}
            total={total_products}
            pageSize={limit}
            onChange={handleChangePage}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Product;
