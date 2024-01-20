import React from "react";
import { Alert } from "react-bootstrap";

//without close & timer
const Message = ({ children, variant }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
