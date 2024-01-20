import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminRoute = ({ component: Component, ...rest }) => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  const { role } = user || {};
  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false && role !== "Admin") {
              return <Redirect to="/login" />;
            }

            return <Component {...props} />;
          }}
        ></Route>
      )}
    </>
  );
};
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }
            return <Component {...props} />;
          }}
        ></Route>
      )}
    </>
  );
};

export default ProtectedRoute;
