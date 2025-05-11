import React, { useState, useEffect } from 'react';
// import { formatDate, formatCurrency } from '../../utils/helpers'; // You might want to re-introduce these

const DonationHistoryPage = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // ... state for filters, sorting, pagination ...

    useEffect(() => {
        const fetchDonationHistory = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8081/api/v1/devotee/donations');
                if (!response.ok) {
                    throw new Error('Failed to fetch donation history');
                }
                const data = await response.json();
                setDonations(data); // The response is directly the array
                console.log('API Response Data:', data);
                console.log('Donations State:', donations);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDonationHistory();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <p>Loading donation history...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ color: 'red', margin: '20px', padding: '10px', border: '1px solid red' }}>
                Error loading donation history: {error}
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Donation History</h2>
            {donations.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        marginTop: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                        <thead style={{ backgroundColor: '#f2f2f2' }}>
                            <tr>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Donation ID</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Date</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Amount</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Cause</th>
                            </tr>
                        </thead>
                        <tbody style={{ backgroundColor: '#ffffff' }}>
                            {donations.map((donation, index) => (
                                <tr key={donation.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{donation.id}</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{donation.donationDate ? new Date(donation.donationDate).toLocaleDateString() : 'N/A'}</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{donation.donationAmount}</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{donation.donationCause}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p style={{ textAlign: 'center', color: '#777' }}>No donation history found.</p>
            )}
            {/* ... FilterOptions and PaginationControls components ... */}
        </div>
    );
};

export default DonationHistoryPage;
