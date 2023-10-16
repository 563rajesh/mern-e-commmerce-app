import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import HomeScreen from "../screens/HomeScreen";

const Header = () => {
  const h1 = () => {
    return <h1>rajesh</h1>;
  };
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <LinkContainer to="/" component={<HomeScreen></HomeScreen>}>
            <Navbar.Brand>Onlineshop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart" component={h1}>
                <Nav.Link>
                  <i className="fa-solid fa-cart-shopping"></i>
                  &nbsp;cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signin">
                <Nav.Link>
                  <i className="fa-solid fa-users"></i>
                  &nbsp;signin
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
