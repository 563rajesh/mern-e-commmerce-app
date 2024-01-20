import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
const Sidebar = () => {
  return (
    <Nav
      className="flex-column"
      style={{
        backgroundColor: "rgba(22, 26, 22, 0.168)",
        color: "MenuText",
        height: "78vh",
      }}
    >
      <Link to="/admin/dashboard">Dashboard</Link>
      <NavDropdown title="Products">
        <LinkContainer to="/admin/products">
          <NavDropdown.Item>All</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/admin/newproduct">
          <NavDropdown.Item>+ create</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
      <Link to="/admin/orders">Orders</Link>
      <Link to="/admin/users">Users</Link>
    </Nav>
  );
};

export default Sidebar;
