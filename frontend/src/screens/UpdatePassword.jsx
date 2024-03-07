import React, { useState, useEffect } from "react";
import { clearErrors, updatePassword } from "../actions/userAction";
import FormContainer from "../components/shared/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/shared/Loader";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstants";

const UpdatePassword = ({ history }) => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const { oldPassword, newPassword, confirmNewPassword } = password;

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { loading, error, isUpdated } = useSelector(
    (state) => state.userUpdateProfile
  );

  const dispatch = useDispatch();
  const alert = useAlert();

  const inputChangeHandler = (e) => {
    e.preventDefault();
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ oldPassword, newPassword, confirmNewPassword }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password updated successfully");
      history.push("/profile");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, isUpdated, error, history, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer title="Update password">
          <Form onSubmit={updatePasswordSubmit} className="update-password">
            <Form.Group controlId="oldPassword">
              <i className="fa-solid fa-key icon"></i>
              <i
                class={`fa-regular ${
                  showOldPassword ? "fa-eye" : "fa-eye-slash"
                } eye`}
                onClick={toggleOldPasswordVisibility}
              ></i>

              <Form.Control
                type={showOldPassword ? "text" : "password"}
                placeholder="old password"
                value={password.oldPassword}
                onChange={inputChangeHandler}
                name="oldPassword"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="newPassword">
              <i className="fa-solid fa-unlock icon"></i>
              <i
                class={`fa-regular ${
                  showNewPassword ? "fa-eye" : "fa-eye-slash"
                } eye`}
                onClick={toggleNewPasswordVisibility}
              ></i>

              <Form.Control
                type={showNewPassword ? "text" : "password"}
                placeholder="new password"
                value={password.newPassword}
                onChange={inputChangeHandler}
                name="newPassword"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmNewPassword">
              <i className="fa-solid fa-lock icon"></i>
              <i
                class={`fa-regular ${
                  showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                } eye`}
                onClick={toggleConfirmPasswordVisibility}
              ></i>

              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="confirm password"
                value={password.confirmNewPassword}
                onChange={inputChangeHandler}
                name="confirmNewPassword"
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="btn-block"
              disabled={loading}
            >
              Change
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default UpdatePassword;
