import React from "react";
import TaskManagerLogo from "../../images/TaskManagerLogo.png";
import "./Nav.css";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import AuthenticationService from "../../services/service";

interface State {
  logged: boolean;
}

const Nav = () => {
  const currentUser = AuthenticationService.getUserDetails()?.name;

  const [states, setState] = React.useState<State>({
    logged: false,
  });

  const logOutHandle = () => {
    setState({
      logged: false,
    });
    AuthenticationService.logout();
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
          <Link to="/">
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
            {currentUser ? (
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginRight: "20px" }}
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
                style={{ marginRight: "20px" }}
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
            to={currentUser ? "/" : "/signup"}
          >
            <span className="btn-signup-text btn-texts-login">
              {currentUser ? "twoje zespoły" : "zarejestruj się"}
            </span>
          </Button>
        </Grid>
      </Grid>
    </nav>
  );
};

export default Nav;
