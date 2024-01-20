import React, { useEffect } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/shared/Loader";
import { clearErrors, orderList } from "../actions/orderActions";

const ShowOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.listMyOrders);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(orderList());
  }, [dispatch, error]);
  return (
    <>
      <Row>
        <Col>
          <h1>My orders</h1>
          {loading ? (
            <Loader />
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <td>ORDER ID</td>
                  <td>DATE</td>
                  <td>AMOUNT</td>
                  <td>ITEMS QTY</td>
                  <td>STATUS</td>
                  <td>ACTIONS</td>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.orderItems.length}</td>
                      <td>
                        <div>{order.orderStatus}</div>
                        {order.orderStatus === "Delivered"
                          ? order.deliveredAt &&
                            order.deliveredAt.substring(0, 10)
                          : ""}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant="light">
                            <i className="fas fa-info"></i>
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ShowOrders;
