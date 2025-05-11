import React from "react";
import Modal from "./Modal";
import ProductInfo from "../productInfo/ProductInfo";

const ModalProductDetail = ({ setIsOpen = () => {}, id }) => {
  return (
    <Modal setIsOpen={setIsOpen}>
      <ProductInfo id={id}></ProductInfo>
    </Modal>
  );
};

export default ModalProductDetail;
