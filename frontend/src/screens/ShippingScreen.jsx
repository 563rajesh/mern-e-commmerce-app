import React, { useState } from "react";
import FormContainer from "../components/shared/FormContainer";
import { Form, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../actions/cartAction";
import CheckoutStep from "../components/shared/CheckoutStep";
import { useAlert } from "react-alert";

const ShippingScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [mobileNo, setMobileNo] = useState(shippingAddress.mobileNo);

  const dispatch = useDispatch();
  const alert = useAlert();

  const submitHandler = (e) => {
    e.preventDefault();

    if (mobileNo.length < 10) {
      alert.error("Number must be 10 digits");
      return;
    }
    dispatch(
      saveShippingAddress({ address, city, postalCode, country, mobileNo })
    );
    history.push("/placeorder");
  };
  return (
    <Container>
      <CheckoutStep step1 />
      <FormContainer title="Enter address">
        <Form onSubmit={submitHandler} className="shipping bg-white">
          <Form.Group controlId="address">
            <i className="fa-solid fa-house icon"></i>
            <Form.Control
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <i className="fa-solid fa-city icon"></i>
            <Form.Control
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="postalCode">
            <i className="fa-solid fa-city icon"></i>
            <Form.Control
              type="text"
              placeholder="PostalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="country">
            <i className="fa-solid fa-earth-americas icon"></i>
            <Form.Control
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="mobileNo">
            <i className="fa-solid fa-phone icon"></i>
            <Form.Control
              type="text"
              placeholder="Phone no"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-block">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ShippingScreen;
