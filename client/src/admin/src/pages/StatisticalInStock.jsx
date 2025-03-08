import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statisticalInStock } from "@/store/features/statistical/statisticalThunk";
import { setCurrentPage } from "@/store/features/statistical/statisticalSlice";
import Title from "@/components/title/Title";
import Table from "../components/Table";
import Tr from "../components/Tr";
import Td from "../components/Td";

const StatisticalInStock = () => {
  const dispatch = useDispatch();
  const { dataStatisticalInStock, current_page, total_items } = useSelector(
    (state) => state.statistical
  );

  useEffect(() => {
    dispatch(statisticalInStock({ page: current_page }));
  }, [current_page]);

  console.log(dataStatisticalInStock);

  return (
    <div>
      <Title text="Thống kê tồn kho" className="text-2xl"></Title>
      {dataStatisticalInStock?.length > 0 ? (
        <Table
          ths={Object.keys(dataStatisticalInStock[0])}
          total_items={total_items}
          currentPage={current_page}
          setCurrentPage={setCurrentPage}
          limit={50}
        >
          {dataStatisticalInStock.map((item, index) => (
            <Tr key={index}>
              <Td>{item.productName}</Td>
              <Td>{item.size}</Td>
              <Td>{item.color}</Td>
              <Td>{item.quantity}</Td>
            </Tr>
          ))}
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
          <p className="mb-4 text-lg text-gray-700">Không có sản phẩm nào.</p>
        </div>
      )}
    </div>
  );
};

export default StatisticalInStock;
