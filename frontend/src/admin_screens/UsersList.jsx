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
      <h2 className="text-muted">All User</h2>
      {loading ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr className="table-info">
              <td>User ID</td>
              <td>Name</td>
              <td>Email</td>
              <td className="text-nowrap">User Type</td>
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
                      <i className="fa fa-edit" aria-hidden="true"></i>
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
