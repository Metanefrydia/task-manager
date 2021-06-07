import React from "react";
import LoginCard from "./LoginCard";

interface State {}
interface Props {}

export class LoginPage extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <LoginCard />
      </div>
    );
  }
}
