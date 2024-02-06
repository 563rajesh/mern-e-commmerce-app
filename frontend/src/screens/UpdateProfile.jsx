import React, { useState, useEffect } from "react";
import {
  clearErrors,
  getUserDetails,
  updateProfile,
} from "../actions/userAction";
import FormContainer from "../components/shared/FormContainer";
import { Form, Button } from "react-bootstrap";
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
      {loading ? (
        <Loader />
      ) : (
        <FormContainer title="Update profile">
          <Form
            onSubmit={updateProfileSubmitHandler}
            className="update-profile"
          >
            <Form.Group controlId="name">
              <i className="fa-solid fa-spell-check icon"></i>

              <Form.Control
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <i className="fa-solid fa-envelope icon"></i>

              <Form.Control
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <i className="fa-solid fa-lock icon"></i>

              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <i className="fa-solid fa-check icon"></i>

              <Form.Control
                type="password"
                placeholder="Re-enter password"
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
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default UpdateProfile;
