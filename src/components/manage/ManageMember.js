import React, { useEffect } from "react";
import "./ManageMember.scss";
// import logo from '../../assets/images/logo_png.png';
import search from "../../assets/images/search.svg";
import Navbar from "../common/Navbar/Navbar";
import VerticallyNavbar from "../common/Navbar/VerticallyNavbar";
import { handleGetAllMember, handleGetAllUser } from "../../axios/UserService";
import { useNavigate } from "react-router";

const ManageMember = () => {
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();

  const handleAllUser = async () => {
    const res = await handleGetAllMember();
    console.log(res.data.$values);
    setUsers(res.data.$values);
  };
  //asdasdas
  useEffect(() => {
    handleAllUser();
  }, []);

  return (
    <div className="manager-member">
      <div className="header">
        <Navbar></Navbar>
      </div>
      <div className="body-content">
        <VerticallyNavbar></VerticallyNavbar>
        <div className="body-content-right">
          <div className="search">
            <div className="search-text">Search: </div>
            <div className="search-value">
              <input
                className="search-input"
                placeholder="Search by Email and Phone number"
                type="text"
              />
              <div className="search-icon">
                <img src={search} alt="Search Icon" />
              </div>
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
              {users &&
                users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1} </td>
                      <td>{user.userId}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.status}</td>
                      <td>
                        <i
                          className="fa-solid fa-arrow-right"
                          onClick={() =>
                            navigate(
                              `/Manager/UserDetail?userId=${user.userId}`
                            )
                          }
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMember;
