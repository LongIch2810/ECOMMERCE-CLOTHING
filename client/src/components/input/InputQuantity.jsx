import { updateProductToCart } from "@/store/features/cart/cartThunk";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const InputQuantity = ({
  value,
  setValue,
  maxValue = 10,
  isHandleUpdate = false,
  idItem = "",
}) => {
  const dispatch = useDispatch();
  const handleDecrement = () => {
    if (Number(value) === 1) return;
    if (isHandleUpdate) {
      dispatch(
        updateProductToCart({ id: idItem, quantity: Number(value) - 1 })
      );
    }
    setValue(Number(value) - 1 + "");
  };
  const handleIncrement = () => {
    if (Number(value) === maxValue) return;
    if (isHandleUpdate) {
      dispatch(
        updateProductToCart({ id: idItem, quantity: Number(value) + 1 })
      );
    }
    setValue(Number(value) + 1 + "");
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (newValue.match(/^[1-9]*$/g)) {
      setValue(newValue);
    }
  };

  const handleBlur = (e) => {
    if (e.target.value === "" || e.target.value === "0") {
      if (isHandleUpdate) {
        dispatch(updateProductToCart({ id: idItem, quantity: 1 }));
      }
      setValue("1");
    } else {
      if (isHandleUpdate) {
        dispatch(
          updateProductToCart({ id: idItem, quantity: Number(e.target.value) })
        );
      }
      setValue(e.target.value);
    }
  };
  return (
    <div>
      <label htmlFor="Quantity" className="sr-only">
        Quantity
      </label>

      <div className="flex items-center border border-gray-200 rounded">
        <button
          type="button"
          className={`leading-10 text-gray-600 transition size-10 hover:opacity-75 ${
            value === 1 ? "cursor-not-allowed" : ""
          }`}
          disabled={value === 1}
          onClick={handleDecrement}
        >
          -
        </button>

        <input
          type="text"
          id="Quantity"
          value={value}
          min={1}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="h-5 w-5 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          className={`leading-10 text-gray-600 transition size-10 hover:opacity-75 ${
            value === maxValue ? "cursor-not-allowed" : ""
          }`}
          disabled={value === maxValue}
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default InputQuantity;
