import React from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import Table from "../components/Table";
import Title from "@/components/title/Title";

const ReceiptList = () => {
  return (
    <>
      <Title text="Danh sách phiếu nhập" className="text-2xl"></Title>
      <Table></Table>
    </>
  );
};

const AddReceipt = () => {};

export { ReceiptList, AddReceipt };
