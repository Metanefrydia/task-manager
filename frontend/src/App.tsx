import React from "react";
import "./App.css";
import Nav from "./common/nav/Nav";
import { RegisterPage } from "./components/register/RegisterPage";
import { LoginPage } from "./components/login/LoginPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

interface State {}
interface Props {}

export class App extends React.Component<Props, State> {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={RegisterPage} />
            <Route path="/login" exact component={LoginPage} />
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
