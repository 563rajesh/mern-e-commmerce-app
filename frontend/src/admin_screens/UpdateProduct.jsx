import React, { useState, useEffect } from "react";
import AdminContainer from "./layout/AdminContainer";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  clearErrors,
  listProductDetails,
  updateProduct,
} from "../actions/productActions";
import { useAlert } from "react-alert";
import { UPDATE_PRODUCT_RESET } from "../constants/productConstant";

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Electronics",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(productId, {
        name,
        price,
        description,
        countInStock,
        brand,
        category,
        image,
      })
    );
  };

  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setImage(product.image);
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product updated succcesfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);
  return (
    <AdminContainer>
      <Row className="justify-content-md-center m-3 h-500 align-items-md-center">
        <Col md={4} className="mybox-shadow p-3">
          <h2 className="text-muted text-center">Update Product</h2>
          <Form
            onSubmit={updateProductSubmitHandler}
            className="update-product"
          >
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <i className="fa-solid fa-warehouse icon"></i>

              <Form.Control
                type="Number"
                value={countInStock}
                placeholder="Stock"
                onChange={(e) => setCountInStock(e.target.value)}
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
                placeholder="Product Image"
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
              Update Product
            </Button>
          </Form>
        </Col>
      </Row>
    </AdminContainer>
  );
};

export default UpdateProduct;
