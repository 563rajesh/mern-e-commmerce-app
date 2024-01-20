import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="orderSuccess">
      <div>
        <i className="fas fa-check"></i>
      </div>
      <b>Your Order has been Placed successfully </b>
      <br />

      <Link to="/myorders">View Orders</Link>
    </div>
  );
};

export default Success;
