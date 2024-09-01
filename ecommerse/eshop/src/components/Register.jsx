import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/apiCalls';
import { TextField, Button, Typography, Box, Paper, Alert, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import Navbar from '../components/NavBar';
import backgroundImage from '../images/po.jpg';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!role) {
            setError('Please select a role.');
            return;
        }
        setError(null);
        try {
            await registerUser({ username, email, password, role, address });
            navigate('/login');
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Registration failed:', error);
        }
    };

    return (
        <Box 
            sx={{ 
                height: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'rgba(0, 0, 0, 0.5)' 
            }}
        >
            <Navbar /> 
            
            <Paper 
                sx={{ 
                    padding: 4, 
                    maxWidth: 400, 
                    width: '100%', 
                    zIndex: 1, 
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                }} 
                elevation={3}
            >
                <Typography variant="h5" component="h2" gutterBottom>
                    Register
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleRegister}>
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
                        label="Email" 
                        type="email" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
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
                    <TextField 
                        label="Address" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
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
                        Register
                    </Button>
                </form>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Already have an account? <a href="/login">Login here</a>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Register;
