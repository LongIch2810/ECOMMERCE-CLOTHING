import React, { useEffect, useRef, useState } from "react";
import Layout from "../layout/Layout";
import LayoutInfo from "../layout/LayoutInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddressesByUserId,
  setAddressDefault,
} from "@/store/features/address/addressThunk";
import AddressCard from "@/components/card/AddressCard";
import Button from "@/components/button/Button";
import IconAdd from "@/components/icons/IconAdd";
import ModalAddress from "@/components/modal/ModalAddress";

const Address = () => {
  const dispatch = useDispatch();
  const { addressesByUserId } = useSelector((state) => state.address);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getAddressesByUserId());
  }, []);

  return (
    <Layout>
      <LayoutInfo content="Địa chỉ của bạn">
        <div className="flex items-center justify-end mb-3 gap-x-3">
          <Button
            onClick={() => setIsOpen(true)}
            className="flex items-center p-2 text-sm bg-primary text-main gap-x-3"
          >
            <span>
              <IconAdd></IconAdd>
            </span>
            <span>Thêm địa chỉ</span>
          </Button>
        </div>
        <div className="flex flex-col w-full overflow-y-scroll max-h-[500px] gap-y-3">
          {addressesByUserId?.length > 0 ? (
            addressesByUserId.map((item) => (
              <div key={item._id} className="flex items-center gap-x-5">
                <AddressCard item={item}></AddressCard>
                <Button
                  onClick={() => dispatch(setAddressDefault(item._id))}
                  className={`p-2 text-sm text-main  gap-x-3 ${
                    item.isDefault
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-delivered"
                  }`}
                >
                  Đặt làm mặc định
                </Button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
              <p className="mb-4 text-lg text-gray-700">
                Hiện tại bạn không có địa chỉ nào.
              </p>
            </div>
          )}
        </div>
        {/*--------------------------------------------------------Modal để chọn mã giảm giá---------------------------------------------*/}
        {isOpen && <ModalAddress setIsOpen={setIsOpen}></ModalAddress>}
      </LayoutInfo>
    </Layout>
  );
};

export default Address;
