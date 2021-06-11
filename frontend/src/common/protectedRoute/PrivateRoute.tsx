import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";

const PrivateRoute: React.FC<{
  component: React.FC | any;
  path: string;
  exact: boolean;
}> = (props) => {
  const isUserLoggedIn = AuthenticationService.isLoggedIn();

  return isUserLoggedIn ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};
export default PrivateRoute;
