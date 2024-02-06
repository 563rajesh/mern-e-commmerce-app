import React, { useState, useEffect, useRef } from "react";
import { register } from "../actions/userAction";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/shared/Loader";
import FormContainer from "../components/shared/FormContainer";
import { clearErrors } from "../actions/orderActions";
import { useAlert } from "react-alert";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setImail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const passwordElement = useRef(null);
  const confirmPasswordElement = useRef(null);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [history, isAuthenticated, redirect, dispatch, alert, error]);

  const userRegisterSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert.error("Password do not match");
      passwordElement.current.focus();
      passwordElement.current.value = "";
      confirmPasswordElement.current.value = "";
    } else {
      dispatch(register(name, email, password, role));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer title="Register">
          <Form onSubmit={userRegisterSubmitHandler} className="register">
            <Form.Group controlId="role">
              Register As:{" "}
              {["User", "Admin"].map((userType) => (
                <Form.Check
                  key={userType}
                  inline
                  label={userType}
                  value={userType}
                  name="group1"
                  type="radio"
                  onChange={(e) => setRole(e.target.value)}
                  required
                  id={`disabled-default-${userType}`}
                />
              ))}
            </Form.Group>
            <Form.Group controlId="name">
              <i className="fa-solid fa-spell-check icon"></i>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <i className="fa-solid fa-envelope icon"></i>

              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setImail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <i className="fa-solid fa-lock icon"></i>

              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                ref={passwordElement}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <i className="fa-solid fa-check icon"></i>

              <Form.Control
                type="password"
                placeholder="re-enter password"
                value={confirmPassword}
                ref={confirmPasswordElement}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
          <Row>
            <Col>
              Have an account !{" "}
              <Link to={redirect ? `login?redirect=${redirect}` : "/login"}>
                Login
              </Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </>
  );
};

export default RegisterScreen;
