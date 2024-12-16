import React from "react";

const Radio = ({ text1 = "", text2 = "" }) => {
  return (
    <fieldset className="space-y-4">
      <legend className="sr-only">Delivery</legend>

      <div>
        <label
          htmlFor="DeliveryStandard"
          className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary"
        >
          <div>
            <p className="text-gray-700">{text1}</p>

            <p className="mt-1 text-gray-900">{text2}</p>
          </div>

          <input
            type="radio"
            name="DeliveryOption"
            value="DeliveryStandard"
            id="DeliveryStandard"
            className="border-gray-300 size-5"
            checked
          />
        </label>
      </div>
    </fieldset>
  );
};

export default Radio;
