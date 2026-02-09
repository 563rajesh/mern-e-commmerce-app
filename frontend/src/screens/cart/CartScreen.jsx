import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, RemoveFromCart } from "../../actions/cartAction";
import { Link } from "react-router-dom";
import Message from "../../components/shared/Message";

import {
  Row,
  Col,
  Form,
  Button,
  Image,
  ListGroup,
  Card,
  Container,
} from "react-bootstrap";

const CartScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const RemoveFromCartHandler = (id) => {
    dispatch(RemoveFromCart(id));
  };
  const checkout = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Container>
      <h2 className="text-muted text-center">Shopping Cart</h2>
      <Row className="justify-content-md-center mb-5 mt-4 mybox-shadow p-3">
        <Col md={7}>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty ! <Link to="/">Go back</Link>
            </Message>
          ) : (
            <>
              {cartItems.map((item) => (
                <Card key={item.product} className="mybox-shadow mb-2">
                  <Row className="justify-content-between p-3">
                    <Col md={2}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/product/${item.product}`}
                        className="link-styles text-body"
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>

                    <Col md={2}>
                      <div className="float-sm-right float-md-left">
                        <Form.Control
                          className="form-outline-none mb-1"
                          as="select"
                          name={item.name}
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </div>

                      <Button
                        type="button"
                        variant="light"
                        onClick={() => RemoveFromCartHandler(item.product)}
                      >
                        <i className="fa fa-trash text-danger"></i>
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}
            </>
          )}
        </Col>
        <Col md={4}>
          <ListGroup variant="flush" className="mybox-shadow mb-3">
            <ListGroup.Item>
              <h2 className="text-muted text-nowrap">
                Subtotal items(
                {cartItems.reduce((acc, p) => acc + p.qty, 0)})
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                Total Price: &nbsp; $
                {cartItems.reduce((t, p) => t + p.price * p.qty, 0).toFixed(2)}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkout}
              >
                Procede to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;
