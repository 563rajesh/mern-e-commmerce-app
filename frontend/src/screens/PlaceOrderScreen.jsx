import React from "react";
import { useSelector } from "react-redux";
import CheckoutStep from "../components/shared/CheckoutStep";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PlaceOrderScreen = ({ history }) => {
  const { shippingAddress, cartItems } = useSelector((state) => state.cart);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

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
    <>
      <CheckoutStep step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item variant="info">
              <h4> Shipping Info</h4>
              Name
              <div>Rajesh kumar</div>
              Phone
              <div>{shippingAddress.mobileNo}</div>
              <p>Address - {address}</p>
            </ListGroup.Item>

            <ListGroup.Item variant="primary">
              <h2>Order items</h2>

              <ListGroup variant="flush">
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid></Image>
                      </Col>
                      <Col>
                        <Link to={`product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} X ${item.price}=
                        <b>${(item.qty * item.price).toFixed(2)}</b>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Order Summary</h4>
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
                variant="dark"
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
    </>
  );
};

export default PlaceOrderScreen;
