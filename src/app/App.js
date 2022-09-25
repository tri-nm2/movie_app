import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Suspense } from "react";
import MovieHeader from "common/components/MovieHeader";
import MovieFooter from "common/components/MovieFooter";
import BackToTop from "common/components/BackToTop";
import InformationUser from "features/authentication/pages/InformationUser/InformationUser";



function App() {
  const Home = React.lazy(() => import("features/booking/pages/Home"));
  const Detail = React.lazy(() => import("features/booking/pages/Detail"));
  //const scrollPosition = useScrollPosition();

  const Checkout = React.lazy(() => import("features/booking/pages/Checkout"));
  const Signin = React.lazy(() => import("features/authentication/pages/SignIn"));
  const Signup = React.lazy(() => import("features/authentication/pages/SignUp"));
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

            <Route exact path="/Checkout/:movieId">
              <Checkout/>
            </Route>

            <Route exact path="/Signin">
              <Signin />
            </Route>

            <Route exact path="/Signup">
              <Signup />
            </Route>
            <Route exact path="/Thongtintaikhoan">
              <InformationUser />
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
