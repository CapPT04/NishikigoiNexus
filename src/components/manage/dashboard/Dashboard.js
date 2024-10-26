import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar/Navbar";
import VerticallyNavbar from "../../common/Navbar/VerticallyNavbar";
import { handleAllFishEntry, handleCountNewMemberApi, handleFishEntryDashBoardApi, handleMonthlyRevenueApi, handleRevenueByTimeFrame } from "../../../axios/UserService";
import { useNavigate } from "react-router";
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import "./DashBoard.scss";

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

    const getFishEntries = async () => {
        const res = await handleAllFishEntry();
        setFishEntries(res.data.$values);
    };

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



    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

    return (
        <div className="manage-koi-container">
            <div className="header">
                <Navbar />
            </div>
            <div className="body-content">
                <VerticallyNavbar />
                <div className="body-content-right">
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
