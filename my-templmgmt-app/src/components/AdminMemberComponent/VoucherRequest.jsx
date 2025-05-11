import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const VoucherRequest = () => {
  const loggedInUser = 'Ramesh Iyer'; // Mocked user info
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    amount: '',
    vendor: '',
    customVendor: '',
    requestedBy: '',
    requestedDate: '',
    account: '',
    files: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const vendors = ['Local Pooja Store', 'City Electricals', 'Temple Trust Office'];
  const accounts = ['General Fund', 'Maintenance Fund', 'Charity Fund'];

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      requestedBy: loggedInUser,
      requestedDate: today,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      files: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(''); 
    setSubmissionMessage('');
   // const fullVendor = formData.vendor === 'Other' ? formData.customVendor : formData.vendor;
    
   const jsonData = {
     category: formData.category,
     description: formData.description,
     amount: formData.amount,
     vendor: formData.vendor === 'Other' ? formData.customVendor : formData.vendor,
     requestedBy: formData.requestedBy,
     requestedDate: formData.requestedDate,
     account: formData.account,
     // Note: We are NOT including 'files' here for this test
    };
  
    
    // Only append the first file (assuming one file)
   
  
    // Send the request to the backend using Fetch or Axios
try {
  const response = await fetch('http://localhost:8081/api/v1/admin/member/voucher/addvoucher', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(jsonData),
    credentials: 'include', // Include credentials for CORS
  });
  
  const contentType = response.headers.get("content-type");
  
  if (response.ok) {
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log('Voucher Submitted:', data);
      alert('Voucher request submitted successfully!');
    } else {
      throw new Error("Expected JSON but got something else");
    }
  } else {
    const text = await response.text();
    throw new Error(`Error: ${response.status} - ${text}`);
  }
} catch (error) { 
  console.error('Error submitting voucher:', error);
  alert('Failed to submit voucher request. Please try again.');
}
  };      

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Temple Voucher Request Form</h4>
          {error && <Alert variant="danger">{error}</Alert>}
      {submissionMessage && <Alert variant="success">{submissionMessage}</Alert>}

        </div>
        <form onSubmit={handleSubmit} className="card-body p-4 bg-light">

          {/* Expense Category */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Expense Category</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Category --</option>
                <option value="Pooja Materials">Pooja Materials</option>
                <option value="Prasad">Prasad</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Amount */}
            <div className="col-md-6">
              <label className="form-label">Amount (INR)</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Detailed Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>

          {/* Vendor Selection */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Beneficiary / Vendor</label>
              <select
                name="vendor"
                className="form-select mb-2"
                value={formData.vendor}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Vendor --</option>
                {vendors.map((v, idx) => (
                  <option key={idx} value={v}>{v}</option>
                ))}
                <option value="Other">Other (Specify Below)</option>
              </select>
              {formData.vendor === 'Other' && (
                <input
                  type="text"
                  name="customVendor"
                  className="form-control"
                  placeholder="Enter vendor name"
                  value={formData.customVendor}
                  onChange={handleChange}
                  required
                />
              )}
            </div>

            {/* Account to Charge */}
            <div className="col-md-6">
              <label className="form-label">Account to Charge</label>
              <select
                name="account"
                className="form-select"
                value={formData.account}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Account --</option>
                {accounts.map((acc, idx) => (
                  <option key={idx} value={acc}>{acc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-3">
            <label className="form-label">Attachments (Invoices, Quotes, etc.)</label>
            <input
              type="file"
              className="form-control"
              multiple
              onChange={handleFileChange}
            />
          </div>

          {/* Requested By & Date */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">Requested By</label>
              <input
                type="text"
                className="form-control"
                value={formData.requestedBy}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Requested Date</label>
              <input
                type="date"
                className="form-control"
                value={formData.requestedDate}
                disabled
              />
            </div>
          </div>

          {/* Submit */}
          <div className="text-end">
            <button type="submit" className="btn btn-secondary px-4" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Voucher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoucherRequest;
