import React, { useEffect } from "react";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import ProductScreen from "./ProductScreen";
import { Row, Col, Container } from "react-bootstrap";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  console.log(props);
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products &&
            products.map((product) => {
              return (
                <Col key={product._id} md={3}>
                  <ProductScreen product={product} />
                </Col>
              );
            })}
        </Row>
      )}
    </Container>
  );
};

export default HomeScreen;
