import React, { Component } from "react";
import { fetchMovieTrending } from "../../services/api";
import MoviesList from "../../Components/MoviesList/MoviesList";
import { titleList } from "./HomePage.module.css";

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
        <h2 className={titleList}>Trending today</h2>
        <ol>
          <MoviesList movies={results} />
        </ol>
      </div>
    );
  }
}
