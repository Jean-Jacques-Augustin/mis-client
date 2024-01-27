import React, {useState} from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Snackbar,
    Card,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import CustomTextField from "../components/atoms/CustomTextField";
import api from "../api/apiService";
import {FormattedMessage} from "react-intl";
import {useDispatch} from "react-redux";
import {addConfirmationEmail, setUser} from "../store/userSlice";

interface signupForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
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
    max-width: 500px;
    margin: 50px auto;
`;

const StyledForm = styled.form`
    border: #ff000e;
`;

const StyledButton = styled(Button)`
    margin-top: 16px;
`;

const SignUp: React.FC = () => {
    const [signupForm, setSignupForm] = useState<signupForm>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] =
        useState<React.ReactNode | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setSignupForm((prevsignupForm) => ({...prevsignupForm, [name]: value}));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        if (signupForm.password !== signupForm.confirmPassword) {
            setSnackbarMessage("Password and confirm password must be the same");
            setSnackbarOpen(true);
            return;
        }

        const data = {
            name: signupForm.name,
            email: signupForm.email,
            password: signupForm.password,
        };

        event.preventDefault();

        await api.post("users", data).then((response) => {
            console.log(response);
            dispatch(addConfirmationEmail(response.data.data.email));
            navigate("/confirm");
        }).catch((error) => {
            console.log(error);
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
        });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <StyledContainer>
            <StyledFormBox variant="outlined">
                <Typography variant="h5" gutterBottom>
                    <FormattedMessage id={"signup"}/>
                </Typography>
                <StyledForm onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <CustomTextField
                                label={<FormattedMessage id={"name"}/>}
                                type="name"
                                name="name"
                                value={signupForm.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <CustomTextField
                                label={<FormattedMessage id={"email"}/>}
                                type="email"
                                name="email"
                                value={signupForm.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                label={<FormattedMessage id={"password"}/>}
                                type="password"
                                name="password"
                                value={signupForm.password}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                label={<FormattedMessage id={"confirm_password"}/>}
                                type="password"
                                name="confirmPassword"
                                value={signupForm.confirmPassword}
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
                                <FormattedMessage id={"signup"}/>
                            </StyledButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Link to="/signup">
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    fullWidth
                                    style={{textTransform: "none"}}
                                >
                                    <FormattedMessage id={"login"}/>
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </StyledForm>
                <div style={{display: "flex", flexDirection: "column"}}></div>
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

export default SignUp;
