import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../context/authContext";
import { Alerts } from "./Alerts";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export const Login = () => {
  const [error, setError] = useState();
  const { login, forgotPassword } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-email" && user.email === "") {
        setError("Ingrese su correo por favor!");
      } else if (error.code === "auth/invalid-email") {
        setError("Correo no valido");
      } else if (error.code === "auth/internal-error") {
        setError("Complete todos los campos por favor");
      } else if (error.code === "auth/missing-email") {
        setError(
          "Ingresa un correo electronico por favor, en el campo correo electronico"
        );
      } else if (error.code === "auth/user-not-found") {
        setError("Correo no registrado");
      } else if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      } else if (error.code === "auth/too-many-requests") {
        setError("Se bloqueo su cuenta, Restaure su contraseña");
      }
    }
  };

  //capture input value
  const handleUserChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleForgotPassword = async (e) => {
    setError("");
    if (!user.email) return setError("Ingresa tu correo por favor");
    try {
      await forgotPassword(user.email);
      setError("Te hemos enviado un email con enlace para reset contraseña");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box>{error && <Alerts message={error} />}</Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleUserChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleUserChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={handleForgotPassword}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
