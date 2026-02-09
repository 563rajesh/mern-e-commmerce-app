import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createOrder } from "../../actions/orderActions";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useAlert } from "react-alert";
import Loader from "../../components/shared/Loader";
import { Col, Container, Row } from "react-bootstrap";

const OrderPayScreen = ({ history }) => {
  const order = JSON.parse(sessionStorage.getItem("orderInfo"));
  const [apiClientId, setApiClientId] = useState(null);

  const dispatch = useDispatch();

  const alert = useAlert();

  const { paymentMethod } = useSelector((state) => state.cart);
  const { error: orderCreateError } = useSelector((state) => state.orderCreate);

  const successPaymentHandler = (result, data) => {
    console.log(result, "result", data);
    order.paymentResult = {
      id: result.id,
      status: result.status,
      update_time: result.update_time,
      email_address: result.payer.email_address,
    };

    order.paidAt = result.create_time;
    order.paymentMethod = paymentMethod;

    dispatch(createOrder(order));

    history.push("/success");
    sessionStorage.removeItem("orderInfo");
  };

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;

      script.onload = () => {
        setApiClientId(clientId);
      };
      document.body.appendChild(script);
    };
    //window.paypal
    addPaypalScript();

    if (orderCreateError) {
      alert.error(orderCreateError);
      dispatch(clearErrors());
    }
  }, [alert, orderCreateError, dispatch]);

  return (
    <Container>
      <Row
        className="justify-content-center align-items-center "
        style={{ height: "500px" }}
      >
        <Col md={3}>
          <h4 className="text-muted text-center">Pay {order.totalPrice}</h4>
          {!apiClientId ? (
            <Loader />
          ) : (
            <PayPalButton
              amount={order.totalPrice}
              onSuccess={successPaymentHandler}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPayScreen;
