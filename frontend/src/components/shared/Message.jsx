import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { notification } from "../../actions/userAction";

//Alert message specially for userUpdateProfile
export const UpdateSuccessMessage = ({ variant, children }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(notification());
  };
  return (
    <>
      <Alert variant={variant} onClose={handleClose} dismissible>
        {children}
      </Alert>
    </>
  );
};
//use timer
const Message = ({ variant, children, delay = 5000 }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [show, delay]);
  return (
    <>
      {show && (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          {children}
        </Alert>
      )}
    </>
  );
};
//without close & timer
export const ToastMessage = ({ children, variant }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
