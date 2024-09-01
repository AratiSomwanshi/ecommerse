

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, CircularProgress, Alert } from '@mui/material';
import { getUserProfile } from '../../api/apiCalls';
import AdminNavbar from '../AdminNavbar';

const AdminProfilePage = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(token);
                setProfile(data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                setError('Failed to fetch profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <>
            <AdminNavbar /> {/* Include Admin Navbar */}
            <Container maxWidth="md"  style={{
                    backgroundColor: '#e1f5fe', 
                    padding: '2rem', 
                    borderRadius: '8px', 
                }}>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Avatar sx={{ width: 100, height: 100, margin: 'auto' }}>
                        {profile.name && profile.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h4" sx={{ mt: 2 }}>
                        {profile.name}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, color: 'gray' }}>
                        Admin Profile
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default AdminProfilePage;
