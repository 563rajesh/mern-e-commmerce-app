import React, { useEffect } from "react";
import { Button, Row, Col, Table, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/Loader";
import { clearErrors, orderList } from "../../actions/orderActions";
import { useAlert } from "react-alert";

const ShowOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.listMyOrders);

  if (!orders) {
    alert.error("You have not created order yet");
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(orderList());
  }, [dispatch, error, alert]);
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={10}>
          <h2 className="text-muted">My orders</h2>
          {loading ? (
            <Loader />
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr className="bg-primary text-center text-nowrap">
                  <td>ORDER ID</td>
                  <td>DATE</td>
                  <td>AMOUNT</td>
                  <td>ITEMS QTY</td>
                  <td>STATUS</td>
                  <td>ACTIONS</td>
                </tr>
              </thead>
              <tbody>
                {orders ? (
                  orders.map((order) => (
                    <tr key={order._id} className="text-center">
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.orderItems.length}</td>
                      <td>
                        <div
                          className={
                            order.orderStatus === "Delivered"
                              ? "text-danger"
                              : "text-success"
                          }
                        >
                          {order.orderStatus}
                        </div>
                        {order.orderStatus === "Delivered"
                          ? order.deliveredAt &&
                            order.deliveredAt.substring(0, 10)
                          : ""}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant="light">
                            <i className="bi bi-arrow-up-right-square"></i>
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-light bg-warning text-center">
                    <td colSpan={5}>No Order Found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ShowOrders;
