import React, { useState } from 'react';
import './Login.css'; // 작성한 CSS 파일을 불러옵니다.

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    console.log("Login attempt:", { username, password });
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
          />
          <input 
            className="login-input" 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <span className="forgot-link" onClick={() => alert('비밀번호 찾기 페이지로 이동')}>
          Forgot Password?
        </span>
      </div>
    </div>
  );
}

export default Login;