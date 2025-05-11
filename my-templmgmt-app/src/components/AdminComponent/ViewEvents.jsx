import React, { useEffect, useState } from "react";
import { Container, Table, Spinner } from "react-bootstrap";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // You can customize the format here
  };

  // Fetch events from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/v1/admin/events/all");
        if (response.ok) {
          const data = await response.json(); 
          setEvents(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Temple Event Details</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading events...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead style={{ backgroundColor: "#5a2a83", color: "white" }}>
            <tr>
              <th>#</th>
              <th>Event Name</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event, index) => (
                <tr key={event.id}>
                  <td>{index + 1}</td>
                  <td>{event.eventName}</td>
                  <td>{formatDate(event.eventDate)}</td>
                  <td>{event.eventDescription}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No events found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ViewEvents;
