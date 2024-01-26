import React, { useEffect, useState } from "react";
import { clearErrors, listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import ProductScreen from "./ProductScreen";
import { Row, Col, Form, Button, ButtonGroup } from "react-bootstrap";
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
  const { loading, error, products, filteredProductsCount } = useSelector(
    (state) => state.productList
  );

  const alert = useAlert();

  const [price, setPrice] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [ratings, setRatings] = useState(0);

  console.log(ratings);
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    setSearchQuery(keyword);
  };
  const lastPageHandler = () => {
    if (!loading) {
      const lastPage = Math.ceil(filteredProductsCount / 5);
      setPage(lastPage);
    }
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={2} className="mr-auto">
            <div className="text-center pr-30">
              <div>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <i
                    key={rating}
                    className="fas fa-star"
                    onClick={() => setRatings(Number(rating))}
                  ></i>
                ))}
              </div>
              <Form onSubmit={searchSubmitHandler}>
                <Form.Group id="keyword">
                  <Form.Control
                    type="text"
                    value={keyword}
                    placeholder="Search Products"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <Button type="submit">Search</Button>
                </Form.Group>
              </Form>
              <Form.Group id="price">
                <Form.Control
                  as="select"
                  value={price}
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

              <Form.Group id="selectedCategory">
                <Form.Control
                  as="select"
                  value={selectedCategory}
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
              <div>
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
                  <Button variant="primary">{page}</Button>
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
              </div>
            </div>
          </Col>
          <Col md={9}>
            <Row>
              {products &&
                products.map((product) => {
                  return (
                    <Col key={product._id} md={3}>
                      <ProductScreen product={product} />
                    </Col>
                  );
                })}
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
