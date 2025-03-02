import Pagination from "rc-pagination";
import Th from "./Th";
import Tr from "./Tr";
import { useDispatch } from "react-redux";

const Table = ({
  ths,
  children,
  total_items,
  currentPage,
  setCurrentPage = () => {},
}) => {
  const dispatch = useDispatch();
  const handleChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };
  return (
    <div className="border border-gray-200 rounded-lg">
      {/* Đặt max-w để bảng cân đối với màn hình */}
      <div className="max-w-screen-lg mx-auto overflow-x-auto">
        <table className="w-full text-sm bg-white divide-y-2 divide-gray-200 min-w-max">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              {ths?.length > 0 &&
                ths.map((item, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item}
                  </th>
                ))}
              <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">{children}</tbody>
        </table>
      </div>

      {/* Phần phân trang */}
      <div className="flex items-center justify-center m-5">
        <Pagination
          current={currentPage}
          total={total_items}
          pageSize={5}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default Table;
