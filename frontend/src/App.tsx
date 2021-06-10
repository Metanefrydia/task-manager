import React from "react";
import "./App.css";
import Nav from "./common/nav/Nav";
import { RegisterPage } from "./components/register/RegisterPage";
import { LoginPage } from "./components/login/LoginPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./common/protectedRoute/PrivateRoute";
import HomePage from "./components/home/HomePage";
import GroupPage from "./components/groups/GroupPage";

interface State {}
interface Props {}

export class App extends React.Component<Props, State> {
  render() {

    return (
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Switch>
            <PrivateRoute path="/" component={HomePage} exact />
            <Route path="/signup" exact component={RegisterPage} />
            <Route path="/login" exact component={LoginPage} />
            <PrivateRoute path="/groups/:id" component={GroupPage} exact />
            <Route path="*">
              <div> 404 Not Found</div>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
