import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { getPoster } from "../../utils/helpers";
import {
  movieCard,
  movieDescription,
  genreItem,
  addInfo,
  addInfoLink,
  activeLink,
  btnGoBack
} from "./MovieDetails.module.css";

const MovieDetails = ({
  id,
  title,
  release_date,
  overview,
  genres,
  vote_average,
  poster_path,
}) => {
  const genresList = genres.map(({ id, name }) => (
    <span key={id} className={genreItem}>
      {name}
    </span>
  ));
  const releaseYear = new Date(Date.parse(release_date)).getFullYear();
  const scorePercentage = vote_average * 10;
  return (
    <div>
      <button type="button" className={btnGoBack}>&#9668; Go back</button>
      <section className={movieCard}>
        <img src={getPoster(poster_path, "w300")} alt="" />
        <div className={movieDescription}>
          <h2>
            {title} ({releaseYear})
          </h2>
          <p>User Score: {scorePercentage}%</p>
          <h4>Overview</h4>
          <p>{overview}</p>
          <h4>Genres</h4>
          <div>{genresList}</div>
        </div>
      </section>
      <section className={addInfo}>
        <h4>Additional information</h4>
        <NavLink to={`/movies/${id}/cast`} className={addInfoLink} activeClassName={activeLink}>
          Cast
        </NavLink>
        <NavLink to={`/movies/${id}/reviews`} className={addInfoLink} activeClassName={activeLink}>
          Reviews
        </NavLink>
      </section>
    </div>
  );
};

MovieDetails.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  vote_average: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
};

export default MovieDetails;
