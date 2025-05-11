import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';

const Donors= () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8081/api/v1/devotee/donations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // You can add authorization headers if needed, for example:
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      credentials: 'include', // This is for sending cookies with the request (if needed)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load donations');
        }
        return response.json();
      })
      .then((data) => {
        setDonations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load donations');
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Donation Records</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-warning">
            <tr>
              <th>ID</th>
              <th>Donor Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Cause</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.id}</td>
                <td>{donation.devoteeName}</td>
                <td>{donation.devoteeEmail}</td>
                <td>₹{donation.donationAmount}</td>
                <td>{donation.donationCause}</td>
                <td>{new Date(donation.donationDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Donors;
