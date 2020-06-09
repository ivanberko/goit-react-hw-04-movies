import React, { Component, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";

import Loader from "../../Components/Loader/Loader";
import MovieDetails from "../../Components/MovieDetails/MovieDetails";

const Cast = lazy(
  () =>
    import(
      "../../Components/Cast/Cast"
    ) /* webpackChunkName: "movie-details-cast" */
);
const Reviews = lazy(
  () =>
    import(
      "../../Components/Reviews/ReviewsItem"
    ) /* webpackChunkName: "movie-details-reviews" */
);

export default class MovieDetailsPage extends Component {
  state = {
    details: null,
    from: null,
  };

  componentDidMount() {
    const {
      match: {
        params: { movieId, media },
      },
    } = this.props;
    const { state } = this.props.location;

    if (state) this.setState({ from: state.from });

    fetchMovieDetails(media, movieId)
      .then(({ data }) => this.setState({ details: { ...data } }))
      .catch((error) => console.log(error));
  }

  handleGoBack = () => {
    const { history } = this.props;

    if (this.state.from) {
      const { pathname, search } = this.state.from;
      history.push(`${pathname}${search}`);
      return;
    }
    history.push("/");
  };

  render() {
    const { details } = this.state;
    const { match } = this.props;
    return (
      <div>
        {details && <MovieDetails {...details} onGoBack={this.handleGoBack} />}
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path={`${match.path}/cast/info`} component={Cast} />
            <Route path={`${match.path}/reviews/info`} component={Reviews} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}
