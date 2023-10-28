import { Switch, Route } from "react-router-dom";
import { Home } from "./App";

import ChallengeOne from "./tasks/one";
import ChallengeTwo from "./tasks/two";
import ChallengeThree from "./tasks/three/three";

const Routes = () => (
  <Switch>
    <Route component={ChallengeThree} path="/three" />
    <Route component={ChallengeTwo} path="/two" />
    <Route component={ChallengeOne} path="/one" />
    <Route component={Home} />
  </Switch>
);

export default Routes;
