import React, { useState, useEffect, useRef } from "react";
import { register } from "../actions/userAction";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const passwordElement = useRef(null);
  const confirmPasswordElement = useRef(null);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const redirect = location.search ? location.search.split("=")[1] : "/profile";

  const inputs = document.querySelectorAll(
    ".register .form-group .form-control"
  );

  inputs.forEach((input) => {
    input.classList.remove("form-error", "form-success");
  });

  const imageSubmitHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };
    reader.onerror = (err) => console.error(err);
    reader.readAsDataURL(e.target.files[0]);
  };

  const userRegisterSubmitHandler = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !avatar) {
      alert.error("Please provide all information");

      inputs.forEach((input) => {
        if (!input.value) {
          input.classList.add("form-error");
        } else {
          input.classList.add("form-success");
          input.classList.remove("form-error");
        }
      });
      return;
    }

    if (password !== confirmPassword) {
      alert.error("Password do not match");
      confirmPasswordElement.current.focus();
      //we have to implement eye feature
      setConfirmPassword("");
      return;
    }

    dispatch(register({ name, email, password, avatar }));

    inputs.forEach((input) => {
      input.classList.remove("form-error", "form-success");
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [history, isAuthenticated, redirect, dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer title="Register">
          <Form onSubmit={userRegisterSubmitHandler} className="register">
            <Form.Group controlId="name">
              <i className="fa-regular fa-face-smile icon"></i>

              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <i className="fa-solid fa-user icon"></i>

              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setImail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <i className="fa-solid fa-unlock icon"></i>
              <i
                class={`fa-regular ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                } eye`}
                onClick={togglePasswordVisibility}
              ></i>

              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                ref={passwordElement}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <i className="fa-solid fa-lock icon"></i>
              <i
                class={`fa-regular ${
                  showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                } eye`}
                onClick={toggleConfirmPasswordVisibility}
              ></i>

              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="re-enter password"
                value={confirmPassword}
                ref={confirmPasswordElement}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="avatar" className="profile-pic">
              <Image
                src={avatarPreview}
                fluid
                className="profile-img"
                alt="avatar preview"
              />
              <Form.Control
                type="file"
                name="avatar"
                accept="image/*"
                onChange={imageSubmitHandler}
              />
            </Form.Group>
            <Button type="submit" variant="primary" block>
              Submit
            </Button>
          </Form>
          <Row className="my-2">
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
