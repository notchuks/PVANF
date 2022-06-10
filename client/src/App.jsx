import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Cart from './pages/Cart';
import Login from './pages/Login';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';

const App = () => {
  const user = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={user ? <Navigate to="/" /> : <Register />}></Route>
        <Route path='/login' element={user ? <Navigate to="/" /> : <Login />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/products/:category' element={<ProductList />}></Route>
        <Route path='/product/:id' element={<Product />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
