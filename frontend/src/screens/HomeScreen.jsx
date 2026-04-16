import React, { useEffect } from "react";
import { clearErrors, listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
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

const HomeScreen = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const history = useHistory();
  const location = useLocation();

  const { loading, error, products, message, page, pages } = useSelector(
    (state) => state.productList,
  );

  const rating =
    Number(new URLSearchParams(location.search).get("rating")) || 0;

  const category = new URLSearchParams(location.search).get("category") || "";

  const price = Number(new URLSearchParams(location.search).get("price")) || 0;

  const sort = new URLSearchParams(location.search).get("sort") || "";

  const handleCategoryChange = (e) => {
    const params = new URLSearchParams(location.search);
    params.set("category", e.target.value);
    history.push(`${location.pathname}?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const params = new URLSearchParams(location.search);
    params.set("price", e.target.value);
    history.push(`${location.pathname}?${params.toString()}`);
  };

  const handleRatingChange = (value) => {
    const params = new URLSearchParams(location.search);
    params.set("rating", value);
    history.push(`${location.pathname}?${params.toString()}`);
  };

  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(location.search);
    params.set("page", pageNumber);
    history.push(`${location.pathname}?${params.toString()}`);
  };
  const handleSortChange = (e) => {
    const params = new URLSearchParams(location.search);
    params.set("sort", e.target.value);
    history.push(`${location.pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // const queryParams = new URLSearchParams(location.search);

    // const category = queryParams.get("category") || "";
    // const price = queryParams.get("price") || 0;
    // const rating = Number(queryParams.get("rating")) || 0;
    dispatch(listProducts(location.search));
  }, [dispatch, error, alert, location.search]);

  const handleReset = () => {
    history.push("/");
  };

  return (
    <Container fluid>
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
                      value <= rating
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                    style={{ color: value <= rating ? "orange" : "" }}
                    onClick={() => handleRatingChange(Number(value))}
                  ></i>
                ))}
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <Form.Group id="price">
                <Form.Control
                  as="select"
                  className="filter-select"
                  value={price}
                  onChange={(e) => handlePriceChange(e)}
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
                  className="filter-select"
                  value={category}
                  onChange={handleCategoryChange}
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
              <Form.Group id="sort">
                <Form.Control
                  as="select"
                  className="filter-select"
                  value={sort}
                  onChange={handleSortChange}
                >
                  <option value="">Sort by</option>
                  {["price_asc", "price_desc", "rating_desc"].map((v) => (
                    <option value={v} key={v}>
                      {v}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button as="div" className="btn-block ">
                {`${page} of ${pages} pages`}
              </Button>
              <ButtonGroup size="sm">
                <Button
                  type="button"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  variant="light"
                >
                  Pre
                </Button>

                <Button
                  type="button"
                  onClick={() => handlePageChange(page + 1)}
                  variant="light"
                  disabled={page === pages}
                >
                  Next
                </Button>
              </ButtonGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col
          md={9}
          className={`pb-5
              ${products && products.length === 1 ? "" : "products-col"}`}
          id="products-col"
        >
          {loading || !products ? (
            <Loader />
          ) : products.length === 0 ? (
            <div className="text-center text-muted mt-4">
              {message || "No product found"}
            </div>
          ) : (
            <Row className="products-row align-content-md-between justify-content-center">
              {products &&
                products.map((product) => {
                  return (
                    <Col
                      key={product._id}
                      lg={3}
                      md={{ span: 4, offset: 0 }}
                      sm={{ span: 4, offset: 0 }}
                      xs={{ span: 6, offset: 0 }}
                      className="product-col mb-2"
                    >
                      <ProductScreen product={product} />
                    </Col>
                  );
                })}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
