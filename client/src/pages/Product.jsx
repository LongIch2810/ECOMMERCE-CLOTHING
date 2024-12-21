import ProductCard from "@/components/card/ProductCard";
import IconTrousers from "@/components/icons/IconTrousers";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import { getProducts } from "@/store/features/product/productThunk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "rc-pagination";

const Product = () => {
  const { slug } = useParams();
  if (slug !== "men" && slug !== "women") return <div>Error 404 page</div>;
  const dispatch = useDispatch();
  const { products, total_pages, total_products, current_page } = useSelector(
    (state) => state.product
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(
      getProducts({ slug: slug === "men" ? "nam" : "nu", page: currentPage })
    );
  }, [slug, currentPage]);
  return (
    <Layout>
      <section>
        <div className="flex items-center justify-center my-8">
          <Title
            className="text-4xl font-bold"
            text={`Thời trang ${slug === "men" ? "Nam" : "Nữ"}`}
          ></Title>
        </div>
        <div className="flex gap-10 mb-10">
          {/* <div className="flex flex-col p-2 gap-y-5">
            <div className="flex flex-col gap-y-5">
              <span>Áo</span>
              <div className="flex flex-col gap-y-5">
                <span>Áo sơ mi</span>
                <span>Áo sweater</span>
                <span>Áo khoác</span>
                <span>Áo phông</span>
                <span>Áo polo</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <span>Quần</span>
              <div className="flex flex-col gap-y-5">
                <span>Quần jean</span>
                <span>Quần kaki</span>
                <span>Quần gió</span>
                <span>Quần short</span>
              </div>
            </div>
          </div> */}
          <div className="grid flex-1 grid-cols-5 gap-10">
            {products &&
              products.length > 0 &&
              products.map((item) => (
                <ProductCard key={item._id} item={item}></ProductCard>
              ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Pagination
            current={current_page}
            total={total_products}
            pageSize={10}
            onChange={handleChangePage}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Product;
