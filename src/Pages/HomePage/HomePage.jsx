import React, { Component } from "react";
import { fetchMovieTrending } from "../../services/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import { titleList, listMovies } from "./HomePage.module.css";

export default class HomePage extends Component {
  state = {
    results: [],
  };

  componentDidMount() {
    fetchMovieTrending()
      .then((results) => this.setState({ results }))
      .catch((error) => console.log(error));
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        <h1 className={titleList}>Trending today</h1>
        <ol className={listMovies}>
          <MoviesList movies={results} />
        </ol>
      </div>
    );
  }
}
