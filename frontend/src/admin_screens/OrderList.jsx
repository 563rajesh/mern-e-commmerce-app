import React, { useEffect } from "react";
import AdminContainer from "./layout/AdminContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../actions/orderActions";
import { Table } from "react-bootstrap";
import Loader from "../components/shared/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { DELETE_ORDER_RESET } from "../constants/orderConstants";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.allOrders);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success(message);
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, isDeleted, deleteError, error, alert, history, message]);

  return (
    <AdminContainer>
      <h4>All Orders</h4>
      {loading ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <td>Order ID</td>
              <td>Amount</td>
              <td>Items Qty</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.orderItems.length}</td>
                  <td>{order.orderStatus}</td>
                  <td>
                    <Link to={`/admin/order/${order._id}`}>
                      <i
                        className="fa fa-edit text-info"
                        aria-hidden="true"
                      ></i>
                    </Link>

                    <button
                      onClick={() => deleteOrderHandler(order._id)}
                      type="button"
                      variant="light"
                      style={{ border: "none" }}
                    >
                      <i
                        className="fa fa-trash text-danger"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </AdminContainer>
  );
};

export default OrderList;
