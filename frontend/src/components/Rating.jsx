import React from "react";

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span style={{ color: "yellow" }}>
        <i
          className={
            value >= 1
              ? "fa-regular fa-star"
              : value >= 0.5
              ? "fa-regular fa-star-half"
              : "fa-regular fa-star-half"
          }
        ></i>
      </span>
      <span style={{ color: "yellow" }}>
        <i
          className={
            value >= 2
              ? "fa-regular fa-star"
              : value >= 1.5
              ? "fa-regular fa-star-half"
              : "fas-fa-start"
          }
        ></i>
      </span>
      <span style={{ color: "yellow" }}>
        <i
          className={
            value >= 3
              ? "fa-regular fa-star"
              : value >= 2.5
              ? "fa-regular fa-star-half"
              : "fas-fa-start"
          }
        ></i>
      </span>
      <span style={{ color: "yellow" }}>
        <i
          className={
            value >= 4
              ? "fa-regular fa-star"
              : value >= 4.5
              ? "fa-regular fa-star-half"
              : "fas-fa-start"
          }
        ></i>
      </span>
      <span style={{ color: "yellow" }}>
        <i
          className={
            value >= 5
              ? "fa-regular fa-star"
              : value >= 4.5
              ? "fa-regular fa-star-half"
              : "fas-fa-start"
          }
        ></i>
      </span>
      <span>{text}</span>
    </div>
  );
};

export default Rating;
