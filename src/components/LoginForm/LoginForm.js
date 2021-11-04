import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useContext } from "react";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";
import { authActions } from "../../store/auth-slice";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const theme = createTheme();

const host = process.env.REACT_APP_API_ENDPOINT;

const LoginForm = (props) => {
  const dispatch = useDispatch();

  const [recaptcha, setRecaptch] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMsg] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (isLogin) {
      await axios
        .post(`${host}/api/react/user/login`, {
          username: data.get("email"),
          password: data.get("password"),
        })
        .then((result) => {
          dispatch(
            authActions.saveToken({
              token: result.data,
            })
          );
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
      await axios
        .post(`${host}/api/react/user/reset-password/auth`, {
          email: data.get("email"),
        })
        .then((result) => {
          props.onSuccess();
          dispatch(
            alertActions.showAlert({
              msg: result.data.successMessage,
              flag: true,
              status: "ok",
            })
          );
        })
        .catch((err) => {
          setErrorMsg(err.response.data.errors[0].message);
          setIsError(true);
        });
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
              id="email"
              label={`Adres Email`}
              name="email"
              autoComplete="email"
              autoFocus
              error={isError}
            />
            {isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={isLogin ? `Hasło` : `Nazwa użytkownika`}
                type="password"
                id="password"
                autoComplete="current-password"
                error={isError}
              />
            )}
            {!isLogin && (
              <ReCAPTCHA
                sitekey="6LdpDw0dAAAAABYVH2JR4vhstU-s694LS9c0xxFp"
                onChange={(value) => {
                  setRecaptch(value);
                }}
              />
            )}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!recaptcha && !isLogin}
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
