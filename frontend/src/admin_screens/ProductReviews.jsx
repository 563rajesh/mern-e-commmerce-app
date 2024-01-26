import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminContainer from "./layout/AdminContainer";
import { Button, Form, Row, Table } from "react-bootstrap";
import {
  clearErrors,
  deleteReviews,
  getAllReviews,
} from "../actions/productActions";
import { useAlert } from "react-alert";
import Loader from "../components/shared/Loader";
import { DELETE_REVIEW_RESET } from "../constants/productConstant";

const ProductReviews = ({ history }) => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");

  const alert = useAlert();

  const { error, loading, reviews } = useSelector(
    (state) => state.productReviews
  );

  const {
    isDeleted,
    error: deleteError,
    message,
  } = useSelector((state) => state.review);

  const getReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  const deleteReviewHandler = (reviewId, productId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success(message);
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [
    dispatch,
    error,
    alert,
    isDeleted,
    deleteError,
    history,
    message,
    productId,
  ]);
  return (
    <>
      <AdminContainer>
        <Row className="justify-content-md-center">
          <Form onSubmit={getReviewsSubmitHandler}>
            <Form.Group id="productId">
              <Form.Control
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Product Id"
                style={{ background: "orange" }}
              />
            </Form.Group>
            <Button type="submit" disabled={loading || productId === ""}>
              Search
            </Button>
          </Form>
        </Row>
        {loading ? (
          <Loader />
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <td>ID</td>
                <td>User Name</td>
                <td>Rating</td>
                <td>Comment</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <tr key={review._id}>
                    <td>{review._id}</td>
                    <td>{review.name}</td>
                    <td>{review.rating}</td>
                    <td>{review.comment}</td>
                    <td>
                      <button
                        onClick={() =>
                          deleteReviewHandler(review._id, productId)
                        }
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
                ))
              ) : (
                <tr>
                  <td>No Review Found</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </AdminContainer>
    </>
  );
};

export default ProductReviews;
