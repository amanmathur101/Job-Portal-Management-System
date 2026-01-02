import React, { useEffect, useState } from 'react';
import api from '../api/api';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get('/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs", error);
            }
        };

        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);

        fetchJobs();
    }, []);

    const handleApply = async (jobId) => {
        try {
            await api.post(`/applications/apply/${jobId}`);
            alert('Applied successfully!');
        } catch (error) {
            alert('Failed to apply: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div style={styles.container}>
            <h2>Available Jobs</h2>
            <div style={styles.list}>
                {jobs.map(job => (
                    <div key={job.id} style={styles.card}>
                        <h3>{job.title}</h3>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p>{job.description}</p>
                        {user && user.role === 'JOB_SEEKER' && (
                            <button onClick={() => handleApply(job.id)} style={styles.button}>Apply Now</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem' },
    list: { display: 'grid', gap: '1rem' },
    card: { border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' },
    button: { backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', marginTop: '10px' }
};

export default JobList;
