import React, { Component } from "react";
import { fetchMovieSearch } from "../../services/api";
import MoviesList from "../../components/MoviesList/MoviesList";

export default class MoviesPage extends Component {
  state = {
    query: "",
    results: [],
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    fetchMovieSearch(query)
      .then(({ data: { results } }) => this.setState({ results }))
      .catch((error) => console.log(error));
  };

  render() {
    const { query, results } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="query"
            value={query}
            onChange={this.handleChange}
          />
          <button type='submit'>Search</button>
        </form>
        <ol>
          <MoviesList movies={results} />
        </ol>
      </div>
    );
  }
}
