import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const VoucherRequest = () => {
  const [documents, setDocuments] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  const handleFileChange = (e) => {
    setDocuments([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('');

    const formData = new FormData();
    documents.forEach((doc, idx) => formData.append(`document${idx + 1}`, doc));
    formData.append('remarks', remarks);

    try {
      const response = await fetch('http://localhost:8081/api/v1/admin/member/voucher/request', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow-sm bg-light">
      <h2 className="mb-4 text-center">Request Voucher from Admin</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="documents" className="form-label">Upload Required Documents</label>
          <input
            type="file"
            className="form-control"
            id="documents"
            multiple
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="remarks" className="form-label">Remarks (Optional)</label>
          <textarea
            className="form-control"
            id="remarks"
            rows="3"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit Request</button>
      </form>

      {submitStatus === 'success' && (
        <div className="alert alert-success mt-3">Request submitted successfully!</div>
      )}
      {submitStatus === 'error' && (
        <div className="alert alert-danger mt-3">Failed to submit request. Try again.</div>
      )}
    </div>
  );
};

export default VoucherRequest;
