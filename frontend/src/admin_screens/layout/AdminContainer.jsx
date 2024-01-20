import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Sidebar from "./Sidebar";

const AdminContainer = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={9}>{children}</Col>
      </Row>
    </Container>
  );
};

export default AdminContainer;
