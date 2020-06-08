import React from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { genreLink } from "./GenreList.module.css";

const GenreList = ({ genres = [], media }) =>
  genres.map(({ id, name }) => (
    <li key={id}>
      <NavLink to={`/${media}/${id}/${name}`} className={genreLink}>
        {name}
      </NavLink>
    </li>
  ));

GenreList.propsTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  media: PropTypes.string.isRequired,
};
export default withRouter(GenreList);
