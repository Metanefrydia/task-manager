import React from "react";
import { useHistory } from "react-router-dom";
import TaskManagerLogo from "../../images/TaskManagerLogo.png";
import "./Nav.css";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";

interface State {
  logged: boolean;
  userId: string | undefined;
}

const Nav = () => {
  const [state, setState] = React.useState<State>({
    logged: AuthenticationService.isLoggedIn(),
    userId: AuthenticationService.getUserDetails()?._id,
  });

  let history = useHistory();

  const logOutHandle = () => {
    setState({
      logged: false,
      userId: "",
    });
    AuthenticationService.logout();
    history.push("/login");
  };

  return (
    <nav>
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{
          minHeight: "9vh",
          background: "rgb(255, 255, 255)",
          filter: "drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.05))",
        }}
      >
        <Grid
          container
          justify="flex-start"
          item
          xs={8}
          style={{ paddingLeft: "25px" }}
        >
          <Link to={`/${state.userId}`}>
            <img
              className="nav-logo"
              src={TaskManagerLogo}
              alt="FancyFood logo"
            />
          </Link>
        </Grid>

        <Grid
          container
          justify="flex-end"
          item
          xs={4}
          style={{ paddingRight: "25px" }}
        >
          <div style={{ paddingTop: "5px" }}>
            {state.logged ? (
              <Button
                variant="outlined"
                color="secondary"
                className="button-style"
                onClick={logOutHandle}
              >
                <span className="btn-email-text btn-texts-login">
                  wyloguj się
                </span>
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to="/login"
                className="button-style"
              >
                <span className="btn-email-text btn-texts-login">
                  zaloguj się
                </span>
              </Button>
            )}
          </div>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to={state.logged ? `/groups/${state.userId}` : "/signup"}
          >
            <span className="btn-signup-text btn-texts-login">
              {state.logged ? "twoje zespoły" : "zarejestruj się"}
            </span>
          </Button>
        </Grid>
      </Grid>
    </nav>
  );
};

export default Nav;
