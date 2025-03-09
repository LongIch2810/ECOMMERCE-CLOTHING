import instanceAxios from "../../../configs/axios";

const addImportReceiptAPI = async (data) => {
  const response = await instanceAxios.post(
    "/import-receipt/add-import-receipt",
    data
  );
  return response.data;
};

const getFilterImportReceiptsAPI = async (data) => {
  const response = await instanceAxios.post("/import-receipt/filter", data);
  return response.data;
};

const fetchImportReceiptDetailAPI = async (importReceiptId) => {
  const response = await instanceAxios.get(
    `/import-receipt/get-importReceipt-id/${importReceiptId}`
  );
  return response.data;
};

export {
  addImportReceiptAPI,
  getFilterImportReceiptsAPI,
  fetchImportReceiptDetailAPI,
};
