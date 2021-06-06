import React from "react";
import "./App.css";
import Nav from "./common/nav/Nav";
import { RegisterPage } from "./components/register/RegisterPage";
import { LoginPage } from "./components/login/LoginPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import PrivateRoute from "./common/protectedRoute/PrivateRoute";
import { Button } from "@material-ui/core";

interface State {}
interface Props {}

export class App extends React.Component<Props, State> {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Switch>
            <PrivateRoute path="/" component={Home} exact />
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
    <div className="App">
      <Button
        variant="contained"
        type="submit"
        color="secondary"
        className="btn-login"
        size="large"
      >
        <span className="btn-login-txt">Zarejestruj się</span>
      </Button>
      <Button
        variant="outlined"
        type="submit"
        color="secondary"
        className="btn-login"
        size="large"
      >
        <span className="btn-login-txt">Zaloguj się</span>
      </Button>
      <HomePage />
    </div>
  );
};
