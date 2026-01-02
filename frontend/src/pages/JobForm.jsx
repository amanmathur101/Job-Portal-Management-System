import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

const JobForm = () => {
    const [job, setJob] = useState({ title: '', description: '', location: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchJob = async () => {
                try {
                    const response = await api.get(`/jobs/${id}`);
                    setJob(response.data);
                } catch (error) {
                    console.error("Error fetching job", error);
                }
            };
            fetchJob();
        }
    }, [id]);

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await api.put(`/jobs/${id}`, job);
            } else {
                await api.post('/jobs', job);
            }
            navigate('/admin');
        } catch (error) {
            alert('Failed to save job');
        }
    };

    return (
        <div style={styles.container}>
            <h2>{id ? 'Edit Job' : 'Create Job'}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    name="title"
                    value={job.title}
                    onChange={handleChange}
                    placeholder="Job Title"
                    required
                    style={styles.input}
                />
                <textarea
                    name="description"
                    value={job.description}
                    onChange={handleChange}
                    placeholder="Job Description"
                    required
                    style={{ ...styles.input, height: '100px' }}
                />
                <input
                    name="location"
                    value={job.location}
                    onChange={handleChange}
                    placeholder="Location"
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Save Job</button>
            </form>
        </div>
    );
};

const styles = {
    container: { maxWidth: '500px', margin: '2rem auto', padding: '1rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    input: { padding: '0.5rem', fontSize: '1rem' },
    button: { padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }
};

export default JobForm;
