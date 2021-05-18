import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
      <h1>Task manager</h1>
    </div>
  );
};
