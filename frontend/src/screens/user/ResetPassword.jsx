import React, { useEffect, useState } from "react";
import FormContainer from "../../components/shared/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { Button, Form } from "react-bootstrap";
import Loader from "../../components/shared/Loader";

const ResetPassword = ({ match, history }) => {
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

  const dispatch = useDispatch();
  const alert = useAlert();

  const token = match.params.token;

  const { loading, error, success } = useSelector(
    (state) => state.forgotPassword
  );

  const resetPasswordSubmitHandler = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert.error("Please fill credential");
      return;
    }

    dispatch(resetPassword(token, { password, confirmPassword }));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("password updated successfully");
      history.push("/login");
    }
  }, [error, dispatch, alert, success, history]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer title="Reset password">
          <Form
            onSubmit={resetPasswordSubmitHandler}
            className="reset-password"
          >
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
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" block>
              Submit
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ResetPassword;
