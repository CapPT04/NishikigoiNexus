import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import { handleAllFishEntry } from "../../../axios/UserService";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate"; // Thư viện phân trang

const ManageFishEntry = () => {
  const navigate = useNavigate();
  const [fishEntries, setFishEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // State lưu trang hiện tại
  const itemsPerPage = 10; // Số lượng items mỗi trang
  const statusName = ["Unknown", "Preparing", "Waiting", "Bidding", "Ended"];

  const getFishEntries = async () => {
    const res = await handleAllFishEntry();
    console.log(res.data.$values);
    setFishEntries(res.data.$values);
  };

  useEffect(() => {
    getFishEntries();
  }, []);

  // Tính toán các items sẽ hiển thị trong trang hiện tại
  const offset = currentPage * itemsPerPage; // Tính vị trí bắt đầu của items trên trang hiện tại
  const currentItems = fishEntries.slice(offset, offset + itemsPerPage); // Cắt dữ liệu để chỉ lấy các items trong trang hiện tại

  // Tính tổng số trang dựa trên tổng số items và số items mỗi trang
  const pageCount = Math.ceil(fishEntries.length / itemsPerPage); // Tính tổng số trang

  // Hàm xử lý khi người dùng chuyển trang
  const handlePageClick = (event) => {
    setCurrentPage(event.selected); // Cập nhật trang hiện tại khi người dùng chuyển trang
  };

  return (
    <div className="manage-koi-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar />
        <div className="body-content-right">
          <table className="table-manage-koi">
            <thead>
              <tr>
                <th>No</th>
                <th>Fish Entry ID</th>
                <th>Fish ID</th>
                <th>Request ID</th>
                <th>Expected Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((koi, index) => {
                  return (
                    <tr key={index}>
                      <td>{offset + index + 1}</td>
                      <td>{koi.fishEntryId}</td>
                      <td>{koi.fishId}</td>
                      <td>{koi.requestId}</td>
                      <td>{new Date(koi.expectedDate).toLocaleString()}</td>
                      <td>{statusName[koi.status]}</td>
                      <td>
                        <a
                          onClick={() =>
                            navigate("/Manager/FishEntryDetail", {
                              state: koi,
                            })
                          }
                        >
                          <i className="fa-solid fa-arrow-right"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7">No Data</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Phân trang */}
          <ReactPaginate
            previousLabel={"Previous"} // Nhãn cho nút "Trước"
            nextLabel={"Next"} // Nhãn cho nút "Tiếp"
            pageCount={pageCount} // Số lượng trang
            onPageChange={handlePageClick} // Hàm xử lý khi người dùng chuyển trang
            containerClassName={"pagination"} // Lớp CSS cho phân trang
            activeClassName={"active"} // Lớp CSS cho trang hiện tại
          />
        </div>
      </div>
    </div>
  );
};

export default ManageFishEntry;
