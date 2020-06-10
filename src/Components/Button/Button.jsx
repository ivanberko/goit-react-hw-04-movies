import React from "react";
import PropTypes from "prop-types";

import { buttonLoadMore } from "./Button.module.css";

const Button = ({ onLoadMore }) => (
  <button type="button" className={buttonLoadMore} onClick={onLoadMore}>
    Load More
  </button>
);

Button.porpsType = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
