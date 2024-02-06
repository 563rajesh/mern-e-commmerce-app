import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

const ProductScreen = ({ product }) => {
  return (
    <Card className="mybox-shadow p-1 card-layout">
      <Card.Header>
        <Link to={`/product/${product._id}`}>
          <Card.Img variant="top" src={product.image} />
        </Link>
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Title as="div">
          <Link
            to={`/product/${product._id}`}
            className="text-body link-styles"
          >
            <span>{product.name}</span>
          </Link>
        </Card.Title>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="div">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductScreen;
