import { useEffect } from "react";
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
import UpdatePassword from "./screens/UpdatePassword.jsx";
import ForgotPassword from "./screens/ForgotPassword.jsx";
import ResetPassword from "./screens/ResetPassword.jsx";
import Success from "./screens/Success";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import store from "./store";
import { getUserDetails } from "./actions/userAction";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
function App() {
  useEffect(() => {
    store.dispatch(getUserDetails("profile"));
  }, []);

  //stop to inspect website
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <BrowserRouter>
      <Header />

      <main className="my-3">
        <Switch>
          <Route exact path="/" component={HomeScreen} />

          <Route exact path="/product/:id" component={ProductDetails} />

          <Route exact path="/cart" component={CartScreen} />

          <Route exact path="/login" component={LoginScreen} />

          <Route exact path="/register" component={RegisterScreen} />

          <Route exact path="/about" component={About} />

          <Route exact path="/contact" component={Contact} />

          <Route exact path="/password/forgot" component={ForgotPassword} />

          <Route
            exact
            path="/password/reset/:token"
            component={ResetPassword}
          />

          <ProtectedRoute exact path="/profile" component={ProfileScreen} />

          <ProtectedRoute
            exact
            path="/profile/update"
            component={UpdateProfile}
          />

          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />

          <ProtectedRoute exact path="/payment" component={PaymentScreen} />

          <ProtectedRoute exact path="/shipping" component={ShippingScreen} />

          <ProtectedRoute
            exact
            path="/placeorder"
            component={PlaceOrderScreen}
          />

          <ProtectedRoute exact path="/success" component={Success} />

          <ProtectedRoute exact path="/myorders" component={ShowOrders} />

          <ProtectedRoute exact path="/order/pay" component={OrderPayScreen} />

          <ProtectedRoute
            exact
            path="/order/:id"
            component={OrderDetailsScreen}
          />

          {/*Admin route*/}

          <AdminRoute exact path="/admin/dashboard" component={Dashboard} />

          <AdminRoute exact path="/admin/products" component={ProductList} />

          <AdminRoute exact path="/admin/newproduct" component={NewProduct} />

          <AdminRoute
            exact
            path="/admin/product/:id"
            component={UpdateProduct}
          />

          <AdminRoute exact path="/admin/users" component={UsersList} />

          <AdminRoute exact path="/admin/orders" component={OrderList} />

          <AdminRoute exact path="/admin/order/:id" component={ProcessOrder} />

          <AdminRoute exact path="/admin/user/:id" component={UpdateUser} />

          <AdminRoute exact path="/admin/reviews" component={ProductReviews} />

          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
