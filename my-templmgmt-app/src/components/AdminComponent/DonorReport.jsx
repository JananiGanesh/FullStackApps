import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table, Alert } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const DonorReport = () => {
  const [donorData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [loader, setLoader] = useState(false);


  const downloadPdf = () => {
    const capture = document.querySelector('.report'); // Ensure this selector is correct!
    if (!capture) {
      console.error("Element with class 'report' not found!");
      return; // Important: Exit if the element doesn't exist
    }

    setLoader(true); //  Show a loading indicator

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
      doc.save('DonorReport.pdf');
    }).catch(error => {
      console.error('Error generating PDF:', error);
     
    }).finally(() => {
      setLoader(false); 
    });
  };

  useEffect(() => {
    fetch('http://localhost:8081/api/v1/devotee/donations')
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setError('Error loading report');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4 ">
      <br></br>
      {loading && (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}

      {/* Display report data */}
      <div className="report">
         <h3>Donor Report</h3>
         <div className="text-left mt-4">
        <Button variant="warning" size="sm" onClick={downloadPdf} disabled={!(loader === false)}>
          {loader ? (<span>Downloading</span>) : <span>Download </span>}

        </Button>
        <br>
        </br>
      </div>
        {!loading && donorData.length > 0 && (
          <Table striped bordered hover responsive className="mt-4">
            <thead className="table-success">
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
              {donorData.map((donation) => (
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
      </div>
      
    </div>



  );
};

export default DonorReport;
