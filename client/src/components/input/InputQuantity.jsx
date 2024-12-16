import React from "react";

const InputQuantity = () => {
  return (
    <div>
      <label htmlFor="Quantity" className="sr-only">
        Quantity
      </label>

      <div className="flex items-center border border-gray-200 rounded">
        <button
          type="button"
          className="leading-10 text-gray-600 transition size-10 hover:opacity-75"
        >
          -
        </button>

        <input
          type="number"
          id="Quantity"
          defaultValue={1}
          className="h-5 w-5 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          className="leading-10 text-gray-600 transition size-10 hover:opacity-75"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default InputQuantity;
