import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Suspense } from "react";
import MovieHeader from "common/components/MovieHeader";
import MovieFooter from "common/components/MovieFooter";
import BackToTop from "common/components/BackToTop";

function App() {
  const Home = React.lazy(() => import("features/booking/pages/Home"));
  const Detail = React.lazy(() => import("features/booking/pages/Detail"));
  //const scrollPosition = useScrollPosition();
  return (
    <Router>
      <div>
        <MovieHeader />
        <Suspense>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/Detail/:movieId">
              <Detail />
            </Route>
          </Switch>
        </Suspense>
        <MovieFooter />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
