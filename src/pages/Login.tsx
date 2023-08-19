import React, { useState } from 'react';
import { Box, Button, Container, Grid, Typography, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CustomTextField from '../components/atoms/CustomTextField';
import api from '../api/apiService';

interface LoginForm {
    email: string;
    password: string;
}

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: auto;
`;

const StyledFormBox = styled(Box)`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 40px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center; /* Ajout pour centrer les liens */
`;

const StyledForm = styled.form``;

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
        email: '',
        password: '',
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginForm((prevLoginForm) => ({ ...prevLoginForm, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // ... (code du handleSubmit)

    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <StyledContainer>
            <StyledFormBox>
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
                            <StyledButton variant="contained" color="primary" type="submit">
                                Se connecter
                            </StyledButton>
                        </Grid>
                    </Grid>
                </StyledForm>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <StyledLink to="/forgot-password">Mot de passe oublié ?</StyledLink>
                    <StyledLink to="/signup">Pas encore inscrit ? S'inscrire</StyledLink>
                </div>
            </StyledFormBox>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} />
        </StyledContainer>
    );
};

export default Login;
