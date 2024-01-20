import React, { useEffect } from "react";
import AdminContainer from "./layout/AdminContainer";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../actions/productActions";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/shared/Loader";
import { useAlert } from "react-alert";
import { clearErrors } from "../actions/userAction";
import { DELETE_PRODUCT_RESET } from "../constants/productConstant";
const ProductList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  useEffect(() => {
    if (isDeleted) {
      alert.success(message);
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    dispatch(getAllProducts());
  }, [dispatch, history, isDeleted, error, deleteError, alert, message]);
  return (
    <AdminContainer>
      <h3>All Products</h3>
      {loading ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <td>Product ID</td>
              <td>Name</td>
              <td>Stock</td>
              <td>Price</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.price}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}`}>
                      <i
                        className="fa fa-edit text-info"
                        aria-hidden="true"
                      ></i>
                    </Link>

                    <Button
                      onClick={() => deleteProductHandler(product._id)}
                      type="button"
                      variant="light"
                      style={{ marginLeft: "10px" }}
                      disabled={loading ? true : false}
                    >
                      <i
                        className="fa fa-trash text-danger"
                        aria-hidden="true"
                      ></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </AdminContainer>
  );
};

export default ProductList;
