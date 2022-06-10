import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { popularProducts } from '../data';
import Product from './Product';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// recieving category, filters and sort as props from productList
const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:5000/api/products?category=${category}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (error) {
        
      }
    }
    getProducts();
  },[category]);

  // useEffect is called after every render by default, but if we pass a second argument(s)
  // (e.g [categrory] above), useEffect is called only when that argument changes.

  // if useEffect returns a function, that function is treated as componentWillUnmout & is called only when the component is removed from the DOM.

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  },[products, category, filters]);

  // Whenever we pass a function instead of a value into the setSomething parameter of useState,
  // in that function our previous state will be available in it. Refer below.

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      )
    } else if (sort === "asc") {
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => a.price - b.price)
      )
    } else if (sort === "desc") {
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => b.price - a.price)
      )
    }
  },[sort]);

  return (
    <Container>
      {category
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products.slice(0, 8).map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
}

export default Products;