import { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductDetails from "./screens/ProductDetails";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderPayScreen from "./screens/OrderPayScreen";
import ShowOrders from "./screens/ShowOrders";
import Dashboard from "./admin_screens/Dashboard";
import ProductList from "./admin_screens/ProductList";
import NewProduct from "./admin_screens/NewProduct";
import UpdateProduct from "./admin_screens/UpdateProduct";
import UsersList from "./admin_screens/UsersList";
import ProductReviews from "./admin_screens/ProductReviews";
import OrderList from "./admin_screens/OrderList";
import ProcessOrder from "./admin_screens/ProcessOrder";
import UpdateUser from "./admin_screens/UpdateUser";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { AdminRoute } from "./components/shared/ProtectedRoute";
import UpdateProfile from "./screens/UpdateProfile";
import Success from "./screens/Success";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import store from "./store";
import { getUserDetails } from "./actions/userAction";
function App() {
  useEffect(() => {
    store.dispatch(getUserDetails("profile"));
  }, []);
  return (
    <BrowserRouter>
      <Header />

      <main className="my-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/products/:id" component={ProductDetails} exact />
          <Route path="/cart" component={CartScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <ProtectedRoute path="/profile" component={ProfileScreen} exact />
          <ProtectedRoute
            path="/profile/update"
            component={UpdateProfile}
            exact
          />
          <ProtectedRoute path="/payment" component={PaymentScreen} exact />
          <ProtectedRoute path="/shipping" component={ShippingScreen} exact />
          <ProtectedRoute
            path="/placeorder"
            component={PlaceOrderScreen}
            exact
          />
          <Route path="/success" component={Success} />
          <ProtectedRoute path="/myorders" component={ShowOrders} exact />
          <Switch>
            <ProtectedRoute
              path="/order/pay"
              component={OrderPayScreen}
              exact
            />

            <ProtectedRoute
              exact
              path="/order/:id"
              component={OrderDetailsScreen}
            />
          </Switch>
        </Container>

        {/* ---------Admin route------------ */}
        <AdminRoute path="/admin/dashboard" component={Dashboard} exact />
        <AdminRoute path="/admin/products" component={ProductList} exact />
        <AdminRoute path="/admin/newproduct" component={NewProduct} exact />
        <AdminRoute exact path="/admin/product/:id" component={UpdateProduct} />
        <AdminRoute exact path="/admin/users" component={UsersList} />
        <AdminRoute exact path="/admin/orders" component={OrderList} />

        <AdminRoute exact path="/admin/order/:id" component={ProcessOrder} />

        <AdminRoute exact path="/admin/user/:id" component={UpdateUser} />

        <AdminRoute exact path="/admin/reviews" component={ProductReviews} />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
