import React, { useState, useEffect } from "react";
import AdminContainer from "./layout/AdminContainer";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
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
      <h3>Update product</h3>
      <Form onSubmit={updateProductSubmitHandler}>
        <Form.Group controlId="productname">
          <Form.Control
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Label>
          <i className="fa-regular fa-star"></i>
        </Form.Label>
        <Form.Group controlId="price">
          <Form.Control
            type="Number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="countInStock">
          <Form.Control
            type="Number"
            value={countInStock}
            placeholder="Stock"
            onChange={(e) => setCountInStock(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
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
          <Form.Label>
            <i className="fa-regular fa-category"></i>
          </Form.Label>
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
          <Form.Control
            type="text"
            placeholder="Product Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="image">
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
        >
          Update Product
        </Button>
      </Form>
    </AdminContainer>
  );
};

export default UpdateProduct;
