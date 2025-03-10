import React from "react";
import { Phone, MapPin } from "lucide-react";
import { setAddressDefault } from "@/store/features/address/addressThunk";
import Button from "../button/Button";
import { useDispatch } from "react-redux";

const AddressCard = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-md md:max-w-lg">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold truncate max-w-[75%]">
            {item.fullname}
          </h2>
          {item.isDefault && (
            <span className="px-2 py-1 text-sm text-white rounded bg-delivered">
              Mặc định
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-gray-700">
          <Phone size={16} />
          <span className="truncate max-w-[70%]">{item.phone}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-gray-700">
          <MapPin size={16} />
          <span className="truncate max-w-[80%]">{item.addressDetail}</span>
        </div>
        <Button
          onClick={() => dispatch(setAddressDefault(item._id))}
          className={`inline-block md:hidden p-2 text-sm text-main  gap-x-3 ${
            item.isDefault ? "bg-gray-300 cursor-not-allowed" : "bg-delivered"
          }`}
        >
          Đặt làm mặc định
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
