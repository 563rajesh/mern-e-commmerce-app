import React, { useState } from "react";
import { useAlert } from "react-alert";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const alert = useAlert();

  const handleUserMessage = (e) => {
    e.preventDefault();
    alert.success("Message sent");
    console.log(name, email, message);
  };
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-muted text-center">Contact Us</h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={10} className="my-2">
          <Row className="justify-content-md-around ">
            <Col md={4}>
              <div className="bg-primary px-5 py-2 my3 text-light text-center">
                <i className="bi bi-telephone"></i>
                <br />
                <span>+91 620310000</span>
              </div>
            </Col>
            <Col md={4}>
              <div className="bg-success   py-1 my3 text-light text-center">
                <i className="bi bi-envelope"></i>
                <br />
                <a className="" href="mailto:singhrajesh84657@gmail.com">
                  <Button className="bg-success border-0">
                    singhrajesh84657@gmail.com
                  </Button>
                </a>
              </div>
            </Col>
            <Col md={4}>
              <div className="bg-dark text-light px-5  py-2 my3 text-light text-center">
                <i className="bi bi-geo-alt-fill"></i>

                {/* <span>Address</span> */}
                <br />

                <div>Bihar, India</div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={10} className="my-2">
          <Row className="justify-content-md-center">
            <Col md={5}>
              <Form
                onSubmit={handleUserMessage}
                className="contact-form mybox-shadow py-3 px-5 rounded-2"
              >
                <h3 className="text-muted">Get in touch</h3>

                <Form.Group id="name">
                  <i className="fa-solid fa-spell-check icon"></i>
                  <Form.Control
                    type="input"
                    placeholder="Name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="email">
                  <i className="fa-solid fa-envelope icon"></i>

                  <Form.Control
                    type="input"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="message">
                  <i className="fa-solid fa-message icon"></i>

                  <Form.Control
                    as="textarea"
                    rows={3}
                    cols={30}
                    placeholder="Message"
                    value={message}
                    required
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit">Send message</Button>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col md={10} className="my-2">
          <div>
            <div>Contact me on: </div>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="text-primary m-1 "
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a
              href="https://www.github.com/"
              target="_blank"
              rel="noreferrer"
              className="text-dark m-1"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="text-primary m-1"
            >
              <i className="bi bi-facebook"></i>
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
