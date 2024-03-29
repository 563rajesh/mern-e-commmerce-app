import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/shared/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { clearErrors } from "../actions/userAction";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.user);

  useEffect(() => {
    // if (!user.name) {
    //   dispatch(getUserDetails("profile"));
    // }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Row className="justify-content-md-center">
            <Col md={4}>
              <Row className="align-items-center h-500">
                <Col md={9}>
                  <Image
                    src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                    fluid
                    alt={user.name}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Full Name
                  <div>{user && user.name}</div>
                </ListGroup.Item>
                <ListGroup.Item>
                  Email
                  <div>{user && user.email}</div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>
                    Joined At{" "}
                    <span>
                      {user.createdAt && user.createdAt.substring(0, 10)}
                    </span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <LinkContainer to="/myorders">
                    <Button className="btn-block">My Orders</Button>
                  </LinkContainer>
                </ListGroup.Item>
                <ListGroup.Item>
                  <LinkContainer to="/profile/update">
                    <Button type="button" variant="info" block>
                      Edit Profile
                    </Button>
                  </LinkContainer>
                </ListGroup.Item>
                <ListGroup.Item>
                  <LinkContainer to="/password/update">
                    <Button type="button" block>
                      Change Password
                    </Button>
                  </LinkContainer>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProfileScreen;
