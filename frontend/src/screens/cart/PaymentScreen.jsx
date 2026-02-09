import React, { useState } from "react";
import { Form, Col, Button, Row, Container } from "react-bootstrap";
import CheckoutStep from "../../components/shared/CheckoutStep";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../../actions/cartAction";

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/order/pay");
  };
  return (
    <Container>
      <CheckoutStep step1 step2 step3 />
      <Row className="justify-content-center pt-5">
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Payment Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                checked
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentmethod"
                value="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default PaymentScreen;
