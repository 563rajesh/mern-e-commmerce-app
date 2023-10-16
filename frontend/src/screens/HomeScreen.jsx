import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductScreen from "./ProductScreen";
import { Row, Col } from "react-bootstrap";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
      console.log(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} md={3}>
              <ProductScreen product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
