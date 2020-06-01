import React from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { movieItem, movieLink } from "./MoviesList.module.css";
import { getPoster } from "../../utils/helpers";

const MoviesList = ({ movies = [], location }) =>
  movies.map(({ id, title, poster_path }) => (
    <li key={id} className={movieItem}>
      <NavLink
        to={{
          pathname: `/movies/${id}`,
          state: { from: location },
        }}
        className={movieLink}
      >
        {poster_path && <img src={getPoster(poster_path, "w200")} alt="" />}
        <p>{title}</p>
      </NavLink>
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
export default withRouter(MoviesList);
