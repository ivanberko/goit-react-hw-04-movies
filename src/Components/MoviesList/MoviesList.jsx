import React from "./node_modules/react";
import PropTypes from "./node_modules/prop-types";
import { NavLink, withRouter } from "./node_modules/react-router-dom";
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
