import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";

const theme = createTheme();

const host = process.env.REACT_APP_API_ENDPOINT;

const LoginForm = (props) => {
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMsg] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (isLogin) {
      await axios
        .post(`${host}/api/react/user/login`, {
          username: data.get("username"),
          password: data.get("password"),
        })
        .then((result) => {
          props.onSuccess();
        })
        .catch((err) => {
          if (err.response.status === 403) {
            setErrorMsg("Podano błędne dane logowania!");
          } else {
            setErrorMsg("Wystąpił nieoczekiwany błąd.");
          }
          setIsError(true);
        });
    } else {
      console.log("resetowanie hasla");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {isLogin ? `Zaloguj się` : `Resetowanie hasła`}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} validate sx={{ mt: 1 }}>
            {isError && <Alert severity="error">{errorMessage}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={`Nazwa użytkownika`}
              name="username"
              autoComplete="username"
              autoFocus
              error={isError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={isLogin ? `Hasło` : `Adres email`}
              type="password"
              id="password"
              autoComplete="current-password"
              error={isError}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLogin ? `Zaloguj` : `Resetuj`}
            </Button>
            <Grid container style={{ marginBottom: "10%" }}>
              <Grid item xs>
                <Button
                  size={"small"}
                  onClick={() => {
                    setIsLogin(!isLogin);
                  }}
                >
                  {isLogin ? `Zapomniałeś hasło?` : `Zaloguj`}
                </Button>
              </Grid>
              <Grid item>
                <Link to={`/register`} style={{ textDecoration: "none" }}>
                  <Button size={"small"} onClick={props.onSuccess}>
                    Nie masz konta? Zarejestruj się!
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
