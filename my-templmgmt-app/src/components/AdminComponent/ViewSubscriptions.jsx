import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const ViewSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const downloadPdf = () => {
    const capture = document.querySelector('.report'); // Ensure this selector is correct!
    if (!capture) {
        console.error("Element with class 'report' not found!");
        return; // Important: Exit if the element doesn't exist
    }

    setLoading(true); //  Show a loading indicator

    html2canvas(capture, {
        // Increased scale for better resolution in the PDF
        scale: 2, //  Try adjusting this value (e.g., 2, 3, or even higher)
        //useCORS: true, //  Enable cross-origin resource handling (if needed for images)
        // Add a timeout, in case the element takes time to render
        timeout: 10000,
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('l', 'pt', 'a4'); // 'l' for landscape, 'pt' for points, 'a4' for paper size
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();

        // Calculate scale to fit the image within the PDF page
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const widthRatio = componentWidth / imgWidth;
        const heightRatio = componentHeight / imgHeight;
        const scaleFactor = Math.min(widthRatio, heightRatio); // Use the smaller ratio to fit fully

        const scaledWidth = imgWidth * scaleFactor;
        const scaledHeight = imgHeight * scaleFactor;

        // Calculate centering position
        const x = (componentWidth - scaledWidth) / 2;
        const y = (componentHeight - scaledHeight) / 2;
      
        doc.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
        doc.save('SubscriptionReport.pdf');
    }).catch(error => {
        console.error('Error generating PDF:', error);
        //  Handle the error appropriately, e.g., show a user-friendly message
    }).finally(() => {
        setLoading(false); //  Hide the loading indicator, even on error
    });
};


  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/v1/admin/subscriptions'); // Update to your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setSubscriptions(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load subscriptions.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Paused': return 'warning';
      case 'Cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="container mt-4">
      <div className='report'>
          <h3 >Subscription Report</h3>


      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-success">
            <tr>
              <th>ID</th>
              <th>Devotee Name</th>
              <th>Type</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>Next Renewal</th>
              {/*<th>Actions</th>*/}
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                <td>{sub.name}</td>
                <td>{sub.type}</td>
                <td>{sub.amount}</td>
                <td>
                  <Badge bg={getStatusVariant(sub.status)}>{sub.status}</Badge>
                </td>
                <td>{sub.startDate}</td>
                <td>{sub.nextRenewal}</td>
               { /*<td>
                  <Button variant="info" size="sm" className="me-2">View</Button>
                  <Button variant="warning" size="sm" className="me-2">Edit</Button>
                  <Button variant="danger" size="sm">Cancel</Button>
                </td>*/}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      </div>

      <div className="text-center mt-4">
                <Button variant="warning" size="sm" onClick={downloadPdf} disabled={!(loading===false)}>
        {loading?(<span>Downloading</span>):<span>Download </span>} 
        
      </Button>
      </div>
    </div>
  );
};

export default ViewSubscriptions;
