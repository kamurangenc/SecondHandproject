import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import "./ProductItem.css";



const ProductItem = (props) => {

  return (
    <div>
    <Link to={`/${props.id}`} >
      <Card className="ProductItem__card" body outline>
        <CardBody className="ProductItem__cardBody">
        
     
          <img  
          
            className="ProductItem__image mt-2"
            style={{cursor: 'pointer'}}
            src={props.imageURL[0]}
            alt="Card cap"
          />
       
          
          <div className="ProductItem__div1">
            <CardTitle tag="h4"> <p  className=" text-muted"> </p> {props.title}</CardTitle>
          </div>
          <div className="ProductItem__div2">
          <CardText className="mb-2 text-muted " style={{fontSize : '12px', color: 'red'}} tag="h6">
        {props.place}
        </CardText>
            <CardText className="mb-1 ml-1 text-muted"  style={{fontSize : '16px' , color:'red'}} tag="h4">
              {props.price} TL
            </CardText>
           
          </div>
        
        </CardBody>
      </Card>
      </Link>
    </div>
  );
};

export default ProductItem;
