import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const FormContainer = ({ children, title }) => {
  return (
    <Container>
      <Row className="justify-content-md-center align-content-md-center  h-500">
        <Col md={5} lg={3} className="mybox-shadow p-3 mx-3 my-3">
          <h4 className="text-muted text-center">{title}</h4>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
