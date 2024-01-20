import React, { useEffect } from "react";
import AdminContainer from "./layout/AdminContainer";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Row } from "react-bootstrap";
import { getAllProducts } from "../actions/productActions";
import { getAllUsers } from "../actions/userAction";
import { getAllOrders } from "../actions/orderActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productList);

  const { users } = useSelector((state) => state.listUser);

  const { orders } = useSelector((state) => state.allOrders);

  let outOfStock = 0;

  products &&
    products.map((item) => {
      if (item.countInStock === 0) {
        outOfStock += 1;
      }
      return outOfStock;
    });

  let totalAmount = 0;
  orders && orders.map((item) => (totalAmount += item.totalPrice));

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);
  return (
    <AdminContainer>
      <h3>Dashboard</h3>
      <Row className="justify-content-center">
        <ListGroup>
          <ListGroup.Item>
            <div>amount {totalAmount}</div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>{products && products.length}</div>
            <div>{orders && orders.length}</div>
            <div>{users && users.length}</div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div>{outOfStock}</div>
          </ListGroup.Item>
        </ListGroup>
      </Row>
    </AdminContainer>
  );
};

export default Dashboard;
