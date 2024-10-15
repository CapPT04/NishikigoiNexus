import React from 'react';
import './ManageMember.scss';
import logo from '../../assets/images/logo_png.png';
import search from '../../assets/images/search.svg';
const ManageMember = () => {
    return (
        <div>
            <div className="header">
                <div className="navigation-bar">
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
                </div>
            </div>

            <div className="body-content">
                <div className="navigation-bar-vertically">
                    <a className="member">Member</a>
                    <a className="breeder">Breeder</a>
                    <a className="request">Request</a>
                    <a className="auction-vertically">Auction</a>
                    <a className="koi">KOI</a>
                    <a className="blog-vertically">Blog</a>
                </div>

                <div className="body-content-right">
                    <div className="search">
                        <div className="search-text">Search: </div>
                        <div className="search-value">
                            <input className="search-input" placeholder="Search by Email and Phone number" type="text" />
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>Thinh</td>
                                <td>Dinh Le</td>
                                <td>thinhdlse181755@fpt.edu.vn</td>
                                <td>0362683366</td>
                                <td>Active</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageMember;
