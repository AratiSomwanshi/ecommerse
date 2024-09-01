import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
import { loginUser } from '../api/apiCalls';
import { TextField, Button, Typography, Box, Paper, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import Navbar from './NavBar';


import backgroundImage from '../images/po.jpg';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!role) {
            setError('Please select a role.'); 
            return;
        }
        setError(null);
        try {
            const response = await loginUser({ username, password });
            const token = response.data; 

            localStorage.setItem('token', token); 

            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.role;

            if (role === 'ADMIN' || userRole === 'ADMIN') {
                navigate('/admin-profile');
            } else {
                navigate('/userhome');
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login failed:', error);
        }
    };

    return (
        <Box 
            sx={{ 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed', 
            }}
        >
            <Navbar /> 
            
            <Paper sx={{ 
                padding: 4, 
                maxWidth: 400, 
                width: '100%', 
                zIndex: 1, 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            }} elevation={3}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Login
                </Typography>
                {error && <Typography color="error">{error}</Typography>} 
                <form onSubmit={handleLogin}>
                    <TextField 
                        label="Username" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <TextField 
                        label="Password" 
                        type="password" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <FormControl component="fieldset" sx={{ marginTop: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Role
                        </Typography>
                        <RadioGroup
                            row
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <FormControlLabel value="USER" control={<Radio />} label="User" />
                            <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                        </RadioGroup>
                    </FormControl>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ marginTop: 2 }}
                    >
                        Login
                    </Button>
                </form>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Don't have an account? <a href="/register">Register here</a>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
