import React, { useEffect } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "@/utils/format";
import Loading from "../loading/Loading";
import { fetchImportReceiptDetail } from "@/store/features/importReceipt/importReceiptThunk";

const ModalImportReceiptDetail = ({ importReceiptId, setIsOpen }) => {
  if (!importReceiptId) return null;
  const dispatch = useDispatch();
  const { importReceiptDetail, loading } = useSelector(
    (state) => state.importReceipt
  );
  useEffect(() => {
    dispatch(fetchImportReceiptDetail(importReceiptId));
  }, [importReceiptId]);

  console.log(importReceiptDetail);

  return (
    <>
      {!loading && importReceiptDetail ? (
        <Modal setIsOpen={setIsOpen}>
          <h2 className="mb-3 text-lg font-bold text-center">
            Chi tiết phiếu nhập
          </h2>

          {/* Nhà cung cấp */}
          <p className="text-sm font-semibold">
            Nhà cung cấp: {importReceiptDetail.supplier.name}
          </p>

          {/* Danh sách sản phẩm */}
          <div className="mt-4 space-y-2">
            {importReceiptDetail.products.map((item, index) => (
              <div key={index} className="p-2 border rounded-lg">
                <p className="font-medium">Sản phẩm: {item.product.name}</p>
                <p>Kích thước: {item.size}</p>
                <p>Màu sắc: {item.color.name}</p>
                <p>Số lượng: {item.quantity}</p>
                <p className="text-secondary">
                  Giá nhập: {formatCurrency(item.import_price)}
                </p>
              </div>
            ))}
          </div>

          {/* Tổng tiền */}
          <p className="mt-4 font-semibold text-secondary">
            Tổng tiền: {formatCurrency(importReceiptDetail.total_price)}
          </p>

          {/* Người nhập */}
          <p className="mt-2">Người nhập: {importReceiptDetail?.user?.name}</p>

          {/* Ghi chú */}
          {importReceiptDetail.note && (
            <p className="mt-2 italic text-gray-600">
              Ghi chú: {importReceiptDetail.note}
            </p>
          )}
        </Modal>
      ) : (
        <div className="flex items-center justify-center">
          <Loading></Loading>
        </div>
      )}
    </>
  );
};

export default ModalImportReceiptDetail;
