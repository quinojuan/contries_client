import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import TourActivity from "./components/TourActivity/TourActivity";
import Details from "./components/Detail/Details";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"}>
          <LandingPage />
        </Route>
        <Route path={"/home"}>
          <Home />
        </Route>
        <Route path={"/Country/:id"}>
          <Details />
        </Route>
        <Route path={"/TourActivity"}>
          <TourActivity />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
