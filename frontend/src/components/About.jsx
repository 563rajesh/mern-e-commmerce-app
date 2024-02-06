import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <Row>
        {/* your image in side */}
        <Col md={12}>
          <h2 className="text-center text-muted">About Us</h2>
        </Col>
        <Col>
          <div className="aboutSectionGradient p-3 text-light text-justify">
            <p className="text-light bg-success d-inline-block">
              Welcome to <b>Wys</b> ecommerce site, your premier destination for
              online shopping !
            </p>
            <br />
            At Wys, we're dedicated to redefining your shopping experience by
            offering a vast selection of high-quality products, exceptional
            customer service, and unparalleled convenience, all at your
            fingertips.
            <div className="text-right">
              <span>@ Founder</span>
              <br />
              <span>Rajesh Kumar</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md={4}>
          <Card className="mybox-shadow text-center my-2 pt-2">
            <Card.Text>
              <i className="fa-regular fa-eye text-primary"></i>
            </Card.Text>
            <Card.Title className="text-primary">Vision</Card.Title>
            <Card.Body className="text-justify">
              "Our vision is to revolutionize the way people shop online by
              providing a <b>seamless</b>, <b>personalized</b>, and{" "}
              <b>convenient</b> shopping experience. We envision a future where
              customers can easily discover and purchase products they love,
              while fostering a vibrant online community centered around shared
              interests and passions."
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          {" "}
          <Card className="mybox-shadow text-center my-2 pt-2">
            <Card.Text>
              <i className="fa-solid fa-bullseye text-success"></i>
            </Card.Text>
            <Card.Title className="text-success">Mission</Card.Title>
            <Card.Body className="text-justify">
              "We strive to offer high-quality products at competitive prices,
              ensuring our customers receive the best value for their money."
              <br />
              "We believe in empowering customers with a wide selection of
              products across various categories, catering to diverse tastes and
              preferences.We embrace <b>innovation</b> and leverage emerging
              technologies to enhance the shopping experience"
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mybox-shadow text-center my-2 pt-2">
            <Card.Text>
              <i className="fa-solid fa-trophy text-warning"></i>
            </Card.Text>
            <Card.Title className="text-warning">Achievment</Card.Title>
            <Card.Body className="text-justify">
              " Our commitment to exceptional customer service has resulted in
              consistently high customer <b>satisfaction</b> ratings and
              positive reviews."
              <br />" Our e-commerce platform has expanded its reach to serve
              customers worldwide, establishing partnerships with international
              suppliers and optimizing logistics for efficient global shipping."
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
