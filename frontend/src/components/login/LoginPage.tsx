import React from "react";
import "./Login.css";
import LoginCard from "./LoginCard";

interface State {}
interface Props {}

export class LoginPage extends React.Component<Props, State> {
  render() {
    return (
      <div className="back-image">
        <LoginCard />
      </div>
    );
  }
}
