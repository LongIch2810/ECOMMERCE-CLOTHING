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
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const { filterProducts, total_products, current_page } = useSelector(
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
  const [sort, setSort] = useState("price_asc");
  const [search, setSearch] = useState("");
  const [min_price, setMinPrice] = useState("");
  const [max_price, setMaxPrice] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [urlParamsLoaded, setUrlParamsLoaded] = useState(false);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getTypeProducts());
    dispatch(getGenders());
    dispatch(getColors());
    dispatch(getMaxPrice());
    dispatch(getMinPrice());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const typeProductsFromUrl = params.get("typeProducts")?.split("-") || [];
    const gendersFromUrl = params.get("genders")?.split("-") || [];
    const brandsFromUrl = params.get("brands")?.split("-") || [];
    const colorsFromUrl = params.get("colors")?.split("-") || [];
    const searchFromUrl = params.get("search") || "";
    const sortFromUrl = params.get("sort") || "price_asc";
    const limitFromUrl = Number(params.get("limit")) || 8;
    const minPriceFromUrl = params.get("min_price") || "";
    const maxPriceFromUrl = params.get("max_price") || "";

    setTypeProductsFilter(typeProductsFromUrl);
    setGendersFilter(gendersFromUrl);
    setBrandsFilter(brandsFromUrl);
    setColorsFilter(colorsFromUrl);
    setSearch(searchFromUrl);
    setSort(sortFromUrl);
    setLimit(limitFromUrl);
    setMinPrice(minPriceFromUrl);
    setMaxPrice(maxPriceFromUrl);

    dispatch(
      getFilterProducts({
        page: currentPage,
        limit: limitFromUrl,
        typeProducts: typeProductsFromUrl,
        genders: gendersFromUrl,
        brands: brandsFromUrl,
        colors: colorsFromUrl,
        sort: sortFromUrl,
        search: searchFromUrl,
        min_price: minPriceFromUrl,
        max_price: maxPriceFromUrl,
      })
    );

    setUrlParamsLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    if (!urlParamsLoaded) return;
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        getFilterProducts({
          page: currentPage,
          limit,
          typeProducts: typeProductsFilter,
          genders: gendersFilter,
          brands: brandsFilter,
          colors: colorsFilter,
          sort,
          search,
          min_price,
          max_price,
        })
      );
    }, 500); // Đợi 500ms trước khi gọi API

    return () => clearTimeout(delayDebounceFn);
  }, [
    urlParamsLoaded,
    currentPage,
    limit,
    typeProductsFilter,
    gendersFilter,
    brandsFilter,
    colorsFilter,
    sort,
    search,
    min_price,
    max_price,
    dispatch,
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
    setMinPrice("");
    setMaxPrice("");
  };

  const handleApplyPrice = () => {
    const minPrice = Number(min_price);
    const maxPrice = max_price ? Number(max_price) : Infinity;

    if (!min_price || minPrice < 0 || maxPrice < 0 || minPrice > maxPrice) {
      toast.error("Vui lòng nhập giá hợp lệ!");
      return;
    }

    dispatch(
      getFilterProducts({
        min_price: minPrice,
        max_price: maxPrice,
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
  };

  console.log(">>> filterProducts : ", filterProducts);
  console.log(">>> total_products : ", total_products);

  const updateFiltersInUrl = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);
    if (limit) params.set("limit", limit);
    if (gendersFilter.length) params.set("genders", gendersFilter.join("-"));
    if (typeProductsFilter.length)
      params.set("typeProducts", typeProductsFilter.join("-"));
    if (brandsFilter.length) params.set("brands", brandsFilter.join("-"));
    if (colorsFilter.length) params.set("colors", colorsFilter.join("-"));
    if (min_price) params.set("min_price", min_price);
    if (max_price) params.set("max_price", max_price);

    const newParams = params.toString();
    if (newParams !== searchParams.toString()) {
      setSearchParams(params);
    }
  };

  useEffect(() => {
    updateFiltersInUrl();
  }, [
    search,
    sort,
    limit,
    gendersFilter,
    typeProductsFilter,
    brandsFilter,
    colorsFilter,
    min_price,
    max_price,
  ]);

  return (
    <Layout>
      <section>
        <div className="flex flex-col px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-center my-3 md:my-8">
            <Title
              className="text-2xl font-bold md:text-3xl lg:text-4xl"
              text="Sản phẩm"
            ></Title>
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
            <div className="flex flex-col w-full p-3 mb-10 md:flex-row md:justify-center gap-y-1 md:gap-x-3 text-main">
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
                  value={limit}
                  className="p-1.5 md:p-2 border rounded-lg cursor-pointer  bg-primary text-main text-sm md:text-base"
                >
                  <option value={8}>8 sản phẩm</option>
                  <option value={12}>12 sản phẩm</option>
                  <option value={16}>16 sản phẩm</option>
                </select>
                <select
                  onChange={(e) => setSort(e.target.value)}
                  value={sort}
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
              <div>
                <div className="flex flex-col w-full p-10 mb-10 border-2 border-gray-300 rounded-lg gap-y-5">
                  <div className="flex flex-col gap-y-3">
                    <span className="text-lg font-semibold">Giới tính</span>
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
                    <span className="text-lg font-semibold">Thương hiệu</span>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
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
                    <span className="text-lg font-semibold">Loại sản phẩm</span>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
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
                    <span className="text-lg font-semibold">Màu sắc</span>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
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
                    <span className="text-lg font-semibold">Giá</span>
                    <div className="flex-col inline-block">
                      <div className="inline-flex items-center mb-2 gap-x-5">
                        <input
                          type="number"
                          value={min_price}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full p-2 border rounded-md shadow-lg outline-none"
                          placeholder="MIN"
                        />
                        <input
                          type="number"
                          value={max_price}
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
                      className="flex items-center justify-center w-full p-5 bg-primary md:w-auto text-main gap-x-3"
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
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="text-sm underline md:text-base">
                {isOpen ? "Ẩn" : "Hiển thị"} bộ lọc
              </span>
              <IconFilter />
            </div>

            {filterProducts?.length > 0 ? (
              <div className="grid grid-cols-1 gap-10 mb-10 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
                {filterProducts.map((item) => (
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

            {filterProducts?.length > 0 && (
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
