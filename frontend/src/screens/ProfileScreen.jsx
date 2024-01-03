import React, { useState, useEffect } from "react";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message, { UpdateSuccessMessage } from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setImail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, setUpdatePassword] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setImail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };
  return (
    <>
      <Row>
        <Col md={6}>
          <h1 style={{ wordWrap: "break-word" }}>UPDATE INFORMATION</h1>
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <UpdateSuccessMessage variant="success">
              Updated profile successfully
            </UpdateSuccessMessage>
          )}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setImail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {updatePassword ? (
              <div>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
            ) : (
              ""
            )}
            <h5>
              Joined At{" "}
              <span>{user.createdAt && user.createdAt.substring(0, 10)}</span>
            </h5>
            <Button type="submit" variant="primary">
              update
            </Button>
          </Form>
          <Button
            onClick={() => setUpdatePassword(true)}
            variant="info"
            disabled={updatePassword}
          >
            reset password
          </Button>
          <LinkContainer to="/myorders">
            <Button variant="info"> MYORDERS</Button>
          </LinkContainer>
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
