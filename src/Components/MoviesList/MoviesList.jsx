import React from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { movieItem, movieLink } from "./MoviesList.module.css";
import { getPoster } from "../../utils/helpers";

const MoviesList = ({
  movies = [],
  location,
  match: {
    params: { media },
  },
}) =>
  movies.map(({ id, title, poster_path, name, media_type }) => (
    <li key={id} className={movieItem}>
      <NavLink
        to={{
          pathname: `/${media_type ? media_type : media}/${id}`,
          state: { from: location },
        }}
        className={movieLink}
      >
        {poster_path && <img src={getPoster(poster_path, "w200")} alt="" />}
        <p>{title ? title : name}</p>
      </NavLink>
    </li>
  ));

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
    }).isRequired
  ).isRequired,
};
export default withRouter(MoviesList);
