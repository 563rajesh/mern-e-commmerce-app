import React, { useEffect, useState } from "react";
import FormContainer from "../components/shared/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../actions/userAction";
import { useAlert } from "react-alert";
import { Button, Form } from "react-bootstrap";
import Loader from "../components/shared/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [error, dispatch, message, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer title="Forgot password">
          <Form
            onSubmit={forgotPasswordSubmitHandler}
            className="forgot-password"
          >
            <Form.Group controlId="email">
              <i className="fa-solid fa-envelope icon"></i>
              <Form.Control
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" block variant="primary">
              Send
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ForgotPassword;
