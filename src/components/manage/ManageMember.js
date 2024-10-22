import React, { useEffect } from "react";
import "./ManageMember.scss";
// import logo from '../../assets/images/logo_png.png';
import search from "../../assets/images/search.svg";
import Navbar from "../common/Navbar/Navbar";
import VerticallyNavbar from "../common/Navbar/VerticallyNavbar";
import { handleGetAllUser } from "../../axios/UserService";
import { useNavigate } from "react-router";

const ManageMember = () => {
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();

  const handleAllUser = async () => {
    const res = await handleGetAllUser();
    console.log(res.data.$values);
    setUsers(res.data.$values);
  };

  useEffect(() => {
    handleAllUser();
  }, []);

  return (
    <div>
      <div className="header">
        {/* <div className="navigation-bar">
                    <div className="navigation-bar-left-content">
                        <img className="logo" src={logo} />
                        <div className="project-name">Nishikigoi Nexus</div>
                    </div>

                    <div className="navigation-bar-right-content">
                        <a className="staff">STAFF</a>
                        <a className="home">HOME</a>
                        <a className="auction">AUCTION</a>
                        <a className="blog">BLOG</a>
                        <a className="about">ABOUT</a>
                        <a className="account">ACCOUNT</a>
                    </div>
                </div> */}
        <Navbar></Navbar>
      </div>

      <div className="body-content">
        {/* <div className="navigation-bar-vertically">
                    <a className="member">Member</a>
                    <a className="breeder">Breeder</a>
                    <a className="request">Request</a>
                    <a className="auction-vertically">Auction</a>
                    <a className="koi">KOI</a>
                    <a className="blog-vertically">Blog</a>
                </div> */}

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
                            navigate(`/Manager/UserDetail?id=${user.userId}`)
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
