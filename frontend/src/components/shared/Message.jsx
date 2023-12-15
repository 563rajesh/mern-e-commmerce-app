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

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [show]);
  return (
    <>
      {show && (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          {children}
        </Alert>
      )}
    </>
  );
  // return (
  //   <>
  //     <Toast
  //       onClose={() => setShow(false)}
  //       closeButton
  //       show={show}
  //       delay={3000}
  //       autohide
  //     >
  //       {children}
  //     </Toast>
  //   </>
  // );
};

export default Message;
