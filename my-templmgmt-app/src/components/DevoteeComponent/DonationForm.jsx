import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

function DonationForm() {
  const [donationAmount, setDonationAmount] = useState('');
  const [devoteeId, setDevoteeId] = useState('');
  const [donationCause, setDonationCause] = useState(''); // Optional: If you have different causes
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (event) => {
    setDonationAmount(event.target.value);
  };

  const handleCauseChange = (event) => {
    setDonationCause(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSubmissionMessage('');

    if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
      setError('Please enter a valid donation amount.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/v1/devotee/submit-donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donationAmount: parseFloat(donationAmount),
          donationCause: donationCause,
          devoteeId: parseInt(devoteeId),
        }),
      });

      if (response.ok) {
        const responseText = await response.text(); // Read plain text for success
        setSubmissionMessage(responseText);
        setDonationAmount('');
        setDonationCause('');
        setDevoteeId('');
      } else {
        try {
          const errorData = await response.json(); // Try to parse JSON for errors
          setError(errorData.message || 'Failed to record donation intention.');
        } catch {
          // If parsing JSON fails, assume it's plain text error
          const errorText = await response.text();
          setError(errorText || 'Failed to record donation intention.');
        }
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      setError('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="my-5 p-4 shadow-sm rounded bg-light" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Make a Donation</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {submissionMessage && <Alert variant="success">{submissionMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="devoteeId" className="mb-3">
          <Form.Label>Devotee Id:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Devotee ID"
            value={devoteeId}
            onChange={(event) => setDevoteeId(event.target.value)}
            min="1"
            required
          />
        </Form.Group>

        <Form.Group controlId="donationAmount" className="mb-3">
          <Form.Label>Donation Amount (₹):</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Donation Amount"
            value={donationAmount}
            onChange={handleAmountChange}
            min="1"
            required
          />
        </Form.Group>

        {/* Optional: If you have different donation causes */}
        <Form.Group controlId="donationCause" className="mb-3">
          <Form.Label>Cause (Optional):</Form.Label>
          <Form.Control
            as="select"
            value={donationCause}
            onChange={handleCauseChange}
          >
            <option value="">Select a Cause</option>
            <option value="templeMaintenance">Temple Maintenance</option>
            <option value="annadhanam">Annadhanam</option>
            <option value="educationalInitiatives">Educational Initiatives</option>
          </Form.Control>
        </Form.Group>

        <Button variant="warning" type="submit" disabled={isSubmitting} className="w-60">
          {isSubmitting ? 'Submitting...' : 'Submit Donation Intention'}
        </Button>
      </Form>
      <p className="mt-3 text-center text-muted">
        Note: This action records your intention to donate. Further steps for actual donation may be communicated separately.
      </p>
    </Container>
  );
}

export default DonationForm;
