import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  listProductDetails,
  newReview,
} from "../actions/productActions";
import {
  Row,
  Col,
  ListGroup,
  Image,
  ListGroupItem,
  Form,
  Button,
  Modal,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/shared/Loader";
import { addToCart } from "../actions/cartAction";
import { NEW_REVIEW_RESET } from "../constants/productConstant";
import { useAlert } from "react-alert";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [qty, setQty] = useState(1);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  const productId = match.params.id;

  const { success: successReview, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const addToCartHandler = () => {
    dispatch(addToCart(productId, Number(qty)));
    alert.success("Item added to cart successfully");
  };

  const submitReviewToggle = () => {
    show ? setShow(false) : setShow(true);
  };

  const submitReviewHandler = () => {
    dispatch(newReview({ comment, rating, productId }));
    setRating(0);
    setShow(false);
  };

  useEffect(() => {
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (successReview) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successReview, reviewError, alert, error]);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>PRODUCT DETAILS</h3>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Link to="/" className="btn btn-light">
            <i className="fa-solid fa-arrow-left"></i>
            &nbsp;GO BACK
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price:${product.price}</ListGroupItem>
                <ListGroupItem>{product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? "Instock" : "Outstock"}</Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>{" "}
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                >
                  Add to cart
                </Button>
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  onClick={submitReviewToggle}
                  type="button"
                  className="btn-block"
                >
                  submit review
                </Button>
                {show ? (
                  <Modal show={show} onHide={submitReviewToggle}>
                    <Modal.Header closeButton>
                      <Modal.Title>Submit Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <h4>Rate us</h4>
                      <div>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <span
                            onClick={() => setRating(value)}
                            style={{
                              cursor: "pointer",
                              fontSize: "3em",
                              color: value <= rating ? "yellow" : "",
                            }}
                          >
                            {value <= rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <textarea
                        placeholder="Comment..."
                        rows={5}
                        cols={60}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={submitReviewToggle}>
                        cancel
                      </Button>
                      <Button variant="primary" onClick={submitReviewHandler}>
                        submit
                      </Button>
                    </Modal.Footer>
                  </Modal>
                ) : (
                  ""
                )}
              </ListGroupItem>
            </Col>
          </Row>
          {product.reviews && product.reviews[0] ? (
            <Row style={{ width: "100%", overflow: "auto" }}>
              {product.reviews.map((rev) => (
                <Col>
                  <Card>
                    <Card.Header>{rev.name}</Card.Header>
                    <Card.Body style={{ width: "100%", overflow: "auto" }}>
                      <div>
                        {[...Array(rev.rating).keys()].map(() => (
                          <span style={{ color: "yellow" }}>
                            <i className="fa-regular fa-star"></i>
                          </span>
                        ))}
                      </div>
                      <div>{rev.comment}</div>
                    </Card.Body>
                    <Card.Footer>
                      <i className="fa-regular fa-heart"></i>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div>No Reviews Yet</div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;
