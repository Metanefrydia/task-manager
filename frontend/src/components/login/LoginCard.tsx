import React from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Grid,
  Box,
  Card,
  CardContent,
  FormHelperText,
  OutlinedInput,
  Divider,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link } from "react-router-dom";
import "../register/Register.css";
import AuthenticationService from "../../services/service";

interface State {
  password: string;
  showPassword: boolean;
  email: string;
  message: string;
}

const LoginCard = () => {
  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
    email: "",
    message: "",
  });

  const [errors, setErrors] = React.useState<any>();

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });

      switch (prop) {
        case "email": {
          validateEmail(event.target.value);
          break;
        }

        case "password": {
          validatePassword(event.target.value);
          break;
        }
      }
    };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const token = {
      email: values.email,
      password: values.password,
    };

    AuthenticationService.login(token).then(
      () => {
        window.location.href = "/";
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setValues({
          ...values,
          message: resMessage,
        });
        if (Boolean(resMessage)) {
          setValues({
            ...values,
            message: "Błędne dane",
          });
        }
      }
    );
  };

  const validateEmail = (value: any) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setErrors({ ...errors, email: "" });
    if (value.length === 0) {
      setErrors({ ...errors, email: "Email jest wymagany." });
    } else if (!re.test(String(value).toLowerCase())) {
      setErrors({ ...errors, email: "Niepoprawny adres email." });
    }
  };

  const validatePassword = (value: any) => {
    setErrors({ ...errors, password: "" });
    if (value.length === 0) {
      setErrors({ ...errors, password: "Hasło jest wymagane." });
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justify="center"
      style={{ minHeight: "90vh" }}
    >
      <Card className="paperStyle" variant="outlined">
        <Box
          style={{ paddingBottom: "0px", marginTop: "16px", marginLeft: "16%" }}
          display="flex"
          justifyContent="flex-start"
        >
          <p className="register-text">Zaloguj się</p>
        </Box>
        <CardContent>
          <form method="POST" onSubmit={handleLogin}>
            <Grid container direction="column" alignItems="center">
              <TextField
                className="login-input"
                id="email"
                type="text"
                label="Email"
                placeholder="Email"
                margin="normal"
                variant="outlined"
                name="email"
                error={Boolean(errors?.email)}
                helperText={errors?.email}
                onChange={handleChange("email")}
                value={values.email}
              />
              <FormControl
                variant="outlined"
                margin="normal"
                size="medium"
                className="password-input"
              >
                <InputLabel
                  htmlFor="standard-adornment-password"
                  error={Boolean(errors?.password)}
                >
                  Hasło
                </InputLabel>
                <OutlinedInput
                  id="password"
                  type={values.showPassword ? "text" : "password"}
                  placeholder="Password"
                  error={Boolean(errors?.password)}
                  value={values.password}
                  name="password"
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText
                  style={{ color: errors?.password !== "" ? "red" : "gray" }}
                  id="component-error-text"
                >
                  {errors?.password}
                </FormHelperText>
              </FormControl>
              <Box style={{ minHeight: "4vh" }} margin="normal">
                {values.message && (
                  <div className="wrong-input">{values.message}</div>
                )}
              </Box>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                className="btn-login"
                size="large"
                style={{
                  backgroundColor: "#303F9F",
                  color: "white",
                  font: "Roboto",
                  fontSize: "14px",
                  fontStyle: "medium",
                }}
                disabled={Boolean(errors?.email || errors?.password)}
              >
                <span className="btn-login-txt">Zaloguj się</span>
              </Button>
            </Grid>
          </form>
        </CardContent>
        <CardContent>
          <Divider style={{ marginLeft: "72px", marginRight: "72px" }} />
          <p className="login-link-des">
            Nie masz jeszcze konta?{" "}
            <Link to="/signup" className="login-link">
              Zarejestruj się
            </Link>
          </p>
          <p className="login-link-des">
            Zapomniałeś hasła?{" "}
            <Link to="#" className="login-link">
              Przypomnij
            </Link>
          </p>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default LoginCard;
