import React, { Component } from "react";
import { fetchMovieSearch } from "../../services/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import { listMovies, form } from "./MoviesPage.module.css";
import queryString from "query-string";

export default class MoviesPage extends Component {
  state = {
    query: "",
    results: [],
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  componentDidMount() {
    const { query } = queryString.parse(this.props.location.search);
    if (query) {
      fetchMovieSearch(query)
        .then(({ data: { results } }) => this.setState({ results }))
        .catch((error) => console.log(error));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    if (query) {
      fetchMovieSearch(query)
        .then(({ data: { results } }) => this.setState({ results }))
        .catch((error) => console.log(error));
      this.props.history.push({
        ...this.props.location,
        search: `?query=${query}`,
      });
    }
  };

  render() {
    const { query, results } = this.state;
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
          <MoviesList movies={results} />
        </ol>
      </div>
    );
  }
}
