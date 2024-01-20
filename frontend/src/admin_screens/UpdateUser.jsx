import React, { useEffect, useState } from "react";
import AdminContainer from "./layout/AdminContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getSingleUser, updateUser } from "../actions/userAction";
import Loader from "../components/shared/Loader";
import { UPDATE_USER_RESET } from "../constants/userConstants";
import { useAlert } from "react-alert";

const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.singleUser);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.userUpdateProfile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = match.params.id;

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(userId, { name, email, role }));
  };
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getSingleUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, user, userId, error, updateError, isUpdated, alert, history]);
  return (
    <AdminContainer>
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={updateUserSubmitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Choose Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" disabled={updateLoading}>
            update
          </Button>
        </Form>
      )}
    </AdminContainer>
  );
};

export default UpdateUser;
