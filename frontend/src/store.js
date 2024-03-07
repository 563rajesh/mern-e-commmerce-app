import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailsReducer,
  newProductReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
  newReviewReducer,
} from "./reducers/productReducer";

import {
  userReducer,
  userUpdateProfileReducer,
  allUserReducer,
  getSingleUserReducer,
  forgotPasswordReducer,
} from "./reducers/userReducers";

import {
  orderCreateReducer,
  orderDetailsReducer,
  myOrders,
  allOrdersReducer,
  orderReducer,
} from "./reducers/orderReducers";

import { cartReducer } from "./reducers/cartReducer";

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
  singleUser: getSingleUserReducer,
  userUpdateProfile: userUpdateProfileReducer,
  listUser: allUserReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  listMyOrders: myOrders,
  allOrders: allOrdersReducer,
  order: orderReducer,
  newReview: newReviewReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  forgotPassword: forgotPasswordReducer,
});

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  // user: { userInfo: userInfoFromStorage },
};

// const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
