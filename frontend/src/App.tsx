import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Button } from "@material-ui/core";
import HomePage from "./components/home/HomePage";

interface State {}
interface Props {}

export class App extends React.Component<Props, State> {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
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
      <h1>Task manager</h1>
      <HomePage />
    </div>
  );
};
