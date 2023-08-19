import React, { useState } from 'react';
import { Box, Button, Container, Grid, Typography, Snackbar } from '@mui/material';
import CustomTextField from '../components/atoms/CustomTextField';
import api from '../api/apiService';

interface LoginForm {
    email: string;
    password: string;
}

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

        const { email, password } = loginForm;

        try {
            const response = await api.post('/login', {
                email,
                password,
            });

            console.log(response.status);

            // Handle successful login here

            setSnackbarMessage('Connexion réussie !');
            setSnackbarOpen(true);

            // Reset login form (optional)
            setLoginForm({
                email: '',
                password: '',
            });
        } catch (error: any) {
            console.log(error.response.status);

            if (error.response.status === 401) {
                console.log(error.response.data);
                setSnackbarMessage(error.response.data.message);
            }

            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="md">
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12} md={6}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        border="1px solid grey"
                        width={500}
                        borderRadius="4px"
                        p={3}
                    >
                        <Typography variant="h5" gutterBottom>
                            Connexion
                        </Typography>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <CustomTextField
                                        label="Adresse Email"
                                        type="email"
                                        name="email"
                                        value={loginForm.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <CustomTextField
                                        label="Mot de passe"
                                        type="password"
                                        name="password"
                                        value={loginForm.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: 16 }}
                            >
                                Se connecter
                            </Button>
                        </form>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default Login;
