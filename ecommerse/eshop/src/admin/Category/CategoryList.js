import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllCategories, deleteCategory } from '../../api/apiCalls'; 
import AdminNavbar from '../AdminNavbar'; 
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data); 
      } catch (error) {
        setError('Error fetching categories: ' + (error.message || 'Unknown error'));
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      setError('Error deleting category: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <>
    <AdminNavbar/>
    <Container  style={{
                    backgroundColor: '#e1f5fe', 
                    padding: '2rem', 
                    borderRadius: '8px', 
                }}>
      <Typography variant="h4" gutterBottom>Category List</Typography>
      <Button
        component={Link}
        to="/categoryform" 
        variant="contained"
        color="primary"
        style={{ marginBottom: '16px' }}
      >
        Add New Category
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(categories) && categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.categoryName}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/update`} 
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: '8px' }}
                  >
                  Edit
                  </Button>
                  <Button
                    component={Link}
                    to={`/categoryform`} 
                    variant="outlined"
                    color="secondary"
                    style={{ marginRight: '8px' }}
                  >
                    Category Form
                  </Button>
                  <Button
                    onClick={() => handleDelete(category.id)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </>
  );
};

export default CategoryList;
