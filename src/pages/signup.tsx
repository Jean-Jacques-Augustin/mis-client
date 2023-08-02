import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography, Snackbar } from '@mui/material';
import CustomTextField from '../components/atoms/CustomTextField';
import api from '../api/apiService';

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Record<keyof FormData, string>>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const clearErrors = () => {
        setErrors({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        const errors: Partial<FormData> = {};
        if (!name) {
            errors.name = 'Ce champ est requis';
        }
        if (!email) {
            errors.email = 'Ce champ est requis';
        }
        if (!password) {
            errors.password = 'Ce champ est requis';
        }
        if (!confirmPassword) {
            errors.confirmPassword = 'Ce champ est requis';
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }

        setErrors(errors as Record<keyof FormData, string>);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await api.post('/users', {
                    name,
                    email,
                    password,
                });

                console.log(response.status);

                clearErrors();
                setSnackbarMessage('Inscription réussie !');
                setSnackbarOpen(true);

                // Reset form data after successful submission (optional)
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            } catch (error: any) {
                console.log(error.response.status);

                if (error.response.status === 409) {
                    console.log(error.response.data);
                    setSnackbarMessage(error.response.data.message);
                } else if (error.response.status === 422) {
                    console.log(error.response.data);
                    setSnackbarMessage(error.response.data.message);
                }

                setSnackbarOpen(true);
            }
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
                            Inscription
                        </Typography>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <CustomTextField
                                        label="Nom"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <CustomTextField
                                        label="Adresse Email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextField
                                        label="Mot de passe"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextField
                                        label="Confirmez le mot de passe"
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: 16 }}
                            >
                                S'inscrire
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

                action={
                    <Button color="secondary" size="small" onClick={handleSnackbarClose}>
                        Passer au login
                    </Button>
                }
            />
        </Container>
    );
};

export default SignUp;
