import React from "react";
import "./App.css";
import Nav from "./common/nav/Nav";
import { RegisterPage } from "./components/register/RegisterPage";
import { LoginPage } from "./components/login/LoginPage";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthenticationService from "./services/service";

interface State {}
interface Props {}

export class App extends React.Component<Props, State> {
  private user = AuthenticationService.getUserDetails();

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route path="/" exact>
              {this.user ? { Home } : <Redirect to="/login" />}
            </Route>
            <Route path="/signup" exact component={RegisterPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="*">
              <div> 404 Not Found</div>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const Home = () => {
  return (
    <div>
      <h1>Task manager</h1>
    </div>
  );
};
