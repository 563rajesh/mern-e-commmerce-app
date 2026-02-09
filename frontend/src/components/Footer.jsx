import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <footer>
        <Container fluid>
          <Row className="footer">
            <Col className="text-center text-white bg-primary">
              <p>&copy; 2026 Wys. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
