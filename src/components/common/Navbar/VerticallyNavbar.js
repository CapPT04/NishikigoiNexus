import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './VerticallyNavbar.scss';

const VerticallyNavbar = () => {
    const [selected, setSelected] = useState('');
    const navigate = useNavigate(); // Initialize navigate function

    // Helper function to update selected item and navigate to a new route
    const handleSelect = (item, path) => {
        setSelected(item); // Update the selected state
        navigate(path);    // Navigate to the specified path
    };

    return (
        <div className="navigation-bar-vertically">
            <a
                className={`member ${selected === 'Member' ? 'selected' : ''}`}
                onClick={() => handleSelect('Member', '/Manage')}
            >
                Member
            </a>
            <a
                className={`breeder ${selected === 'Breeder' ? 'selected' : ''}`}
                onClick={() => handleSelect('Breeder', '/breeder')}
            >
                Breeder
            </a>
            <a
                className={`request ${selected === 'Request' ? 'selected' : ''}`}
                onClick={() => handleSelect('Request', '/request')}
            >
                Request
            </a>
            <a
                className={`auction-vertically ${selected === 'Auction' ? 'selected' : ''}`}
                onClick={() => handleSelect('Auction', '/ManageAuction')}
            >
                Auction
            </a>
            <a
                className={`koi ${selected === 'Koi' ? 'selected' : ''}`}
                onClick={() => handleSelect('Koi', '/koi')}
            >
                KOI
            </a>
            <a
                className={`blog-vertically ${selected === 'Blog' ? 'selected' : ''}`}
                onClick={() => handleSelect('Blog', '/blog')} // Navigate to '/blog'
            >
                Blog
            </a>
        </div>
    );
};

export default VerticallyNavbar;
