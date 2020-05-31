import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "../../Pages/HomePage/HomePage";
import MoviesPage from "../../Pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "../../Pages/MovieDetailsPage/MovieDetailsPage";
import Nav from "../Nav/Nav";

const App = () => (
  <div>
    <Nav />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/movies/:movieId" component={MovieDetailsPage} />
      <Route path="/movies" component={MoviesPage} />
      <Redirect to="/" />
    </Switch>
  </div>
);
export default App;
