import React, { useState, useEffect } from "react";
import {
  clearErrors,
  getUserDetails,
  updateProfile,
} from "../actions/userAction";
import { Form, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/shared/Loader";
import { useAlert } from "react-alert";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const UpdateProfile = ({ history }) => {
  const { error, user, loading } = useSelector((state) => state.user);
  const { updateLoading, updateError, isUpdated } = useSelector(
    (state) => state.userUpdateProfile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile updated successfully");
      history.push("/profile");
      dispatch(getUserDetails("profile"));
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
  }, [dispatch, isUpdated, error, user, updateError, history, alert]);

  const updateProfileSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ id: user._id, name, email, password }));
  };

  return (
    <>
      <h4 style={{ wordWrap: "break-word", textAlign: "center" }}>
        Update Profile
      </h4>

      {loading ? (
        <Loader />
      ) : (
        <Row className="justify-content-md-center">
          <Form onSubmit={updateProfileSubmitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
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

            <Button
              type="submit"
              variant="primary"
              className="btn-block"
              disabled={updateLoading}
            >
              update
            </Button>
          </Form>
        </Row>
      )}
    </>
  );
};

export default UpdateProfile;
