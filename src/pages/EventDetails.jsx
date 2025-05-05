import React from 'react';
import { useParams } from 'react-router-dom';
import events from '../data/data';
import { useCart } from '../contexts/CartContext';

const EventDetails = () => {
  const { eventId } = useParams();
  const event = events.find(e => e.id === parseInt(eventId));
  const { addToCart } = useCart();

  return (
    <div className="container" style={{ maxWidth: '64rem', margin: '2.5rem auto', padding: '1.5rem' }}>
      <div className="card" style={{ overflow: 'hidden' }}>
        <img
          src={event.thumbnail}
          alt={event.title}
          style={{ width: '100%', height: '16rem', objectFit: 'cover', marginBottom: '1.5rem' }}
        />
        <div className="card-content">
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>{event.title}</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{event.date} • {event.location}</p>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-dark)', marginBottom: '1rem' }}>{event.description}</p>
          <p style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>${event.price}</p>
          <button
            onClick={() => addToCart(event, 1)}
            className="btn"
            style={{ width: '100%', padding: '0.75rem 0', fontSize: '1rem' }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;