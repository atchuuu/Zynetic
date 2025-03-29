import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <Router>
      <div className="App">
        <h1>Yo, welcome to the Shop!</h1>
        {token && <button onClick={logout}>Logout</button>}
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ProductList token={token} />} />
          <Route path="/add-product" element={<ProductForm token={token} />} />
          <Route path="/" element={<Login setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
