import React, { Component } from "react";
import { fetchMovieCast } from "../../services/api";
import CastItem from "./CastItem/CastItem";
import { castList } from "./Cast.module.css";

export default class Cast extends Component {
  state = {
    cast: [],
  };
  // TODO добавить поиск актеров по TV
  componentDidMount() {
    const { movieId, media } = this.props.match.params;
    fetchMovieCast(media, movieId)
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
