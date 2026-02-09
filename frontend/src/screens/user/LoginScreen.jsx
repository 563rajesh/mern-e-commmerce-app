import React, { useState, useEffect } from "react";
import { clearErrors, login } from "../../actions/userAction";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/Loader";
import { Link } from "react-router-dom";
import FormContainer from "../../components/shared/FormContainer";
import { useAlert } from "react-alert";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const redirect = location.search ? location.search.split("=")[1] : "/profile";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, history, isAuthenticated, redirect, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer title="SIGNIN">
          <Form onSubmit={submitHandler} className="login">
            <Form.Group controlId="email">
              <i className="fa-solid fa-user icon"></i>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <i className="fa-solid fa-lock icon"></i>
              <i
                class={`fa-regular ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                } eye`}
                onClick={togglePasswordVisibility}
              ></i>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" block variant="primary">
              SIGN IN
            </Button>
          </Form>
          <Row className="my-3">
            <Col className="text-right">
              <Link to="/password/forgot">
                <button className="border-0 bg-light">Forgot Password ?</button>
              </Link>
            </Col>
          </Row>
          <Row className="my-2">
            <Col>
              New Customer ?{" "}
              <Link
                to={redirect ? `register?redirect=${redirect}` : "/register"}
                className="registerBtn"
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
