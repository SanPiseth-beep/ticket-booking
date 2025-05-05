import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
  const { clearCart } = useCart();
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const bookingComplete = params.get('bookingComplete') === 'true';
    const alreadySaved = sessionStorage.getItem('bookingSaved');
    const payload = JSON.parse(sessionStorage.getItem('checkoutPayload'));

    const saveBooking = async () => {
      if (bookingComplete && alreadySaved !== 'true' && currentUser && payload?.length > 0) {
        sessionStorage.setItem('bookingSaved', 'true');

        for (const item of payload) {
          await addDoc(collection(db, 'bookings'), {
            userId: currentUser.uid,
            eventTitle: item.title,
            quantity: item.quantity,
            total: item.price * item.quantity,
            date: Timestamp.now().toDate().toLocaleString()
          });
        }

        clearCart();
        sessionStorage.removeItem('checkoutPayload');
      }
    };

    saveBooking();

    const timeout = setTimeout(() => {
      navigate('/');
    }, 4000);

    return () => clearTimeout(timeout);
  }, [clearCart, currentUser, location.search, navigate]);

  return (
    <div style={{
      maxWidth: '32rem',
      margin: '2.5rem auto',
      padding: '2rem',
      textAlign: 'center',
      borderRadius: '1rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }}
    className="success-container"
    >
      <h1 style={{
        fontSize: '1.875rem',
        fontWeight: '800',
        marginBottom: '0.75rem',
        color: '#10B981' // green color
      }}>Thank you for your booking!</h1>
      <p style={{
        color: 'var(--text-muted)'
      }}>You will be redirected to the homepage shortly.</p>
    </div>
  );
};

export default Success;