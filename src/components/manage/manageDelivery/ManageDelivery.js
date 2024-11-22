import React, { useEffect, useState } from "react";
import "./ManageDelivery.scss";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import Navbar from "../../common/Navbar/Navbar";
import { useNavigate } from "react-router";
import { handleGetAllDelivery } from "../../../axios/UserService";
import ReactPaginate from "react-paginate"; // Thư viện phân trang

const ManageDelivery = () => {
  const navigate = useNavigate();
  const [listDelivery, setListDelivery] = useState([]); // Khởi tạo mảng rỗng
  const [currentPage, setCurrentPage] = useState(0); // State lưu trang hiện tại
  const [itemsPerPage] = useState(10);

  const statusName = ["Waiting", "Delivering", "Completed", "Canceled"];

  const getListAll = async () => {
    const resList = await handleGetAllDelivery();
    setListDelivery(resList.data.$values);
  };

  useEffect(() => {
    getListAll();
  }, []);

  // Tính toán các items sẽ hiển thị trong trang hiện tại
  const offset = currentPage * itemsPerPage; // Tính vị trí bắt đầu của items trên trang hiện tại
  const currentItems = listDelivery.slice(offset, offset + itemsPerPage); // Cắt dữ liệu để chỉ lấy các items trong trang hiện tại

  // Tính tổng số trang dựa trên tổng số items và số items mỗi trang
  const pageCount = Math.ceil(listDelivery.length / itemsPerPage); // Tính tổng số trang

  // Hàm xử lý khi người dùng chuyển trang
  const handlePageClick = (event) => {
    setCurrentPage(event.selected); // Cập nhật trang hiện tại khi người dùng chuyển trang
  };

  return (
    <div className="manage-delivery-container">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar />
        <div className="body-content-right">
          <table className="table-manage-delivery">
            <thead>
              <tr>
                <th>No</th>
                <th>Delivery ID</th>
                <th>Fish Entry ID</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((delivery, index) => {
                  return (
                    <tr key={index}>
                      <td>{offset + index + 1}</td>
                      <td>{delivery.deliveryId}</td>
                      <td>{delivery.fishEntryId}</td>
                      <td>
                        {delivery.startDate
                          ? new Date(delivery.startDate).toLocaleString()
                          : ""}
                      </td>
                      <td>{statusName[delivery.status - 1]}</td>
                      <td>
                        <a
                          onClick={() =>
                            navigate("/Manager/DeliveryDetail", {
                              state: { fishEntryId: delivery.fishEntryId },
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
                  <td className="spanCol" colSpan="6">
                    No Delivery Data
                  </td>
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

export default ManageDelivery;
