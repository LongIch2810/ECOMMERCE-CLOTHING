import React from "react";
import { Phone, MapPin } from "lucide-react";
const AddressCard = ({ item }) => {
  return (
    <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{item.fullname}</h2>
          {item.isDefault && (
            <span className="px-2 py-1 text-sm text-white rounded bg-delivered">
              Mặc định
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Phone size={16} />
          <span>{item.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin size={16} />
          <span>{item.addressDetail}</span>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
