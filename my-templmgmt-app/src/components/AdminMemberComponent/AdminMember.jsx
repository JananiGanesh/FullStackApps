import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminMember() {
    
      return (
        <div className="container mt-4">
          <h2>Admin Members Area</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Voucher Requests</h5>
                  <p className="card-text">View and manage incoming voucher requests from devotees.</p>
                  <Link to="/admin/members/voucher-requests" className="btn btn-warning">
                    Go to Voucher Requests
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Approvals History</h5>
                  <p className="card-text">View the history of approved voucher requests by administrators.</p>
                  <Link to="/admin/members/approvals" className="btn btn-warning">
                    View Approvals
                  </Link>
                </div>
              </div>
            </div>
            {/* You can add more cards for other admin member functionalities here */}
          </div>
    
          {/* The Outlet will render the content of the selected route */}
          <Outlet />
        </div>
      );
    }
    
    export default AdminMember;