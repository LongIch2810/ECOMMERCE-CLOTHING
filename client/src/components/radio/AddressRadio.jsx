import React from "react";
import { MapPin, Phone } from "lucide-react";
const AddressRadio = ({ address, checked = false, onChange = () => {} }) => {
  return (
    <label
      htmlFor={address._id}
      className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
        checked ? "border-delivered bg-blue-50" : "border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="address"
        checked={checked}
        onChange={onChange}
        id={address._id}
        className="hidden"
      />
      <div className="flex items-center justify-center w-5 h-5 border-2 border-gray-500 rounded-full">
        {checked && <div className="w-3 h-3 rounded-full bg-delivered"></div>}
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{address.fullname}</h2>
        <div className="flex items-center gap-2 text-gray-700">
          <Phone size={16} />
          <span>{address.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin size={16} />
          <span>{address.addressDetail}</span>
        </div>
      </div>
    </label>
  );
};

export default AddressRadio;
