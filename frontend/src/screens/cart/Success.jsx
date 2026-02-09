import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <Container>
      <Row className="justify-content-center align-items-center h-500">
        <Col md={4} className="text-center">
          <div>
            <i className="fa-solid fa-circle-check text-success"></i>
          </div>
          <div>
            <b className="text-success">
              Your Order has been Placed successfully{" "}
            </b>
          </div>

          <Link to="/myorders">
            <Button className="border-0 bg-dark">View Orders</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Success;
