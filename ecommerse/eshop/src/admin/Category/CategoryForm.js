

import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Alert } from '@mui/material';
import { createCategory } from '../../api/apiCalls'; 
import AdminNavbar from '../AdminNavbar';

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const response = await createCategory({ categoryName });
      setSuccessMessage(response.message);
      setCategoryName('');
      setError(''); 
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <AdminNavbar /> 
      <Container   style={{
                    backgroundColor: '#e1f5fe', 
                    padding: '2rem', 
                    borderRadius: '8px', 
                }}maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create a New Category
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Category Name"
              variant="outlined"
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              margin="normal"
              required
              disabled={loading} 
            />
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading} 
              sx={{ mt: 2 }}
            >
              {loading ? 'Creating...' : 'Create Category'}
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default CategoryForm;
