import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import { formatData } from "../../utils/helpers";
import MovieDetails from "../../Components/MovieDetails/MovieDetails";
import Cast from "../../Components/Cast/Cast";
import Reviews from "../../Components/Reviews/Reviews";

export default class MovieDetailsPage extends Component {
  state = {
    details: null,
  };

  componentDidMount() {
    const { match } = this.props;
    fetchMovieDetails(match.params.movieId)
      .then(({ data }) => this.setState({ details: formatData(data) }))
      .catch((error) => console.log(error));
  }

  render() {
    const { details } = this.state;
    const { match } = this.props;
    return (
      <div>
        {details && <MovieDetails {...details} />}
        <Switch>
          <Route path={`${match.path}/cast`} component={Cast} />
          <Route path={`${match.path}/reviews`} component={Reviews} />
        </Switch>
      </div>
    );
  }
}
