import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const formContainer = ({ children, title }) => {
  return (
    <Container>
      <Row className="justify-content-md-center align-content-md-center h-500">
        <Col md={3} className="mybox-shadow p-3">
          <h2 className="text-muted text-center">{title}</h2>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default formContainer;
