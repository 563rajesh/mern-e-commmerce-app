import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Rating from "../components/Rating";

const ProductDetails = () => {
  //   const product = Product.find((p) => p._id === id);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  return (
    <div>
      <Link to="/" className="btn btn-light">
        <i class="fa-solid fa-arrow-left"></i>
        &nbsp;GO BACK
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>price:{product.price}</ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <Row>
              <Col>status:</Col>
              <Col>{product.countInStock >= 0 ? "instock" : "outstock"}</Col>
            </Row>
            <ListGroupItem>
              <Button type="button" block>
                add to cart
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
