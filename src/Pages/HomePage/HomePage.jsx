import React, { Component } from "react";
import { fetchMovieTrending, fetchMovieGenresList } from "../../services/api";
import {
  optionsMedia,
  optionsTimeInterval,
} from "../../utils/selectCategories";
import MoviesList from "../../Components/MoviesList/MoviesList";
import GenreList from "../../Components/GenreList/GenreList";
import Selector from "../../Components/Select/Selector";
import {
  titleList,
  listMovies,
  listGenre,
  wrapperHomePage,
  titleGenre,
  articleSelectors,
} from "./HomePage.module.css";
// import queryString from "query-string";

export default class HomePage extends Component {
  state = {
    results: [],
    genresMovies: [],
    genresTv: [],
    mediaType: "all",
    timeInterval: "day",
  };

  componentDidMount() {
    const { mediaType, timeInterval } = this.state;

    fetchMovieTrending(mediaType, timeInterval)
      .then((results) => this.setState({ results }))
      .catch((error) => console.log(error));

    fetchMovieGenresList("movie")
      .then(({ data: { genres } }) => this.setState({ genresMovies: genres }))
      .catch((error) => console.log(error));

    fetchMovieGenresList("tv")
      .then(({ data: { genres } }) => this.setState({ genresTv: genres }))
      .catch((error) => console.log(error));
  }

  handleChangeMediaType = (opt) => {
    if (opt) {
      this.setState({ mediaType: opt.value });
    }
  };

  handleChangeTimeInterval = (opt) => {
    if (opt) {
      this.setState({ timeInterval: opt.value });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { mediaType, timeInterval } = this.state;
    const {
      mediaType: prevMediaType,
      timeInterval: prevTimeInterval,
    } = prevState;
    if (mediaType !== prevMediaType || timeInterval !== prevTimeInterval) {
      fetchMovieTrending(mediaType, timeInterval)
        .then((results) => this.setState({ results }))
        .catch((error) => console.log(error));
    }
  }

  render() {
    const {
      results,
      genresMovies,
      genresTv,
      mediaType,
      timeInterval,
    } = this.state;

    const getMediaType = optionsMedia.find(
      (media) => media.value === mediaType
    );

    const getTimeInterval = optionsTimeInterval.find(
      (time) => time.value === timeInterval
    );

    return (
      <div>
        <h1 className={titleList}>Trending</h1>
        <article className={articleSelectors}>
          <Selector
            value={getMediaType}
            options={optionsMedia}
            onChange={this.handleChangeMediaType}
          />
          <Selector
            value={getTimeInterval}
            options={optionsTimeInterval}
            onChange={this.handleChangeTimeInterval}
          />
        </article>
        <section className={wrapperHomePage}>
          <aside>
            <ul className={listGenre}>
              <h3 className={titleGenre}>Movie genres</h3>
              <GenreList genres={genresMovies} media={"movie"} />
            </ul>
            <ul className={listGenre}>
              <h3 className={titleGenre}>TV genres</h3>
              <GenreList genres={genresTv} media={"tv"} />
            </ul>
          </aside>
          <ul className={listMovies}>
            <MoviesList movies={results} />
          </ul>
        </section>
      </div>
    );
  }
}
