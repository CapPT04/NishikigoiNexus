import React, { useEffect, useState } from "react";
import "./ManageKoi.scss";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import { handleGetAllFish } from "../../../axios/UserService";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate"; // Import ReactPaginate để thực hiện phân trang

const ManageKoi = () => {
  const [listKois, setListKois] = useState([]);  // State lưu danh sách các Koi
  const [currentPage, setCurrentPage] = useState(0); // State lưu trang hiện tại
  const [itemsPerPage] = useState(10); // Số lượng mục hiển thị trên mỗi trang (có thể thay đổi giá trị này)
  const navigate = useNavigate();

  // Hàm lấy danh sách các Koi từ API
  const getListKois = async () => {
    const res = await handleGetAllFish();
    setListKois(res.data.$values);  // Lưu kết quả vào state listKois
  };

  useEffect(() => {
    getListKois();  // Gọi hàm lấy danh sách Koi khi component được render
  }, []);

  // Logic phân trang
  const offset = currentPage * itemsPerPage;  // Tính toán chỉ số bắt đầu của trang hiện tại
  const currentItems = listKois.slice(offset, offset + itemsPerPage); // Lấy danh sách các mục sẽ hiển thị trên trang hiện tại
  const pageCount = Math.ceil(listKois.length / itemsPerPage); // Tính toán tổng số trang

  // Hàm xử lý khi người dùng chọn trang mới
  const handlePageClick = (event) => {
    setCurrentPage(event.selected); // Cập nhật trang hiện tại khi người dùng chọn trang
  };

  return (
    <div className="manage-koi-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
          {/* <div className="search">
            <div className="search-text">Search: </div>
            <div className="search-value">
              <input
                className="search-input"
                placeholder="Search by Email and Phone number"
                type="text"
              />
              <div className="search-icon">
                <img src="../assets/images/search.svg" alt="" />
              </div>
            </div>
          </div> */}
          <table className="table-manage-koi">
            <thead>
              <tr>
                <th>No</th>
                <th>Fish ID</th>
                <th>Fish Name</th>
                <th>Create Date</th>
                <th>Breeder ID</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((koi, index) => {
                  return (
                    <tr key={index}>
                      <td>{offset + index + 1}</td> {/* Hiển thị số thứ tự với offset */}
                      <td>{koi.fishId}</td>
                      <td>{koi.fishName}</td>
                      <td>{new Date(koi.createDate).toLocaleString()}</td> {/* Định dạng ngày tháng */}
                      <td>{koi.createBy}</td>
                      <td>{koi.status === 1 ? "Available" : "Sold"}</td>
                      <td>
                        <a
                          onClick={() =>
                            navigate("/Manager/KoiDetail", {
                              state: koi,
                            })
                          }
                        >
                          <i className="fa-solid fa-arrow-right"></i> {/* Chuyển hướng đến trang chi tiết */}
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7">No Data</td> {/* Hiển thị nếu không có dữ liệu */}
                </tr>
              )}
            </tbody>
          </table>

          {/* Phần phân trang */}
          <ReactPaginate
            previousLabel={"Previous"} // Nhãn cho nút "Trước"
            nextLabel={"Next"} // Nhãn cho nút "Tiếp theo"
            breakLabel={"..."} // Nhãn cho dấu ba chấm
            pageCount={pageCount} // Tổng số trang
            marginPagesDisplayed={2} // Hiển thị 2 trang đầu và cuối
            pageRangeDisplayed={3} // Hiển thị 3 trang xung quanh trang hiện tại
            onPageChange={handlePageClick} // Hàm xử lý khi người dùng chọn trang mới
            containerClassName={"pagination"} // Class CSS cho container phân trang
            activeClassName={"active"} // Class CSS cho trang hiện tại
          />
        </div>
      </div>
    </div>
  );
};

export default ManageKoi;
