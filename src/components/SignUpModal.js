import React, { useState } from 'react';
import { register } from '../services/api';
import './SignUpModal.css';

function SignUpModal({ isOpen, onClose, onSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validationEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Input validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validationEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register(username, email, password);
      // Reset form
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Sign Up</h2>
          <button className="modal-close" onClick={handleClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="modal-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <input
            className="modal-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            className="modal-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <input
            className="modal-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="modal-button"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;