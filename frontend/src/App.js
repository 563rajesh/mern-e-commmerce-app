import { Container } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
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
import OrderScreen from "./screens/OrderScreen";
import ShowOrders from "./screens/ShowOrders";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="my-3">
        <Container>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/login" component={LoginScreen} exact></Route>
          <Route path="/order/:id" component={OrderScreen} exact></Route>
          <Route path="/placeorder" component={PlaceOrderScreen} exact></Route>
          <Route path="/payment" component={PaymentScreen} exact></Route>
          <Route path="/shipping" component={ShippingScreen} exact></Route>
          <Route path="/register" component={RegisterScreen} exact></Route>
          <Route path="/profile" component={ProfileScreen} exact></Route>
          <Route path="/products/:id" component={ProductDetails} exact />
          <Route path="/cart" component={CartScreen} exact />
          <Route path="/myorders" component={ShowOrders} exact />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
