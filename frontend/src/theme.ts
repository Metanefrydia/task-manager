import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3F51B5",
      light: "#5D72E5",
      dark: "#303F9F",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#03A9F4",
      light: "#65CAF8",
      dark: "#007FB8",
      contrastText: "#FFFFFF"
    },
  },
});

export default theme;
