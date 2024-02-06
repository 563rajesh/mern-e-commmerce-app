import React, { useRef } from "react";
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
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/shared/Loader";
import { addToCart } from "../actions/cartAction";
import { NEW_REVIEW_RESET } from "../constants/productConstant";
import { useAlert } from "react-alert";

const ProductDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [qty, setQty] = useState(1);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const commentFocus = useRef(null);

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const productId = match.params.id;

  const { success: successReview, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const addToCartHandler = () => {
    dispatch(addToCart(productId, Number(qty)));
    alert.success("Item added to cart successfully");
  };

  const submitReviewToggle = () => {
    if (isAuthenticated) {
      show ? setShow(false) : setShow(true);
      setComment("");
      setRating(0);
    } else {
      history.push(`/login?redirect=products/${productId}`);
    }
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      if (!comment) {
        alert.error("Give your comment!");
        commentFocus.current.focus();
      }
      if (!rating) {
        alert.error("Give star");
      }
      return;
    }
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
    <Container>
      <Row>
        <Col>
          <h2 className="text-center text-muted">PRODUCT DETAILS</h2>
          <Link to="/" className="btn btn-light">
            <i className="fa-solid fa-arrow-left"></i>
            &nbsp;GO BACK
          </Link>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : (
        <Row className="p-3 my-3">
          <Col md={5} className="mybox-shadow m-2 p-2">
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3} className="mybox-shadow m-2 p-2">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item className="text-justify">
                {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} className="mybox-shadow m-2 p-2">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status
                    <div className="float-right">
                      <b
                        className={
                          product.countInStock > 0
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {product.countInStock > 0 ? "Instock" : "Outstock"}
                      </b>
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Quantity
                      <div className="float-right">
                        <Form.Control
                          as="select"
                          value={qty}
                          className="form-outline-none float-right"
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
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
                  Submit review
                </Button>

                {show && (
                  <>
                    <Modal show={show} onHide={submitReviewToggle}>
                      <Modal.Header closeButton>
                        <Modal.Title className="text-muted">
                          Submit Review
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <h2 className="text-muted">Rate us</h2>
                        <div>
                          {[1, 2, 3, 4, 5].map((value) => (
                            <span
                              onClick={() => setRating(value)}
                              key={value}
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
                        <Form.Control
                          as="textarea"
                          placeholder="Comment..."
                          rows={5}
                          cols={60}
                          ref={commentFocus}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={submitReviewToggle}
                        >
                          Cancel
                        </Button>
                        <Button variant="primary" onClick={submitReviewHandler}>
                          Submit
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                )}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={12}>
            <Row className="my-3">
              <Col>
                <h2 className="text-center text-muted review-heading-underline">
                  Review
                </h2>
              </Col>
            </Row>
            {product.reviews && product.reviews[0] ? (
              <Row className="review-row mybox-shadow">
                {product.reviews.map((rev) => (
                  <Col className="review-col p-3" key={rev._id}>
                    <Card className="mybox-shadow text-center card-layout p-1">
                      <Card.Header>
                        <Card.Img
                          variant="top"
                          src="/profile.png"
                          alt="profile"
                          className="review-profile-img"
                        />
                      </Card.Header>
                      <Card.Title>{rev.name}</Card.Title>
                      <Card.Body>
                        <Card.Text>
                          {[...Array(rev.rating).keys()].map((star) => (
                            <i
                              className="fas fa-star text-warning"
                              key={star}
                            ></i>
                          ))}
                        </Card.Text>
                        <Card.Text className="text-justify">
                          {rev.comment}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="bg-warning text-light">No Reviews Yet</div>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetails;
