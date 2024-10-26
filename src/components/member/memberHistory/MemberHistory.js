// import React, { useEffect, useState } from "react";
// import "./MemberHistory.scss";
// import Navbar from "../../common/Navbar/Navbar";
// import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
// import searchIcon from "../../../assets/images/search.svg";
// import { json, useNavigate } from "react-router";
// import {
//   handleotherHistory,
//   handleUnpaidHistory,
// } from "../../../axios/UserService";

// const MemberHistory = () => {
//   const navigate = useNavigate();
//   const [unpaidHistory, setUnpaidHistory] = useState([]);
//   const [otherHistory, setOtherHistory] = useState([]);

//   const getHistory = async (userId) => {
//     const resUnpaid = await handleUnpaidHistory(userId);
//     setUnpaidHistory(resUnpaid.data.$values);
//     console.log(resUnpaid.data.$values);
//     const resOtherHistory = await handleotherHistory(userId);
//     setOtherHistory(resOtherHistory.data.$values);
//     console.log(resOtherHistory.data.$values);
//   };

//   useEffect(() => {
//     const userStore = sessionStorage.getItem("user");
//     const userId = JSON.parse(userStore).UserID;
//     // console.log("userid: ", userId);
//     getHistory(userId);
//   }, []);
//   return (
//     <div className="manage-breeder-container">
//       <div className="header">
//         <Navbar />
//       </div>
//       <div className="body-content">
//         {/* <VerticallyNavbar /> */}
//         <div className="body-content-right">
//           {/* <div className="search-and-create">
//             <div className="search">
//               <div className="search-text">Search: </div>
//               <div className="search-value">
//                 <input
//                   className="search-input"
//                   placeholder="Search by Email and Phone number"
//                   type="text"
//                 />
//                 <div className="search-icon">
//                   <img src={searchIcon} alt="search-icon" />
//                 </div>
//               </div>
//             </div>
//             <div
//               className="create-btn"
//               onClick={() => navigate("/Manager/CreateBreeder")}
//             >
//               New Breeder
//               <i className="fa-solid fa-plus"></i>
//             </div>
//           </div> */}
//           <table className="table-manage-breeder">
//             <thead>
//               <tr>
//                 <th>No</th>
//                 <th>Fish Entry ID</th>
//                 <th>Auction ID</th>
//                 <th>Auction Date</th>
//                 <th>Sold Price</th>
//                 {/* <th>Phone</th>
//                 <th>Status</th> */}
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {unpaidHistory.length > 0 ? (
//                 unpaidHistory.map((history, index) => {
//                   return (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       <td>{history.fishEntryId}</td>
//                       <td>{history.auctionId}</td>
//                       <td>{history.startDate}</td>
//                       <td>{history.highestPrice}</td>
//                       {/* <td>{history.phone}</td>
//                       <td>{history.status}</td> */}
//                       <td>
//                         <i
//                           className="fa-solid fa-arrow-right"
//                           //   onClick={() =>
//                           //     navigate(
//                           //       `/Manager/BreederDetail?id=${breeder.userId}`
//                           //     )
//                           //   }
//                         ></i>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td
//                     // style={{
//                     //   display: "flex",
//                     //   width: "100%",
//                     //   justifyContent: "center",
//                     // }}
//                     colSpan={6}
//                   >
//                     No Unpaid Auction Available
//                   </td>
//                 </tr>
//               )}

//               {/* {breeders.length > 0
//                     ? breeders.map((breeder, index) => {
//                         console.log("@", breeder.userId);
//                       })
//                     : console.log("b")} */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberHistory;
