import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Title from "@/components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { getFilterProducts } from "@/store/features/product/productThunk";
import Tr from "../components/Tr";
import IconSearch from "@/components/icons/IconSearch";
import Td from "../components/Td";
import { formatCurrency } from "@/utils/format";
import Button from "@/components/button/Button";
import { setCurrentPage } from "@/store/features/product/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, total_products, current_page } = useSelector(
    (state) => state.product
  );

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    dispatch(setCurrentPage(1));
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(getFilterProducts({ page: current_page, limit: 5, search }));
  }, [current_page, search]);

  console.log(search);
  return (
    <div>
      <div className="flex items-center justify-center my-8">
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="Nhập tên sản phẩm ..."
            onChange={handleSearch}
            className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md shadow-xs outline-none text-primary"
          />
          <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
            <IconSearch></IconSearch>
          </span>
        </div>
      </div>
      <Title text="Danh sách sản phẩm" className="text-2xl"></Title>
      {products?.length > 0 ? (
        <Table
          ths={Object.keys(products[0])}
          total_items={total_products}
          currentPage={current_page}
          setCurrentPage={setCurrentPage}
        >
          {products.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{item.name}</Td>
              <Td>{formatCurrency(item.price)}</Td>
              <Td className="truncate">{item.description}</Td>
              <Td>{item.averageReview}</Td>
              <Td className="flex items-center justify-center">
                <img src={item.images[0]} alt="" className="w-20" />
              </Td>
              <Td>{item.gender.name}</Td>
              <Td>{item.type_product.name}</Td>
              <Td>{item.brand.name}</Td>
              <Td>
                <div className="flex items-center justify-center gap-x-3">
                  <Button className="p-2 bg-foreign text-main">Edit</Button>
                  <Button className="p-2 bg-secondary text-main">Delete</Button>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
          <p className="mb-4 text-lg text-gray-700">
            Không có loại sản phẩm nào.
          </p>
        </div>
      )}
    </div>
  );
};

const AddProduct = () => {};

export { ProductList, AddProduct };
