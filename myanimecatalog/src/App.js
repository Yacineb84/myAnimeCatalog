import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Homepage from "./components/HOMEPAGE/Homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Anime from "./components/ANIME/Anime";
import Monespace from "./components/MONESPACE/Monespace";

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/anime/:id" component={Anime} />
      <Route path="/monespace" component={Monespace} />
      <Route path="/" component={Homepage} />
    </Switch>
  </Router>
  );
}

export default App;
