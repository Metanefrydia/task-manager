import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const condition = AuthenticationService.isLoggedIn();

  return condition ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};
export default PrivateRoute;
