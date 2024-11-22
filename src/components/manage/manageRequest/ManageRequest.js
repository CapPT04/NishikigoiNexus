import React, { useEffect, useState } from "react";
import "./ManageRequest.scss";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import Navbar from "../../common/Navbar/Navbar";
import { useNavigate } from "react-router";
import { handleGetAllRequest } from "../../../axios/UserService";
import ReactPaginate from "react-paginate"; // Import thư viện ReactPaginate

const ManageRequest = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [itemsPerPage] = useState(10); // Số lượng request trên mỗi trang

  const statusName = ["Processing", "Paying", "Approved", "Denied"];

  // Hàm lấy tất cả requests từ API
  const getAllRequests = async () => {
    const res = await handleGetAllRequest();
    setRequests(res.data.$values);
  };

  useEffect(() => {
    getAllRequests();
  }, []);

  // Tính toán dữ liệu cần hiển thị cho trang hiện tại
  const offset = currentPage * itemsPerPage;
  const currentItems = requests.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(requests.length / itemsPerPage);

  // Xử lý sự kiện chuyển trang
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="manage-request-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
          {/* <div className="search">
            <div className="search-text">Search:</div>
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
          <table className="table-manage-request">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Breeder ID</th>
                <th>Fish ID</th>
                <th>Create Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((request, index) => {
                  return (
                    <tr key={index}>
                      <td>{offset + index + 1}</td>
                      <td>{request.requestId}</td>
                      <td>{request.createBy}</td>
                      <td>{request.fishId}</td>
                      <td>{new Date(request.createDate).toLocaleString()}</td>
                      <td>{statusName[request.status - 1]}</td>
                      <td>
                        <a
                          onClick={() =>
                            navigate(
                              `/Manager/RequestDetail?RequestId=${request.requestId}`
                            )
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
                  <td colSpan={7}>No Request Exists</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Phân trang */}
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

export default ManageRequest;
