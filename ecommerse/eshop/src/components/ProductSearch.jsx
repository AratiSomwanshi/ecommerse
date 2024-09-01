import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Grid, Typography, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { searchProducts } from '../api/userproductApi'; // Adjust the path according to your project structure

const ProductSearch = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [prefix, setPrefix] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await searchProducts(name, price, prefix);
      setProducts(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Products
      </Typography>
      <form onSubmit={handleSearch}>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Max Price"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Name Prefix"
          variant="outlined"
          fullWidth
          margin="normal"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>

      {loading && <CircularProgress />}
      {error && <Typography color="error">Error searching products: {error.message}</Typography>}

      <Grid container spacing={3} marginTop={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.imageUrl || 'default-image-url.jpg'}
                alt={product.productName}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.productName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="textPrimary">
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductSearch;
