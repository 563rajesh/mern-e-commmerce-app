import React, { useEffect } from "react";
import AdminContainer from "./layout/AdminContainer";
import { useDispatch, useSelector } from "react-redux";
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
      <div className="mb-4">
        <h2 className="text-muted">Dashboard</h2>
        <div className="dashboard-1 pt-2 text-center pb-2 text-white">
          Total Amount $ {totalAmount}
        </div>

        <div className="dashboard-2  text-white m-3">
          <div className="dashboard-2-1 text-center p-5 m-1">
            {products && products.length} Products
          </div>
          <div className="dashboard-2-2 text-center p-5 m-1 ">
            {orders && orders.length} Orders
          </div>
          <div className="dashboard-2-3 text-center p-5 m-1">
            {users && users.length} &nbsp;Users
          </div>
        </div>
        <div className="dashboard-3-1 text-center text-white pt-2 pb-2">
          {outOfStock} Out of stock
        </div>
      </div>
    </AdminContainer>
  );
};

export default Dashboard;
