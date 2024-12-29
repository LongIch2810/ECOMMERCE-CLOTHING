import React, { useState } from "react";

const InputQuantity = ({ value, setValue, maxValue = 10 }) => {
  const handleDecrement = () => {
    if (value === 1) return;
    setValue(value - 1);
  };
  const handleIncrement = () => {
    if (value === maxValue) return;
    setValue(value + 1);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (!newValue.match(/^[1-9]*$/g)) {
      setValue(value);
    } else {
      setValue(newValue);
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
          className="leading-10 text-gray-600 transition size-10 hover:opacity-75"
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
          onBlur={() => setValue(1)}
          className="h-5 w-5 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          className="leading-10 text-gray-600 transition size-10 hover:opacity-75"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default InputQuantity;
