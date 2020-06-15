import React, { Component } from "react";
import queryString from "query-string";
import { fetchMovieTrending, fetchMovieGenresList } from "../../services/api";
import {
  optionsMedia,
  optionsTimeInterval,
} from "../../utils/selectCategories";
import { scrollTo, scrollToUp } from "../../utils/helpers";

//Styles
import {
  titleList,
  listMovies,
  listGenre,
  wrapperHomePage,
  titleGenre,
  articleSelectors,
  articleListMovies,
  genresBox
} from "./HomePage.module.css";

//components
import MoviesList from "../../Components/MoviesList/MoviesList";
import GenreList from "../../Components/GenreList/GenreList";
import Selector from "../../Components/Select/Selector";
import Button from "../../Components/Button/Button";
import ArrowUpward from "../../Components/Icon/Icon";

export default class HomePage extends Component {
  state = {
    moviesGallery: [],
    page: 1,
    genresMovies: [],
    genresTv: [],
    mediaType: "all",
    timeInterval: "day",
  };

  componentDidMount() {
    const { mediaType, timeInterval, page } = this.state;
    const { media, time } = queryString.parse(this.props.location.search);

    if (media && time) {
      if (media !== mediaType || time !== timeInterval) {
        this.setState({ mediaType: media, timeInterval: time });
        this.getMovieGenresList();
        return;
      }

      fetchMovieTrending(mediaType, timeInterval, page)
        .then((results) => this.setState({ moviesGallery: results }))
        .catch((error) => console.log(error));

      this.getMovieGenresList();
      return;
    }

    fetchMovieTrending(mediaType, timeInterval, page)
      .then((results) => this.setState({ moviesGallery: results }))
      .catch((error) => console.log(error));

    this.getMovieGenresList();
  }

  getMovieGenresList = () => {
    fetchMovieGenresList("movie")
      .then(({ data: { genres } }) => this.setState({ genresMovies: genres }))
      .catch((error) => console.log(error));

    fetchMovieGenresList("tv")
      .then(({ data: { genres } }) => this.setState({ genresTv: genres }))
      .catch((error) => console.log(error));
  };

  handleChangeMediaType = (opt) => {
    const { mediaType } = this.state;
    if (opt.value === mediaType) return;
    if (opt) {
      this.setState({ mediaType: opt.value });
      this.setState({ moviesGallery: [] });
      this.setState({ page: 1 });
    }
  };

  handleChangeTimeInterval = (opt) => {
    const { timeInterval } = this.state;
    if (opt.value === timeInterval) return;
    if (opt) {
      this.setState({ timeInterval: opt.value });
      this.setState({ moviesGallery: [] });
      this.setState({ page: 1 });
    }
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  onClickUpward = () => {
    scrollToUp();
  };

  componentDidUpdate(prevProps, prevState) {
    const { mediaType, timeInterval, page, moviesGallery } = this.state;
    const {
      mediaType: prevMediaType,
      timeInterval: prevTimeInterval,
      page: prevPage,
    } = prevState;
    if (
      mediaType !== prevMediaType ||
      timeInterval !== prevTimeInterval ||
      page !== prevPage
    ) {
      fetchMovieTrending(mediaType, timeInterval, page)
        .then((results) => {
          !moviesGallery.length
            ? this.setState({ moviesGallery: results })
            : this.setState((prevState) => ({
                moviesGallery: [...prevState.moviesGallery, ...results],
              }));
        })
        .catch((error) => console.log(error))
        .finally(() => {
          if (moviesGallery.length) {
            scrollTo();
          }
        });
      this.props.history.push({
        ...this.props.location,
        search: `?media=${mediaType}&time=${timeInterval}`,
      });
    }
  }

  render() {
    const {
      moviesGallery,
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
        <ArrowUpward onClickUpward={this.onClickUpward} />
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
          <aside className={genresBox}>
            <ul className={listGenre}>
              <h3 className={titleGenre}>Movie genres</h3>
              <GenreList genres={genresMovies} media={"movie"} />
            </ul>
            <ul className={listGenre}>
              <h3 className={titleGenre}>TV genres</h3>
              <GenreList genres={genresTv} media={"tv"} />
            </ul>
          </aside>
          <article className={articleListMovies}>
            <ul className={listMovies}>
              <MoviesList movies={moviesGallery} />
            </ul>
            {moviesGallery.length > 0 && (
              <Button onLoadMore={this.handleLoadMore} />
            )}
          </article>
        </section>
      </div>
    );
  }
}
