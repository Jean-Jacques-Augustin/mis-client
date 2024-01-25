import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Snackbar,
  Card,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomTextField from "../components/atoms/CustomTextField";
import api from "../api/apiService";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

interface LoginForm {
  email: string;
  password: string;
}

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  margin: auto;
`;

const StyledFormBox = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center !important;
  gap: 16px;
  padding: 16px;
  border-radius: 5px;
  max-width: 400px;
  margin: 50px auto;
`;

const StyledForm = styled.form`
  border: #ff000e;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

const StyledLink = styled(Link)`
  color: #3f51b5;
  text-decoration: none;
  display: inline-block;
  transition: color 0.3s;

  &:hover {
    color: #2c3e50;
  }
`;

const Login: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] =
    useState<React.ReactNode | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm((prevLoginForm) => ({ ...prevLoginForm, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await api.post("/login", loginForm).then(
      (response) => {
        localStorage.setItem("token", response.data.token);
        const data = response.data.data;
        const user = data.findUser;

        console.log(user);

        dispatch(
          setUser({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.role === "admin",
            profileImage: "",
            token: data.token,
            isLogged: true,
          })
        );
        setSnackbarMessage(<FormattedMessage id={"login_success"} />);
        setSnackbarOpen(true);
        navigate("/");
      },
      (error) => {
        console.log(error.response.data.message);
        setSnackbarMessage(error.response.data.message);
        setSnackbarOpen(true);
      }
    );
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <StyledContainer>
      <StyledFormBox variant="outlined">
        <Typography variant="h5" gutterBottom>
          Connexion
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                label="Adresse Email"
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label="Mot de passe"
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton
                variant="contained"
                fullWidth
                disableElevation
                color="primary"
                type="submit"
              >
                Se connecter
              </StyledButton>
            </Grid>
            <Grid item xs={12}>
              <Link to="/signup">
                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  style={{ textTransform: "none" }}
                >
                  Créer un compte
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="text"
                color="inherit"
                style={{ textTransform: "none" }}
              >
                Mot de passe oublié ?
              </Button>
            </Grid>
          </Grid>
        </StyledForm>
        <div style={{ display: "flex", flexDirection: "column" }}></div>
      </StyledFormBox>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </StyledContainer>
  );
};

export default Login;
