import React, { useState } from 'react'
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="login-container">
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='이메일을 입력하세요'
                />
                <button type="submit">로그인</button>
            </form>
        </div>
    )
}

export default Login