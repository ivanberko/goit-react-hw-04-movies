import React, { Component } from "react";
import { fetchMovieListByGenre } from "../../services/api";
import MoviesList from "../../Components/MoviesList/MoviesList";
import { listMovies, titleGenre } from "./MoviesGenre.module.css";

export default class MoviesGenre extends Component {
  state = {
    results: [],
  };

  componentDidMount() {
    const {
      match: {
        params: { genreId, media },
      },
    } = this.props;

    fetchMovieListByGenre(media, genreId)
      .then(({ data: { results } }) => this.setState({ results }))
      .catch((error) => console.log(error));
  }
  render() {
    const { results } = this.state;
    const {
      match: {
        params: { genre },
      },
    } = this.props;
    return (
      <>
        <h1 className={titleGenre}>Genre: {genre}</h1>
        <ul className={listMovies}>
          <MoviesList movies={results} />
        </ul>
      </>
    );
  }
}
