import React from "react";
import { Col, Row, Card } from "react-bootstrap";

const ProductRatings = ({ product }) => {
  return (
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
                    src="/Profile.png"
                    alt="profile"
                    className="review-profile-img"
                  />
                </Card.Header>
                <Card.Title>{rev.name}</Card.Title>
                <Card.Body>
                  <Card.Text>
                    {[...Array(rev.rating).keys()].map((star) => (
                      <i className="fas fa-star text-warning" key={star}></i>
                    ))}
                  </Card.Text>
                  <Card.Text className="text-justify">{rev.comment}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="bg-warning text-center p-1">No Reviews Yet</div>
      )}
    </Col>
  );
};

export default ProductRatings;
