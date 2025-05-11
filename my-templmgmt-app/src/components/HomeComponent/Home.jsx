import React from 'react'
import { Container, Navbar, Nav, Button, Row, Col, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
      


const Home = () => {
  // Initialize upcomingEvents as an empty array or populate it with event objects
  
  return (
    <div>

      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: `url(/images/4.avif)`,backgroundSize: 'cover', backgroundPosition: 'center', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>

        <div className="text-center">
          <h1>Welcome to Temple Management System</h1>
          <p>Your spiritual journey starts here</p>
          <Button variant="warning" href="#info">Learn More</Button>
        </div>
      </div>

      {/* About Section */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">Temple</h2>
        <Row>
          <Col md={6}>
            <p>
            Welcome to our Temple Management System — a digital platform dedicated to streamlining the spiritual and administrative activities of temples. Our mission is to bring tradition and technology together, enabling temples to serve devotees more efficiently and transparently. From online pooja bookings and seamless donation tracking to event scheduling and inventory management, our system empowers temple authorities with the tools they need to manage daily operations with ease. Designed with simplicity, security, and devotion in mind, our platform ensures that every devotee’s experience is meaningful, organized, and spiritually enriching. Join us as we modernize temple management while preserving the sacredness of every ritual and tradition.


            </p>
          </Col>
          <Col md={6}>
            <img src="/images/3.jpg" alt="Temple" className="img-fluid" />
          </Col>
        </Row>
      </Container>
      <br>
      </br>
      <div className="py-5 bg-light"> {/* Added a light background for better contrast */}
  <Container>
    <div className="text-center mb-5" id="info">
      <h2 className="fw-bold mb-3">What's Happening at the Temple</h2>
      <p className="lead text-muted">Discover upcoming events and participate in the vibrant community.</p>
    </div>
    <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"> {/* More responsive grid */}
      {/* Simulate dynamic event data */}
      {[{
        id: 1,
        title: 'Evening Aarti & Kirtan',
        description: 'Join us for a soulful evening of prayers and devotional songs.',
        date: '2025-05-10',
        imageUrl: '/images/event1.jpg'
      }, {
        id: 2,
        title: 'Community Feast (Prasadam)',
        description: 'Experience the joy of sharing a blessed meal together.',
        date: '2025-05-15',
        imageUrl: '/images/event2.jpg'
      }, {
        id: 3,
        title: 'Special Discourse on Spirituality',
        description: 'Enrich your understanding with enlightening talks by revered speakers.',
        date: '2025-05-22',
        imageUrl: '/images/event3.jpg'
      }].map((event) => (
        <Col key={event.id}>
          <Card className="h-100 shadow-md border-0 rounded-3"> {/* Added shadow, removed border, rounded corners */}
            <div className="overflow-hidden rounded-top-3" style={{ height: '220px' }}>
              <Card.Img
                variant="top"
                src={event.imageUrl}
                alt={event.title}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <Card.Body className="d-flex flex-column justify-content-between p-4">
              <div>
                <Card.Title className="text-Dark mb-2 fw-semibold">{event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted small">
                  {new Date(event.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Card.Subtitle>
                <Card.Text className="mb-3 text-secondary">{event.description.substring(0, 80)}...</Card.Text> {/* Slightly shorter description */}
              </div>
              <div className="d-grid">
                <Button variant="outline-secondary" href={`/events/${event.id}`}> {/* Outline button for a softer look */}
                  Learn More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    <div className="text-center mt-4">
      <Button variant="warning" size="lg" href="/events"> {/* More prominent "View All" button */}
        See the Full Calendar
      </Button>
    </div>
  </Container>
</div>

      {/* Donation Section */}
      <Container className="mt-5 text-center">
        <h2>Support Our Temple</h2>
        <p>Your generous donations help maintain and improve the temple for future generations. Your support is greatly appreciated.</p>
        <Button variant="warning" href="/donate">Donate Now</Button>
      </Container>

      {/* Footer Section */}
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        <p>&copy; {new Date().getFullYear()} [Temple Name]. All Rights Reserved.</p>
        <p>Contact us: [Email] | [Phone]</p>
        <p>Find us on <a href="#" className="text-white">Social Media</a></p>
      </footer>
    </div>
  );
};

export default Home;
