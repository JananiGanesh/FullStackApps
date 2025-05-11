import React from 'react'
import { Container } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="my-5" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4">About Us</h2>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.8", textAlign: "justify" }}>
        Welcome to our Temple Management System — a modern digital solution created to support temples in 
        managing their spiritual, financial, and administrative responsibilities with ease and integrity. 
        Our platform is thoughtfully designed to meet the needs of temple administrators, devotees, and 
        staff, bringing together tradition and technology in a meaningful way.
      </p>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.8", textAlign: "justify" }}>
        The system offers a wide range of features including online pooja and seva booking, donation 
        management, event scheduling, volunteer coordination, inventory tracking, and detailed reporting. 
        With user-friendly interfaces and secure access controls, it ensures that temple operations remain 
        transparent, organized, and accessible — whether you’re managing a small shrine or a large temple complex.
      </p>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.8", textAlign: "justify" }}>
        Our mission is to empower temples to embrace digital transformation while preserving their sacred 
        customs and community values. We believe technology should serve spirituality, and our system is a 
        reflection of that vision — simple to use, powerful in capability, and respectful of tradition.
      </p>
    </Container>
)
}

export default About
