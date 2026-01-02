import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.brand}>
                <Link to="/" style={styles.link}>JobPortal</Link>
            </div>
            <div style={styles.links}>
                {token ? (
                    <>
                        {user.role === 'ADMIN' && <Link to="/admin" style={styles.link}>Admin Dashboard</Link>}
                        {user.role === 'JOB_SEEKER' && <Link to="/jobs" style={styles.link}>Jobs</Link>}
                        {user.role === 'JOB_SEEKER' && <Link to="/my-applications" style={styles.link}>My Applications</Link>}
                        <span style={{ color: '#fff', marginRight: '10px' }}>Hello, {user.name}</span>
                        <button onClick={handleLogout} style={styles.button}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.link}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#333',
        color: '#fff',
    },
    brand: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    links: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
    },
    button: {
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Navbar;
