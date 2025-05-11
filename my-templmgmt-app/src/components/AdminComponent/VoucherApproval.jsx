import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container ,Table,Badge} from 'react-bootstrap';
import { useEffect } from 'react';

const VoucherApproval = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/v1/admin/member/voucher/viewvouchers'); // Replace with your actual API endpoint for retrieving all vouchers
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVouchers(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8081/api/v1/admin/member/voucher/${id}/status`, { 
        method: 'PUT', // Or PATCH, depending on your backend API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the local state upon successful backend update
      setVouchers(prev =>
        prev.map(v =>
          v.id === id ? { ...v, status: newStatus } : v
        )
      );
    } catch (e) {
      setError(e);
      alert('Failed to update voucher status.');
    }
  };
  if (loading) {
    return <div className="container mt-5">Loading vouchers...</div>;
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">Error loading vouchers: {error.message}</div>;
  }

  return (
    <Container className="mt-5">
      <h3 className="mb-4">Voucher Approval Dashboard</h3>

      {vouchers.length === 0 ? (
        <div className="alert alert-info">No vouchers to review.</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Requested By</th>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Vendor</th>
              <th>Account</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map(voucher => (
              <tr key={voucher.id}>
                <td>{voucher.id}</td>
                <td>{voucher.requestedBy}</td>
                <td>{voucher.date}</td>
                <td>{voucher.category}</td>
                <td>{voucher.description}</td>
                <td>₹{voucher.amount}</td>
                <td>{voucher.vendor}</td>
                <td>{voucher.account}</td>
                <td>
                  <Badge pill bg={voucher.status === 'Approved' ? 'success' : voucher.status === 'Rejected' ? 'danger' : 'secondary'}>
                    {voucher.status}
                  </Badge>
                </td>
                <td>
                {console.log("Voucher Status:", voucher.status)} 
                  {voucher.status === 'Pending' && (
                    <> 
                    
                      <Button variant="success" className="me-2" onClick={() => updateStatus(voucher.id, 'Approved')}>
                        Approve
                      </Button>
                      <Button variant="danger" onClick={() => updateStatus(voucher.id, 'Rejected')}>
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default VoucherApproval;
