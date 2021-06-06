import  React from  "react";
import { Route, Redirect } from  "react-router-dom"
import service from "../../services/service";



const  PrivateRoute: React.FC<{
    component: React.FC;
    path: string;
    exact: boolean;
}> = (props) => {

    const condition = service.isLoggedIn();

    return  condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) :
        (<Redirect  to="/login"  />);
};
export  default  PrivateRoute;