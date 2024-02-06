import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutStep = ({ step1, step2, step3 }) => {
  return (
    <>
      <Nav className="justify-content-between flex-nowrap">
        <Nav.Item>
          {step1 ? (
            <LinkContainer to="/shipping">
              <Nav.Link>
                <i className="fa-solid fa-truck-fast"></i>
                &nbsp;Shipping
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <i className="fa-solid fa-truck-fast"></i>
              &nbsp;Shipping
            </Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item className="after-before-line">
          {step2 ? (
            <LinkContainer to="/placeorder">
              <Nav.Link>
                <i className="fa-solid fa-check-to-slot"></i>
                &nbsp; Place order
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <i className="fa-solid fa-check-to-slot"></i>
              &nbsp;Place order
            </Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step3 ? (
            <LinkContainer to="/payment">
              <Nav.Link>
                <i className="fa-solid fa-money-check"></i>
                &nbsp;Payment
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <i className="fa-solid fa-money-check"></i>
              &nbsp;Payment
            </Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </>
  );
};

export default CheckoutStep;
