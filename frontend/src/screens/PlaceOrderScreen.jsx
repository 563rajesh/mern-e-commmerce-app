import React from "react";
import { useSelector } from "react-redux";
import CheckoutStep from "../components/shared/CheckoutStep";
import { Row, Col, ListGroup, Image, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const PlaceOrderScreen = ({ history }) => {
  const { shippingAddress, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const itemsPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  const shippingPrice = itemsPrice > 1000 ? 0 : 50;

  const taxPrice = Number(0.15 * itemsPrice).toFixed(2);

  const totalPrice = Math.round(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  const address = `${shippingAddress.address}
    ${shippingAddress.city}
    ${shippingAddress.postalCode}
    ${shippingAddress.country}
    ${shippingAddress.mobileNo}`;

  const placeOrderHandler = () => {
    const data = {
      orderItems: cartItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/payment");
  };

  return (
    <Container>
      <CheckoutStep step1 step2 />
      <Row className="justify-content-md-center my-4">
        <Col md={7}>
          <ListGroup variant="flush">
            <h4 className="text-muted">Shipping Info</h4>
            <ListGroup.Item className="">
              <Row>
                <Col>
                  <address>
                    <p>
                      <span>Name : &nbsp;</span>
                      <span>{user.name}</span>
                    </p>
                    <p>
                      <span>Email: &nbsp;</span>
                      <span>{user.email}</span>
                    </p>
                    <p>
                      <span>Phone: &nbsp;</span>
                      <span>{shippingAddress.mobileNo}</span>
                    </p>
                    <p>
                      <span>Address: &nbsp;</span>
                      <span className="float-right">{address}</span>
                    </p>
                  </address>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <h4 className="text-muted">Order items</h4>
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.product}
                className="mx-4 mybox-shadow my-1"
              >
                <Row className="justify-content-md-between">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid></Image>
                  </Col>
                  <Col>
                    <Link
                      to={`/product/${item.product}`}
                      className="link-styles text-body"
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={4}>
                    {item.qty} X ${item.price} = &nbsp;
                    <b>${(item.qty * item.price).toFixed(2)}</b>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush" className="mybox-shadow">
            <ListGroup.Item>
              <h4 className="text-muted">Order Summary</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Subtotal</Col>
                <Col>${itemsPrice}</Col>
              </Row>
              <Row>
                <Col>Shipping Charges</Col>
                <Col>${shippingPrice}</Col>
              </Row>
              <Row>
                <Col>Tax</Col>
                <Col>${taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant="primary"
                className="btn-block"
                type="button"
                onClick={placeOrderHandler}
                disabled={cartItems.length === 0}
              >
                Place order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
