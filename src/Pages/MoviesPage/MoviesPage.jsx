import React, { Component } from "react";
import { fetchMovieSearch } from "../../services/api";
import { scrollTo, scrollToUp } from "../../utils/helpers";
import queryString from "query-string";

import MoviesList from "../../Components/MoviesList/MoviesList";
import Button from "../../Components/Button/Button";
import ArrowUpward from "../../Components/Icon/Icon";
import { listMovies, form } from "./MoviesPage.module.css";

export default class MoviesPage extends Component {
  state = {
    query: "",
    page: 1,
    moviesGallery: [],
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  componentDidMount() {
    const { page } = this.state;
    const { query } = queryString.parse(this.props.location.search);
    if (query) {
      fetchMovieSearch(query, page)
        .then(({ data: { results } }) =>
          this.setState({ moviesGallery: results })
        )
        .catch((error) => console.log(error));
    }
  }

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    if (query) {
      fetchMovieSearch(query)
        .then(({ data: { results } }) =>
          this.setState({ moviesGallery: results })
        )
        .catch((error) => console.log(error));
      this.props.history.push({
        ...this.props.location,
        search: `?query=${query}`,
      });
    }
  };

  onClickUpward = () => {
    scrollToUp();
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, moviesGallery, query } = this.state;
    const { page: prevPage } = prevState;

    if (page !== prevPage) {
      fetchMovieSearch(query, page)
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
    const { query, moviesGallery } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className={form}>
          <input
            type="text"
            name="query"
            value={query}
            onChange={this.handleChange}
            placeholder="Movies..."
          />
          <button type="submit">Search</button>
        </form>
        <ol className={listMovies}>
          <MoviesList movies={moviesGallery} />
        </ol>
        {moviesGallery.length > 0 && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {moviesGallery.length > 0 && (
          <ArrowUpward onClickUpward={this.onClickUpward} />
        )}
      </div>
    );
  }
}
