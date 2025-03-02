import { formatCurrency } from "@/utils/format";
import React, { useEffect } from "react";

const InputRange = ({ value, setValue = () => {}, min_price, max_price }) => {
  useEffect(() => {
    setValue(max_price);
  }, [max_price]);

  const handleInputRange = (e) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="flex items-center gap-x-1">
      <span>{formatCurrency(min_price)}</span>
      <input
        type="range"
        min={min_price}
        max={max_price}
        value={value}
        step={1000}
        onInput={handleInputRange}
      />
      <span>{formatCurrency(max_price)}</span>
      {value && Number(value) < max_price ? (
        <span className="absolute text-xs text-gray-400 left-1/4 top-full">
          {formatCurrency(value)}
        </span>
      ) : null}
    </div>
  );
};

export default InputRange;
