import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import HomeScreen from "../screens/HomeScreen";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FormControl, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userAction";
import { useHistory, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [error, setError] = useState(null);
  const [aiLoading, setAILoading] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const [keyword, setKeyword] = useState("");

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleAISearch = async (e) => {
    e.preventDefault();
    setAILoading(true);

    try {
      if (!keyword || keyword.trim() === "") {
        setError("Please enter a search query.");
        return;
      }
      const { data } = await axios.post("/api/ai/parse", {
        query: keyword,
      });

      setAILoading(false);

      // 🔥 Fallback check
      if (!data.isValid) {
        setError("Couldn't understand your search. Try something else.");
        return;
      }

      const filters = data.filters;

      // 🔥 Convert to URL params
      const params = new URLSearchParams(location.search);

      if (filters.category) params.set("category", filters.category);
      if (filters.keyword) params.set("keyword", filters.keyword);
      if (filters.price) params.set("price", filters.price);
      if (filters.rating) params.set("rating", filters.rating);

      history.push(`/products/?${params.toString()}`);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setAILoading(false);
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setKeyword("");
    }
  }, [location.pathname]);
  useEffect(() => {
    if (error) {
      alert.error(error);
      setError(null);
    }
  }, [error, alert]);

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
            <Form inline onSubmit={handleAISearch} className="search ml-auto">
              <i className="fa-solid fa-magnifying-glass icon search-icon"></i>
              <FormControl
                type="text"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              <Button type="submit" className="text-white" disabled={aiLoading}>
                {aiLoading ? "Processing..." : "Search"}{" "}
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
