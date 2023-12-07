import { Container } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductDetails from "./screens/ProductDetails";
import CartScreen from "./screens/CartScreen";

function App() {
  const HomeScreenCom = () => {
    return <HomeScreen />;
  };
  const ProductDetailsCom = () => {
    return <ProductDetails />;
  };
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Container>
          <Route path="/" component={HomeScreenCom} exact></Route>
          <Route path="/product/:id" component={ProductDetailsCom} />
          <Route path="/cart/:id?" component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
