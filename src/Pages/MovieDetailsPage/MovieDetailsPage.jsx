import React, { Component, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import { formatData } from "../../utils/helpers";

import Loader from "../../components/Loader/Loader";
import MovieDetails from "../../components/MovieDetails/MovieDetails";

const Cast = lazy(() =>
  import(
    "../../components/Cast/Cast" /* webpackChunkName: "movie-details-cast" */
  )
);
const Reviews = lazy(() =>
  import(
    "../../components/Reviews/ReviewsItem" /* webpackChunkName: "movie-details-reviews" */
  )
);

export default class MovieDetailsPage extends Component {
  state = {
    details: null,
    from: null,
  };

  componentDidMount() {
    const { match } = this.props;
    const { state } = this.props.location;

    this.setState({ location: true });
    if (state) this.setState({ from: state.from });

    fetchMovieDetails(match.params.movieId)
      .then(({ data }) => this.setState({ details: formatData(data) }))
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({ location: false });
      });
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
            <Route path={`${match.path}/cast`} component={Cast} />
            <Route path={`${match.path}/reviews`} component={Reviews} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}
