import React, {useState, useRef} from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Snackbar, Card,
} from "@mui/material";
import {styled} from "@mui/material/styles";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import api from "../api/apiService";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";

const ConfirmationInput = styled("input")(({theme}) => ({
    fontSize: "40px",
    width: "40px",
    textAlign: "center",
    margin: "4px",
    outline: "none",
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: theme.spacing(1),
    "&:focus": {
        borderColor: theme.palette.primary.main,
    },
}));

const EmailConfirmation: React.FC = () => {
    const [confirmationCode, setConfirmationCode] = useState<string[]>(
        Array(6).fill("")
    );
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
    const navigate = useNavigate();
    const email = useSelector(
        (state: RootState) => state.user.user.confirmationEmail
    );

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        "success" | "error" | "info" | "warning"
    >("success");

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const showAlert = (
        message: string,
        severity: "success" | "error" | "info" | "warning"
    ) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleChange = (index: number, value: string) => {
        if (value.match(/^[0-9]*$/) && value.length <= 1) {
            setConfirmationCode((prevCode) => {
                const newCode = [...prevCode];
                newCode[index] = value;
                return newCode;
            });

            if (value && index < 5 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handlePaste = (
        index: number,
        event: React.ClipboardEvent<HTMLInputElement>
    ) => {
        const clipboardData = event.clipboardData.getData("text");
        const digits = clipboardData.split('').slice(0, 6);
        digits.forEach((digit, i) => {
            if (digit.match(/^[0-9]$/)) {
                setConfirmationCode((prevCode) => {
                    const newCode = [...prevCode];
                    newCode[index + i] = digit;
                    return newCode;
                });
            }
        });
    };

    const confirmAccount = async () => {
        const data = {
            email: email,
            code: confirmationCode.join(""),
        };

        try {
            await api.post("users/verify", data);
            navigate("/login");
        } catch (error) {
            console.error(error);
            showAlert("Erreur lors de la confirmation du compte.", "error");
        }
    };

    const handleKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (
            event.key === "Backspace" &&
            index > 0 &&
            !confirmationCode[index]
        ) {
            setConfirmationCode((prevCode) => {
                const newCode = [...prevCode];
                newCode[index - 1] = "";
                return newCode;
            });

            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <Container maxWidth="md">
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{height: "100vh"}}
            >
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            padding: "2rem",
                            borderRadius: "1rem",
                        }}
                        variant={"outlined"}
                    >
                        <Typography variant="h5" gutterBottom>
                            <FormattedMessage id={"confirm_email"}/>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            <FormattedMessage id={"confirmation_code_email"}/>
                        </Typography>
                        <Box display="flex" alignItems="center"
                             justifyContent="center"
                             style={{marginTop: 16}}
                        >
                            {confirmationCode.map((digit, index) => (
                                <ConfirmationInput
                                    key={index}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={(e) => handlePaste(index, e)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    autoFocus={index === 0}
                                    type="tel"
                                    maxLength={1}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                />
                            ))}
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            disableElevation
                            onClick={confirmAccount}
                            style={{marginTop: 16}}
                        >
                            <FormattedMessage id={"confirm"}/>
                        </Button>
                    </Card>
                </Grid>
            </Grid>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default EmailConfirmation;
