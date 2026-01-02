import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'JOB_SEEKER' // Default role
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data) {
                const data = err.response.data;
                if (typeof data === 'string') {
                    setError(data);
                } else if (typeof data === 'object') {
                    const messages = Object.values(data).join(', ');
                    setError(messages || 'Registration failed.');
                } else {
                    setError('Registration failed.');
                }
            } else {
                setError('Registration failed. Server error.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
                    <option value="JOB_SEEKER">Job Seeker</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button type="submit" style={styles.button}>Register</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        padding: '0.5rem',
        fontSize: '1rem',
    },
    button: {
        padding: '0.5rem',
        fontSize: '1rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Register;
