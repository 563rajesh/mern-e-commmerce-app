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

  const { loading, error, products, filteredProductsCount, page, pages } =
    useSelector((state) => state.productList);

  const ratings =
    Number(new URLSearchParams(location.search).get("ratings")) || 0;

  const handleReset = () => {
    history.push("/");
  };

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

  const handleRatingsChange = (value) => {
    const params = new URLSearchParams(location.search);
    params.set("ratings", value);
    history.push(`${location.pathname}?${params.toString()}`);
  };

  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(location.search);
    params.set("page", pageNumber);
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
    // const ratings = Number(queryParams.get("ratings")) || 0;
    dispatch(listProducts(location.search));
  }, [dispatch, error, alert, location.search]);
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
                      onClick={() => handleRatingsChange(Number(value))}
                    ></i>
                  ))}
                </div>
              </ListGroup.Item>

              <ListGroup.Item>
                <Form.Group id="price">
                  <Form.Control
                    as="select"
                    className="filter-select"
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
              ${filteredProductsCount === 1 ? "" : "products-col"}`}
            id="products-col"
          >
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
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default HomeScreen;
