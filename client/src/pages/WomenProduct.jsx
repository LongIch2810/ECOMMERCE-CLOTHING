import ProductCard from "@/components/card/ProductCard";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import React from "react";

const WomenProduct = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center my-8">
        <Title className="text-4xl font-bold" text="Thời trang nữ"></Title>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-2">
          <p>Áo</p>
          <div>
            <p>Áo sơ mi</p>
            <p>Áo sweater</p>
            <p>Áo khoác</p>
            <p>Áo phông</p>
          </div>
        </div>
        <div className="grid grid-cols-5 col-span-10 gap-10">
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
        </div>
      </div>
    </Layout>
  );
};

export default WomenProduct;
