import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Card, CardContent } from "@mui/material";

function ProductForm({ token }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/products",
        { name, description, category, price, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = "/products";
    } catch (err) {
      console.log("Product add failed!", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add a Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Name" margin="normal" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField fullWidth label="Description" margin="normal" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} />
            <TextField fullWidth label="Category" margin="normal" variant="outlined" value={category} onChange={(e) => setCategory(e.target.value)} />
            <TextField fullWidth label="Price" type="number" margin="normal" variant="outlined" value={price} onChange={(e) => setPrice(e.target.value)} />
            <TextField fullWidth label="Rating" type="number" margin="normal" variant="outlined" value={rating} onChange={(e) => setRating(e.target.value)} />
            <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductForm;
