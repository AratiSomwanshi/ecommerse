
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';


import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer'; 
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './users/UserProfile';
import UsersHome from './users/UsersHome';
import Cart from './users/Cart';
import AdminProfile from './admin/Profile/AdminProfile';
import AdminProfilePage from './admin/Profile/AdminProfilePage';
import CategoryForm from './admin/Category/CategoryForm';
import UpdateCategoryForm from './admin/Category/UpdateCategoryForm';
import CategoryList from './admin/Category/CategoryList';
import OrderManagement from './admin/OrderManagement';
import PaymentDetails from './admin/PaymentDetails';
import PaymentList from './admin/PaymentList';
import ReviewList from './admin/ReviewList';
import ProductForm from './admin/Products/ProductForm';
import Home from './Home';


import ProductTable from './admin/Products/ProductTable';
import BuyPage from './BuyPage';
function App() {
  return (
    <Router>
      <CssBaseline />
      <div style={{ marginTop: '64px', padding: '20px' }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/userhome" element={<UsersHome />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/userhome" element={<UsersHome />} />
          <Route path="/buy/:productId" element={<BuyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/adminprofiles" element={<AdminProfile />} />
          
          <Route path="/categoryform" element={<CategoryForm />} />
          <Route path="/categorylist" element={<CategoryList />} />
          <Route path="/paymentdetails" element={<PaymentDetails />} />
          <Route path="/paymentlist" element={<PaymentList />} />
          <Route path="/ordermanagement" element={<OrderManagement />} />
          <Route path="/reviewlist" element={<ReviewList />} />
          <Route path="/update" element={<UpdateCategoryForm />} />

          <Route path="/admin-profile" element={<AdminProfilePage />} />
          <Route path="/products" element={<ProductTable />} />
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/edit/:id" element={<ProductForm />} />
        
        
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
