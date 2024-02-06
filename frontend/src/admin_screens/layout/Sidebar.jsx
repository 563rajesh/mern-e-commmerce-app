import React from "react";
import { Col, Nav, NavDropdown, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Sidebar = () => {
  return (
    <Row>
      <Col>
        <Nav className="flex-column  admin-sidebar bg-light text-white pt-4 text-center">
          <Nav.Item>
            <LinkContainer to="/admin/dashboard">
              <Nav.Link className="admin-sidebar-nav">
                <i className="fa-solid fa-gauge"></i> Dashboard
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <NavDropdown title="Products" className="admin-sidebar-nav">
            <LinkContainer to="/admin/products">
              <NavDropdown.Item className="admin-sidebar-nav">
                <i className="fa-solid fa-list"></i> All
              </NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/admin/newproduct">
              <NavDropdown.Item className="admin-sidebar-nav">
                <i className="fa-solid fa-plus"></i> Create
              </NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <Nav.Item>
            <LinkContainer to="/admin/orders">
              <Nav.Link className="admin-sidebar-nav">
                <i className="fa-solid fa-list"></i> Orders
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/admin/users">
              <Nav.Link className="admin-sidebar-nav">
                <i className="fa-solid fa-users"></i> Users
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/admin/reviews">
              <Nav.Link className="admin-sidebar-nav">
                <i className="fa-solid fa-star"></i> Reviews
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      </Col>
    </Row>
  );
};

export default Sidebar;
