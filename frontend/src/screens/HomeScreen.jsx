import React, { useEffect, useState } from "react";
import { clearErrors, listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import ProductScreen from "./ProductScreen";
import {
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
  ListGroup,
  Container,
} from "react-bootstrap";
import Loader from "../components/shared/Loader";
import { useAlert } from "react-alert";

const categories = [
  "Electronics",
  "Laptop",
  "Footwear",
  "Bottom",
  "Clothes",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const HomeScreen = ({ location }) => {
  const dispatch = useDispatch();
  const { loading, error, products, filteredProductsCount } = useSelector(
    (state) => state.productList
  );

  const alert = useAlert();

  const [price, setPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [ratings, setRatings] = useState(0);

  let searchQuery;
  if (location.search) {
    searchQuery = location.search.split("=")[1];
  }
  const lastPageHandler = () => {
    if (!loading) {
      let lastP = Math.ceil(filteredProductsCount / 5);
      setPage(lastP);
    }
  };
  const handleReset = () => {
    setPrice(0);
    setSelectedCategory("");
    setRatings(0);
    setPage(1);
    dispatch(listProducts());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(listProducts(searchQuery, price, selectedCategory, page, ratings));
  }, [
    dispatch,
    error,
    alert,
    searchQuery,
    price,
    page,
    selectedCategory,
    ratings,
  ]);
  return (
    <Container fluid>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={2} className="bg-light mb-3">
            <ListGroup variant="flush" className="product-filter">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Filter
                    <Button
                      type="button"
                      onClick={handleReset}
                      className="float-right"
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div>
                  <div>Rate Above</div>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <i
                      key={value}
                      className={
                        value <= ratings
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                      style={{ color: value <= ratings ? "orange" : "" }}
                      onClick={() => setRatings(Number(value))}
                    ></i>
                  ))}
                </div>
              </ListGroup.Item>

              <ListGroup.Item>
                <Form.Group id="price">
                  <Form.Control
                    as="select"
                    value={price}
                    className="filter-select"
                    onChange={(e) => setPrice(e.target.value)}
                  >
                    <option value={0}>Max Price</option>
                    {[50, 100, 200, 500, 800, 900, 1000, 10000].map((p) => (
                      <option value={Number(p)} key={p}>
                        less than ${p}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Group id="selectedCategory">
                  <Form.Control
                    as="select"
                    value={selectedCategory}
                    className="filter-select"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cate) => (
                      <option value={cate} key={cate}>
                        {cate}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button as="div" className="btn-block ">
                  {page} of {!loading && Math.ceil(filteredProductsCount / 5)}{" "}
                  page
                </Button>
                <ButtonGroup size="sm">
                  <Button
                    type="button"
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                    variant="light"
                  >
                    First
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                    variant="light"
                  >
                    Pre
                  </Button>

                  <Button
                    type="button"
                    onClick={() => setPage((p) => p + 1)}
                    variant="light"
                    disabled={page * 5 >= filteredProductsCount}
                  >
                    Next
                  </Button>
                  <Button
                    type="button"
                    onClick={lastPageHandler}
                    variant="light"
                    disabled={page * 5 >= filteredProductsCount}
                  >
                    Last
                  </Button>
                </ButtonGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={9} className="pb-5">
            <Row className="align-content-md-between products-row">
              {products &&
                products.map((product) => {
                  return (
                    <Col
                      key={product._id}
                      md={{ span: 4, offset: 0 }}
                      lg={3}
                      sm={{ span: 4, offset: 1 }}
                      xs={{ span: 8, offset: 2 }}
                      className="products-col my-2 my-sm-2 my-md-0"
                    >
                      <ProductScreen product={product} />
                    </Col>
                  );
                })}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default HomeScreen;
