import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Profile = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const q = query(collection(db, 'bookings'), where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setBookings(data);
    };

    if (currentUser) fetchBookings();
  }, [currentUser]);

  return (
    <div className="container" style={{ maxWidth: '36rem', margin: '2.5rem auto' }}>
      <div className="card" style={{ padding: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Profile</h1>
        <p style={{ marginBottom: '1rem' }}>
          Email: <span style={{ fontWeight: '500' }}>{currentUser.email}</span>
        </p>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Booking History</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {bookings.map((booking, index) => (
            <div 
              key={index} 
              style={{ 
                border: '1px solid var(--border-color)', 
                padding: '0.75rem', 
                borderRadius: '0.375rem', 
                backgroundColor: 'var(--bg-light)' 
              }}
            >
              <p>
                {booking.eventTitle} - {booking.date} - 
                <span style={{ fontWeight: '600' }}>${booking.total}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
