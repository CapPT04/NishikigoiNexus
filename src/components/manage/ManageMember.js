import React, { useEffect, useState } from "react";
import "./ManageMember.scss";
import Navbar from "../common/Navbar/Navbar";
import VerticallyNavbar from "../common/Navbar/VerticallyNavbar";
import { handleGetAllMember } from "../../axios/UserService";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";

const ManageMember = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [itemsPerPage] = useState(10); // Số lượng item trên mỗi trang
  const navigate = useNavigate();
  const statusName = ["Active", "Inactive"];

  const handleAllUser = async () => {
    try {
      const res = await handleGetAllMember();
      setUsers(res.data.$values);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    handleAllUser();
  }, []);

  // Tính toán các item hiện tại trong trang
  const offset = currentPage * itemsPerPage; // Xác định điểm bắt đầu của trang
  const currentItems = users.slice(offset, offset + itemsPerPage); // Lấy item từ mảng dựa vào offset
  const pageCount = Math.ceil(users.length / itemsPerPage); // Tổng số trang

  // Hàm xử lý sự kiện đổi trang
  const handlePageClick = (event) => {
    setCurrentPage(event.selected); // Cập nhật trang hiện tại
  };

  return (
    <div className="manager-member">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
          <table className="table-manage-member">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((user, index) => (
                  <tr key={index}>
                    <td>{offset + index + 1}</td>
                    <td>{user.userId}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{statusName[user.status - 1]}</td>
                    <td>
                      <i
                        className="fa-solid fa-arrow-right"
                        onClick={() =>
                          navigate(`/Manager/UserDetail?userId=${user.userId}`)
                        }
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No members available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Phân trang */}
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount} // Tổng số trang
            marginPagesDisplayed={2} // Hiển thị số trang ở đầu/cuối
            pageRangeDisplayed={3} // Hiển thị số trang xung quanh trang hiện tại
            onPageChange={handlePageClick} // Hàm xử lý khi đổi trang
            containerClassName={"pagination"} // Lớp CSS của container phân trang
            activeClassName={"active"} // Lớp CSS cho trang đang được chọn
          />
        </div>
      </div>
    </div>
  );
};

export default ManageMember;
