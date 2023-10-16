import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <footer>
        <Container style={{ background: "#000", color: "white" }} fluid>
          <Row>
            <Col className="text-center">
              <span>Copyright &copy; Rajesh</span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
