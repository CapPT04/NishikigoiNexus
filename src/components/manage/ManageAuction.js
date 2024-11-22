import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate"; // Import thư viện React Paginate để tạo phân trang
import "./ManageAuction.scss";
import logo from "../../assets/images/logo_png.png";
import searchIcon from "../../assets/images/search.svg";
import VerticallyNavbar from "../common/Navbar/VerticallyNavbar";
import Navbar from "../common/Navbar/Navbar";
import Cookies from "js-cookie";

import { handleManageAuctionApi } from "../../axios/UserService";
import { useNavigate } from "react-router-dom";

const ManageAuction = () => {
  // State lưu danh sách các cuộc đấu giá
  const [auctions, setAuctions] = useState([]);

  // State lưu trang hiện tại (bắt đầu từ trang 0)
  const [currentPage, setCurrentPage] = useState(0);

  // Số lượng items hiển thị trên mỗi trang
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();

  // Lấy dữ liệu danh sách đấu giá từ API khi component được render
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await handleManageAuctionApi(); // Gọi API lấy dữ liệu
        if (response && response.status === 200) {
          setAuctions(response.data.$values); // Lưu dữ liệu vào state `auctions`
        }
      } catch (error) {
        console.error("Error fetching auctions:", error); // Xử lý lỗi nếu có
      }
    };

    fetchAuctions();
  }, []);

  // Tính toán các items sẽ hiển thị trong trang hiện tại
  const offset = currentPage * itemsPerPage; // Tính vị trí bắt đầu của items trên trang hiện tại
  const currentItems = auctions.slice(offset, offset + itemsPerPage); // Cắt dữ liệu để chỉ lấy các items trong trang hiện tại

  // Tính tổng số trang dựa trên tổng số items và số items mỗi trang
  const pageCount = Math.ceil(auctions.length / itemsPerPage);

  // Hàm xử lý khi người dùng chuyển trang
  const handlePageClick = (event) => {
    setCurrentPage(event.selected); // Cập nhật trang hiện tại dựa trên sự kiện (React Paginate cung cấp)
  };

  return (
    <div className="manage-auction-container">
      <div className="header">
        <Navbar></Navbar>
      </div>

      <div className="body-content">
        <VerticallyNavbar />
        <div className="body-content-right">
          <div className="search-and-create">
            <div
              className="create-btn"
              onClick={() => navigate("/Manager/CreateAuction")}
            >
              New Auction
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>

          {/* Hiển thị bảng thông tin các cuộc đấu giá */}
          <table className="table-manage-auction">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Start Date</th>
                <th>Number of fish</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? ( // Nếu có items trong trang hiện tại
                currentItems.map((auction, index) => (
                  <tr key={auction?.auctionId}>
                    <td>{offset + index + 1}</td> {/* Số thứ tự của item */}
                    <td>{auction?.auctionId}</td> {/* ID của đấu giá */}
                    <td>
                      {auction?.startDate
                        ? new Date(auction.startDate).toLocaleString() // Chuyển đổi ngày bắt đầu
                        : ""}
                    </td>
                    <td>{auction.fishEntryCount}</td> {/* Số lượng cá */}
                    <td>
                      {/* Hiển thị trạng thái đấu giá */}
                      {auction?.status === 1 && "Preparing"}
                      {auction?.status === 2 && "Waiting"}
                      {auction?.status === 3 && "Bidding"}
                      {auction?.status === 4 && "Ended"}
                    </td>
                    <td>
                      {/* Nút chuyển tới trang chi tiết của đấu giá */}
                      <i
                        className="fa-solid fa-arrow-right"
                        onClick={() =>
                          navigate("/Manager/AuctionDetail", {
                            state: auction,
                          })
                        }
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No auctions available</td> {/* Thông báo nếu không có dữ liệu */}
                </tr>
              )}
            </tbody>
          </table>

          {/* Phân trang với React Paginate */}
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

export default ManageAuction;
