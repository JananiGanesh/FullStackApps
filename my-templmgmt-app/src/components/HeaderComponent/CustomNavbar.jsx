import React from 'react';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {

  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Logo and Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://plus.unsplash.com/premium_photo-1697729536647-4e23a32dd324?q=80&w=2670&auto=format&fit=crop"
            alt="Temple Management Logo"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            className="me-2"
          />
          <span className="fw-bold fs-4">Temple Management</span>
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left-aligned navigation links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">
                Events
              </Link>
            </li>
            {/* Devotee Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="devoteeDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Devotee
              </Link>
              <ul className="dropdown-menu" aria-labelledby="devoteeDropdown">
                <li>
                  <Link className="dropdown-item" to="/register">
                    Registration
                  </Link>
                </li>
                
                <li>
                  <Link className="dropdown-item" to="/subscriptions">
                    Subscription
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/donate">
                    Make Donation
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/donation-history">
                    Donation History
                  </Link>
                </li>
              </ul>
            </li>
            {/* Admin Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="adminDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </Link>
              <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                <li>
                  <Link className="dropdown-item" to="/admin">
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin/members">
                    Admin Member Dashboard
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* Right-aligned authentication links */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;