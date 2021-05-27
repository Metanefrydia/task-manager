import React from "react";
import "./Register.css";
import RegisterCard from "./RegisterCard";

interface State {}
interface Props {}

export class RegisterPage extends React.Component<Props, State> {
  render() {
    return (
      <div className="register-page">
        <RegisterCard />
      </div>
    );
  }
}
