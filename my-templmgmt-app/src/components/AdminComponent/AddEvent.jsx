import React, { } from 'react'
import { useState } from 'react'
// Import your CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';


const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');

 const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading page

    const newEvent = {
      eventName,
      eventDate,
      eventDescription,
    };

    try {
      const response = await fetch('http://localhost:8081/api/v1/admin/events/addEvents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const result = await response.text(); // or response.json()
        alert('Success: ' + result);

        // Reset form
        setEventName('');
        setEventDate('');
        setEventDescription('');
      } else {
        alert('Server error: Failed to add event');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error: Could not reach the server');
    }
  };


  return (
    <div style={{ backgroundColor: '#f0f4ff', minHeight: '100vh', paddingTop: '50px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <Card.Title className="mb-4 text-center">Add New Event</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="eventName">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="eventDate">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="eventDescription">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Add Event
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddEvent;