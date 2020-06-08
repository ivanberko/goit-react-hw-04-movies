import React from "react";
import PropTypes from "prop-types";
import { select } from "./Selector.module.css";
import Select from "react-select";

const Selector = ({ options, onChange, value }) => (
  <Select
    value={value}
    onChange={onChange}
    options={options}
    className={select}
  />
);

export default Selector;
