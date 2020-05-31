import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { movieItem, movieLink } from "./MoviesList.module.css";

const MoviesList = ({ movies = [] }) =>
  movies.map(({ id, title }) => (
    <li key={id} className={movieItem}>
      <NavLink to={`/movies/${id}`} className={movieLink}>{title}</NavLink>
    </li>
  ));

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
export default MoviesList;
