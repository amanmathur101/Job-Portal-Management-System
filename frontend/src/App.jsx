import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import JobList from './pages/JobList';
import AdminDashboard from './pages/AdminDashboard';
import JobForm from './pages/JobForm';
import MyApplications from './pages/MyApplications';

// Placeholder Home Component
const Home = () => (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1>Welcome to Job Portal</h1>
        <p>Your dream job awaits!</p>
    </div>
);

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/create-job" element={<JobForm />} />
                <Route path="/admin/edit-job/:id" element={<JobForm />} />
                <Route path="/my-applications" element={<MyApplications />} />
            </Routes>
        </Router>
    );
}

export default App;
