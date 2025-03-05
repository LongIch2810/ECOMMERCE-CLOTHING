import ProductCard from "@/components/card/ProductCard";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import {
  getFilterProducts,
  getMaxPrice,
  getMinPrice,
} from "@/store/features/product/productThunk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "rc-pagination";
import IconFilter from "@/components/icons/IconFilter";
import IconSearch from "@/components/icons/IconSearch";
import Checkbox from "@/components/input/Checkbox";
import { getTypeProducts } from "@/store/features/typeProduct/typeProductThunk";
import { getGenders } from "@/store/features/gender/genderThunk";
import { getBrands } from "@/store/features/brand/brandThunk";
import Button from "@/components/button/Button";
import IconRefresh from "@/components/icons/IconRefresh";
import { getColors } from "@/store/features/color/colorThunk";
import { toast } from "react-toastify";

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, total_products, current_page } = useSelector(
    (state) => state.product
  );

  const { typeProducts } = useSelector((state) => state.typeProduct);
  const { genders } = useSelector((state) => state.gender);
  const { brands } = useSelector((state) => state.brand);
  const { colors } = useSelector((state) => state.color);

  const [isOpen, setIsOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(current_page);
  const [limit, setLimit] = useState(8);
  const [gendersFilter, setGendersFilter] = useState([]);
  const [typeProductsFilter, setTypeProductsFilter] = useState([]);
  const [brandsFilter, setBrandsFilter] = useState([]);
  const [colorsFilter, setColorsFilter] = useState([]);
  const [sort, setSort] = useState(1);
  const [search, setSearch] = useState("");
  const [min_price, setMinPrice] = useState(null);
  const [max_price, setMaxPrice] = useState(null);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getTypeProducts());
    dispatch(getGenders());
    dispatch(getColors());
    dispatch(getMaxPrice());
    dispatch(getMinPrice());
  }, []);

  useEffect(() => {
    dispatch(
      getFilterProducts({
        page: currentPage,
        limit,
        typeProducts: typeProductsFilter,
        genders: gendersFilter,
        brands: brandsFilter,
        sort,
        colors: colorsFilter,
        search,
      })
    );
  }, [
    currentPage,
    limit,
    typeProductsFilter,
    gendersFilter,
    brandsFilter,
    sort,
    colorsFilter,
    search,
  ]);

  console.log(">>> typeProducts : ", typeProductsFilter);
  console.log(">>> genders : ", gendersFilter);
  console.log(">>> brands : ", brandsFilter);
  console.log(">>> colors : ", colorsFilter);
  console.log(">>> sort : ", sort);
  console.log(">>> limit : ", limit);

  const handleRefresh = () => {
    setTypeProductsFilter([]);
    setGendersFilter([]);
    setBrandsFilter([]);
    setMinPrice(null);
    setMaxPrice(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApplyPrice = () => {
    if (!min_price) {
      toast.error("Vui lòng nhập giá tối thiểu!");
      return;
    }

    const minPrice = Number(min_price);
    const maxPrice = max_price ? Number(max_price) : Infinity; // Nếu không nhập max_price thì lấy Infinity

    if (minPrice < 0) {
      toast.error("Giá tối thiểu không thể là số âm!");
      return;
    }

    if (maxPrice < 0) {
      toast.error("Giá tối đa không thể là số âm!");
      return;
    }

    if (minPrice > maxPrice) {
      toast.error("Giá tối thiểu không thể lớn hơn giá tối đa!");
      return;
    }
    console.log(">>> min_price:", minPrice);
    console.log(">>> max_price:", maxPrice);

    dispatch(
      getFilterProducts({
        min_price: minPrice,
        max_price: maxPrice,
      })
    );
  };

  return (
    <Layout>
      <section>
        <div className="flex flex-col px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-center my-8">
            <Title className="text-4xl font-bold" text="Sản phẩm"></Title>
          </div>
          <div className="flex items-center justify-center my-8">
            <div className="relative w-full md:w-3/4">
              <input
                type="text"
                placeholder="Nhập tên sản phẩm ..."
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearch(e.target.value);
                }}
                className="w-full p-3 pr-10 border-2 border-gray-300 rounded-md shadow-xs outline-none text-primary"
              />
              <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
                <IconSearch></IconSearch>
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col w-full p-3 mb-10 md:flex-row md:justify-end gap-y-1 md:gap-x-3 text-main">
              <div
                className="hidden md:flex items-center p-1.5 md:p-2 md:gap-x-1 border rounded-lg cursor-pointer bg-primary text-main"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <span className="text-sm md:text-base">
                  {isOpen ? "Ẩn" : "Hiển thị"} bộ lọc
                </span>
                <IconFilter></IconFilter>
              </div>
              <div className="flex flex-col md:flex-row gap-y-1 md:gap-x-3">
                <select
                  onChange={(e) => {
                    setCurrentPage(1);
                    setLimit(Number(e.target.value));
                  }}
                  className="p-1.5 md:p-2 border rounded-lg cursor-pointer  bg-primary text-main text-sm md:text-base"
                >
                  <option value={8}>8 sản phẩm</option>
                  <option value={12}>12 sản phẩm</option>
                  <option value={16}>16 sản phẩm</option>
                </select>
                <select
                  onChange={(e) => setSort(Number(e.target.value))}
                  className="p-1.5 md:p-2 border rounded-lg cursor-pointer  bg-primary text-main text-sm md:text-base"
                >
                  <option value={"price_asc"}>Thấp đến cao</option>
                  <option value={"price_desc"}>Cao đến thấp</option>
                  <option value={"newest"}>Mới nhất</option>
                </select>
              </div>
            </div>

            {/*--------------------------------------------------------- Bộ lọc sản phẩm -------------------------------------------------------- */}
            {isOpen && (
              <div className="flex justify-center">
                <div className="flex flex-col w-full p-5 mb-10 border-2 border-gray-300 rounded-lg gap-y-5">
                  <div className="flex flex-col gap-y-3">
                    <span className="text-lg font-medium">Giới tính</span>
                    <div>
                      {genders?.length > 0 &&
                        genders.map((item) => (
                          <Checkbox
                            arr={gendersFilter}
                            setArr={setGendersFilter}
                            key={item._id}
                            value={item._id}
                            content={item.name}
                            checked={gendersFilter.includes(item._id)}
                          />
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <span className="text-lg font-medium">Thương hiệu</span>
                    <div className="grid grid-cols-4 gap-3">
                      {brands?.length > 0 &&
                        brands.map((item) => (
                          <Checkbox
                            arr={brandsFilter}
                            key={item._id}
                            value={item._id}
                            content={item.name}
                            setArr={setBrandsFilter}
                            checked={brandsFilter.includes(item._id)}
                          />
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <span className="text-lg font-medium">Loại sản phẩm</span>
                    <div className="grid grid-cols-4 gap-3">
                      {typeProducts?.length > 0 &&
                        typeProducts.map((item) => (
                          <Checkbox
                            arr={typeProductsFilter}
                            key={item._id}
                            value={item._id}
                            content={item.name}
                            setArr={setTypeProductsFilter}
                            checked={typeProductsFilter.includes(item._id)}
                          />
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <span className="text-lg font-medium">Màu sắc</span>
                    <div className="grid grid-cols-4 gap-3">
                      {colors?.length > 0 &&
                        colors.map((item) => (
                          <Checkbox
                            arr={colorsFilter}
                            key={item._id}
                            value={item._id}
                            content={
                              <span
                                className="block w-6 h-6 border-2 border-gray-300 rounded-full shadow-xl"
                                style={{ backgroundColor: item.hexCode }}
                              />
                            }
                            setArr={setColorsFilter}
                            checked={colorsFilter.includes(item._id)}
                          />
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-col mb-10 gap-y-3">
                    <span className="text-lg font-medium">Màu sắc</span>
                    <div className="flex-col inline-block">
                      <div className="inline-flex items-center mb-2 gap-x-5">
                        <input
                          type="number"
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full p-2 border rounded-md shadow-lg outline-none"
                          placeholder="MIN"
                        />
                        <input
                          type="number"
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full p-2 border rounded-md shadow-lg outline-none"
                          placeholder="MAX"
                        />
                      </div>
                      <div>
                        <Button
                          onClick={handleApplyPrice}
                          className="p-2 bg-waiting text-main"
                        >
                          Áp dụng
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      className="flex items-center p-5 bg-purple-500 text-main gap-x-3"
                      onClick={handleRefresh}
                    >
                      <IconRefresh className="size-6" />
                      <span>Làm mới</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div
              className="flex mb-10 md:hidden justify-end items-center p-1.5 md:p-2 border rounded-lg cursor-pointer border-main gap-x-1"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-sm underline md:text-base">
                {isOpen ? "Ẩn" : "Hiển thị"} bộ lọc
              </span>
              <IconFilter />
            </div>

            {products?.length > 0 ? (
              <div className="grid grid-cols-1 gap-10 mb-10 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
                {products.map((item) => (
                  <ProductCard
                    key={item._id}
                    item={item}
                    onClick={() => navigate(`/product-detail/${item._id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
                <p className="mb-4 text-lg text-gray-700">
                  Hiện tại bạn không có sản phẩm nào.
                </p>
              </div>
            )}

            {products?.length > 0 && (
              <div className="flex items-center justify-center">
                <Pagination
                  current={currentPage}
                  total={total_products}
                  pageSize={limit}
                  onChange={handleChangePage}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Product;
