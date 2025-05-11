import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from 'react-bootstrap';
import CustomNavbar from '../HeaderComponent/CustomNavbar';

const DevoteePage = () => {
  return (
    <>
      <CustomNavbar />
      <div className="container py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
  <h1 className="display-5 fw-bold text-center mb-3">Welcome to the Devotee Area</h1>
  <p className="lead text-center mb-5">Manage your subscriptions, donations, and more.</p>

  {/* Cards Section */}
  <div className="row g-4 mb-5 w-100">
    <div className="col-md-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body text-center">
          <h5 className="card-title">Registration</h5>
          <p className="card-text">Register or update your devotee profile.</p>
          <Link to="/register" className="btn btn-primary">Go to Registration</Link>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body text-center">
          <h5 className="card-title">Subscriptions</h5>
          <p className="card-text">Manage your subscriptions and memberships.</p>
          <Link to="/subscriptions" className="btn btn-primary">View Subscriptions</Link>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body text-center">
          <h5 className="card-title">Donations</h5>
          <p className="card-text">Make a donation or view your donation history.</p>
          <div className="d-flex justify-content-center gap-2">
            <Link to="/donation" className="btn btn-success">Donate</Link>
            <Link to="/donation-history" className="btn btn-outline-secondary">History</Link>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* List Group Section */}
  <div className="container my-5">
  <h2 className="text-center mb-4">Explore Devotee Services</h2>
  <div className="row row-cols-1 row-cols-md-3 g-4">

    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src="/images/registration.jpg" className="card-img-top" alt="Registration" />
        <div className="card-body text-center">
          <h5 className="card-title">Registration</h5>
          <p className="card-text">Create or update your devotee profile for better services.</p>
          <Link to="/register" className="btn btn-primary">Register Now</Link>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src="/images/subscription.jpg" className="card-img-top" alt="Subscriptions" />
        <div className="card-body text-center">
          <h5 className="card-title">Subscriptions</h5>
          <p className="card-text">Manage temple memberships and monthly offerings.</p>
          <Link to="/subscriptions" className="btn btn-primary">View Subscriptions</Link>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src="/images/1.jpg" className="card-img-top" alt="Donations" />
        <div className="card-body text-center">
          <h5 className="card-title">Donations</h5>
          <p className="card-text">Contribute to temple activities and charitable events.</p>
          <div className="d-grid gap-2">
            <Link to="/donation" className="btn btn-success">Donate</Link>
            <Link to="/donation-history" className="btn btn-outline-secondary">View History</Link>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
{/* Image Carousal Section */}
<div className="container my-5">
      <h2 className="text-center mb-4">Temple Moments</h2>
      <div id="templeCarousel" className="carousel slide" data-bs-ride="carousel">
        
        <div className="carousel-inner rounded shadow">
          <div className="carousel-item active">
            <img src="/images/1.jpg" className="d-block w-100" alt="Temple 1" />
          </div>
          <div className="carousel-item">
            <img src="/images/2.jpg" className="d-block w-100" alt="Temple 2" />
          </div>
          <div className="carousel-item">
            <img src="/images/3.jpg" className="d-block w-100" alt="Temple 3" />
          </div>
        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#templeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#templeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#templeCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#templeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#templeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
      </div>
    </div>

{/*HeroSection*/}

<div className="container my-5">
  <h2 className="text-center mb-4">Temple Gallery</h2>
  <div className="row row-cols-1 row-cols-md-3 g-4">

    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src="/images/3.jpg" className="card-img-top" alt="Temple View 1" />
        <div className="card-body text-center">
          <h5 className="card-title">Temple View 1</h5>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src="/images/2.jpg" className="card-img-top" alt="Temple View 2" />
        <div className="card-body text-center">
          <h5 className="card-title">Temple View 2</h5>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src="/images/1.jpg" className="card-img-top" alt="Temple View 3" />
        <div className="card-body text-center">
          <h5 className="card-title">Temple View 3</h5>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src="/images/3.jpg" className="card-img-top" alt="Temple View 4" />
        <div className="card-body text-center">
          <h5 className="card-title">Temple View 4</h5>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src="/images/2.jpg" className="card-img-top" alt="Temple View 5" />
        <div className="card-body text-center">
          <h5 className="card-title">Temple View 5</h5>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src="/images/1.jpg" className="card-img-top" alt="Temple View 6" />
        <div className="card-body text-center">
          <h5 className="card-title">Temple View 6</h5>
        </div>
      </div>
    </div>

  </div>
</div>


  {/* Quick Links Section */}
  <div className="mb-5">
    <h2 className="h4 text-center mb-3">Quick Links</h2>
    <div className="d-flex flex-wrap justify-content-center gap-3">
      <Link to="/register" className="text-primary text-decoration-underline">Registration</Link>
      <Link to="/subscriptions" className="text-primary text-decoration-underline">Subscriptions</Link>
      <Link to="/donation" className="text-primary text-decoration-underline">Donation</Link>
      <Link to="/donation-history" className="text-primary text-decoration-underline">History</Link>
    </div>
  </div>

  {/* Footer */}
  <div className="text-center text-muted">
    <p>For any assistance, please contact the temple administration.</p>
    <p>Thank you for your support!</p>
    <p>May the blessings of the divine be with you always.</p>
  </div>
</div>

    </>
  );
};

export default DevoteePage;
