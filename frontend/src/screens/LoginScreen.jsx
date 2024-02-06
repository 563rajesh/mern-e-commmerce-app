import React, { useState, useEffect } from "react";
import { clearErrors, login } from "../actions/userAction";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/shared/Loader";
import { Link } from "react-router-dom";
import FormContainer from "../components/shared/FormContainer";
import { useAlert } from "react-alert";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const redirect = location.search ? location.search.split("=")[1] : "/profile";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, history, isAuthenticated, redirect, alert, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(login(email, password));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer title="SIGNIN">
          <Form onSubmit={submitHandler} className="login">
            <Form.Group controlId="email">
              <i className="fa-solid fa-envelope icon"></i>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <i className="fa-solid fa-lock icon"></i>
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              SIGN IN
            </Button>
          </Form>
          <Row>
            <Col>
              New Customer ?{" "}
              <Link
                to={redirect ? `register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </>
  );
};

export default LoginScreen;
