import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <footer className="footer fixed-bottom">
        <Container fluid>
          <Row className="align-items-center text-center">
            <Col className="text-white bg-primary">
              <p className="mb-0">&copy; 2026 Wys. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
