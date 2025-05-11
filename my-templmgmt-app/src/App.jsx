import React from 'react';
import './App.css';
import CustomNavbar from './components/HeaderComponent/CustomNavbar';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from 'react-router-dom';
import Signup from './components/LoginComponent/Signup';
import Login from './components/LoginComponent/Login';
import RegistrationForm from './components/DevoteeComponent/RegistrationForm';
import DonationForm from './components/DevoteeComponent/DonationForm';
import DonationHistoryPage from './components/DevoteeComponent/DonationHistory';
import DevoteeSubscriptionPage from './components/DevoteeComponent/DevoteeSubscriptionPage';
import Home from './components/HomeComponent/Home';
import EventsPage from './components/EventsComponent/EventsPage';
import DevoteePage from './components/DevoteeComponent/DevoteePage';
import About from './components/AboutusComponent/About'; 
import Registration from './components/DevoteeComponent/Registration'; 
import AdminDashboard from './components/AdminComponent/AdminDashboard';
import AdminMember from './components/AdminMemberComponent/AdminMember';
import VoucherRequest from './components/AdminMemberComponent/VoucherRequest';
import VoucherApproval from './components/AdminComponent/VoucherApproval';
import ApprovedVouchers from './components/AdminMemberComponent/ApprovedVouchers';
import Donors from './components/AdminComponent/Donors';
import DonorReport from './components/AdminComponent/DonorReport';
import ViewSubscriptions from './components/AdminComponent/ViewSubscriptions';
import DevoteeUpdation from './components/DevoteeComponent/DevoteeUpdation';
import AddEvent from './components/AdminComponent/AddEvent';
import ViewEvents from './components/AdminComponent/ViewEvents';




const isAuthenticated = () => {
    // In a real application, you would check for a token or session
    return localStorage.getItem('authToken') !== null;
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};

function App() {
    return (
        <>
            <Router>
                <AppContent />
            </Router>
        </>
    );
}

function AppContent() {
    const location = useLocation();
    const shouldShowNavbar = location.pathname !== '/devotee';

    return (
        <>
            {shouldShowNavbar && <CustomNavbar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/members/voucher-requests" element={<VoucherRequest />} />
                <Route
                    path="/admin/voucher-approvals"
                    element={
                        
                            <VoucherApproval />
                        
                    }
                />
                <Route
                    path="admin/members/approvals"
                    element={
                        
                            <ApprovedVouchers />
                        
                    }
                />
                <Route
                    path="/admin/members/*"
                    element={
                        
                            <AdminMember />
                        
                    }
                />
                <Route path="/donor-report" element={<DonorReport />} />
                <Route path="/admin/donors" element={<Donors />} />
                <Route path="/admin/subscriptions" element={<ViewSubscriptions />} />
                <Route path="/admin/events" element={<AddEvent/>}/>
                <Route path="/admin/view-events" element={<ViewEvents />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/devotee"
                    element={
                        
                            <DevoteePage />
                    }
                />
                <Route path="/register" element={<Registration />} />
                <Route path="/subscriptions" element={<DevoteeSubscriptionPage />} />
                <Route path="/donate" element={<DonationForm />} />
                <Route path="/donation-history" element={<DonationHistoryPage />} />
            </Routes>
        </>
    );
}

export default App;