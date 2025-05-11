import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';


const ApprovedVouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchApprovedVouchers = async () => {
          try {
              // Replace with your actual API endpoint to fetch *only* approved vouchers
              const response = await fetch('http://localhost:8081/api/v1/admin/member/voucher/approvedvouchers');
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setVouchers(data);
              setLoading(false);
          } catch (err) {
              setError(err);
              setLoading(false);
          }
      };

      fetchApprovedVouchers();
  }, []);

  if (loading) {
      return <Container className="mt-5">Loading approved vouchers...</Container>;
  }

  if (error) {
      return (
          <Container className="mt-5 alert alert-danger">
              Error loading approved vouchers: {error.message}
          </Container>
      );
  }

  if (vouchers.length === 0) {
      return <Container className="mt-5 alert alert-info">No approved vouchers.</Container>;
  }
  return (
    <div className="container mt-4">
      <h3 className="mb-4">Approved Vouchers</h3>

      {vouchers.length === 0 ? (
        <div className="alert alert-info">No approved vouchers found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-success">
              <tr>
                <th>Voucher ID</th>
                <th>Date</th>
                <th>Requested By</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount (₹)</th>
                <th>Vendor</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((voucher) => (
                <tr key={voucher.id}>
                  <td>{voucher.id}</td>
                  <td>{voucher.date}</td>
                  <td>{voucher.requestedBy}</td>
                  <td>{voucher.category}</td>
                  <td>{voucher.description}</td>
                  <td>{voucher.amount !== null ? voucher.amount.toFixed(2) : 'N/A'}</td>
                  <td>{voucher.vendor}</td>
                  <td>{voucher.account}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )};
    </div>
  );
};

export default ApprovedVouchers;
