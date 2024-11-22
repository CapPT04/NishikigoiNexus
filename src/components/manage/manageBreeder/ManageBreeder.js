import React, { useEffect, useState } from "react";
import "./ManageBreeder.scss";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import Navbar from "../../common/Navbar/Navbar";
import searchIcon from "../../../assets/images/search.svg";
import { handleGetAllBreeders } from "../../../axios/UserService";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ManageBreeder = () => {
  const [breeders, setBreeders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [itemsPerPage] = useState(10); // Số lượng breeder trên mỗi trang
  const navigate = useNavigate();
  const statusName = ["Active", "Inactive"];

  const getAllBreeders = async () => {
    try {
      const resBreeder = await handleGetAllBreeders();
      setBreeders(resBreeder.data.$values);
    } catch (error) {
      console.error("Error fetching breeders:", error);
    }
  };

  useEffect(() => {
    getAllBreeders();
  }, []);

  // Tính toán dữ liệu cần hiển thị cho trang hiện tại
  const offset = currentPage * itemsPerPage;
  const currentItems = breeders.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(breeders.length / itemsPerPage);

  // Xử lý sự kiện chuyển trang
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="manage-breeder-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="body-content">
        <VerticallyNavbar />
        <div className="body-content-right">
          <div className="search-and-create">
            <div
              className="create-btn"
              onClick={() => navigate("/Manager/CreateBreeder")}
            >
              New Breeder
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
          <table className="table-manage-breeder">
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
                currentItems.map((breeder, index) => (
                  <tr key={index}>
                    <td>{offset + index + 1}</td>
                    <td>{breeder.userId}</td>
                    <td>{breeder.firstName}</td>
                    <td>{breeder.lastName}</td>
                    <td>{breeder.email}</td>
                    <td>{breeder.phone}</td>
                    <td>{statusName[breeder.status - 1]}</td>
                    <td>
                      <i
                        className="fa-solid fa-arrow-right"
                        onClick={() =>
                          navigate(`/Manager/BreederDetail?id=${breeder.userId}`)
                        }
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No breeder available</td>
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

export default ManageBreeder;
