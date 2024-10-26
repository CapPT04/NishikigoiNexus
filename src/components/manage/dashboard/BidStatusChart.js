// Dashboard.js
import Navbar from '../../common/Navbar/Navbar';
import VerticallyNavbar from '../../common/Navbar/VerticallyNavbar';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const pieData = [
    { name: 'Successful', value: 69, color: '#4CAF50' },
    { name: 'Cancelled', value: 19, color: '#F44336' },
    { name: 'Failed', value: 16, color: '#FF9800' },
    { name: 'Unfinished', value: 69, color: '#9E9E9E' },
];

const barData = [
    { month: 'Jan', revenue: 1800 },
    { month: 'Feb', revenue: 450 },
    { month: 'Mar', revenue: 600 },
    { month: 'Apr', revenue: 1200 },
    { month: 'May', revenue: 900 },
    { month: 'Jun', revenue: 700 },
    { month: 'Jul', revenue: 1300 },
    { month: 'Aug', revenue: 1700 },
    { month: 'Sep', revenue: 1500 },
    { month: 'Oct', revenue: 650 },
    { month: 'Nov', revenue: 500 },
    { month: 'Dec', revenue: 800 },
];

const BidStatusChart = () => {
    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
            <Navbar></Navbar>
            <VerticallyNavbar></VerticallyNavbar>
            {/* FishEntry Pie Chart */}
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <h3>FishEntry Report</h3>
                <PieChart width={300} height={300}>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="top" align="right" />
                </PieChart>
                <div>
                    <p>Total: 173</p>
                    {pieData.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            </div>

            {/* Member and Revenue Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px' }}>
                <div style={{ padding: '20px', borderRadius: '8px', background: '#f5f5f5', textAlign: 'center', width: '45%' }}>
                    <h4>Total members</h4>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$99,999.99</p>
                </div>
                <div style={{ padding: '20px', borderRadius: '8px', background: '#f5f5f5', textAlign: 'center', width: '45%' }}>
                    <h4>Total revenue</h4>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$99,999.99</p>
                </div>
            </div>

            {/* Monthly Recurring Revenue Bar Chart */}
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginTop: '20px' }}>
                <h3>Monthly Recurring Revenue</h3>
                <BarChart width={500} height={300} data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#F44336" />
                </BarChart>
            </div>
        </div>
    );
};

export default BidStatusChart;
