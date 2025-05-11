import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from 'react-router-dom'; 
import './VoucherApproval.jsx'; // Import custom CSS for styling
import { useState } from 'react';



const AdminDashboard=()=> {
  const [reportType, setReportType] = useState('donor_report');
  

  const navigate = useNavigate();

  const handleViewVouchers = () => {
    navigate('/admin/voucher-approvals');
  };

/*  const handleViewDonors =()=>{
    navigate('/admin/donors');
  }*/
  const handleEvents =()=>{
    navigate('/admin/events');  
  }
  const handleViewEvents =()=>{
    navigate('/admin/view-events');
  }
 /* const handleViewSubscriptions =()=>{
    navigate('/admin/subscriptions'); 
  }*/
    const generateReport = () => {
      if (reportType === 'donor_report') {
        // Navigate to the DonorReport page
        navigate('/donor-report');
      }
      else if (reportType === 'daily_collection') {
        // Navigate to the DailyCollectionReport page   
      // Handle other report types (e.g., daily_collection, subscription_report) similarly
    }
      else if (reportType === 'subscription_report') {
        // Navigate to the SubscriptionReport page
        navigate('/admin/subscriptions');
      }
    }
  
  return (
    <div className="container-fluid">
      <h2 className="mt-4 mb-3">Temple Administration Dashboard</h2>
      <div className="row">
        {/* Voucher Approval Section */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-secondary text-white">
              Voucher Approval
            </div>
            <div className="card-body">
              {/* Placeholder for Voucher Approval List and Actions */}
              <p>Here you'll manage incoming voucher requests.</p>
              <button className="btn btn-sm btn-warning me-2"  onClick={handleViewVouchers}>Manage Vouchers</button>
             {/*} <button className="btn btn-sm btn-success">Approved Vouchers</button>
              <button className="btn btn-sm btn-danger">Rejected Vouchers</button>*/}
            </div>
          </div>
        </div>

        {/* Reports Generation Section */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-secondary text-white">
              Generate Reports
            </div>
            <div className="card-body">
              {/* Placeholder for Report Generation Options */}
              <p>Generate various reports for temple operations.</p>
              <div className="mb-2">
                
                <select className="form-select form-select-sm" id="reportType" value={reportType}
          onChange={(e) => setReportType(e.target.value)}>
                  {/*<option value="daily_collection">Daily Collection</option>*/}
                  <option value="donor_report">Donor</option>
                  <option value="subscription_report">Subscription</option>
                  {/* Add more report types as needed */}
                </select>
              </div>
              <button className="btn btn-sm btn-warning" onClick={generateReport}>View</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
       

        {/* Donors and Subscriptions Management Section 
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-secondary text-white">
              Donors & Subscriptions
            </div>
            <div className="card-body">
              
              <p>Manage donor information and subscription details.</p>
              <button className="btn btn-sm btn-warning me-2"onClick={handleViewDonors}>View Donors</button>
              <button className="btn btn-sm btn-warning" onClick={handleViewSubscriptions}>View Subscriptions</button>
             {/* <button className="btn btn-sm btn-outline-secondary">Add New Donor</button>
              <button className="btn btn-sm btn-outline-secondary">Add New Subscription</button>
            </div>
          </div>
        </div>*/}
      
        {/* Temple Schedules and Events Management Section */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-secondary text-white">
              Temple Schedules & Events
            </div>
            <div className="card-body">
              {/* Placeholder for Schedules and Events Management */}
              <p>Update temple schedules and manage upcoming events.</p>
              <button className="btn btn-sm btn-warning me-2" onClick={handleViewEvents}>View Schedule</button>
              <button className="btn btn-sm btn-warning" onClick={handleEvents}>Add Event</button>
              
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default AdminDashboard;