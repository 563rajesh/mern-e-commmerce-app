import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import {
  Row,
  Col,
  ListGroup,
  Image,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { useParams, Link, NavLink } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/shared/Loader";
import { Alert } from "react-bootstrap";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);
  // const addToCartHandler = () => {
  //   // history.push(`/cart/${id}?qty=${qty}`);
  // };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div>
          <Link to="/" className="btn btn-light">
            <i className="fa-solid fa-arrow-left"></i>
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
              <ListGroupItem>
                <Row>
                  <Col>status:</Col>
                  <Col>
                    {product.countInStock >= 0 ? "instock" : "outstock"}
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>l{" "}
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <NavLink
                  to={`/cart/${id}?qty=${qty}`}
                  style={{
                    background: "#000",
                    color: "#eff4ef",
                    padding: "5px 20px",
                  }}
                >
                  add to cart
                </NavLink>
              </ListGroupItem>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
