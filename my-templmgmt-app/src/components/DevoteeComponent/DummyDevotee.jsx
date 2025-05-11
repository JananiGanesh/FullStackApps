import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';
import DevoteeSubscriptionPage from './DevoteeSubscriptionPage';
import DonationHistoryPage from './DonationHistory';
import DonationForm from './DonationForm';
import CustomNavbar from '../HeaderComponent/CustomNavbar';


const DummyDevotee = () => {
  return (
  <>

    <CustomNavbar />
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="text-3xl font-bold text-center">Welcome to the Devotee Area</h1> 
      <p className="text-center">Here you can manage your subscriptions, donations, and more.</p>
      <p className="text-center">Please select an option from the menu above.</p>
      <p className="text-center">For any assistance, please contact the temple administration.</p>
      <p className="text-center">Thank you for your support!</p>
      <p className="text-center">May the blessings of the divine be with you always.</p>
      
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/devotee">Devotee Area</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/register">Registration</Nav.Link>
              <Nav.Link as={Link} to="/subscriptions">Subscription</Nav.Link>
              <NavDropdown title="Donation" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/donate">Make Donation</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/donation-history">Donation History</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Button variant="outline-danger" onClick={() => alert('Logout functionality')}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>

     </>
  );
};

export default DummyDevotee;