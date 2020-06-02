import React from "./node_modules/react";
import PropTypes from "./node_modules/prop-types";
import { NavLink, withRouter } from "./node_modules/react-router-dom";
import { getPoster } from "../../utils/helpers";
import {
  movieCard,
  movieDescription,
  genreItem,
  addInfo,
  addInfoLink,
  activeLink,
  btnGoBack,
  titleMovie,
} from "./MovieDetails.module.css";

const MovieDetails = ({
  title,
  release_date,
  overview,
  genres,
  vote_average,
  poster_path,
  onGoBack,
  match,
}) => {
  const genresList = genres.map(({ id, name }) => (
    <span key={id} className={genreItem}>
      {name}
    </span>
  ));
  const releaseYear = new Date(Date.parse(release_date)).getFullYear();

  return (
    <div>
      <button type="button" className={btnGoBack} onClick={onGoBack}>
        &#9668; Go back
      </button>
      <section className={movieCard}>
        {poster_path && <img src={getPoster(poster_path, "w300")} alt="" />}
        <div className={movieDescription}>
          <h2 className={titleMovie}>
            {title} ({releaseYear})
          </h2>
          <p>
            Rating: <b>{vote_average}/10</b>
          </p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <div>{genresList}</div>
        </div>
      </section>
      <section className={addInfo}>
        <h3>Additional information</h3>
        <NavLink
          to={`${match.url}/cast`}
          className={addInfoLink}
          activeClassName={activeLink}
        >
          Cast
        </NavLink>
        <NavLink
          to={`${match.url}/reviews`}
          className={addInfoLink}
          activeClassName={activeLink}
        >
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
  poster_path: PropTypes.string,
};

export default withRouter(MovieDetails);
