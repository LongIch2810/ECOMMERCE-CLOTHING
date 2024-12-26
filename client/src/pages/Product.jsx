import ProductCard from "@/components/card/ProductCard";
import IconTrousers from "@/components/icons/IconTrousers";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import { getProducts } from "@/store/features/product/productThunk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "rc-pagination";
import IconFilter from "@/components/icons/IconFilter";

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
          <div className="flex items-center justify-between p-3 mb-10 rounded-lg bg-primary text-main">
            <div className="flex items-center gap-x-1">
              <span className="text-xl font-medium">Bộ lọc tìm kiếm</span>
              <IconFilter></IconFilter>
            </div>
            <div className="flex gap-x-5">
              <select className="p-2 border rounded-lg border-main bg-primary text-main">
                <option value="asc">9 sản phẩm</option>
                <option value="desc">12 sản phẩm</option>
                <option value="desc">15 sản phẩm</option>
              </select>
              <select className="p-2 border rounded-lg border-main bg-primary text-main">
                <option value="default">Giá</option>
                <option value="asc">Giá từ thấp đến cao</option>
                <option value="desc">Giá từ cao đến thấp</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between mb-10 gap-x-32">
            <div className="flex flex-col gap-y-10">
              <div className="flex flex-col gap-y-5">
                <span>Giới tính</span>
                <div className="flex flex-col gap-y-3">
                  <span>Nam</span>
                  <span>Nữ</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-5">
                <span>Áo</span>
                <div className="flex flex-col gap-y-3">
                  <span>Áo sơ mi</span>
                  <span>Áo phông</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-10 mb-10 md:grid-cols-2 lg:grid-cols-3">
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
              <div className="flex items-center justify-center">
                <Pagination
                  current={currentPage}
                  total={total_products}
                  pageSize={limit}
                  onChange={handleChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Product;
