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

const theme = createTheme();

const host = process.env.REACT_APP_API_ENDPOINT;

const ResetPasswordForm = (props) => {
  const uuid = props.uuid;
  const userId = props.userId;
  const dispatch = useDispatch();

  const [isError, setIsError] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMsg] = useState("");

  console.log(userId, uuid);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (
      !data
        .get("newPassword")
        .match(
          "(?=.*[0-9])(?=.*[a-zżźćńółęąś])(?=.*[A-ZŻŹĆĄŚĘŁÓŃ])(?=.*[#?!@$%^&*-]).{6,16}"
        )
    ) {
      setErrorMsg(
        "Hasło musi mieć długość od 6 do 16 znaków oraz być złożone tj. składać się z 3 elementów (duże/małe litery, cyfry, znaki specjalne #?!@$%^&*-)"
      );
      setIsError(false);
      setIsPasswordValid(true);
      return;
    }
    await axios
      .post(`${host}/api/react/user/reset-password?id=${uuid}&usr=${userId}`, {
        email: data.get("email"),
        tempPassword: data.get("passwordTemp"),
        newPassword: data.get("newPassword"),
      })
      .then((result) => {
        dispatch(
          alertActions.showAlert({
            msg: result.data.successMessage,
            flag: true,
            status: "ok",
          })
        );
        props.onReset();
      })
      .catch((err) => {
        console.log(err.response);
        setErrorMsg(err.response.data.errors[0].message);
        setIsError(true);
      });
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
            Resetowanie hasła
          </Typography>
          <Box component="form" onSubmit={handleSubmit} validate sx={{ mt: 1 }}>
            {(isError || isPasswordValid) && (
              <Alert severity="error">{errorMessage}</Alert>
            )}
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
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordTemp"
              label="Hasło tymczasowe"
              type="passwordTemp"
              id="passwordTemp"
              autoComplete="current-password"
              error={isError}
              type="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="Nowe hasło"
              type="newPassword"
              id="newPassword"
              autoComplete="current-password"
              error={isError || isPasswordValid}
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Resetuj
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPasswordForm;
