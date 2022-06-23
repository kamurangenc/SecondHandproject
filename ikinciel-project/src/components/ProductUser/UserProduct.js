import React, { useState } from "react";
import ProductItem from "./ProductUserItem";
import Search from "../Search/Search";
import { Col, Row, Card, Table } from "react-bootstrap";
import { auth } from "../../firebase";

import "../Product/ProductList.css";
import { useAuthState } from "react-firebase-hooks/auth";

const UserProduct = (props) => {
    const [user] = useAuthState(auth);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchPlace, setSearchPlace] = useState("");
  const options = [
    { value: 'Bilgisayar', label: 'Bilgisayar' },
    { value: 'Telefon', label: 'Telefon' },
    { value: 'Araba', label: 'Araba' },
    { value: 'Yatak', label: 'Yatak' },
  ];
  if (props.items.length === 0) {
    return <h2>No expenses found</h2>;
  }
  console.log('selected:', searchCategory)
  return (

    <div className="productList__page">
    {user ? (
    <Row>
    <Col md={2}>
      <div className="productList__search mr-5">
        <Search
          searchCategory={searchCategory}
          setSearchCategory={setSearchCategory}
          options= {options}
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
          searchPlace={searchPlace}
          setSearchPlace={setSearchPlace}
        />
      </div>
      </Col>
      <Col md={10}>
      <div>
        {props.items
            .filter((e) => 
              e.userMail === user.email
            )
          .filter((e) =>
            e.category.toLocaleLowerCase()
              .includes(searchCategory.toLocaleLowerCase())
          )
          .filter((e) =>
            e.place
              .toLocaleLowerCase()
              .includes(searchPlace.toLocaleLowerCase())
          )
          .filter((p) =>
            p.title
              .toLocaleLowerCase()
              .includes(searchTitle.toLocaleLowerCase())
          )
          .map((product) => (
            
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              imageURL={product.imageURL}
              price={product.price}
              place={product.place}
            />
          ))}
      </div>
      </Col>
      </Row>
    ): (<p>Lütfen giriş yapın</p>) }
    </div>
  );
};

export default UserProduct;
