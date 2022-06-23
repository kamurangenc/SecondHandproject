import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from './components/Product/ProductList'
import UserProduct from './components/ProductUser/UserProduct'
import ProductAdd from './components/ProductAdd/ProductAdd';
import SignUp from './components/Auth/SignUp';
import Error from './components/Error/Error';
import ProductDetail from './components/ProductDetail/ProductDetail';
import DUMMY_PRODUCTS from './components/Data/Data';
import Chat from './components/SendMessage/Chat';
import LoginPage from './components/Auth/SignIn';
import SignIn from './components/Auth/SignIn';


const App = () => {

  const [products, setProducts] = useState([]) 
  
  useEffect(() => {
    getItem();
  }, []);

  const getItem = () => {
    const localData = localStorage.getItem("data") ?? [];
    if(localData.length===0){
      localData.push(...DUMMY_PRODUCTS)
      setProducts(localData);
    }else{
      setProducts(JSON.parse(localData));
    } 
  };

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<SignIn/>} />
        <Route path="/addItem" element={<ProductAdd/>} />
        <Route path="/" element={<ProductList items={products}/>} />
        <Route path="/my-products" element={<UserProduct items={products}/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/:p_id" element={<ProductDetail items={products}/>} /> 
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
