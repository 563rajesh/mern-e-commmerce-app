import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../actions/orderActions";
import Message from "../../components/shared/Message";
import Loader from "../../components/shared/Loader";
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
      order.orderItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2);
  }

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <h2 className="text-muted text-center">Order Details</h2>
      <Row className="mb-5 mt-3">
        <Col md={7}>
          <ListGroup variant="flush" className="mybox-shadow">
            <ListGroup.Item>
              <h4 className="text-muted text-break">
                OrderId #<b>{order && orderId}</b>
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 className="text-muted">Shipping Info</h4>
              <address>
                <p>
                  <strong>Name:&nbsp;</strong>
                  <span>{order.user && order.user.name}</span>
                </p>
                <p>
                  <strong>Email:&nbsp;</strong>
                  <span> {order.user && order.user.email}</span>
                </p>
                <p>
                  <strong>Address:&nbsp;</strong>
                  {order.shippingAddress && (
                    <span>
                      {order.shippingAddress.address}&nbsp;
                      {order.shippingAddress.city}&nbsp;
                      {order.shippingAddress.postalCode}&nbsp;
                      {order.shippingAddress.country}&nbsp; phone: &nbsp;
                      {order.shippingAddress.mobileNo}&nbsp;
                    </span>
                  )}
                </p>
              </address>
            </ListGroup.Item>
            <ListGroup.Item>
              <Message
                variant={
                  order.orderStatus === "Delivered" ? "danger" : "primary"
                }
              >
                <em>
                  Status- <b>{order.orderStatus && order.orderStatus}</b>
                </em>
                {order.orderStatus === "Delivered" && (
                  <span>
                    {" "}
                    Delivered At {order.deliveredAt.substring(0, 10)}
                  </span>
                )}
              </Message>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 className="text-muted">Payment Info</h4>
              <p>
                <strong>
                  Paid Amount:&nbsp;${order.totalPrice}
                  <span>&nbsp; | &nbsp;</span>
                  {order.paymentMethod}
                </strong>
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  <i className="fa-solid fa-circle-check"></i>&nbsp; Paid On{" "}
                  {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 className="text-muted">
                {order.orderItems && order.orderItems.length === 1
                  ? "Order Item"
                  : "Order Items"}{" "}
              </h4>
              {order.orderItems && (
                <ListGroup variant="flush" className="mybox-shadow">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <ListGroup.Item key={item.product}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                            ></Image>
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
                            {" "}
                            {item.qty} X ${item.price} =
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
        <Col md={4} className="mt-sm-2 mt-md-0">
          <ListGroup variant="flush" className="mybox-shadow">
            <ListGroup.Item>
              <h4 className="text-muted">Order Summary</h4>
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
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>
                  <b>${order.totalPrice}</b>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetailsScreen;
