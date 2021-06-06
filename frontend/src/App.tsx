import React, { FunctionComponent } from "react";
import "./App.css";
import Nav from "./common/nav/Nav";
import { RegisterPage } from "./components/register/RegisterPage";
import { LoginPage } from "./components/login/LoginPage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./common/protectedRoute/PrivateRoute";

interface State {}
interface Props {}

export class App extends React.Component<Props, State> {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Switch>
            <PrivateRoute path="/"  component={Home}  exact />
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
