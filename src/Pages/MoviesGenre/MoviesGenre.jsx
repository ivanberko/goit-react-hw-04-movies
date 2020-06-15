import React, { Component } from "react";
import { fetchMovieListByGenre } from "../../services/api";
import { scrollTo, scrollToUp } from "../../utils/helpers";

//Components
import MoviesList from "../../Components/MoviesList/MoviesList";
import Button from "../../Components/Button/Button";
import ArrowUpward from "../../Components/Icon/Icon";
//Styles
import { listMovies, titleGenre } from "./MoviesGenre.module.css";

export default class MoviesGenre extends Component {
  state = {
    moviesGallery: [],
    page: 1,
  };

  componentDidMount() {
    const {
      match: {
        params: { genreId, media },
      },
    } = this.props;
    const { page } = this.state;
    fetchMovieListByGenre(media, genreId, page)
      .then(({ data: { results } }) =>
        this.setState({ moviesGallery: results })
      )
      .catch((error) => console.log(error));
  }

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  onClickUpward = () => {
    scrollToUp();
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      match: {
        params: { genreId, media },
      },
    } = this.props;
    const { page, moviesGallery } = this.state;
    const { page: prevPage } = prevState;

    if (page !== prevPage) {
      fetchMovieListByGenre(media, genreId, page)
        .then(({ data: { results } }) =>
          !moviesGallery.length
            ? this.setState({ moviesGallery: results })
            : this.setState((prevState) => ({
                moviesGallery: [...prevState.moviesGallery, ...results],
              }))
        )
        .catch((error) => console.log(error))
        .finally(() => {
          scrollTo();
        });
    }
  }

  render() {
    const { moviesGallery } = this.state;
    const {
      match: {
        params: { genre },
      },
    } = this.props;
    return (
      <>
        <ArrowUpward onClickUpward={this.onClickUpward} />
        <h1 className={titleGenre}>Genre: {genre}</h1>
        <ul className={listMovies}>
          <MoviesList movies={moviesGallery} />
        </ul>
        {moviesGallery.length > 0 && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
      </>
    );
  }
}
