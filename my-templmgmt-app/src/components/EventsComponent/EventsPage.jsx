import React from "react";
import { Container, Table } from "react-bootstrap";

const EventsPage = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Temple Event Details</h2>
      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: "#5a2a83", color: "white" }}>
          <tr>
            <th>#</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Rama Navami Pooja</td>
            <td>April 15, 2025</td>
            <td>9:00 AM</td>
            <td>Special pooja and bhajans to celebrate Lord Rama's birth.</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Monthly Annadaan</td>
            <td>May 10, 2025</td>
            <td>12:30 PM</td>
            <td>Free food distribution for devotees and the needy.</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Guru Purnima Celebrations</td>
            <td>July 20, 2025</td>
            <td>6:00 PM</td>
            <td>Satsang, offerings, and blessings to honor our Gurus.</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default EventsPage;
