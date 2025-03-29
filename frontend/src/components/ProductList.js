import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Card, CardContent, Grid } from "@mui/material";

function ProductList({ token }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filters = {}) => {
    try {
      const res = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      setProducts(res.data);
    } catch (err) {
      console.log("Can't get products!", err);
    }
  };

  const handleSearch = () => {
    fetchProducts({ q: search });
  };

  const handleFilter = () => {
    fetchProducts({ category, minPrice, maxPrice });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        Products
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Search" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
            Search
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Category" variant="outlined" value={category} onChange={(e) => setCategory(e.target.value)} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField fullWidth label="Min Price" type="number" variant="outlined" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField fullWidth label="Max Price" type="number" variant="outlined" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" fullWidth onClick={handleFilter}>
            Filter
          </Button>
        </Grid>
      </Grid>

      {products.map((product) => (
        <Card key={product._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography>Price: ₹{product.price}</Typography>
            <Typography>Category: {product.category}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default ProductList;
