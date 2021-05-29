import React from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FilledInput,
  FormControl,
  InputLabel,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  FormHelperText,
  Input,
  OutlinedInput,
  Divider,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link } from "react-router-dom";
import "./Register.css";
import AuthenticationService from "../../services/service";

interface State {
  email: string;
  username: string;
  password: string;
  showPassword: boolean;
  message: string;
}

const RegisterCard = () => {
  const [values, setValues] = React.useState<State>({
    email: "",
    username: "",
    password: "",
    showPassword: false,
    message: "",
  });

  const [errors, setErrors] = React.useState<any>();

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });

      if (prop === "username") {
        validateUsername(event.target.value);
      } else if (prop === "email") {
        validateEmail(event.target.value);
      } else if (prop === "password") {
        validatePassword(event.target.value);
      }
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

  const validateUsername = (value: any) => {
    setErrors({ ...errors, username: "" });
    if (value.length === 0) {
      setErrors({ ...errors, username: "Imię i nazwisko jest wymagane." });
    } else if (value.length > 255) {
      setErrors({
        ...errors,
        username: "Imię i nazwisko nie powinno mieć więcej niż 255 znaków.",
      });
    }
  };

  const validatePassword = (value: any) => {
    setErrors({ ...errors, password: "" });
    if (value.length === 0) {
      setErrors({ ...errors, password: "Hasło jest wymagane." });
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+,.\\\/;':"-]).{8,}$/.test(
        value
      )
    ) {
      setErrors({
        ...errors,
        password:
          "Wymagane: 8 znaków, 1 dużą, 1 małą literę, 1 cyfrę i 1 znak secjalny.",
      });
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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const token = {
      email: values.email,
      password: values.password,
      name: values.username,
    };

    AuthenticationService.register(token).then(
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
      }
    );
  };

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justify="center"
      style={{ minHeight: "90vh" }}
      className="back-image"
    >
      <Card className="paperStyle" variant="outlined">
        <Box
          style={{ paddingBottom: "0px", marginTop: "16px", marginLeft: "16%" }}
          display="flex"
          justifyContent="flex-start"
        >
          <p className="register-text">Zarejestruj się</p>
        </Box>
        <CardContent>
          <form method="POST" onSubmit={handleRegister}>
            <Grid container direction="column" alignItems="center">
              <TextField
                required
                className="login-input"
                error={Boolean(errors?.username)}
                helperText={errors?.username}
                id="username"
                type="text"
                label="Nazwa Użytkownika"
                placeholder="Nazwa Użytkownika"
                margin="normal"
                variant="outlined"
                name="username"
                onChange={handleChange("username")}
                value={values.username}
              />
              <TextField
                required
                className="login-input"
                error={Boolean(errors?.email)}
                helperText={errors?.email}
                id="email"
                type="text"
                label="Email"
                placeholder="Email"
                margin="normal"
                variant="outlined"
                name="email"
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
                  style={{ color: errors?.password ? "red" : "gray" }}
                  htmlFor="standard-adornment-password"
                >
                  Hasło *
                </InputLabel>
                <OutlinedInput
                  required
                  id="password"
                  error={Boolean(errors?.password)}
                  type={values.showPassword ? "text" : "password"}
                  placeholder="Hasło"
                  value={values.password}
                  name="Hasło"
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
                  <div className="form-group">{values.message}</div>
                )}
              </Box>
              <Button
                variant="contained"
                type="submit"
                size="large"
                style={{
                  backgroundColor: "#303F9F",
                  color: "white",
                  font: "Roboto",
                  fontSize: "14px",
                  fontStyle: "medium",
                }}
                disabled={Boolean(
                  errors?.password || errors?.username || errors?.email
                )}
              >
                <span className="btn-login-txt">Zarejestruj się</span>
              </Button>
            </Grid>
          </form>
        </CardContent>
        <CardContent>
          <Divider style={{ marginLeft: "72px", marginRight: "72px" }} />
          <p className="login-link-des">
            Masz już konto?{" "}
            <Link to="/login" className="login-link">
              Zaloguj się
            </Link>
          </p>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RegisterCard;
