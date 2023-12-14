import React, {useState, useRef} from "react";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const ConfirmationInput = styled("input")(({theme}) => ({
    fontSize: "56px",
    width: "60px",
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
        Array(6).fill(""),
    );
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

    const handleChange = (index: number, value: string) => {
        if (value.match(/^[0-9]*$/) && value.length <= 1) {
            setConfirmationCode(prevCode => {
                const newCode = [...prevCode];
                newCode[index] = value;
                return newCode;
            });

            if (value && index < 5 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (
            event.key === "Backspace" &&
            index > 0 &&
            !confirmationCode[index]
        ) {
            setConfirmationCode(prevCode => {
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
                style={{height: "100vh"}}>
                <Grid item xs={12} md={6}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        border="1px solid grey"
                        width={500}
                        borderRadius="4px"
                        p={3}>
                        <Typography variant="h5" gutterBottom>
                            Confirmation de Code par Email
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Veuillez entrer le code de confirmation envoyé à
                            votre adresse email.
                        </Typography>
                        <Box display="flex" alignItems="center">
                            {confirmationCode.map((digit, index) => (
                                <ConfirmationInput
                                    key={index}
                                    value={digit}
                                    onChange={e =>
                                        handleChange(index, e.target.value)
                                    }
                                    onKeyDown={e => handleKeyDown(index, e)}
                                    ref={el => (inputRefs.current[index] = el)}
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
                            style={{marginTop: 16}}>
                            Confirmer le Code
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EmailConfirmation;
