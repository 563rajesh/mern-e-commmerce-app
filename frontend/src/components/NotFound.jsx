import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <Row className="justify-content-center align-items-center h-500">
        <Col md={3} className="text-center">
          <h2>
            <i className="fa-solid fa-circle-exclamation text-danger"></i>
          </h2>
          <div>Page not found</div>
          <Link to="/">
            <Button className="btn-dark px-3 mt-2">Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
