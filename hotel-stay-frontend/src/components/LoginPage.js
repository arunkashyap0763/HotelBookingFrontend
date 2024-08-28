import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoginPage.css'; // Optional: for styling

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        debugger
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            debugger
            const response = await axios.post('https://localhost:7034/api/Auth/login', {
                username,
                password
            });

            if (response.status === 200) {
                // Handle successful login
                localStorage.setItem('authToken', response.data.token); // Save token or session data
                window.location.href = '/Hotel'; // Redirect to home page
            }
        } catch (error) {
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
