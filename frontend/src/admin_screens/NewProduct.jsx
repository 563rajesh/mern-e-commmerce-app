import React, { useEffect, useState } from "react";
import AdminContainer from "./layout/AdminContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProduct } from "../actions/productActions";
import { useAlert } from "react-alert";
import { NEW_PRODUCT_RESET } from "../constants/productConstant";

const NewProduct = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setcountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const categories = [
    "Electronics",
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        description,
        category,
        brand,
        countInStock,
        image,
      })
    );
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product created successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, history, success, alert]);

  return (
    <AdminContainer>
      <Row className="justify-content-md-center m-3">
        <Col md={4} className="mybox-shadow p-3">
          <h2 className="text-muted text-center">Create Product</h2>
          <Form onSubmit={createProductSubmitHandler} className="newproduct">
            <Form.Group controlId="productname">
              <i className="fa-solid fa-spell-check icon"></i>
              <Form.Control
                type="text"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <i className="fa-solid fa-dollar-sign icon"></i>
              <Form.Control
                type="Number"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="stock">
              <i className="fa-solid fa-warehouse icon"></i>
              <Form.Control
                type="Number"
                placeholder="Stock"
                onChange={(e) => setcountInStock(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <i className="fa-regular fa-note-sticky icon"></i>
              <Form.Control
                as="textarea"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={1}
                cols={30}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <i className="fa-solid fa-list icon"></i>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Choose Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="brand">
              <i className="fa-regular fa-copyright icon"></i>
              <Form.Control
                type="text"
                placeholder="Product Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <i className="fa-regular fa-image icon"></i>
              <Form.Control
                type="text"
                placeholder="Image path"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={loading ? true : false}
              className="btn-block"
            >
              Create Product
            </Button>
          </Form>
        </Col>
      </Row>
    </AdminContainer>
  );
};

export default NewProduct;
