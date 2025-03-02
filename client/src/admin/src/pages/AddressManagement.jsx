import React, { useEffect, useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import Table from "../components/Table";
import Title from "@/components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "@/store/features/address/addressThunk";
import Tr from "../components/Tr";
import Td from "../components/Td";
import Button from "@/components/button/Button";
import { setCurrentPage } from "@/store/features/address/addressSlice";
import IconSearch from "@/components/icons/IconSearch";

const AddressList = () => {
  const dispatch = useDispatch();
  const { addresses, current_page, total_addresses } = useSelector(
    (state) => state.address
  );
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getAddresses({ page: current_page, limit: 5, fullname: search }));
  }, [search, current_page]);
  const handleSearch = (e) => {
    dispatch(setCurrentPage(1));
    setSearch(e.target.value);
  };
  return (
    <div>
      <div className="flex items-center justify-center my-8">
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="Nhập họ và tên ..."
            onChange={handleSearch}
            className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md shadow-xs outline-none text-primary"
          />
          <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
            <IconSearch></IconSearch>
          </span>
        </div>
      </div>
      <Title text="Danh sách địa chỉ" className="text-2xl"></Title>
      {addresses?.length > 0 ? (
        <Table
          ths={Object.keys(addresses[0])}
          total_items={total_addresses}
          currentPage={current_page}
          setCurrentPage={setCurrentPage}
        >
          {addresses.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{item.fullname}</Td>
              <Td>{item.addressDetail}</Td>
              <Td>{item.phone}</Td>
              <Td>
                <div className="flex items-center justify-center gap-x-3">
                  <Button className="p-2 bg-foreign text-main">Edit</Button>
                  <Button className="p-2 bg-secondary text-main">Delete</Button>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
          <p className="mb-4 text-lg text-gray-700">Không có địa chỉ nào.</p>
        </div>
      )}
    </div>
  );
};

const AddAddress = () => {};
export { AddressList, AddAddress };
