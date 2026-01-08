import React, { useState } from 'react';
import './Login.css';
import { login } from '../services/api';
import SignUpModal from '../components/SignUpModal';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await login(username, password);
      // Handle after successful login (save token and user)
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      // Notify parent to update auth state
      onLogin && onLogin();
      // Reset form
      setUsername('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <input 
            className="login-input" 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <span className="forgot-link" onClick={() => alert('Navigate to password recovery page')}>
          Forgot Password?
        </span>
        <button
          className="signup-button"
          onClick={() => setIsSignUpOpen(true)}
          disabled={loading}
        >
          Sign Up
        </button>
      </div>
      <SignUpModal 
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSuccess={() => {
        }}
      />
    </div>
  );
}

export default Login;