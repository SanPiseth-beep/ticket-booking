import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('bookingSaved');
    sessionStorage.removeItem('checkoutPayload');
  }, []);

  return (
    <div className="container" style={{ maxWidth: '64rem', margin: '2.5rem auto', padding: '1.5rem' }}>
      <div className="card" style={{ padding: '1.5rem' }}>
        <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Your Cart</h1>
        
        {cart.map(item => (
          <div key={item.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1.5rem', 
            paddingBottom: '1rem', 
            borderBottom: '1px solid var(--border-color)' 
          }}>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>{item.title}</h2>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                className="input"
                style={{ width: '6rem', padding: '0.5rem' }}
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '1.125rem', fontWeight: '500', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                ${item.price * item.quantity}
              </p>
              <button 
                onClick={() => removeFromCart(item.id)} 
                style={{ 
                  color: 'var(--error)', 
                  fontSize: '0.875rem', 
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Total: ${totalPrice}</h2>
        
        <button
          onClick={() => {
            const payload = JSON.stringify(cart);
            sessionStorage.setItem('checkoutPayload', payload);
            sessionStorage.setItem('bookingSaved', 'false');
            navigate('/success?bookingComplete=true');
          }}
          className="btn"
          style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
