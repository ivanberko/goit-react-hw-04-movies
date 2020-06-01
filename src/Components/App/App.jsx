import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Nav from "../Nav/Nav";

const HomePage = lazy(() => import("../../Pages/HomePage/HomePage")); /* webpackChunkName: "home-page" */
const MovieDetailsPage = lazy(() =>
  import("../../Pages/MovieDetailsPage/MovieDetailsPage")
);
const MoviesPage = lazy(() =>
  import("../../Pages/MoviesPage/MoviesPage")
);

const App = () => (
  <div>
    <Nav />
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route path="/movies" component={MoviesPage} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  </div>
);
export default App;
