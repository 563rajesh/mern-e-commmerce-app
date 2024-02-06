import React, { useEffect, useState } from "react";
import AdminContainer from "./layout/AdminContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../actions/orderActions";
import { Button, Form, Image, Col, Row, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/shared/Loader";
import { useAlert } from "react-alert";
import { UPDATE_ORDER_RESET } from "../constants/orderConstants";
import Message from "../components/shared/Message";

const ProcessOrder = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [status, setStatus] = useState("");
  const [isDelivered, setIsDelivered] = useState(false);

  const { loading, error, order } = useSelector((state) => state.orderDetails);

  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const orderId = match.params.id;

  const processOrderSubmitHandler = (e) => {
    e.preventDefault();
    if (status === "Delivered") {
      setIsDelivered(true);
    }
    dispatch(updateOrder(orderId, { isDelivered, status }));
    setStatus("");
  };

  if (!loading) {
    order.itemsPrice =
      order.orderItems &&
      order.orderItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2);
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(orderId));
  }, [dispatch, alert, error, orderId, isUpdated, updateError]);
  return (
    <AdminContainer>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className="py-3 mb-2">
            <Col md={7}>
              <ListGroup variant="flush" className="mybox-shadow">
                <ListGroup.Item>
                  <h4 className="text-muted text-break">
                    OrderId #<b>{order && orderId}</b>
                  </h4>
                </ListGroup.Item>
                {order.shippingAddress && (
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
                            {order.shippingAddress.country}&nbsp;, phone:{" "}
                            {order.shippingAddress.mobileNo}&nbsp;
                          </span>
                        )}
                      </p>
                    </address>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <div>
                    Status:&nbsp;
                    <span
                      className={
                        order.orderStatus === "Delivered"
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                  {order.orderStatus === "Delivered" ? (
                    <div>
                      {" "}
                      Delivered At {order.deliveredAt.substring(0, 10)}
                    </div>
                  ) : (
                    ""
                  )}
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

                  <ListGroup variant="flush">
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
            <Col md={4} className="my-md-0 my-3">
              <ListGroup variant="flush" className="mybox-shadow">
                <ListGroup.Item>
                  <h4 className="text-muted">Order Summary</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Subtotal</Col>
                    <Col>$ {order.itemsPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>$ {order.shippingPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Tax</Col>
                    <Col>$ {order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>
                      <b>$ {order.totalPrice}</b>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush" className="mybox-shadow my-3 mt-4">
                <ListGroup.Item>
                  <h2 className="text-muted">Process Order</h2>

                  <Form
                    onSubmit={processOrderSubmitHandler}
                    className={
                      order.orderStatus === "Delivered"
                        ? "d-none"
                        : "d-block my-3"
                    }
                  >
                    <Form.Group controlId="process-order">
                      <Form.Control
                        as="select"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                      >
                        <option value="">Choose Status</option>
                        {order && order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order && order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </Form.Control>
                    </Form.Group>
                    <Button
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Process
                    </Button>
                  </Form>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </AdminContainer>
  );
};

export default ProcessOrder;
