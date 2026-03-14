import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
// import States from './pages/States';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageProducts from './pages/Admin/ManageProducts';
import ManageUsers from './pages/Admin/ManageUsers';

// Artisan Pag
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            {/* <Route path="/states" element={<States />} /> */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
            
            {/* Info Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;