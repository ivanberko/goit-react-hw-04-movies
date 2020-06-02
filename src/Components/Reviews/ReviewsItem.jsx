import React, { Component } from "react";
import { fetchMovieReviews } from "../../services/api";
import ReviewsList from "./ReviewsItem/ReviewsList";
import { reviewsList } from "./Reviews.module.css";

export default class Reviews extends Component {
  state = {
    results: [],
  };
  componentDidMount() {
    const { match } = this.props;
    fetchMovieReviews(match.params.movieId)
      .then(({ data: { results } }) => this.setState({ results }))
      .catch((error) => console.log(error));
  }
  render() {
    const { results } = this.state;
    return (
      <ul className={reviewsList}>
        <ReviewsList reviews={results} />
      </ul>
    );
  }
}
