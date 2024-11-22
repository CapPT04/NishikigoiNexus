import React, { useEffect, useState } from "react";
import "./ManageUnpaid.scss";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import Navbar from "../../common/Navbar/Navbar";
import { useNavigate } from "react-router";
import { handleManageUnpaid } from "../../../axios/UserService";
import ReactPaginate from "react-paginate"; // Thêm thư viện phân trang


const ManageUnpaid = () => {
  const navigate = useNavigate();
  const [listUnpaid, setListUnpaid] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // State lưu trang hiện tại
  const [itemsPerPage] = useState(10); // Số lượng item mỗi trang

  useEffect(() => {
    getAllInfo();
  }, []);

  // Tính toán các items sẽ hiển thị trong trang hiện tại
  const offset = currentPage * itemsPerPage;
  const currentItems = listUnpaid.slice(offset, offset + itemsPerPage);

  // Tính tổng số trang dựa trên tổng số items và số items mỗi trang
  const pageCount = Math.ceil(listUnpaid.length / itemsPerPage);

  // Hàm xử lý khi người dùng chuyển trang
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };


  const getAllInfo = async () => {
    const res = await handleManageUnpaid();
    console.log(res.data);
    setListUnpaid(res.data.$values);
  };
  useEffect(() => {
    getAllInfo();
  }, []);
  return (
    <div className="manage-unpaid-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
          <table className="table-manage-unpaid">
            <thead>
              <tr>
                <th>No</th>
                <th>Auction ID</th>
                <th>Fish Entry ID</th>
                <th>End Date</th>
                <th>Winner ID</th>
                <th>Winner Profile</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((unpaid, index) => (
                  <tr key={index}>
                    <td>{offset + index + 1}</td>
                    <td>{unpaid.auctionId}</td>
                    <td>{unpaid.fishEntryId}</td>
                    <td>
                      {unpaid.endDate
                        ? new Date(unpaid.endDate).toLocaleString()
                        : ""}
                    </td>
                    <td>{unpaid.winnerId}</td>
                    <td>
                      <a
                        onClick={() =>
                          navigate(
                            `/Manager/UserDetail?userId=${unpaid.winnerId}`
                          )
                        }
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="spanCol" colSpan="6">
                    No Unpaid Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Thêm phần phân trang */}
          <ReactPaginate
            previousLabel={"Previous"} // Nút "Trang trước"
            nextLabel={"Next"} // Nút "Trang sau"
            breakLabel={"..."} // Ký tự ngắt trang
            pageCount={pageCount} // Tổng số trang
            marginPagesDisplayed={2} // Số trang hiển thị bên ngoài
            pageRangeDisplayed={3} // Số trang hiển thị ở giữa
            onPageChange={handlePageClick} // Hàm xử lý khi người dùng đổi trang
            containerClassName={"pagination"} // Class CSS cho container của phân trang
            activeClassName={"active"} // Class CSS cho trang đang được chọn
          />
        </div>
      </div>
    </div>
  );
};

export default ManageUnpaid;
