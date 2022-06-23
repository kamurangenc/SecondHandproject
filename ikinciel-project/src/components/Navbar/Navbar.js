import React from "react";

import { Container, NavDropdown , Link, Navbar, Nav } from 'react-bootstrap';

import SignIn from "../Auth/SignIn";
import SignOut from "../Auth/SignOut";
import SignUp from "../Auth/SignUp";

import "./Navbar.css";
import { FaUserAlt } from 'react-icons/fa';
const Navi = () => {
  return (
 
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand  href="/">Ürünler</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto " >
      <Navbar.Brand  href="/addItem">İlan Ekle</Navbar.Brand>
    
    
    </Nav>
    <NavDropdown title={<FaUserAlt  size={30} color={'white'} />} id="basic-nav-dropdown">
    <NavDropdown.Item eventKey={2} href="/login" > Giriş Yap</NavDropdown.Item>
    <NavDropdown.Item href="/my-products">İlanlarım</NavDropdown.Item>
    <NavDropdown.Item href="/signup"> Kayıt Ol</NavDropdown.Item>

    <NavDropdown.Divider />
   
    <NavDropdown.Item href="#action/3.3"> <SignOut /></NavDropdown.Item>
  </NavDropdown>
    
  </Navbar.Collapse>
  </Container>
</Navbar>
     
  
  );
};

export default Navi;
