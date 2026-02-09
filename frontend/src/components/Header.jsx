import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import HomeScreen from "../screens/HomeScreen";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormControl, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userAction";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully");
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(`products/?search=${search}`);
    } else {
      history.push("/");
      setSearch("");
    }
  };

  return (
    <>
      <Navbar
        bg="primary"
        expand="lg"
        variant="dark"
        sticky="top"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/" component={<HomeScreen />}>
            <Navbar.Brand className="header-nav">Wys</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form
              inline
              onSubmit={searchSubmitHandler}
              className="search ml-auto"
            >
              <i className="fa-solid fa-magnifying-glass icon search-icon"></i>
              <FormControl
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button type="submit" className="text-white">
                Search
              </Button>
            </Form>

            <Nav className="ml-auto">
              <Nav>
                <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                <LinkContainer to="/contact">
                  <Nav.Link>Contact</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fa-solid fa-cart-shopping"></i>
                    &nbsp;Cart
                  </Nav.Link>
                </LinkContainer>
              </Nav>
              {isAuthenticated ? (
                <NavDropdown
                  title={user && user.name.toUpperCase()}
                  id="username"
                  alignRight
                >
                  <div className="p-2">
                    {user && user.role === "Admin" && (
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>
                          <i className="fa-solid fa-gauge"></i>&nbsp; Admin
                          Dashboard
                        </NavDropdown.Item>
                      </LinkContainer>
                    )}

                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <i className="fa-solid fa-user text-secondry"></i>
                        &nbsp; Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/myorders">
                      <NavDropdown.Item>
                        <i className="fa-solid fa-list"></i>&nbsp; Orders
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <i className="fa-solid fa-right-from-bracket text-danger"></i>
                      &nbsp; Logout
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
              ) : (
                <Nav>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fa-solid fa-user"></i>&nbsp; Signin
                    </Nav.Link>
                  </LinkContainer>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
