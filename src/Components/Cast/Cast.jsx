import React, { Component } from "./node_modules/react";
import { fetchMovieCast } from "../../services/api";
import CastItem from "./CastItem/CastItem";
import { castList } from "./Cast.module.css";

export default class Cast extends Component {
  state = {
    cast: [],
  };

  componentDidMount() {
    const { match } = this.props;
    fetchMovieCast(match.params.movieId)
      .then(({ data: { cast } }) => this.setState({ cast }))
      .catch((error) => console.log(error));
  }

  render() {
    const { cast } = this.state;
    return (
      <ul className={castList}>
        <CastItem cast={cast} />
      </ul>
    );
  }
}
