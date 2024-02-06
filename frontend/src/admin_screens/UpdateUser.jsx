import React, { useEffect, useState } from "react";
import AdminContainer from "./layout/AdminContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
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
        <Row className="justify-content-md-center  align-items-md-center m-3 h-500">
          <Col md={4} className="mybox-shadow p-3">
            <h2 className="text-center text-muted">Update User</h2>
            <Form onSubmit={updateUserSubmitHandler} className="update-user">
              <Form.Group controlId="name">
                <i className="fa-solid fa-person icon"></i>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <i className="fa-solid fa-envelope icon"></i>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="role">
                <i className="fa-solid fa-user-check icon"></i>

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

              <Button
                type="submit"
                variant="primary"
                disabled={updateLoading}
                className="btn-block"
              >
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </AdminContainer>
  );
};

export default UpdateUser;
