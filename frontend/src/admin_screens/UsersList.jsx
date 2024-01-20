import React, { useEffect } from "react";
import AdminContainer from "./layout/AdminContainer";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, deleteUser, getAllUsers } from "../actions/userAction";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Loader from "../components/shared/Loader";
import { DELETE_USER_RESET } from "../constants/userConstants";
import { useAlert } from "react-alert";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, users, error } = useSelector((state) => state.listUser);
  const {
    isDeleted,
    message,
    error: deleteError,
  } = useSelector((state) => state.userUpdateProfile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    dispatch(getAllUsers());
  }, [dispatch, isDeleted, error, deleteError, history, message, alert]);

  return (
    <AdminContainer>
      <h3>All User</h3>
      {loading ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <td>User ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>User Type</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>

                  <td>
                    <Link to={`/admin/user/${user._id}`}>
                      <i
                        className="fa fa-edit text-info"
                        aria-hidden="true"
                      ></i>
                    </Link>

                    <button
                      onClick={() => deleteUserHandler(user._id)}
                      type="button"
                      variant="light"
                      style={{ border: "none" }}
                    >
                      <i
                        className="fa fa-trash text-danger"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </AdminContainer>
  );
};

export default UsersList;
