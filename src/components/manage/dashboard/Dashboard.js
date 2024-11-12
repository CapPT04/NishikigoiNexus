import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import { handleUpdateFeeApi, handleAllFishEntry, handleCountNewMemberApi, handleFishEntryDashBoardApi, handleGetFeeApi, handleMonthlyRevenueApi, handleRevenueByTimeFrame, handleFeeApi } from "../../../axios/UserService";
import { useNavigate } from "react-router";
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import "./DashBoard.scss";
import Swal from 'sweetalert2';

const DashBoard = () => {
    const navigate = useNavigate();
    const [fishEntries, setFishEntries] = useState([]);
    const statusName = ["Unfinished", "Successful", "Failed", "Cancelled"];
    const [fishEntryDashBoard, setFishEntryDashBoard] = useState({});
    const [percentages, setPercentages] = useState({
        unFinished: 0,
        successful: 0,
        failed: 0,
        canceled: 0,
    });
    const [total, setTotal] = useState(0);
    const [newMembersCount, setNewMembersCount] = useState(0);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState("month");
    const [totalRevenue, setTotalRevenue] = useState([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [fee, setFee] = useState();


    const getFishEntries = async () => {
        const res = await handleAllFishEntry();
        setFishEntries(res.data.$values);
    };

    const handleUpdateFeeBtn = async () => {

        if (fee < 10000 || fee % 10000 !== 0 || fee > 20000000) {
            await Swal.fire({
                title: 'Invalid Fee',
                text: 'The fee must be larger than 10,000 and divisible by 10,000.',
                icon: 'error',
                confirmButtonColor: '#d33',
            });
            return; // Exit the function if the fee is invalid
        }

        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update the fee?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        });



        if (confirmResult.isConfirmed) {
            try {
                const response = await handleUpdateFeeApi(sessionStorage.getItem("token"), fee);
                console.log(sessionStorage.getItem("token"));

                console.log(response);

                if (response && response.status === 200) {
                    Swal.fire({
                        title: 'Updated!',
                        text: 'The fee has been successfully updated.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6'
                    });
                } else if (response.status === 403) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Unanthorize !!!.',
                        icon: 'error',
                        confirmButtonColor: '#d33'
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating the fee. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#d33'
                });
            }
        }
    };

    useEffect(() => {
        const fetchGetFee = async () => {
            try {
                const response = await handleGetFeeApi();
                if (response && response.status === 200) {
                    setFee(response.data);
                } else {
                    console.log("Error in handleGetFeeApi");

                }
            } catch (error) {
                console.error("Error fetching new members count:", error);
            }
        };
        fetchGetFee();
    }, []);

    useEffect(() => {
        const fetchNewMembersCount = async () => {
            try {
                const count = await handleCountNewMemberApi(selectedTimeFrame);
                setNewMembersCount(count);
            } catch (error) {
                console.error("Error fetching new members count:", error);
            }
        };
        fetchNewMembersCount();
    }, [selectedTimeFrame]);

    useEffect(() => {
        const fetchFishEntryDashBoard = async () => {
            try {
                const responseFishEntryDashBoard = await handleFishEntryDashBoardApi();
                const data = responseFishEntryDashBoard.data;
                setFishEntryDashBoard(data);
                setTotal(data.total);

                // Calculate percentages only if total is greater than 0
                if (data.total > 0) {
                    setPercentages({
                        unFinished: (data.unfinish / data.total) * 100,
                        successful: (data.successful / data.total) * 100,
                        failed: (data.failed / data.total) * 100,
                        canceled: (data.cancelled / data.total) * 100,
                    });
                }
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchFishEntryDashBoard();
    }, []);

    useEffect(() => {
        const fetchTotalRevenue = async () => {
            try {
                const revenueData = await handleRevenueByTimeFrame(selectedTimeFrame);
                setTotalRevenue(revenueData);
            } catch (error) {
                console.error("Error fetching revenue data:", error);
            }
        };
        fetchTotalRevenue();
    }, [selectedTimeFrame]);

    useEffect(() => {
        const fetchMonthlyRevenue = async () => {
            try {
                const response = await handleMonthlyRevenueApi();
                setMonthlyRevenue(response.data);
            } catch (error) {
                console.error("Error fetching revenue data:", error);
            }
        };
        fetchMonthlyRevenue();
    }, [selectedTimeFrame]);

    useEffect(() => {
        getFishEntries();
    }, []);

    const processDataForPieChart = () => {
        return [
            { name: statusName[0], value: fishEntryDashBoard.unfinish || 0 },
            { name: statusName[1], value: fishEntryDashBoard.successful || 0 },
            { name: statusName[2], value: fishEntryDashBoard.failed || 0 },
            { name: statusName[3], value: fishEntryDashBoard.cancelled || 0 },
        ];
    };

    const monthlyRevenueData = [
        { month: "Jan", revenue: [monthlyRevenue[0]] },
        { month: "Feb", revenue: monthlyRevenue[1] },
        { month: "Mar", revenue: monthlyRevenue[2] },
        { month: "Apr", revenue: monthlyRevenue[3] },
        { month: "May", revenue: monthlyRevenue[4] },
        { month: "Jun", revenue: monthlyRevenue[5] },
        { month: "Jul", revenue: monthlyRevenue[6] },
        { month: "Aug", revenue: monthlyRevenue[7] },
        { month: "Sep", revenue: monthlyRevenue[8] },
        { month: "Oct", revenue: monthlyRevenue[9] },
        { month: "Nov", revenue: monthlyRevenue[10] },
        { month: "Dec", revenue: monthlyRevenue[11] },
    ];

    const formatMoney = (value) => {
        // Convert the value to a string and take only the integer part
        let integerPart = String(Math.floor(Number(value)));
        // Remove non-digit characters from the integer part
        integerPart = integerPart.replace(/\D/g, "");
        // Format the integer part with commas as thousand separators
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // Return the formatted integer part
        return integerPart;
    };

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

    return (
        <div className="manage-koi-container">
            <div className="header">
                <Navbar />
            </div>
            <div className="body-content-dashboard">
                <VerticallyNavbar />
                <div className="body-content-dashboard-right">
                    <div className="management">Management</div>
                    <div className="fee-set-up">
                        <label className="request-fee-text">Request fee</label>
                        <input
                            className="request-fee-input"
                            value={formatMoney(fee)}
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/,/g, ''); // Remove commas
                                const numericValue = Number(rawValue); // Parse as a number
                                if (!isNaN(numericValue)) {
                                    setFee(numericValue); // Update fee state
                                }
                            }}
                        />

                        <div className="vnd-fee">VND</div>
                        <button
                            className="update-fee-btn"
                            onClick={() => handleUpdateFeeBtn()}
                        >Update</button>
                        <button
                            className="cancel-fee-btn"
                            onClick={() => window.location.reload()}
                        >Cancel</button>
                    </div>
                    <div className="overview">Overview</div>

                    <div className="chart-container1">
                        <div className="pie-chart">
                            <h2>Fish Entry Dashboard</h2>
                            <div>Total: {total}</div>

                            <PieChart width={400} height={300}>
                                <Pie
                                    data={processDataForPieChart()}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {processDataForPieChart().map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>

                        <div className="statistics-summary">
                            <select className="time-frame" value={selectedTimeFrame} onChange={(e) => setSelectedTimeFrame(e.target.value)}>
                                <option value="month">This month</option>
                                <option value="year">This year</option>
                                <option value="all">Overall</option>
                            </select>

                            <div className="total-member">
                                <div className="total-member-icon">
                                    <i className="fa-solid fa-users-line"></i>
                                </div>
                                <div className="total-member-text">Total members</div>
                                <div className="total-member-number">{newMembersCount}</div>
                            </div>
                            <div className="total-revenue">
                                <div className="total-revenue-icon">
                                    <i className="fa-regular fa-money-bill-1"></i>
                                </div>
                                <div className="total-revenue-text">Total revenue</div>
                                <div className="total-revenue-number">{totalRevenue}</div> {/* Display total revenue */}
                            </div>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="chart-container2">
                        <h3>Monthly Recurring Revenue</h3>
                        <BarChart
                            width={1120}
                            height={300}
                            data={monthlyRevenueData}
                            barCategoryGap="30%"
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="revenue" fill="#ff8042" />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
