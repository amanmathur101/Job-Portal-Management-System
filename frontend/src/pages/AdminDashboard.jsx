import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';

const AdminDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await api.get('/jobs');
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/jobs/${id}`);
                fetchJobs(); // Refresh list
            } catch (error) {
                alert('Failed to delete job');
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>Admin Dashboard</h2>
            <Link to="/admin/create-job" style={styles.createButton}>Create New Job</Link>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job.id}>
                            <td>{job.title}</td>
                            <td>{job.location}</td>
                            <td>
                                <Link to={`/admin/edit-job/${job.id}`} style={styles.link}>Edit</Link>
                                <button onClick={() => handleDelete(job.id)} style={styles.deleteButton}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: { padding: '2rem' },
    createButton: { display: 'inline-block', backgroundColor: '#28a745', color: '#fff', padding: '0.5rem 1rem', textDecoration: 'none', marginBottom: '1rem' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem' },
    link: { marginRight: '1rem', color: '#007bff' },
    deleteButton: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }
};

export default AdminDashboard;
