import React, { useEffect, useState } from "react";
import AdminContainer from "./layout/AdminContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../actions/orderActions";
import {
  Button,
  Form,
  Image,
  Col,
  Row,
  ListGroup,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/shared/Loader";
import { useAlert } from "react-alert";
import { UPDATE_ORDER_RESET } from "../constants/orderConstants";

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
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item>
                  <h4>OrderId: {orderId && orderId}</h4>
                </ListGroup.Item>
                {order.shippingAddress && (
                  <ListGroup.Item>
                    <h4>Shipping Info</h4>
                    <p>
                      {order.shippingAddress.address}&nbsp;
                      {order.shippingAddress.city}&nbsp;
                      {order.shippingAddress.postalCode}&nbsp;
                      {order.shippingAddress.country}&nbsp; Mo:{" "}
                      {order.shippingAddress.mobileNo}&nbsp;
                    </p>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <div>Status :{order.orderStatus}</div>
                  {order.isDeliverd ? (
                    <div>Delivered At {order.deliveredAt}</div>
                  ) : (
                    ""
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Payment Info</h4>
                  <p>
                    <strong>Method :</strong>&nbsp;
                    <strong>{order.paymentMethod}</strong>
                  </p>
                  {order.isPaid ? (
                    <div>Paid On {order.paidAt.substring(0, 10)}</div>
                  ) : (
                    <div>Not Paid</div>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>
                    Your Cart{" "}
                    {order.orderItems && order.orderItems.length === 1
                      ? "Item"
                      : "Items"}{" "}
                  </h4>

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
                      <Col>Items</Col>
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
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>

              <Form
                onSubmit={processOrderSubmitHandler}
                style={{
                  display: `${
                    order.orderStatus === "Delivered" ? "none" : "block"
                  }`,
                }}
              >
                <h3>Process Order</h3>
                <Form.Group controlId="processorder">
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
            </Col>
          </Row>
        </>
      )}
    </AdminContainer>
  );
};

export default ProcessOrder;
