import { setCurrentPage } from "@/store/features/product/productSlice";
import {
  getFilterProducts,
  getProducts,
} from "@/store/features/product/productThunk";
import Pagination from "rc-pagination";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useController } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const PAGE_SIZE = 10;

const ProductSelect = ({ control, name, errors = {} }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  const hasError = errors?.[name];

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const { loading, products, current_page, total_products } = useSelector(
    (state) => state.product
  );

  // Debounce search input (500ms)
  useEffect(() => {
    field.value?.name
      ? setSelectedProduct(field.value.name)
      : setSelectedProduct(field.value);
    const handler = setTimeout(() => {
      setDebouncedSearch(field.value?.name ? field.value.name : field.value);
    }, 500);

    return () => clearTimeout(handler);
  }, [field.value]);

  console.log(">>> selectedProduct : ", selectedProduct);
  console.log(">>> debounceSearch : ", debouncedSearch);

  // Fetch products when searchTerm or page changes
  useEffect(() => {
    dispatch(getProducts({ page: current_page, name: debouncedSearch }));
  }, [debouncedSearch, current_page]);

  // Click ngoài dropdown thì đóng lại
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle select product
  const handleSelect = (product) => {
    field.onChange({ _id: product._id, name: product.name });
    setIsOpen(false);
  };

  // Lấy vị trí của input để đặt dropdown cùng cấp
  const getDropdownPosition = () => {
    if (!inputRef.current) return { top: 0, left: 0, width: 0 };
    const rect = inputRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    };
  };

  return (
    <div className="relative">
      {/* Ô input tìm kiếm */}
      <input
        ref={inputRef}
        type="text"
        name={name}
        className={`w-full p-2 border rounded ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="Tìm kiếm sản phẩm..."
        value={selectedProduct}
        autoComplete="off"
        onChange={(e) => {
          field.onChange(e.target.value); // Cập nhật giá trị vào react-hook-form
          setIsOpen(true);
        }}
        onClick={() => setIsOpen(true)}
      />

      {/* Danh sách sản phẩm - Hiển thị cùng cấp với input */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute bg-white border rounded shadow-lg"
            style={{
              top: getDropdownPosition().top,
              left: getDropdownPosition().left,
              width: getDropdownPosition().width,
            }}
          >
            {loading ? (
              <p className="p-2 text-gray-500">Đang tải...</p>
            ) : products.length > 0 ? (
              <>
                {/* Danh sách sản phẩm */}
                <div>
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelect(product)}
                    >
                      {product.name}
                    </div>
                  ))}
                </div>

                {/* Phân trang */}
                <div className="flex justify-center p-2 border-t">
                  <Pagination
                    current={current_page}
                    total={total_products}
                    pageSize={PAGE_SIZE}
                    onChange={(page) => dispatch(setCurrentPage(page))}
                    showSizeChanger={false}
                  />
                </div>
              </>
            ) : (
              <p className="p-2 text-gray-500">Không tìm thấy sản phẩm</p>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

export default ProductSelect;
