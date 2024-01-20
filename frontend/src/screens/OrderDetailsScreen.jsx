import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../actions/orderActions";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { useAlert } from "react-alert";

const OrderDetailsScreen = ({ match }) => {
  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();
  const orderId = match.params.id;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, error, alert]);
  if (!loading) {
    order.itemsPrice =
      order.orderItems &&
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h4>OrderId #{order && orderId}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p>
                <strong>Name:</strong>
                {order.user && order.user.name}
              </p>
              <p>
                <strong>Email:</strong>
                {order.user && order.user.email}
              </p>
              <strong>Address :</strong>
              {order.shippingAddress && (
                <p>
                  {order.shippingAddress.address}&nbsp;
                  {order.shippingAddress.city}&nbsp;
                  {order.shippingAddress.postalCode}&nbsp;
                  {order.shippingAddress.country}&nbsp; Mo:{" "}
                  {order.shippingAddress.mobileNo}&nbsp;
                </p>
              )}
              <Message variant="info">
                Status- <b>{order.orderStatus && order.orderStatus}</b>
                {order.orderStatus === "Delivered" && (
                  <div> Delivered At {order.deliveredAt.substring(0, 10)}</div>
                )}
              </Message>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Payment Method</h4>
              <p>
                <strong>Pay by :</strong>&nbsp;
                <strong>{order.paymentMethod && order.paymentMethod}</strong>
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid On {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>
                Order{" "}
                {order.orderItems && order.orderItems.length === 1
                  ? "Item"
                  : "Items"}{" "}
              </h2>
              {order.orderItems && order.orderItems.length === 0 ? (
                <Message variant="warning">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems &&
                    order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                            ></Image>
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {" "}
                            {item.qty} X ${item.price}=
                            <b>${(item.qty * item.price).toFixed(2)}</b>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Subtotal</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    <b>${order.totalPrice}</b>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetailsScreen;
