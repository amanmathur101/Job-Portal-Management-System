import React, { useEffect, useState } from 'react';
import api from '../api/api';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await api.get('/applications/my-applications');
                setApplications(response.data);
            } catch (error) {
                console.error("Error fetching applications", error);
            }
        };
        fetchApplications();
    }, []);

    return (
        <div style={styles.container}>
            <h2>My Applications</h2>
            {applications.length === 0 ? <p>No applications found.</p> : (
                <ul style={styles.list}>
                    {applications.map(app => (
                        <li key={app.id} style={styles.item}>
                            <strong>{app.job.title}</strong> at {app.job.location} <br />
                            <small>Applied on: {app.appliedDate}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '2rem' },
    list: { listStyleType: 'none', padding: 0 },
    item: { borderBottom: '1px solid #eee', padding: '1rem 0' }
};

export default MyApplications;
