import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to log in');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '32rem', margin: '2.5rem auto' }}>
      <form onSubmit={handleSubmit} className="card" style={{ padding: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Login</h1>
        {error && <p style={{ color: 'var(--error)', marginBottom: '0.5rem' }}>{error}</p>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          className="input" 
          style={{ marginBottom: '1rem' }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
          className="input" 
          style={{ marginBottom: '1rem' }} 
        />
        <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;